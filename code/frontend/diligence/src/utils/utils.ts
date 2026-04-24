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
 * @desc 定义一些零散的工具函数
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

import type { Optional } from "@/types/common";


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

export function timeStampToTime(timestamp: string): Date {
    return new Date(parseInt(timestamp, 10));
}

export function randomChoice<T>(arr: T[]): Optional<T> {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomBoolean(): boolean {
    return Math.random() < 0.5;
}

export function randomTodayTime(): Date {
    return new Date(new Date().setHours(0, 0, 0, 0) + Math.random() * 24 * 60 * 60 * 1000);
}

export function timeOffset(time: Date, offsetMs: number) {
    return new Date(time.getTime() + offsetMs);
}

/**
 * @summary 生成随机时间段
 * @desc 生成 n 个随机时间段，每个时间段的长度随机，且相邻时间段间隔随机。
 *
 * @param {Date} start 开始时间
 * @param {Date} end 结束时间
 * @param {number} n 时间段数量
 *
 * @return {Array<{start: Date, end: Date}>} 随机时间段数组
 * */
export function genRandomDatePairs(start: Date, end: Date, n: number): Array<{ start: Date; end: Date }> {
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

    const result: { start: Date; end: Date }[] = [];

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


type TimeDiffResult = { day: number, hour: number, minute: number, second: number };
export function calcTimeDiff(stamp: number): TimeDiffResult;
export function calcTimeDiff(startTime: Date, endTime: Date): TimeDiffResult;
export function calcTimeDiff(stampOrStartTime: number | Date, endTime?: Date): TimeDiffResult {
    const diff = typeof stampOrStartTime === "number" ? stampOrStartTime : stampOrStartTime.getTime() - endTime!.getTime();

    return {
        day: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hour: Math.floor(diff / (1000 * 60 * 60)) % 24,
        minute: Math.floor(diff / (1000 * 60)) % 60,
        second: Math.floor(diff / 1000) % 60
    };
}

