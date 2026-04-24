// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.controller.dto.request;

/*
 * <p>登录请求体，包含工号和密码。</p>
 *
 * @file LoginData.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


/**
 * 登录请求 DTO。
 *
 * <p>{@code @NotBlank}：校验字段不能为 null 且不能只包含空白字符。</p>
 */
@Data
public class LoginData {

    @NotBlank(message = "员工号不能为空")
    private String empNo;

    @NotBlank(message = "密码不能为空")
    private String passwordHash;

}
