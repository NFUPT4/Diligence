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
 * @date 2026/01/20 21:57
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */


import config from "./config.json";
import type { LanguageInfo, LocaleConfig, LocaleMessage } from "@/locales/types";


export function getLanguages(): LanguageInfo[] {
    return getConfig().availableLanguages.filter(l => l.enabled);
}


export function getDefaultLanguage() {
    return getConfig().defaultLanguage;
}


export function getConfig(): LocaleConfig {
    return config as unknown as LocaleConfig;
}


export async function load(code: string): Promise<LocaleMessage> {
    try {
        const languageInfo = getConfig().availableLanguages.find(l => l.code === code);

        if (!languageInfo || !languageInfo.enabled)
            throw new Error(`Language ${code} is not enabled`);

        return (await import(`./languages/${code}.json`)).default;

    } catch (err) {
        console.error(`Failed to load locale: ${code}`, err);

        const fallback = getConfig().availableLanguages.find(l => l.fallback);

        if (fallback && fallback.code !== code)
            return load(fallback.code);

        return (await import(`./languages/${getDefaultLanguage()}.json`)).default;
    }
}
