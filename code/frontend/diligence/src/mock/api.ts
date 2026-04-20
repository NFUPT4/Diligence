/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

import { MockServerBase, route as mockRoute } from "@/mock/common";
import type { HttpRequest, LoginData, LoginResult, Nullable, TodayStatusResult, UserInfo } from "@/types/common";
import { randomBoolean, randomChoice } from "@/utils";

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

    private readonly datePairs: ReturnType<typeof MockServer.genRandomDatePairs> = [];

    private readonly startDate = new Date(Date.now());
    private readonly endDate = new Date(Date.now());

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

        this.startDate.setHours(7, 30);
        this.endDate.setHours(17);

        this.datePairs = MockServer.genRandomDatePairs(this.startDate, this.endDate, Math.floor(Math.random() * 4) + 1);
    }

    @route("/auth/login", "POST")
    login(request: AxiosRequest<LoginData>): HttpRequest<null> | LoginResult {
        const { empNo, passwordHash } = request.body.data;

        const uid = this.userList.findIndex(ui => ui.empNo === empNo);

        const userInfo = this.userList[uid];

        if (userInfo) {
            const realHash = passwordHash + userInfo.salt; // 在后端要加盐后在哈希

            if (realHash === userInfo.passwordHash) {
                const { passwordHash, salt, ...rest } = userInfo; // 剔除密码和盐

                const now = new Date();

                now.setHours(now.getHours() + 2);

                return { token: `${uid}-${empNo}-${now.getTime()}`, userInfo: rest };
            }
        }

        return { code: 401, msg: "用户名或密码错误", data: null };
    }

    @route("/clock/today-status", "POST")
    getTodayStatus(
        request: AxiosRequest<null>
    ): HttpRequest<null> | TodayStatusResult {
        const info = MockServer.parseToken(request);

        if (!info)
            return { code: 401, msg: "请先登录", data: null };

        const { uid, empNo } = info;

        return {
            status: this.datePairs.map(pair => ({
                state: randomBoolean(),
                startTime: pair.start.toISOString(),
                endTime: pair.end.toISOString()
            }))
        };
    }

    static parseToken<T>(request: HttpRequest<T>): Nullable<{ uid: number; empNo: string }> {
        const authHeader = request.headers.authorization;

        const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

        if (token) {
            const [uid, empNo] = token.split("-");

            return { uid: Number(uid), empNo: empNo! };
        }

        return null;
    }

    static genRandomDatePairs(start: Date, end: Date, n: number) {
        if (n <= 0) return [];

        if (start >= end) throw new Error("start date should be earlier than end date");

        const totalMs = end.getTime() - start.getTime();

        const segmentsCount = 2 * n + 1;

        const randomValues = [];

        let sumRandom = 0;

        for (let i = 0; i < segmentsCount; i++) {
            const val = Math.random() * 0.9 + 0.1;

            randomValues.push(val);

            sumRandom += val;
        }

        const actualDurations = randomValues.map(v => (v / sumRandom) * totalMs);

        const gaps: number[] = actualDurations.slice(0, n + 1);
        const durations: number[] = actualDurations.slice(n + 1);

        const result: { start: Date; end: Date; }[] = [];

        let cursor = start.getTime();

        for (let i = 0; i < n; i++) {
            cursor += gaps[i]!;

            const segmentStart = new Date(cursor);

            cursor += durations[i]!;

            const segmentEnd = new Date(cursor);

            result.push({ start: segmentStart, end: segmentEnd });
        }

        return result;
    }
}

export default MockServer.export();
