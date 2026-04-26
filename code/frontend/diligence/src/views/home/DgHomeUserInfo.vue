<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div
        class="dg-home-userinfo dhu"
        @click="emits('click')">
        <div class="dhu-avatar">
            <i class="fas fa-user-circle" />
        </div>

        <div class="dhu-info">
            <h4
                class="dh-side-user-info-name"
                style="margin: 0; white-space: nowrap"
                >{{ userInfo.name }} · {{ userInfo.deptName }}</h4
            >

            <p
                class="dh-side-user-info-role"
                style="margin: 0; white-space: nowrap"
                >{{ $t(`enum.role.${userInfo.role}`) }}</p
            >
        </div>

        <div class="dhu-logout">
            <el-button
                circle
                @mouseover="isMouseover = true"
                @mouseout="isMouseover = false"
                @click.stop="props.logout ? props.logout() : null">
                <template #icon>
                    <i class="fas fa-sign-out-alt" />
                </template>
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgHomeUserInfo.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/26 19:17
     * @desc 主页用户信息组件
     * @copyright CC BY-NC-SA
     * */
    import { ref, defineProps, defineEmits, type PropType } from "vue";
    import useUserStore from "@/stores/user.store";
    import { storeToRefs } from "pinia";

    /* emit */

    const emits = defineEmits(["click"]);

    /* props */

    const props = defineProps({
        logout: { type: Function as PropType<() => void> }
    });

    /* state */

    const { userInfo } = storeToRefs(useUserStore());

    // 是否鼠标悬停
    const isMouseover = ref(false);
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    .dhu

        background: rgba(255, 255, 255, 0.9)
        backdrop-filter: blur(4px)
        border-radius: 24px
        border: 1px solid var(--border-light)
        display: flex
        align-items: center
        gap: 12px

        @include pc()
            margin: 20px 16px 24px
            padding: 16px

        @include mobile()
            background: transparent
            border: none

        &-logout
            width: 0
            overflow: hidden
            transition: width 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)
            display: flex
            align-items: center
            justify-content: center
            flex-shrink: 0

            :deep(.el-button)
                transform: scale(0)
                opacity: 0
                transition: transform 0.25s ease, opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease
                color: var(--text-muted)
                border-color: transparent
                width: 32px
                height: 32px
                padding: 0
                margin: 0

                &:hover
                    color: var(--btn-danger) !important
                    background-color: var(--btn-danger-bg) !important

            @include mobile()
                display: none

        &:hover
            .dhu-logout
                width: 44px

                :deep(.el-button)
                    transform: scale(1)
                    opacity: 1

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

            @include mobile()
                display: none
</style>
