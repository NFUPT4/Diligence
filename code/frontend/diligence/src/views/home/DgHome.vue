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
        <!-- 导航栏 -->
        <aside class="dh-side">
            <!-- 侧边栏logo -->
            <div class="dh-side-logo">
                <dg-logo :options="{ size: 50, opacity: 1 }" />

                <div class="dh-side-logo-text">
                    <h2
                        style="margin: 0; white-space: nowrap"
                        class="dh-side-logo-text-name"
                        >{{ $t("common.name") }}</h2
                    >

                    <p
                        style="margin: 0; white-space: nowrap"
                        class="dh-side-logo-text-brief"
                        >{{ $t("common.brief") }}</p
                    >
                </div>
            </div>

            <!-- 侧边栏菜单 -->
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
                    class="dh-side-menu-item">
                    <i
                        :class="item.icon"
                        class="dh-side-menu-item-icon" /><span class="dh-side-menu-item-name">{{ item.name }}</span>
                </router-link>
            </div>

            <!-- 侧边栏用户信息 -->
            <div class="dh-side-user">
                <div class="dh-side-user-avatar">
                    <i class="fas fa-user-circle" />
                </div>

                <div class="dh-side-user-info">
                    <h4
                        class="dh-side-user-info-name"
                        style="margin: 0; white-space: nowrap"
                        >{{ userStore.info.name }} · {{ userStore.info.deptName }}</h4
                    >

                    <!-- TODO: 将角色枚举值映射到角色名称 -->
                    <p
                        class="dh-side-user-info-role"
                        style="margin: 0; white-space: nowrap"
                        >{{ userStore.info.role }}</p
                    >
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

                <el-breadcrumb separator="/"> </el-breadcrumb>
            </header>

            <!-- grid内容 -->
            <div class="dh-main-content">
                <!-- 统计卡组 -->
                <div class="dh-main-content-stats">
                    <!-- 今日打卡状态 -->
                    <dg-attendance-status />

                    <!-- 本月考勤率 -->
                    <dg-attendance-rate />

                    <!-- 待处理审批 -->
                    <dg-pending-approval />
                </div>

                <!-- 打卡功能 -->
                <dg-reviews />

                <!-- 待审批申请 -->
                <div class="dh-main-content-approval"></div>

                <!-- 便捷操作 -->
                <div class="dh-main-content-shortcuts">
                    <!-- 考勤申请 -->
                    <div class="dh-main-content-shortcuts-attendance"> </div>

                    <!-- 个人考勤记录 -->
                    <div class="dh-main-content-shortcuts-records"> </div>

                    <!-- 部门考勤报表 -->
                    <div class="dh-main-content-shortcuts-report"></div>

                    <!-- 组织架构 -->
                    <div class="dh-main-content-shortcuts-organization"></div>
                </div>

                <!-- 月度考勤趋势 -->
                <div class="dh-main-content-trend"></div>

                <!-- 系统公告 -->
                <div class="dh-main-content-notice"></div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file Home.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/03 12:51
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import DgLogo from "@/components/DgLogo.vue";
    import { useUserStore } from "@/stores/user.store.ts";
    import DgAttendanceStatus from "@/views/home/statistics/DgAttendanceStatus.vue";
    import DgAttendanceRate from "@/views/home/statistics/DgAttendanceRate.vue";
    import DgPendingApproval from "@/views/home/statistics/DgPendingApproval.vue";
    import DgReviews from "@/views/home/panel/DgReviews.vue";

    const userStore = useUserStore();
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    @mixin card-style()
        background: white
        border-radius: var(--card-radius)
        border: 1px solid var(--border-light)
        box-shadow: var(--shadow-sm)
        transition: all 0.2s ease


    .dh
        width: 100%
        height: 100%
        display: flex
        overflow: hidden
        background: var(--bg-gray)
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
            border-right: 1px solid var(--border-light)
            overflow-y: auto

            @include mobile()
                width: 100%
                background: rgba(255, 255, 255, 0.96)
                backdrop-filter: blur(10px)
                border-top: 1px solid var(--border-light)
                padding: 8px 0 12px

            @include mobile()
                width: 100%
                padding: 20px 0

            // 侧边栏头部logo（移动段不显示）
            &-logo
                display: flex
                align-items: center
                gap: 12px
                padding: 28px 24px
                border-bottom: 1px solid var(--border-light)

                @include mobile()
                    display: none

                &-text
                    &-name
                        font-size: 1.55rem
                        font-weight: 700
                        background: linear-gradient(135deg, #1f5e3f, var(--primary-color))
                        background-clip: text
                        -webkit-background-clip: text
                        color: transparent
                    &-brief
                        font-size: 0.7rem
                        color: var(--text-muted)

            // 侧边栏菜单
            &-menu
                flex: 1
                padding: 32px 16px
                display: flex

                @include pc()
                    flex-direction: column
                    gap: 8px

                @include mobile()
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
                    color: var(--text-muted)
                    transition: all 0.2s

                    @include mobile()
                        flex-direction: column
                        gap: 6px
                        padding: 8px 0
                        font-size: 0.7rem
                        flex: 1

                    &-icon
                        width: 24px
                        font-size: 1.2rem

                        @include mobile()
                            font-size: 1.3rem
                            width: auto

                    &-name
                        @include mobile()
                            font-size: 0.7rem

                    &:hover
                        background: #f1f5f9
                        color: var(--primary-color)

                    &.active
                        background: var(--primary-lighter)
                        color: var(--primary-color)

                        i
                            color: var(--primary-color)

            &-user
                margin: 20px 16px 24px
                padding: 16px
                background: rgba(255, 255, 255, 0.9)
                backdrop-filter: blur(4px)
                border-radius: 24px
                border: 1px solid var(--border-light)
                display: flex
                align-items: center
                gap: 12px

                @include mobile()
                    display: none

                &-avatar
                    width: 44px
                    height: 44px
                    background: var(--primary-lighter)
                    border-radius: 28px
                    display: flex
                    align-items: center
                    justify-content: center
                    font-size: 1.5rem
                    color: var(--primary-color)

                &-info
                    &-name
                        font-size: 0.9rem
                        font-weight: 600
                    &-role
                        font-size: 0.7rem
                        color: var(--text-muted)

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

                .breadcrumb  // TODO
                    font-size: 0.85rem
                    color: var(--text-muted)
                    margin-top: 6px

            &-content
                display: grid
                grid-template-columns: repeat(12, 1fr)
                gap: 24px

                &-stats
                    grid-column: 1 / -1
                    display: flex
                    gap: 24px
                    flex-wrap: wrap

                    @include mobile()
                        gap: 12px

                    .stat-card
                        flex: 1
                        padding: 20px 24px
                        min-width: 140px
                        @include card-style()

                        &-title
                            font-size: 0.8rem
                            text-transform: uppercase
                            color: var(--text-muted)
                            margin-bottom: 12px

                        &-value
                            font-size: 1.8rem
                            font-weight: 700
                            color: var(--text-dark)

                        &-sub
                            font-size: 0.7rem
                            color: var(--primary-color)
                            margin-top: 8px

                &-reviews, &-approval
                    @include pc()
                        grid-column: span 6

                    @include mobile()
                        grid-column: 1 / -1

                &-shortcuts
                    grid-row: span 1
                    grid-column: 1 / -1
                    display: flex
                    flex-direction: row
                    align-items: center
                    gap: 20px

                &-trend
                    grid-row: span 2

                    @include pc()
                        grid-column: span 6

                    @include mobile()
                        grid-column: 1 / -1

                &-notice
                    grid-row: span 2

                    @include pc()
                        grid-column: span 6

                    @include mobile()
                        grid-column: 1 / -1
</style>
