// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.config;

/*
 * <p>开发环境初始化测试用户，自动创建预设账号以便调试。</p>
 *
 * @file InitTestUserRunner.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.nfupt4.diligence.repository.jpa.EmployeeRepository;
import org.nfupt4.diligence.repository.entry.Employee;
import org.springframework.context.annotation.Profile;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.nfupt4.diligence.common.StatusEnum;
import org.nfupt4.diligence.common.RoleEnum;


/**
 * 开发环境测试数据初始化器。
 *
 * <p>实现 {@link CommandLineRunner} 接口，在应用启动后执行。仅在 {@code dev} Profile 激活时生效。
 * 用于自动创建测试员工账号（如工号 {@code EXP20260001}），避免手动插入数据。</p>
 *
 * <p>首次出现的注解说明：
 * <ul>
 *   <li>{@code @Profile("dev")}：限制当前组件仅在指定 Profile（这里是 dev）下注册到容器。</li>
 *   <li>{@code CommandLineRunner}：函数式接口，容器刷新后执行 {@code run} 方法，常用于初始化数据。</li>
 *   <li>{@code @Autowired}：Spring 的依赖注入注解，按类型自动装配 Bean。</li>
 * </ul>
 * </p>
 */
@Component
@Profile("dev") // 仅在 dev profile 下生效
public class InitTestUserRunner implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 启动后检查并创建测试用户。
     *
     * @param args 命令行参数
     */
    @Override
    public void run(String... args) {
        // 检查工号是否已存在，避免重复创建
        if (!employeeRepository.existsByEmpNo("EXP20260001")) {
            Employee testUser = new Employee();
            testUser.setEmpNo("EXP20260001");
            // 密码原文经过哈希后存储，此处是固定哈希值（开发用）
            testUser.setPasswordHash(passwordEncoder.encode("c4318372f98f4c46ed3a32c16ee4d7a76c832886d887631c0294b3314f34edf1"));  // 密码 Aa123456
            testUser.setName("测试员工");
            testUser.setRole(RoleEnum.EMPLOYEE);      // 默认角色为普通员工
            testUser.setStatus(StatusEnum.ENABLED);    // 账号启用
            employeeRepository.save(testUser);
            System.out.println("测试用户创建成功：工号 EXP20260001 / 密码 Aa123456");
        }
    }

}
