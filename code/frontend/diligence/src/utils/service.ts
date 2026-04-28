/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file service.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 13:32
 * @desc 封装axios请求方法
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { Nullable, HttpResponse } from "@/types/common";
import { DG_TOKEN_KEY } from "@/utils/constant";
import axios from "axios";


/**
 * @desc axios实例，用于请求后端接口
 * @constant service
 * @global
 * */
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VUE_APP_BASE_URL || "/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token: Nullable<string> = localStorage.getItem(DG_TOKEN_KEY);

        if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: AxiosResponse<HttpResponse<any>>) => {
        const result = response.data;

        if (result.code === 200) return result.data;

        return Promise.reject(new Error(result.message || "Error"));
    },
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem(DG_TOKEN_KEY);

            window.location.href = "/auth";
        }

        return Promise.reject(error);
    }
);

/** @namespace http
 *
 * @summary 封装axios请求方法
 * @desc 封装axios请求方法，方便调用，减少代码量
 *
 * @property {function} get - get请求方法
 * @property {function} post - post请求方法
 * @property {function} put - put请求方法
 * @property {function} del - delete请求方法
 * @property {function} patch - patch请求方法
 * */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace http {
    /**
     * @summary get请求方法
     * @template T - 返回数据类型
     * @desc 封装axios的get请求方法，返回Promise对象
     * @param {string} url - 请求地址
     * @param {AxiosRequestConfig} config - 请求配置
     * @returns {Promise<AxiosResponse<T>>} - 返回Promise对象
     * */
    export function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.get(url, config);
    }

    /**
     * @summary post请求方法
     * @template T - 返回数据类型
     * @desc 封装axios的post请求方法，返回Promise对象
     * @param {string} url - 请求地址
     * @param {AxiosRequestConfig} config - 请求配置
     * @returns {Promise<AxiosResponse<T>>} - 返回Promise对象
     * */
    export function post<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, config);
    }

    /**
     * @summary put请求方法
     * @template T - 返回数据类型
     * @desc 封装axios的put请求方法，返回Promise对象
     * @param {string} url - 请求地址
     * @param {AxiosRequestConfig} config - 请求配置
     * @returns {Promise<AxiosResponse<T>>} - 返回Promise对象
     * */
    export function put<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.put(url, config);
    }

    /**
     * @summary delete请求方法
     * @template T - 返回数据类型
     * @desc 封装axios的delete请求方法，返回Promise对象
     * @param {string} url - 请求地址
     * @param {AxiosRequestConfig} config - 请求配置
     * @returns {Promise<AxiosResponse<T>>} - 返回Promise对象
     */
    export function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.delete(url, config);
    }

    /**
     * @summary patch请求方法
     * @template T - 返回数据类型
     * @desc 封装axios的patch请求方法，返回Promise对象
     * @param {string} url - 请求地址
     * @param {AxiosRequestConfig} config - 请求配置
     * @returns {Promise<AxiosResponse<T>>} - 返回Promise对象
     * */
    export function patch<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.patch(url, config);
    }
}

export default service;
