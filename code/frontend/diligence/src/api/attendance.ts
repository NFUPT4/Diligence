/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file attendance.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/17 15:33
 * @desc 用户考勤相关api封装文件
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import type { AttendanceRateResult, RawTodayStatusResult, TodayStatusResult } from "@/types/common";
import { http } from "@/utils/service";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace attendanceApi {
    /**
     * @summary 获取用户今日打卡状态
     *
     * @returns {HttpRequest<null> | TodayStatusResult} 打卡状态结果或错误信息
     * */
    export async function getTodayStatus(): Promise<TodayStatusResult> {
        const response = await http.post<RawTodayStatusResult>("/clock/today-status");

        return {
            status: response.status.map(item => ({
                ...item,
                startTime: item.startTime ? new Date(item.startTime) : null,
                endTime: item.endTime ? new Date(item.endTime) : null
            }))
        };
    }

    /**
     * @summary 获取用户的本月考勤率
     *
     * @returns {HttpRequest<null> | AttendanceRateResult} 考勤率结果或错误信息
     * */
    export async function getAttendanceRate(): Promise<AttendanceRateResult> {
        return await http.get<AttendanceRateResult>("/home/attendance-rate");
    }
}
