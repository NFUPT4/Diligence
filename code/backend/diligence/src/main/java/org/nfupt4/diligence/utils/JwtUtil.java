// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.utils;

/*
 * <p>JWT 工具类，负责 Token 的生成、解析、校验与刷新。</p>
 *
 * @file JwtUtil.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.SignatureAlgorithm;
import java.nio.charset.StandardCharsets;
import io.jsonwebtoken.security.Keys;
import java.util.function.Function;
import lombok.extern.slf4j.Slf4j;
import javax.crypto.SecretKey;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.util.HashMap;
import java.util.Date;
import java.util.Map;



/**
 * JWT 工具，提供 Token 生命周期管理。
 *
 * <p>首次出现的注解说明：
 * <ul>
 *   <li>{@code @Component}：将该类注册为 Spring 容器中的 Bean。</li>
 *   <li>{@code @Slf4j}：Lombok 注解，编译时生成静态日志对象 {@code log}。</li>
 *   <li>{@code @Value}：从配置文件或默认值中注入属性值。</li>
 * </ul>
 * </p>
 */
@Component
@Slf4j
public class JwtUtil {

    /** JWT 签名密钥，默认值用于开发环境 */
    @Value("${app.jwt.secret:defaultSecretKeyForJWT2026AttendanceSystem}")
    private String secret;

    /** Token 有效期（毫秒），默认 24 小时 */
    @Value("${app.jwt.expiration:86400000}")
    private Long expiration;

    /**
     * 将字符串密钥转换为 HMAC-SHA 算法的 {@link SecretKey}。
     *
     * @return 签名密钥
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 为指定员工生成 JWT Token。
     *
     * @param employeeId 员工 ID（存入 subject）
     * @param empNo      工号（存入私有声明）
     * @return 生成的 JWT 字符串
     */
    public String generateToken(Long employeeId, String empNo) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("empNo", empNo);                 // 将工号放入声明

        return createToken(claims, String.valueOf(employeeId));
    }

    /**
     * 构建 JWT Token 的核心逻辑。
     *
     * @param claims  自定义声明
     * @param subject 主题（员工 ID）
     * @return JWT 字符串
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();

        Date expiryDate = new Date(now.getTime() + expiration); // 计算过期时间

        return Jwts.builder()
                .setClaims(claims)                              // 设置私有声明
                .setSubject(subject)                            // 主题 = 员工ID
                .setIssuedAt(now)                               // 签发时间
                .setExpiration(expiryDate)                      // 过期时间
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // 使用 HS256 签名
                .compact();
    }

    /**
     * 从 Token 中提取员工 ID。
     *
     * @param token JWT 字符串
     * @return 员工 ID
     */
    public Long getEmployeeIdFromToken(String token) {
        String subject = getClaimFromToken(token, Claims::getSubject);

        return Long.parseLong(subject);
    }

    /**
     * 从 Token 中提取工号。
     *
     * @param token JWT 字符串
     * @return 工号
     */
    public String getEmpNoFromToken(String token) {
        return getClaimFromToken(token, claims -> (String) claims.get("empNo"));
    }

    /**
     * 验证 Token 是否合法且未过期。
     *
     * @param token JWT 字符串
     * @return true 有效，false 无效或已过期
     */
    public Boolean validateToken(String token) {
        try {
            // 尝试解析 Token，若签名错误或格式不正确会抛异常
            Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);

            return !isTokenExpired(token); // 检查是否过期

        } catch (Exception e) {
            log.warn("JWT 验证失败: {}", e.getMessage());
            return false;

        }
    }

    /**
     * 刷新 Token：基于旧 Token 中的身份信息生成新 Token。
     *
     * @param oldToken 现有有效的 Token
     * @return 新 Token
     * @throws RuntimeException 若旧 Token 无效或已过期
     */
    public String refreshToken(String oldToken) {
        if (!validateToken(oldToken))
            throw new RuntimeException("Invalid or expired token");

        Long employeeId = getEmployeeIdFromToken(oldToken);

        String empNo = getEmpNoFromToken(oldToken);

        return generateToken(employeeId, empNo);
    }

    /**
     * 判断 Token 是否已过期。
     *
     * @param token JWT 字符串
     * @return true 已过期
     */
    private Boolean isTokenExpired(String token) {
        Date expiration = getClaimFromToken(token, Claims::getExpiration);

        return expiration.before(new Date());
    }

    /**
     * 从 Token 中提取具体声明信息。
     */
    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getAllClaimsFromToken(token);

        return claimsResolver.apply(claims);
    }

    /**
     * 解析 Token 并返回所有声明体。
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
