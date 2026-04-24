// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.service.impl;

/*
 * <p>认证服务实现，处理登录、登出和 Token 刷新逻辑。</p>
 *
 * @file AuthServiceImpl.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.nfupt4.diligence.controller.dto.response.LoginResult;
import org.nfupt4.diligence.repository.jpa.EmployeeRepository;
import org.nfupt4.diligence.controller.dto.request.LoginData;
import org.nfupt4.diligence.exception.BusinessException;
import org.nfupt4.diligence.repository.entry.Employee;
import org.nfupt4.diligence.service.AuthService;
import org.springframework.stereotype.Service;
import org.nfupt4.diligence.common.StatusEnum;
import org.nfupt4.diligence.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


/**
 * 认证服务实现。
 *
 * <p>首次出现的注解：
 * <ul>
 *   <li>{@code @Service}：标记为 Service 层组件，由 Spring 管理。</li>
 *   <li>{@code @RequiredArgsConstructor}：Lombok 生成包含 final 字段的构造器，用于构造注入。</li>
 *   <li>{@code @Transactional}：声明事务边界，确保数据库操作一致性。</li>
 * </ul>
 * </p>
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * 用户登录。
     *
     * <p>步骤：1. 根据工号查询员工；2. 检查账号状态；3. 校验密码；
     * 4. 生成 JWT；5. 组装返回结果。</p>
     *
     * @param loginData 登录请求（工号 + 密码哈希）
     * @return 登录结果
     * @throws BusinessException 若工号不存在、密码错误或账号被禁用
     */
    @Override
    public LoginResult login(LoginData loginData) {
        // 1. 根据工号查找员工
        Employee employee = employeeRepository.findByEmpNo(loginData.getEmpNo())
                .orElseThrow(() -> new BusinessException(401, "工号或密码错误"));

        // 2. 检查账号是否启用
        if (employee.getStatus() != StatusEnum.ENABLED)
            throw new BusinessException(403, "账号已被禁用");

        // 3. 密码比对
        if (!passwordEncoder.matches(loginData.getPasswordHash(), employee.getPasswordHash()))
            throw new BusinessException(401, "工号或密码错误");

        // 4. 生成 JWT
        String token = jwtUtil.generateToken(employee.getEmployeeId(), employee.getEmpNo());

        // 5. 构建返回结果
        return LoginResult.builder()
                .token(token)
                .employeeId(employee.getEmployeeId())
                .empNo(employee.getEmpNo())
                .name(employee.getName())
                .role(employee.getRole().getCode())    // 角色编码
                .deptId(employee.getDepartment() != null ? employee.getDepartment().getDeptId() : null)
                .deptName(employee.getDepartment() != null ? employee.getDepartment().getDeptName() : null)
                .build();
    }

    /**
     * 登出（当前无服务端状态，仅记录日志）。
     */
    @Override
    @Transactional
    public void logout(Long employeeId) {
        log.info("用户 {} 登出", employeeId);
    }

    /**
     * 刷新 Token，委托给 {@link JwtUtil#refreshToken(String)}。
     */
    @Override
    public String refreshToken(String oldToken) {
        return jwtUtil.refreshToken(oldToken);
    }

}
