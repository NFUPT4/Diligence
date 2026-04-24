// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.service.dto;

/*
 * <p>用户信息数据传输对象，用于业务层间传递用户的简要信息。</p>
 *
 * @file UserInfo.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;


/**
 * 用户信息 DTO。
 *
 * <p>包含员工基本标识、所属部门及角色编码，通常从实体转换而来。</p>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    /** 员工 ID */
    private Long employeeId;

    /** 工号 */
    private String empNo;

    /** 姓名 */
    private String name;

    /** 角色编码：0-普通员工，1-部门主管，2-管理员 */
    private Integer role;

    /** 部门 ID */
    private Long deptId;

    /** 部门名称 */
    private String deptName;

}
