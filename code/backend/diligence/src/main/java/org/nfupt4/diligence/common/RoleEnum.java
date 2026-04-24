// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.common;

/*
 * <p>角色枚举，定义员工、部门主管和管理员。</p>
 *
 * @file RoleEnum.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */


/**
 * 系统角色。
 */
public enum RoleEnum {

    /** 普通员工 */
    EMPLOYEE,
    /** 部门主管 */
    DEPT_LEADER,
    /** 管理员 */
    ADMIN;

    /**
     * 获取角色的数字编码（0,1,2），用于持久化或传输。
     * @return 序号
     */
    public Integer getCode() {
        return this.ordinal();
    }

}
