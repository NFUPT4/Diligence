// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.repository.entry;

/*
 * <p>员工实体，包含基本信息、部门、职位、角色及考勤组关联。</p>
 *
 * @file Employee.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.nfupt4.diligence.common.StatusEnum;
import org.nfupt4.diligence.common.GenderEnum;
import org.nfupt4.diligence.common.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;


/**
 * 员工实体。
 *
 * <p>首次出现的注解补充说明：
 * {@code @Enumerated(EnumType.ORDINAL)} 将枚举按序号（0,1,2…）存入数据库。</p>
 */
@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "emp_no", nullable = false, unique = true, length = 32)
    private String empNo;

    @Column(name = "password_hash", nullable = false, length = 128)
    private String passwordHash;

    @Column(name = "name", nullable = false, length = 32)
    private String name;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "gender", columnDefinition = "TINYINT(1)")
    private GenderEnum gender;

    @Column(name = "phone", length = 11)
    private String phone;

    @Column(name = "email", length = 64)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_id")
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private Position position;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "role", columnDefinition = "TINYINT(1) DEFAULT 0")
    private RoleEnum role = RoleEnum.EMPLOYEE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private AttendanceGroup attendanceGroup;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 1")
    private StatusEnum status = StatusEnum.ENABLED;

    @CreationTimestamp
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @UpdateTimestamp
    @Column(name = "update_time")
    private LocalDateTime updateTime;
}