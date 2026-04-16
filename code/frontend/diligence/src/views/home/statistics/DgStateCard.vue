<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div class="dg-state-card dsc">
        <div class="dsc-title">
            <slot name="title" />
        </div>

        <div class="dsc-value">
            <slot name="value" />
        </div>

        <div class="dsc-sub">
            <slot name="sub" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgStateCard.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 19:23
     * @desc
     * @copyright CC BY-NC-SA
     * */
</script>

<style lang="sass" scoped>

    .dsc
        flex: 1
        padding: 20px 24px
        min-width: 140px
        background: white
        border-radius: var(--card-radius)
        border: 1px solid var(--border-light)
        box-shadow: var(--shadow-sm)
        transition: all 0.2s ease

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
</style>
