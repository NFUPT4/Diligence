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
 * @date 2026/04/27 10:30
 * @desc api封装
 * @copyright CC BY-NC-SA 2026. All rights reserved.
 * */
import { http } from "@/utils/service";
import type {
    LoginData,
    LoginResult,
    TodayStatusResult,
    RawTodayStatusResult,
    AttendanceRateResult,
    FetchUserInfoResult,
    LocationInfoResult,
    ClockData
} from "@/types/common";


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace authApi {
    export async function login(data: LoginData) {
        return await http.post<LoginResult>("/auth/login", { data });
    }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace userApi {
    export async function fetchUserInfo(): Promise<FetchUserInfoResult> {
        return await http.post<FetchUserInfoResult>("/user/info");
    }
}

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

    export async function getLocation(data: number): Promise<LocationInfoResult> {
        return await http.post<LocationInfoResult>("/clock/location", { data });
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


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace clockApi {

    export async function clockIn(data: ClockData) {
        return await http.post("/clock/record", { data });
    }

}


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace homeApi {

    export async function getPendingApprovalCount() {
        return await http.get<{ count: number }>("/home/pending-approval-count");
    }

    export async function getPendingApprovalList() {
        return await http.get<
            Array<{
                appId: number;
                applicantName: string;
                appType: number;
                createTime: string;
            }>
        >("/application/pending-list");
    }

    export async function getNotices() {
        return await http.get<Array<{ id: number; title: string; publishTime: string }>>("/home/notices");
    }

    export async function getMonthlyTrend() {
        return await http.get<{ dates: string[]; rates: number[] }>("/home/monthly-trend");
    }
}
