/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file mock.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/03/15 21:57
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import {createProdMockServer} from "vite-plugin-mock/client";
import MockMethod from "./api";


export function setupProdMockServer() {
    createProdMockServer([...MockMethod]);
}
