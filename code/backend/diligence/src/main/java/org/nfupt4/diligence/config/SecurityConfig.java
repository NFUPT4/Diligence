// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.config;

/*
 * <p>Spring Security 配置类，定义安全过滤链与密码编码器。</p>
 *
 * @file SecurityConfig.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;


/**
 * 安全配置。
 *
 * <p>首次出现的注解：
 * <ul>
 *   <li>{@code @Configuration}：声明该类为 Spring 配置类。</li>
 *   <li>{@code @EnableWebSecurity}：启用 Spring Security 的 Web 安全支持。</li>
 *   <li>{@code @Bean}：方法返回值纳入 Spring 容器管理。</li>
 * </ul>
 * </p>
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * 配置安全过滤链。
     *
     * <p>放行静态资源、首页及登录接口，其余 API 需要认证。</p>
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable) // 禁用 CSRF（JWT 无状态不需）
            .authorizeHttpRequests(auth -> auth
                // 放行静态资源、首页及登录接口
                .requestMatchers("/", "/index.html", "/static/**", "/logo.png").permitAll()
                // 放行登录接口
                .requestMatchers("/api/v1/auth/login").permitAll()
                // 其余 API 需要认证
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            );

        return http.build();
    }

    /**
     * 密码编码器，使用 BCrypt 强哈希算法。
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
