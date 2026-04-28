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
            <dg-home-user-info
                class="dh-side-userinfo"
                :logout="logout" />
        </aside>

        <!-- 主体内容 -->
        <main class="dh-main">
            <header class="dh-main-header">
                <div class="dh-main-header-left">
                    <h1 class="dh-main-header-left-title">{{ $t("common.name") }}</h1>

                    <i18n-t
                        keypath="home.template.welcome"
                        tag="h1"
                        class="dh-main-header-left-subtitle">
                        <template #username>
                            {{ userInfo.name }}
                        </template>
                    </i18n-t>

                    <el-breadcrumb
                        class="dh-main-header-left-breadcrumb"
                        separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">
                            <i class="fas fa-home" />
                            {{ $t("common.link.home") }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

                <div class="dh-main-header-right">
                    <dg-home-user-info
                        @click="openDrawer = true"
                        class="dh-main-header-right-userinfo" />
                </div>
            </header>

            <!-- grid内容 -->
            <div class="dh-main-content">
                <!-- 统计卡组 -->
                <div class="dh-main-content-stats">
                    <!-- 今日打卡状态 -->
                    <dg-attendance-status class="dh-main-content-stats-item" />

                    <!-- 本月考勤率 -->
                    <dg-attendance-rate class="dh-main-content-stats-item" />

                    <!-- 待处理审批 -->
                    <dg-pending-approval class="dh-main-content-stats-item" />
                </div>

                <!-- 打卡功能 -->
                <dg-reviews class="dh-main-content-panel" />

                <!-- 待审批申请 -->
                <dg-approval class="dh-main-content-panel" />

                <!-- 便捷操作 -->
                <div class="dh-main-content-shortcuts">
                    <!-- 考勤申请 -->
                    <dg-shortcut-approval class="dh-main-content-shortcuts-item" />

                    <!-- 个人考勤记录 -->
                    <dg-shortcut-record class="dh-main-content-shortcuts-item" />

                    <!-- 部门考勤报表 -->
                    <dg-shortcut-charts class="dh-main-content-shortcuts-item" />

                    <!-- 组织架构 -->
                    <dg-shortcut-orgnization class="dh-main-content-shortcuts-item" />
                </div>

                <!-- 月度考勤趋势 -->
                <dg-trend class="dh-main-content-panel" />

                <!-- 系统公告 -->
                <dg-notice class="dh-main-content-panel" />
            </div>
        </main>

        <!-- 底部抽屉（移动端登出） -->
        <el-drawer
            v-model="openDrawer"
            direction="btt"
            :with-header="false">
            <div class="dh-drawer">
                <dg-home-user-info class="dh-drawer-userinfo" />

                <el-divider />

                <div class="dh-drawer-btns">
                    <el-button
                        type="danger"
                        round
                        size="large"
                        @click="logout">
                        {{ $t("common.logout") }}
                        <i class="fas fa-sign-out-alt" />
                    </el-button>

                    <el-button
                        type="info"
                        round
                        size="large"
                        @click="openDrawer = false">
                        {{ $t("common.cancel") }}
                        <i class="fas fa-times" />
                    </el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file Home.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/03 12:51
     * @desc 主页
     * @copyright CC BY-NC-SA
     * */
    import DgShortcutOrgnization from "@/views/home/shortcut/DgShortcutOrganization.vue";
    import DgAttendanceStatus from "@/views/home/statistics/DgAttendanceStatus.vue";
    import DgPendingApproval from "@/views/home/statistics/DgPendingApproval.vue";
    import DgShortcutApproval from "@/views/home/shortcut/DgShortcutApproval.vue";
    import DgAttendanceRate from "@/views/home/statistics/DgAttendanceRate.vue";
    import DgShortcutRecord from "@/views/home/shortcut/DgShortcutRecord.vue";
    import DgShortcutCharts from "@/views/home/shortcut/DgShortcutCharts.vue";
    import DgHomeUserInfo from "@/views/home/DgHomeUserInfo.vue";
    import DgApproval from "@/views/home/panel/DgApproval.vue";
    import DgReviews from "@/views/home/panel/DgReviews.vue";
    import DgNotice from "@/views/home/panel/DgNotice.vue";
    import DgTrend from "@/views/home/panel/DgTrend.vue";
    import DgLogo from "@/components/DgLogo.vue";

    import useAuthStore from "@/stores/auth.store";
    import useUserStore from "@/stores/user.store";
    import { storeToRefs } from "pinia";
    import router from "@/router/router";
    import { ref } from "vue";

    /* state */
    const { userInfo } = storeToRefs(useUserStore());

    const authStore = useAuthStore();

    // 抽屉状态
    const openDrawer = ref(false);

    /* methods */

    // 登出
    const logout = () => {
        authStore.logout();

        router.push("/auth");
    };
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    @mixin card-style
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
                            font-weight: 500
                            font-size: 0.95rem

                    &:hover
                        background: #f1f5f9
                        color: var(--primary-color)

                    &.active
                        background: var(--primary-lighter)
                        color: var(--primary-color)

                        i
                            color: var(--primary-color)

            &-userinfo
                @include mobile()
                    display: none

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
                display: flex
                justify-content: space-between

                &-left

                    @mixin title-style
                        font-size: 1.8rem
                        font-weight: 600
                        color: #0f172a

                    &-title
                        @include pc()
                            display: none

                        @include mobile()
                            @include title-style

                            color: var(--primary-color)

                    &-subtitle
                        @include pc()
                            @include title-style

                        @include mobile()
                            font-size: 0.8rem
                            color: #5b6e8c
                            margin-top: 4px

                    &-breadcrumb
                        font-size: 0.85rem
                        color: var(--text-muted)
                        margin-top: 6px

                        @include mobile()
                            display: none

                &-right
                    @include pc()
                        display: none

            &-content
                display: grid
                grid-template-columns: repeat(12, 1fr)
                gap: 24px

                // 小卡片
                &-stats, &-shortcuts
                    grid-column: 1 / -1
                    display: flex
                    flex-wrap: wrap

                    &-item :deep()
                        @include card-style()

                &-stats
                    gap: 24px

                    @include mobile()
                        gap: 12px

                &-shortcuts
                    gap: 20px

                // 大卡片
                &-panel :deep()
                    @include card-style()
                    padding: 24px

                &-reviews, &-approval, &-trend, &-notice
                    @include pc()
                        grid-column: span 6

                    @include mobile()
                        grid-column: 1 / -1

        &-drawer
            height: 100%
            display: flex
            flex-direction: column

            &-userinfo
                :deep([class*="info"])
                    display: block

            &-btns
                flex: 1
                display: flex
                flex-direction: column
                justify-content: space-around
                align-items: center

                :deep(.el-button)
                    width: 100%
                    margin-left: 0
</style>
