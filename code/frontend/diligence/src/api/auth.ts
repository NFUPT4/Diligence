/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file auth.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/14 11:25
 * @desc 用户登录api封装文件
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

import { http } from "@/utils/service";
import type { LoginData, LoginResult } from "@/types/common";


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace authApi {

    export async function login(data: LoginData) {
        return await http.post<LoginResult>("/auth/login", { data });
    }

}
