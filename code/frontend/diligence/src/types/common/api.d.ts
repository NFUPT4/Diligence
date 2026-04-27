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
 * @desc api相关接口类型定义
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

import { Nullable } from "@/types/common/utils";


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


/** @interface LoginData
 *
 * @summary 登录请求参数接口
 *
 * @property {string} empNo 员工工号
 * @property {string} passwordHash 密码哈希值
 * */
export interface LoginData {
    empNo: string;
    passwordHash: string;
}

/** @interface LoginResult
 *
 * @summary 登录响应参数接口
 *
 * @property {string} token 登录令牌
 * @property {UserInfo} userInfo 用户信息
 * */
export interface LoginResult {
    token: string;
    userInfo: UserInfo;
}


export interface TodayStatusItemBase {
    locationId: number;
    state: boolean;
    name?: string;
}


export interface RawTodayStatusItem extends TodayStatusItemBase {
    startTime: Nullable<string>;
    endTime: Nullable<string>;
}

export interface TodayStatusItem extends TodayStatusItemBase {
    startTime: Nullable<Date>;
    endTime: Nullable<Date>;
}

/** @interface RawTodayStatusResult
 *
 * @summary 未经处理的今日状态响应参数接口
 *
 * @property {RawTodayStatusItem[]} status 今日状态列表
 * */
export interface RawTodayStatusResult {
    status: RawTodayStatusItem[];
}


/** @interface TodayStatusResult
 *
 * @summary 经过js格式处理的今日状态响应参数接口
 *
 * @property {TodayStatusItem[]} status 今日状态列表
 * */
export interface TodayStatusResult {
    status: TodayStatusItem[];
}


/** @interface AttendanceRateResult
 *
 * @summary 考勤率响应参数接口
 *
 * @property {number} personalRate 个人考勤率
 * @property {number} deptAvgRate 部门平均考勤率
 * */
export interface AttendanceRateResult {
    personalRate: number;
    deptAvgRate: number;
}


export type FetchUserInfoResult = UserInfo;


export interface LocationInfo {
    id: number;
    longitude: number;
    latitude: number;
    radius: number;
    name: string;
    address: string;
}


export type LocationInfoResult = LocationInfo;


export interface ClockData {
    longitude: number;
    latitude: number;
    locationId: number;
    time: string;
}
