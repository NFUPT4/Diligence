// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.repository.entry;

/*
 * <p>考勤组实体，关联考勤规则、部门及考勤地点。</p>
 *
 * @file AttendanceGroup.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;


/**
 * 考勤组实体。
 *
 * <p>首次出现的注解：
 * <ul>
 *   <li>{@code @Entity}：将该类标记为 JPA 实体，映射到数据库表。</li>
 *   <li>{@code @Table}：指定映射的表名及约束。</li>
 *   <li>{@code @Data}：Lombok 生成 getter/setter/toString/equals/hashCode。</li>
 *   <li>{@code @Id}：声明主键字段。</li>
 *   <li>{@code @GeneratedValue}：主键生成策略，IDENTITY 即自增长。</li>
 *   <li>{@code @ManyToOne}：多对一关系，fetch = LAZY 表示延迟加载。</li>
 *   <li>{@code @JoinColumn}：指定外键列名。</li>
 *   <li>{@code @ManyToMany}：多对多关系，通过中间表关联。</li>
 *   <li>{@code @JoinTable}：定义多对多中间表及其外键列。</li>
 *   <li>{@code @CreationTimestamp}：Hibernate 自动填充创建时间。</li>
 *   <li>{@code @UpdateTimestamp}：自动填充更新时间。</li>
 * </ul>
 * </p>
 */
@Entity
@Table(name = "attendance_group")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long groupId;

    @Column(name = "group_name", nullable = false, unique = true, length = 64)
    private String groupName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rule_id")
    private AttendanceRule rule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_id")
    private Department department;

    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer status = 1;

    @CreationTimestamp
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @UpdateTimestamp
    @Column(name = "update_time")
    private LocalDateTime updateTime;

    @ManyToMany
    @JoinTable(name = "group_loc",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "loc_id"))
    private Set<Location> locations = new HashSet<>();

}