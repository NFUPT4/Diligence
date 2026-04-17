<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<script lang="ts">
    /**
     * @file App.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/03 12:51
     * @description
     * @todo
     * ## 需要实现的页面列表
     *
     * | 序号 | 页面名称 | 对应用例 | 路由建议 | 角色权限 |
     * |------|----------|----------|----------|----------|
     * | 1 | 登录页 | UC001 | `/login` | 无限制（未登录） |
     * | 2 | 首页/仪表盘 | - | `/home` | 所有角色 |
     * | 3 | 打卡页 | UC002 | `/clock` | 所有角色 |
     * | 4 | 考勤申请页 | UC003 | `/application/create` | 所有角色 |
     * | 5 | 审批申请页 | UC004 | `/application/approve` | 部门负责人、管理员 |
     * | 6 | 个人考勤查看页 | UC005 | `/attendance/personal` | 所有角色 |
     * | 7 | 部门/公司考勤查看页 | UC006 | `/attendance/department` | 部门负责人、管理员 |
     * | 8 | 员工账号管理页 | UC007 | `/admin/employees` | 管理员 |
     * | 9 | 考勤规则配置页 | UC008 | `/admin/rules` | 管理员 |
     * | 10 | 组织架构维护页 | UC009 | `/admin/organization` | 管理员 |
     *
     * > 另外，**考勤数据导出**（UC010）不是一个独立页面，而是在部门/公司考勤查看页（UC006）中通过「导出」按钮触发的弹窗或操作。
     *
     * ---
     *
     * ## 各页面核心功能简述
     *
     * ### 1. 登录页 (`/login`)
     * - 工号 + 密码输入框
     * - 「记住我」复选框
     * - 调用 `POST /auth/login`
     * - 登录成功存储 Token 和用户信息，跳转首页
     *
     * ### 2. 首页 (`/home`)
     * - 今日打卡状态（已打卡/未打卡）
     * - 快速打卡入口（跳转打卡页）
     * - 待审批数量提示（部门负责人/管理员）
     * - 系统公告（可选）
     *
     * ### 3. 打卡页 (`/clock`)
     * - 获取并显示当前位置（调用浏览器 Geolocation + 高德逆地理编码）
     * - 系统自动判断上班/下班打卡类型
     * - 打卡按钮
     * - 调用 `POST /clock/record`
     * - 显示打卡结果（成功/失败/不在范围内/重复打卡）
     *
     * ### 4. 考勤申请页 (`/application/create`)
     * - 申请类型下拉（请假/加班/外勤/补卡）→ 动态切换表单字段
     * - 起止时间选择器
     * - 事由输入框
     * - 附件上传（调用 `POST /upload`）
     * - 提交调用 `POST /application/submit`
     * - 我的申请列表（可撤销待审批的申请）→ 调用 `GET /application/my-applications`
     *
     * ### 5. 审批申请页 (`/application/approve`)
     * - 待审批列表（调用 `GET /application/pending-approvals`）
     * - 点击查看申请详情（弹窗）
     * - 通过/驳回按钮（驳回需填写理由）
     * - 调用 `PUT /application/{appId}/approve`
     *
     * ### 6. 个人考勤查看页 (`/attendance/personal`)
     * - 月份切换
     * - 日历视图（显示每日打卡状态：正常/迟到/早退/缺卡）
     * - 列表视图（表格）
     * - 点击日期查看打卡详情（弹窗）
     * - 月度统计卡片（正常天数、迟到次数、早退次数、缺卡天数）
     * - 调用 `GET /clock/my-records?yearMonth=YYYY-MM`
     *
     * ### 7. 部门/公司考勤查看页 (`/attendance/department`)
     * - 部门下拉（管理员可选全公司，负责人只看本部门）
     * - 日期范围选择器
     * - 员工姓名/工号搜索框
     * - 考勤报表表格（员工姓名、工号、正常天数、迟到、早退、缺勤等）
     * - ECharts 图表（出勤率、异常占比）
     * - 「导出」按钮 → 弹窗选择导出字段，调用 `POST /report/export`
     * - 点击某员工「查看详情」→ 跳转个人考勤查看页（带参数）
     * - 调用 `GET /report/department`
     *
     * ### 8. 员工账号管理页 (`/admin/employees`)
     * - 员工列表（分页、搜索：工号/姓名/部门）
     * - 新增/编辑员工（弹窗）
     * - 启用/禁用账号
     * - 重置密码
     * - 调用 `GET /admin/employees`、`POST /admin/employees`、`PUT /admin/employees/{id}`、`PUT /admin/employees/{id}/status`、`PUT /admin/employees/{id}/reset-password`
     *
     * ### 9. 考勤规则配置页 (`/admin/rules`)
     * - 三个标签页：
     *   - 打卡地点管理（列表、新增/编辑/删除）
     *   - 考勤规则管理（固定班次/弹性工时，上下班时间、迟到/早退阈值）
     *   - 考勤组管理（组名、关联规则、关联地点、分配员工）
     * - 调用对应的 `/admin/locations`、`/admin/rules`、`/admin/groups` 系列接口
     *
     * ### 10. 组织架构维护页 (`/admin/organization`)
     * - 部门树形结构（增删改部门，设置上级部门、负责人）
     * - 岗位列表（增删改岗位，关联部门）
     * - 调用 `GET /admin/departments/tree`、`POST /admin/departments`、`PUT /admin/departments/{id}`、`DELETE /admin/departments/{id}` 以及岗位相关接口
     *
     * ---
     *
     * ## 额外需要实现的组件/功能
     *
     * | 类型 | 说明 |
     * |------|------|
     * | 路由守卫 | 未登录跳转 `/login`，根据角色权限动态渲染菜单 |
     * | 全局布局 | 侧边栏导航 + 顶部栏（用户信息、退出登录） |
     * | 请求拦截器 | 自动添加 `Authorization: Bearer <token>` |
     * | 响应拦截器 | 统一处理 401（跳转登录）、错误提示 |
     * | 退出登录 | 清除 Token，跳转登录页 |
     * | 文件上传组件 | 用于申请附件 |
     * | Excel 导出 | 处理二进制文件流下载 |
     *
     * ---
     *
     * ## 开发顺序
     *
     * 1. **登录页 + 路由守卫 + 布局框架**
     * 2. **首页 + 打卡页**（核心业务）
     * 3. **个人考勤查看页**
     * 4. **考勤申请页 + 我的申请列表**
     * 5. **审批申请页**（部门负责人）
     * 6. **部门/公司考勤查看页 + 导出**
     * 7. **员工账号管理页**
     * 8. **考勤规则配置页**
     * 9. **组织架构维护页**
     * */
    import { defineComponent } from "vue";
    import { useThemeStore } from "@/stores/theme.store";
    import router from "@/router/router";

    onload = () => {
        {
            router.push("/");
        }
    };

    export default defineComponent({
        name: "App",
        beforeMount() {
            useThemeStore().init();
        }
    });
</script>

<template>
    <router-view></router-view>
</template>

<style lang="sass">
    @use "@/style/theme" as *

    html, body, #app
        padding: 0
        margin: 0
        width: 100%
        height: 100%

    a
        text-decoration: none
        color: unset
</style>
