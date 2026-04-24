// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.repository.jpa;

/*
 * <p>员工数据访问接口，基于 Spring Data JPA 提供常用查询方法。</p>
 *
 * @file EmployeeRepository.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.nfupt4.diligence.repository.entry.Employee;
import org.springframework.data.domain.Pageable;
import org.nfupt4.diligence.common.StatusEnum;
import org.nfupt4.diligence.common.RoleEnum;
import org.springframework.data.domain.Page;
import java.util.Optional;
import java.util.List;


/**
 * 员工 Repository，继承 {@link JpaRepository} 获得 CRUD 与分页能力。
 */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    /** 按工号查询员工（登录用） */
    Optional<Employee> findByEmpNo(String empNo);

    /** 检查工号是否已存在 */
    boolean existsByEmpNo(String empNo);

    /** 分页模糊搜索：工号、姓名、部门组合筛选 */
    Page<Employee> findByEmpNoContainingAndNameContainingAndDepartment_DeptId(
            String empNo, String name, Long deptId, Pageable pageable);

    /** 按部门与状态查询员工列表 */
    List<Employee> findByDepartment_DeptIdAndStatus(Long deptId, StatusEnum status);

    /** 查询未分配考勤组的启用员工 */
    List<Employee> findByAttendanceGroupIsNullAndStatus(StatusEnum status);

    /** 按部门与角色查询（如查找部门主管） */
    List<Employee> findByDepartment_DeptIdAndRole(Long deptId, RoleEnum role);

}
