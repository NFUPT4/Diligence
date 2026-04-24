// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.repository.entry;

/*
 * <p>职位实体，存储职位名称等信息。</p>
 *
 * @file Position.java
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
import lombok.Data;


/**
 * 职位实体。
 */
@Table(name = "position")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "position_id")
    private Long positionId;

    @Column(name = "position_name", nullable = false, unique = true, length = 64)
    private String positionName;

    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer status = 1;

    @CreationTimestamp
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @UpdateTimestamp
    @Column(name = "update_time")
    private LocalDateTime updateTime;

}
