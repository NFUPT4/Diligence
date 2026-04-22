/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file home.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/20 21:59
 * @desc 主页各项功能api封装文件
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { http } from "@/utils/service";


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
