// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.common;

/*
 * <p>统一 HTTP 响应泛型封装，包含状态码、消息和数据。</p>
 *
 * @file HttpResponse.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import lombok.AllArgsConstructor;
import lombok.Data;


/**
 * 统一 API 响应结果。
 *
 * @param <T> 响应数据类型
 */
@Data
@AllArgsConstructor
public class HttpResponse<T> {

    private int code;
    private String message;
    private T data;

    /** 快速构建成功响应（状态码 200） */
    public static <T> HttpResponse<T> success(T data) {
        return new HttpResponse<>(200, "success", data);
    }

    /** 快速构建错误响应 */
    public static <T> HttpResponse<T> error(int code, String message) {
        return new HttpResponse<>(code, message, null);
    }

}
