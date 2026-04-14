/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

import { MockServerBase, route as mockRoute } from "@/mock/common";
import type { HttpRequest, LoginData, LoginResult, UserInfo } from "@/types/common";

type AxiosRequest<T = unknown> = HttpRequest<{
    data: T;
}>;

interface DbUserInfo extends UserInfo {
    passwordHash: string;
    salt: string;
}

const PREFIX = "/api/v1";

function route(...args: Parameters<typeof mockRoute>): ReturnType<typeof mockRoute> {
    if (args.length && !args[0].startsWith(PREFIX)) args[0] = PREFIX + args[0];

    return mockRoute(...args);
}

/**
 * @file api.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 13:25
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
class MockServer extends MockServerBase {
    private userList: DbUserInfo[] = [];

    constructor() {
        super();
        this.userList.push({
            empNo: "EXP20260001",
            passwordHash: "c4318372f98f4c46ed3a32c16ee4d7a76c832886d887631c0294b3314f34edf1aslidf",
            salt: "aslidf",
            employeeId: 0,
            name: "edocsitahw",
            role: 0,
            deptId: 0,
            deptName: "t"
        });
    }

    @route("/auth/login", "POST")
    login(request: AxiosRequest<LoginData>): HttpRequest<null> | LoginResult {
        const { empNo, passwordHash } = request.body.data;

        const userInfo = this.userList.find(ui => ui.empNo === empNo);

        if (userInfo) {
            const realHash = passwordHash + userInfo.salt; // 在后端要加盐后在哈希

            if (realHash === userInfo.passwordHash) {
                const { passwordHash, salt, ...rest } = userInfo; // 剔除密码和盐

                return { token: `Bearer ${Math.random().toString(36).slice(-8)}`, userInfo: rest };
            }
        }

        return { code: 401, msg: "用户名或密码错误", data: null };
    }
}

export default MockServer.export();
