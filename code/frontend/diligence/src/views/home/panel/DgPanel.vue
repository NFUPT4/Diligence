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
            <slot name="title" />

            <slot name="badge" />
        </div>

        <slot />
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgPanel.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:30
     * @desc
     * @copyright CC BY-NC-SA
     * */
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    .dp
        padding: 24px
        background: white
        border-radius: var(--card-radius)
        border: 1px solid var(--border-light)
        box-shadow: var(--shadow-sm)
        transition: all 0.2s ease

        @include pc()
            grid-column: span 6
        @include mobile()
            grid-column: 1 / -1

        &-header
            display: flex
            justify-content: space-between
            align-items: center
            margin-bottom: 20px
            border-bottom: 1px solid #f0f2f5
            padding-bottom: 12px
</style>
