<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div class="dg-home dh">
        <!-- 导航栏 / 侧边栏 (PC) & 底部导航栏 (移动端) -->
        <aside class="dh-side">
            <!-- 侧边栏logo (PC可见，移动端隐藏) -->
            <div class="dh-side-logo">
                <dg-logo :options="{ size: 50, opacity: 1 }" />
                <div class="dh-side-logo-text">
                    <h2 style="margin: 0; white-space: nowrap">{{ $t("common.name") }}</h2>
                    <p style="margin: 0; white-space: nowrap">{{ $t("common.brief") }}</p>
                </div>
            </div>

            <!-- 侧边栏菜单 / 移动端底部导航栏 -->
            <div class="dh-side-menu">
                <router-link
                    v-for="item in [
                        { name: $t('common.link.home'), icon: 'fas fa-chart-line', path: '/' },
                        { name: $t('common.link.my-attendance'), icon: 'fas fa-user-check', path: '/my-attendance' },
                        { name: $t('common.link.data-view'), icon: 'fa-solid fa-chart-simple', path: '/data-view' },
                        { name: $t('common.link.system-management'), icon: 'fas fa-gear', path: '/system-management' }
                    ]"
                    :key="item.name"
                    :to="item.path"
                    class="dh-side-menu-item"
                    active-class="active">
                    <i :class="item.icon" />
                    <span>{{ item.name }}</span>
                </router-link>
            </div>

            <!-- 侧边栏用户信息 (PC可见，移动端隐藏) -->
            <div class="dh-side-user">
                <div class="dh-side-user-avatar">
                    <i class="fas fa-user-circle" />
                </div>
                <div class="dh-side-user-info">
                    <h4 style="margin: 0; white-space: nowrap">
                        {{ userStore.info.name }} · {{ userStore.info.deptName }}
                    </h4>
                    <p style="margin: 0; white-space: nowrap">{{ userRoleText }}</p>
                </div>
            </div>
        </aside>

        <!-- 主体内容 -->
        <main class="dh-main">
            <header class="dh-main-header">
                <i18n-t
                    keypath="home.template.welcome"
                    tag="h1">
                    <template #username>
                        {{ userStore.info.name }}
                    </template>
                </i18n-t>
                <div class="breadcrumb"> <i class="fas fa-home"></i> 首页 / 仪表板 </div>
            </header>

            <!-- grid内容 -->
            <div class="dh-main-content">
                <!-- 统计卡组 -->
                <div class="dh-main-content-stats">
                    <div class="stat-card">
                        <div class="stat-title"><i class="far fa-calendar-check"></i> 今日打卡状态</div>
                        <div class="stat-value">✅ 已完成</div>
                        <div class="stat-sub">上班 09:02 · 正常</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title"><i class="fas fa-chart-line"></i> 本月考勤率</div>
                        <div class="stat-value">96.5%</div>
                        <div class="stat-sub">高于部门平均 · 优秀</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title"><i class="fas fa-tasks"></i> 待处理审批</div>
                        <div class="stat-value">2</div>
                        <div class="stat-sub">来自下属 · 需及时处理</div>
                    </div>
                </div>

                <!-- 打卡功能区域 -->
                <div class="dh-main-content-reviews card-panel">
                    <div class="card-header">
                        <h3
                            ><i
                                class="fas fa-location-dot"
                                style="color: #2d6a4f"></i>
                            智能打卡</h3
                        >
                        <span class="badge-gps"><i class="fas fa-shield-alt"></i> GPS验证</span>
                    </div>
                    <div class="clock-area">
                        <div class="location-info">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>当前定位</strong><br />
                                <span>广东省深圳市南山区科技中一路 · 勤致大厦A座</span>
                                <div class="distance-valid">✓ 距离打卡点 42m (有效范围≤200m)</div>
                            </div>
                        </div>
                        <button class="clock-btn"> <i class="fas fa-fingerprint"></i> 立即打卡 · 下班打卡 </button>
                        <div class="clock-hint"> <i class="far fa-clock"></i> 考勤时段：18:00 - 18:30 | 弹性下班 </div>
                    </div>
                    <div class="reminder-tip">
                        <i class="fas fa-info-circle"></i> 今日考勤提醒：已完成上班打卡，下班请勿忘记GPS打卡。
                    </div>
                </div>

                <!-- 待审批申请区域 -->
                <div class="dh-main-content-approval card-panel">
                    <div class="card-header">
                        <h3><i class="fas fa-clipboard-list"></i> 待审批申请</h3>
                        <span class="badge-pending">2条待处理</span>
                    </div>
                    <div class="approval-list">
                        <div class="approval-item">
                            <div class="approval-info">
                                <p>李思敏 · 请假申请</p>
                                <small>2026-04-15 至 2026-04-16 | 年假</small>
                            </div>
                            <div class="btn-outline">审批</div>
                        </div>
                        <div class="approval-item">
                            <div class="approval-info">
                                <p>王启航 · 加班申请</p>
                                <small>2026-04-14 19:00-21:30 | 项目冲刺</small>
                            </div>
                            <div class="btn-outline">审批</div>
                        </div>
                        <div class="approval-item">
                            <div class="approval-info">
                                <p>赵欣怡 · 补卡申请</p>
                                <small>2026-04-13 上班卡 | 忘记打卡</small>
                            </div>
                            <div class="btn-outline">待处理</div>
                        </div>
                    </div>
                    <div class="view-all">查看全部 <i class="fas fa-arrow-right"></i></div>
                </div>

                <!-- 便捷操作 (快捷入口) -->
                <div class="dh-main-content-shortcuts">
                    <div class="shortcut-item">
                        <div class="shortcut-icon"><i class="fas fa-calendar-plus"></i></div>
                        <h4>考勤申请</h4>
                        <small>请假/加班/补卡</small>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-icon"><i class="fas fa-chart-pie"></i></div>
                        <h4>个人考勤记录</h4>
                        <small>日历/列表视图</small>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-icon"><i class="fas fa-building"></i></div>
                        <h4>部门考勤报表</h4>
                        <small>团队出勤率</small>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-icon"><i class="fas fa-users-gear"></i></div>
                        <h4>组织架构</h4>
                        <small>部门/岗位管理</small>
                    </div>
                </div>

                <!-- 月度考勤趋势 -->
                <div class="dh-main-content-trend card-panel">
                    <div class="card-header">
                        <h3><i class="fas fa-chart-column"></i> 月度考勤趋势</h3>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div class="trend-chart">
                        <div class="bar-item"
                            ><div
                                class="bar"
                                style="height: 60px"></div
                            ><span>W1</span></div
                        >
                        <div class="bar-item"
                            ><div
                                class="bar"
                                style="height: 78px; background: #40916c"></div
                            ><span>W2</span></div
                        >
                        <div class="bar-item"
                            ><div
                                class="bar"
                                style="height: 65px; background: #52b788"></div
                            ><span>W3</span></div
                        >
                        <div class="bar-item"
                            ><div
                                class="bar"
                                style="height: 82px; background: #74c69d"></div
                            ><span>W4</span></div
                        >
                    </div>
                    <div class="trend-summary">
                        <i class="fas fa-chart-simple"></i> 本月出勤率较上月提升2.1%，迟到次数降低5%
                    </div>
                </div>

                <!-- 系统公告 -->
                <div class="dh-main-content-notice card-panel">
                    <div class="card-header">
                        <h3><i class="fas fa-bullhorn"></i> 系统公告</h3>
                    </div>
                    <div class="notice-board">
                        <i class="fas fa-volume-up"></i>
                        <span>📢 关于清明节假期考勤调整：4月4日-6日放假，请提前安排好加班/补卡申请。</span>
                    </div>
                    <div class="notice-list">
                        <div class="notice-item">
                            <i class="far fa-file-alt"></i> 新版弹性工时规则已生效
                            <span>2026-04-01</span>
                        </div>
                        <div class="notice-item">
                            <i class="fas fa-map-marked-alt"></i> 打卡地点更新: 新增“勤致研发中心”GPS围栏
                            <span>2026-03-28</span>
                        </div>
                    </div>
                    <div class="view-all">查看全部公告 <i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file Home.vue
     * @author edocsitahw
     * @version 1.2
     * @date 2026/04/15
     * @desc 优化后的首页，具有响应式布局和现代化样式
     * @copyright CC BY-NC-SA
     * */
    import DgLogo from "@/components/DgLogo.vue";
    import { useUserStore } from "@/stores/user.store";
    import { computed } from "vue";

    const userStore = useUserStore();

    // 角色文本映射（示例，实际应从枚举或字典获取）
    const userRoleText = computed(() => {
        const roleMap: Record<string, string> = {
            admin: "系统管理员",
            manager: "部门主管",
            employee: "普通员工"
        };
        return roleMap[userStore.info.role] || userStore.info.role;
    });
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    // ========== 变量定义 ==========
    $primary-color: #2d6a4f
    $primary-light: #52b788
    $primary-lighter: #e9f5ef
    $bg-gray: #f5f7fb
    $text-dark: #1e293b
    $text-muted: #5b6e8c
    $border-light: #eef2f0
    $card-radius: 28px
    $shadow-sm: 0 8px 20px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.05)
    $shadow-md: 0 6px 14px rgba(0, 0, 0, 0.03)

    // ========== 混合宏：卡片样式 ==========
    @mixin card-style
        background: white
        border-radius: $card-radius
        border: 1px solid $border-light
        box-shadow: $shadow-sm
        transition: all 0.2s ease

    @mixin card-panel-style
        @include card-style
        padding: 24px

    // ========== 基础布局 ==========
    .dh
        width: 100%
        height: 100%
        display: flex
        overflow: hidden
        background: $bg-gray
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif

        @include mobile()
            flex-direction: column-reverse

        // ----- 侧边栏 / 移动端底部导航 -----
        &-side
            @include pc()
                flex: 0 0 280px
                display: flex
                flex-direction: column
                background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
                border-right: 1px solid $border-light
                overflow-y: auto

            @include mobile()
                width: 100%
                background: rgba(255, 255, 255, 0.96)
                backdrop-filter: blur(10px)
                border-top: 1px solid $border-light
                padding: 8px 0 12px

            &-logo
                display: flex
                align-items: center
                gap: 12px
                padding: 28px 24px
                border-bottom: 1px solid $border-light

                @include mobile()
                    display: none

                &-text
                    h2
                        font-size: 1.55rem
                        font-weight: 700
                        background: linear-gradient(135deg, #1f5e3f, $primary-color)
                        background-clip: text
                        -webkit-background-clip: text
                        color: transparent
                    p
                        font-size: 0.7rem
                        color: $text-muted

            &-menu
                flex: 1
                padding: 32px 16px

                @include pc()
                    display: flex
                    flex-direction: column
                    gap: 8px

                @include mobile()
                    display: flex
                    flex-direction: row
                    justify-content: space-around
                    padding: 0 12px

                &-item
                    display: flex
                    align-items: center
                    gap: 14px
                    padding: 12px 18px
                    border-radius: 16px
                    font-weight: 500
                    font-size: 0.95rem
                    color: $text-muted
                    transition: all 0.2s

                    @include mobile()
                        flex-direction: column
                        gap: 6px
                        padding: 8px 0
                        font-size: 0.7rem
                        flex: 1

                    i
                        width: 24px
                        font-size: 1.2rem

                        @include mobile()
                            font-size: 1.3rem
                            width: auto

                    span
                        @include mobile()
                            font-size: 0.7rem

                    &:hover
                        background: #f1f5f9
                        color: $primary-color

                    &.active
                        background: $primary-lighter
                        color: $primary-color
                        i
                            color: $primary-color

            &-user
                margin: 20px 16px 24px
                padding: 16px
                background: rgba(255, 255, 255, 0.9)
                backdrop-filter: blur(4px)
                border-radius: 24px
                border: 1px solid $border-light
                display: flex
                align-items: center
                gap: 12px

                @include mobile()
                    display: none

                &-avatar
                    width: 44px
                    height: 44px
                    background: $primary-lighter
                    border-radius: 28px
                    display: flex
                    align-items: center
                    justify-content: center
                    font-size: 1.5rem
                    color: $primary-color

                &-info
                    h4
                        font-size: 0.9rem
                        font-weight: 600
                    p
                        font-size: 0.7rem
                        color: $text-muted

        // ----- 主内容区 -----
        &-main
            flex: 1
            overflow-y: auto
            padding: 24px 32px 32px

            @include mobile()
                padding: 16px
                height: 100%
                -webkit-overflow-scrolling: touch
                scrollbar-width: none

            &::-webkit-scrollbar
                width: 5px
            &::-webkit-scrollbar-track
                background: #eef2ff
            &::-webkit-scrollbar-thumb
                background: #b9c7d9
                border-radius: 8px

            &-header
                margin-bottom: 28px
                h1
                    font-size: 1.8rem
                    font-weight: 600
                    color: #0f172a
                .breadcrumb
                    font-size: 0.85rem
                    color: $text-muted
                    margin-top: 6px

            &-content
                display: grid
                grid-template-columns: repeat(12, 1fr)
                gap: 24px

                // 统计卡片行
                &-stats
                    grid-column: 1 / -1
                    display: flex
                    gap: 24px
                    flex-wrap: wrap

                    @include mobile()
                        gap: 12px

                    .stat-card
                        flex: 1
                        @include card-style
                        padding: 20px 24px
                        min-width: 140px

                        .stat-title
                            font-size: 0.8rem
                            text-transform: uppercase
                            color: $text-muted
                            margin-bottom: 12px
                            i
                                margin-right: 4px
                        .stat-value
                            font-size: 1.8rem
                            font-weight: 700
                            color: $text-dark
                        .stat-sub
                            font-size: 0.7rem
                            color: $primary-color
                            margin-top: 8px

                // 打卡 & 待审批 双栏
                &-reviews, &-approval
                    @include pc()
                        grid-column: span 6
                    @include mobile()
                        grid-column: 1 / -1

                // 快捷入口行
                &-shortcuts
                    grid-column: 1 / -1
                    display: flex
                    gap: 20px
                    flex-wrap: wrap

                    .shortcut-item
                        flex: 1
                        @include card-style
                        padding: 20px 12px
                        text-align: center
                        cursor: default
                        transition: transform 0.1s
                        min-width: 120px

                        &:hover
                            transform: translateY(-2px)

                        .shortcut-icon
                            width: 52px
                            height: 52px
                            background: $primary-lighter
                            margin: 0 auto 14px
                            border-radius: 28px
                            display: flex
                            align-items: center
                            justify-content: center
                            font-size: 1.5rem
                            color: $primary-color
                        h4
                            font-size: 0.9rem
                            font-weight: 600
                            margin-bottom: 6px
                        small
                            font-size: 0.7rem
                            color: $text-muted

                // 趋势 & 公告 双栏
                &-trend, &-notice
                    @include pc()
                        grid-column: span 6
                    @include mobile()
                        grid-column: 1 / -1

        // 卡片通用样式（用于内部面板）
        .card-panel
            @include card-panel-style

            .card-header
                display: flex
                justify-content: space-between
                align-items: center
                margin-bottom: 20px
                border-bottom: 1px solid #f0f2f5
                padding-bottom: 12px
                h3
                    font-weight: 600
                    font-size: 1.2rem

            .badge-gps, .badge-pending
                background: #ffedd5
                color: #b45309
                padding: 4px 12px
                border-radius: 40px
                font-size: 0.7rem
                font-weight: 600

            .badge-gps
                background: $primary-lighter
                color: $primary-color

        // 打卡区域样式
        .clock-area
            background: #fefaf5
            border-radius: 24px
            padding: 16px
            margin-top: 8px
            border: 1px solid #ffe6cc

            .location-info
                display: flex
                gap: 12px
                background: #ffffffcc
                padding: 12px
                border-radius: 20px
                margin-bottom: 20px
                i
                    font-size: 1.4rem
                    color: $primary-color
                .distance-valid
                    font-size: 0.7rem
                    color: $primary-color

            .clock-btn
                background: $primary-color
                border: none
                width: 100%
                padding: 14px
                border-radius: 60px
                font-weight: 700
                font-size: 1rem
                color: white
                display: flex
                align-items: center
                justify-content: center
                gap: 10px
                cursor: default
                box-shadow: 0 6px 14px rgba(45, 106, 79, 0.25)

            .clock-hint
                font-size: 0.7rem
                text-align: center
                margin-top: 14px
                color: $text-muted

        .reminder-tip
            margin-top: 18px
            background: #f1f5f9
            border-radius: 20px
            padding: 12px
            font-size: 0.8rem
            i
                color: $primary-color
                margin-right: 6px

        // 待审批列表样式
        .approval-list
            .approval-item
                display: flex
                justify-content: space-between
                align-items: center
                padding: 14px 0
                border-bottom: 1px solid #f0f2f5
                .approval-info p
                    font-weight: 500
                .approval-info small
                    font-size: 0.7rem
                    color: #7c8ba0
                .btn-outline
                    border: 1px solid #cbd5e1
                    background: white
                    border-radius: 40px
                    padding: 6px 14px
                    font-size: 0.7rem
                    font-weight: 500
                    cursor: default
        .view-all
            text-align: right
            margin-top: 16px
            font-size: 0.75rem
            color: $primary-color
            cursor: default

        // 趋势图样式
        .trend-chart
            display: flex
            justify-content: space-around
            align-items: flex-end
            margin: 20px 0
            .bar-item
                text-align: center
                .bar
                    width: 36px
                    background: $primary-color
                    border-radius: 20px
                    margin: 0 auto 8px
                span
                    font-size: 0.7rem
                    color: $text-muted
        .trend-summary
            background: #f8f9fa
            border-radius: 20px
            padding: 12px
            font-size: 0.8rem
            i
                margin-right: 6px
                color: $primary-color

        // 公告样式
        .notice-board
            background: #fefaf5
            border-left: 4px solid $primary-color
            border-radius: 20px
            padding: 14px
            margin-bottom: 16px
            font-size: 0.8rem
            display: flex
            gap: 10px
            align-items: center
        .notice-list
            .notice-item
                display: flex
                justify-content: space-between
                padding: 10px 0
                font-size: 0.75rem
                border-bottom: 1px solid #f0f2f5
                i
                    margin-right: 8px
                    color: $primary-color
</style>
