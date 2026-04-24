// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence;

/*
 * <p>项目启动入口，使用 Spring Boot 自动配置。</p>
 *
 * @file DiligenceApplication.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;


/**
 * 应用主类。
 *
 * <p>{@code @SpringBootApplication} 是一个组合注解，等价于
 * {@code @Configuration + @EnableAutoConfiguration + @ComponentScan}，
 * 启用 Spring Boot 的自动配置和组件扫描。</p>
 */
@SpringBootApplication // 组合注解，开启自动配置、组件扫描及配置类支持
public class DiligenceApplication {

    /**
     * 程序入口，启动内嵌 Web 服务器。
     *
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        SpringApplication.run(DiligenceApplication.class, args);
    }

}
