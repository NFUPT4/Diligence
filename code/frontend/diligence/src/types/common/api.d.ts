/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file api.d.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/14 11:28
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

/**
 * HTTP响应接口
 * @interface HttpResponse
 * @template T 响应数据类型
 * @description 标准API响应格式
 * @property {number} code - HTTP状态码
 * @property {string} message - 响应消息
 * @property {T} data - 响应数据
 * @property {boolean} success - 请求是否成功
 */
export interface HttpResponse<T = unknown> {
    code: number;
    message: string;
    data: T;
}

/** @interface HttpRequest
 *
 * @template T 请求参数类型
 *
 * @property {string} url 请求地址
 * @property {T} body 请求参数
 * @property {Record<string, unknown>} query 请求参数
 * @property {Record<string, string>} headers 请求头
 * @property {Record<string, unknown>} params 请求参数
 * */
export interface HttpRequest<T = unknown> {
    url: string;
    body: T;
    query: Record<string, unknown>;
    headers: Record<string, string>;
    params: Record<string, unknown>;
}

export interface UserInfo {
    employeeId: number;
    empNo: string;
    name: string;
    role: number;
    deptId: number;
    deptName: string;
}

export interface LoginData {
    empNo: string;
    passwordHash: string;
    remember: boolean;
}

export interface LoginResult {
    token: string;
    userInfo: UserInfo;
}


export interface TodayStatusResult {
    status: {
        state: boolean;
        startTime: string | false;
        endTime: string | false;
        name?: string;
    }[];
}

