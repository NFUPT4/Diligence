// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.service;

/*
 * <p>认证服务接口，定义登录、登出及 Token 刷新操作。</p>
 *
 * @file AuthService.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.nfupt4.diligence.controller.dto.response.LoginResult;
import org.nfupt4.diligence.controller.dto.request.LoginData;


public interface AuthService {

    /**
     * 用户登录，校验工号密码并返回身份信息与 Token。
     *
     * @param loginData 包含工号和密码的请求体
     * @return 登录结果（含 Token、员工信息等）
     */
    LoginResult login(LoginData loginData);

    /**
     * 登出操作（当前为无状态 JWT，仅记录日志）。
     *
     * @param employeeId 员工 ID
     */
    void logout(Long employeeId);

    /**
     * 刷新 Token，生成新的有效期。
     *
     * @param oldToken 旧 Token
     * @return 新 Token
     */
    String refreshToken(String oldToken);

}
