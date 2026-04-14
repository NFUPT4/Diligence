/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file utils.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/13 21:47
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

/**
 * @summary 生成字符串哈希
 *
 * @desc 生成字符串的哈希值，使用 sha256 算法
 *
 * @param {string} str 要生成哈希的字符串
 *
 * @return {string} 哈希值
 * */
export async function hash(str: string): Promise<string> {
    const msgBuf = new TextEncoder().encode(str);

    const hashBuf = await crypto.subtle.digest("SHA-256", msgBuf);

    const hashArray = Array.from(new Uint8Array(hashBuf));

    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
