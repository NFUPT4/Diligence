/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file types.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/01/20 22:12
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

export interface LocaleMessage {
    [key: string]: string | LocaleMessage;
}

export interface LanguageInfo {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    dir: "ltr" | "rtl";
    dateFormat: string;
    timeFormat: string;
    currency: string;
    enabled: boolean;
    fallback: boolean;
}

export interface LocaleConfig {
    availableLanguages: LanguageInfo[];
    defaultLanguage: string;
    storageKey: string;
    autoDetect: boolean;
    fallbackLocale: string;
    pluralizationRules: Record<string, unknown>;
    numberFormats: Record<string, unknown>;
    datetimeFormats: Record<string, unknown>;
}
