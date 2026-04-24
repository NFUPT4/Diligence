// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.controller.dto.request;

/*
 * <p>通用请求包装器，将实际请求体嵌套在 {@code data} 字段中，便于统一格式与校验。</p>
 *
 * @file RequestWrapper.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;
import lombok.Data;


/**
 * 通用请求封装对象。
 *
 * <p>客户端发送请求时，将实际数据放在 {@code data} 属性内，例如：
 * <pre>{@code
 * {
 *   "data": {
 *     "empNo": "EXP001",
 *     "passwordHash": "..."
 *   }
 * }
 * }</pre>
 * 这样可以在拦截器或 AOP 中统一处理包装与解包逻辑。</p>
 *
 * <p>注解说明：
 * <ul>
 *   <li>{@code @Valid}：对 {@code data} 内部的对象触发级联校验。</li>
 *   <li>{@code @NotNull}：确保 {@code data} 字段不为 null。</li>
 * </ul>
 * </p>
 *
 * @param <T> 实际请求体的类型
 */
@Data
public class RequestWrapper<T> {

    /**
     * 包装的真实请求数据，不能为 null，且内部字段会进行 JSR-303 校验。
     */
    @Valid
    @NotNull(message = "data不能为空")
    private T data;

}