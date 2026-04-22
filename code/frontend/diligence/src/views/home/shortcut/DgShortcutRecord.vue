<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>

    <dg-shortcut>

        <template #icon>

            <i class="fas fa-chart-pie" />

        </template>

        <template #title>

            {{ $t('home.shortcut-record.template.title') }}

        </template>

        <template #desc>

            {{ $t('home.shortcut-record.template.desc') }}

        </template>

    </dg-shortcut>

</template>

<script lang="ts" setup>
    /**
     * @file DgShortcutRecord.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/17 11:04
     * @desc 主页部门考勤快捷入口组件
     * @copyright CC BY-NC-SA
     * */
    import DgShortcut from "@/views/home/shortcut/DgShortcut.vue";
</script>

<style lang="sass" scoped></style>
