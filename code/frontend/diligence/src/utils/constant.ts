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
 * @desc 常量定义
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import type { DgAttribute, LocalStorageKey } from "@/types/common";

/**
 * @constant DG_TOKEN_KEY
 *
 * @summary LocalStorage存储token的key值
 * @desc 该值用于存储token，在登录成功后，将token存储在localStorage中，以便在其他页面访问时使用。
 * */
export const DG_TOKEN_KEY: LocalStorageKey<"token"> = "DG_TOKEN_KEY";

/**
 * @constant DG_REMEMBER_KEY
 *
 * @summary LocalStorage存储记住密码的key值
 * @desc 该值用于存储是否记住密码，在登录成功后，将是否记住密码存储在localStorage中，以便在其他页面访问时使用。
 * */
export const DG_REMEMBER_KEY: LocalStorageKey<"remember"> = "DG_REMEMBER_KEY";

export const DG_THEME_KEY: LocalStorageKey<"theme"> = "DG_THEME_KEY";

/** @constant COORD_API_KEY
 *
 * @summary 高德地图api key
 * */
export const COORD_API_KEY = "6eff739ecbb65caf594f618a8c43931d";

/** @constant COORD_SECURITIES_KEY
 *
 * @summary 高德地图api 安全密钥
 * */
export const COORD_SECURITIES_KEY = "4138bdedbce0a4004674ad7b1f4acf31";

export const MEDIA_SIZE: {
    "phone-tablet": number;
    "tablet-desktop": number;
} = {
    "phone-tablet": 500,
    "tablet-desktop": 768
};

export const DG_EVENT_STORE_FUNC_KEY: DgAttribute<"EventStoreFunc"> = "__dg_event_store_func__";

export const DG_SIZE_STORE_FUNC_KEY: DgAttribute<"SizeStoreFunc"> = "__dg_size_store_func__";
