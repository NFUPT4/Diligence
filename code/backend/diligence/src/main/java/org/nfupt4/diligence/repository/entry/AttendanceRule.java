// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.repository.entry;

/*
 * <p>考勤规则实体，定义班次时间、迟到早退界限等参数。</p>
 *
 * @file AttendanceRule.java
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
import java.math.BigDecimal;
import java.time.LocalTime;
import lombok.Data;


/**
 * 考勤规则。
 */
@Entity
@Table(name = "attendance_rule")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id")
    private Long ruleId;

    @Column(name = "rule_name", nullable = false, length = 64)
    private String ruleName;

    /** 0-固定班次，1-弹性工作制 */
    @Column(name = "rule_type", columnDefinition = "TINYINT(1) DEFAULT 0")
    private Integer ruleType = 0;

    @Column(name = "morning_start")
    private LocalTime morningStart;

    @Column(name = "morning_end")
    private LocalTime morningEnd;

    @Column(name = "afternoon_start")
    private LocalTime afternoonStart;

    @Column(name = "afternoon_end")
    private LocalTime afternoonEnd;

    /** 允许迟到分钟数 */
    @Column(name = "late_minutes", columnDefinition = "INT(11) DEFAULT 30")
    private Integer lateMinutes = 30;

    /** 允许早退分钟数 */
    @Column(name = "early_minutes", columnDefinition = "INT(11) DEFAULT 30")
    private Integer earlyMinutes = 30;

    @Column(name = "work_hours_per_day", precision = 3, scale = 1)
    private BigDecimal workHoursPerDay;

    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer status = 1;

    @CreationTimestamp
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @UpdateTimestamp
    @Column(name = "update_time")
    private LocalDateTime updateTime;

}