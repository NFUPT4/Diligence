// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.exception;

/*
 * <p>业务异常类，携带错误码与消息，统一异常处理。</p>
 *
 * @file BusinessException.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import lombok.Getter;


/**
 * 自定义运行时业务异常。
 *
 * <p>首次出现的 {@code @Getter}：Lombok 为所有字段生成 getter 方法。</p>
 */
@Getter
public class BusinessException extends RuntimeException {

    /** 业务错误码 */
    private final int code;
    /** 错误消息 */
    private final String message;

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }

    public BusinessException(String message) {
        this(500, message);
    }

    public BusinessException(int code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
        this.message = message;
    }

    // 静态工厂方法

    public static BusinessException notFound(String entityName) {
        return new BusinessException(404, entityName + "不存在");
    }

    public static BusinessException badRequest(String msg) {
        return new BusinessException(400, msg);
    }

    public static BusinessException unauthorized(String msg) {
        return new BusinessException(401, msg);
    }

    public static BusinessException forbidden(String msg) {
        return new BusinessException(403, msg);
    }

}