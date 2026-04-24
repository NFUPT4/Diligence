// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.controller;

/*
 * <p>认证控制器，提供登录、登出、Token 刷新接口。</p>
 *
 * @file AuthController.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.nfupt4.diligence.controller.dto.response.LoginResult;
import org.nfupt4.diligence.controller.dto.request.LoginData;
import org.springframework.web.bind.annotation.*;
import org.nfupt4.diligence.common.HttpResponse;
import org.nfupt4.diligence.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.validation.Valid;


/**
 * 认证接口控制器。
 *
 * <p>首次出现的注解：
 * <ul>
 *   <li>{@code @RestController}：组合 {@code @Controller + @ResponseBody}，REST 风格。</li>
 *   <li>{@code @RequestMapping("/api/v1/auth")}：类级别路径映射。</li>
 *   <li>{@code @PostMapping("/login")}：映射 HTTP POST 请求到 /api/v1/auth/login。</li>
 *   <li>{@code @Valid}：触发 JSR-303 参数校验。</li>
 *   <li>{@code @RequestBody}：将 HTTP 请求体反序列化为方法参数。</li>
 *   <li>{@code @RequestAttribute}：从 request 属性中获取值（由过滤器/拦截器设置，如当前用户 ID）。</li>
 *   <li>{@code @RequestHeader}：获取请求头中的值。</li>
 * </ul>
 * </p>
 */
@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 用户登录。
     *
     * @param request 包含工号和密码的登录请求
     * @return 统一响应，内含登录结果
     */
    @PostMapping("/login")
    public HttpResponse<LoginResult> login(@Valid @RequestBody LoginData request) {
        LoginResult result = authService.login(request);

        return HttpResponse.success(result);
    }

    /**
     * 用户登出，employeeId 由拦截器从 Token 中解析并注入。
     */
    @PostMapping("/logout")
    public HttpResponse<Void> logout(@RequestAttribute Long employeeId) {
        authService.logout(employeeId);

        return HttpResponse.success(null);
    }

    /**
     * 刷新 Token。从 Authorization 头中提取 Bearer Token，返回新 Token。
     */
    @PostMapping("/refresh")
    public HttpResponse<String> refreshToken(@RequestHeader("Authorization") String authorization) {
        // 移除 "Bearer " 前缀
        String token = authorization.startsWith("Bearer ") ? authorization.substring(7) : authorization;

        String newToken = authService.refreshToken(token);

        return HttpResponse.success(newToken);
    }

}
