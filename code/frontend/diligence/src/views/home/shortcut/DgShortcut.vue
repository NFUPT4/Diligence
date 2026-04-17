<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div class="dg-home-shortcut dhs">
        <div class="dhs-icon">
            <slot name="icon" />
        </div>

        <h4 class="dhs-title">
            <slot name="title" />
        </h4>

        <small class="dhs-desc">
            <slot name="desc" />
        </small>
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgShortcut.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/17 10:41
     * @desc
     * @copyright CC BY-NC-SA
     * */
</script>

<style lang="sass" scoped>

    .dhs
        flex: 1
        padding: 20px 12px
        text-align: center
        cursor: default
        transition: transform 0.1s
        min-width: 120px

        & :deep()

        &:hover
            transform: translateY(-2px)

        &-icon
            width: 52px
            height: 52px
            background: var(--primary-lighter)
            margin: 0 auto 14px
            border-radius: 28px
            display: flex
            align-items: center
            justify-content: center
            font-size: 1.5rem
            color: var(--primary-color)

        &-title
            font-size: 0.9rem
            font-weight: 600
            margin-bottom: 6px

        &-desc
            font-size: 0.7rem
            color: var(--text-muted)
</style>
