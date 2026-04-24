// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.repository.entry;

/*
 * <p>打卡记录实体，记录员工上下班打卡时间、位置及是否有效。</p>
 *
 * @file ClockRecord.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.hibernate.annotations.CreationTimestamp;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;


/**
 * 打卡记录实体。
 */
@Entity
@Table(name = "clock_record")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClockRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long recordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "clock_date", nullable = false)
    private LocalDate clockDate;

    @Column(name = "clock_time", nullable = false)
    private LocalDateTime clockTime;

    /** 0-上班打卡，1-下班打卡 */
    @Column(name = "clock_type", nullable = false, columnDefinition = "TINYINT(1)")
    private Integer clockType;

    @Column(name = "longitude", precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(name = "latitude", precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(name = "location", length = 255)
    private String location;

    /** 是否有效（可能因位置偏差标记无效） */
    @Column(name = "is_valid", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer isValid = 1;

    /** 0-正常，1-异常 */
    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 0")
    private Integer status = 0;

    @CreationTimestamp
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

}
