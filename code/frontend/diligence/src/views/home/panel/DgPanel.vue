<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div class="dg-panel dp">
        <div class="dp-header">

            <!-- 标题 -->
            <slot name="title" />

            <!-- 角标 -->
            <slot name="badge" />
        </div>

        <!-- 内容 -->
        <slot />
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgPanel.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:30
     * @desc 主页大卡片框架
     * @copyright CC BY-NC-SA
     * */
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    .dp
        @include pc()
            grid-column: span 6
        @include mobile()
            grid-column: 1 / -1

        & :slotted([class*="title"])  // 下传title
            font-weight: 600
            font-size: 1.2rem

        & :slotted([class*="badge"])  // 下传badge
            background: var(--badge-bg)
            color: var(--badge-text)
            padding: 4px 12px
            border-radius: 40px
            font-size: 0.7rem
            font-weight: 600

        &-header
            display: flex
            justify-content: space-between
            align-items: center
            margin-bottom: 20px
            border-bottom: 1px solid #f0f2f5
            padding-bottom: 12px

        & :deep()
            //
</style>
