/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file constant.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 13:39
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import type { LocalStorageKey } from "@/types/common";


/**
 * @constant DG_TOKEN_KEY
 *
 * @summary LocalStorage存储token的key值
 * @desc 该值用于存储token，在登录成功后，将token存储在localStorage中，以便在其他页面访问时使用。
 * */
export const DG_TOKEN_KEY: LocalStorageKey<"token"> = "DG_TOKEN_KEY";
