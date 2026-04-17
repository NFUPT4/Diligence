/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file index.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/01/21 11:14
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { createI18n, type I18nOptions } from "vue-i18n";
import { getConfig, load } from "@/locales";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as process from "node:process";


export async function createI18nInstance() {
    const config = getConfig();

    // 加载默认语言
    const defaultMessages = await load(config.defaultLanguage);

    return createI18n({
        legacy: false,
        locale: config.defaultLanguage,
        fallbackLocale: config.fallbackLocale,
        messages: {
            [config.defaultLanguage]: defaultMessages
        },
        datetimeFormats: config.datetimeFormats as I18nOptions["datetimeFormats"],
        numberFormats: config.numberFormats as I18nOptions["numberFormats"],
        pluralizationRules: config.pluralizationRules,
        missingWarn: process.env?.NODE_ENV !== "production",
        fallbackWarn: process.env?.NODE_ENV !== "production",
        silentTranslationWarn: process.env?.NODE_ENV === "production",
    });
}
