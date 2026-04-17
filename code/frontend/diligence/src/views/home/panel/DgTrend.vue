<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>

    <dg-panel class="dg-home-trend dht">

        <template #title>
            <h3 class="dht-title"><i class="fas fa-chart-column" />{{ $t("home.trend.template.title") }}</h3>
        </template>

        <template #badge>
            <i class="fas fa-ellipsis-h" />
        </template>

        <template #default>
            <div class="dht-summary">
                <i class="fas fa-chart-simple"></i> {{}}
            </div>
        </template>

    </dg-panel>

</template>

<script lang="ts" setup>
    /**
     * @file DgTrend.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/17 11:31
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import DgPanel from "@/views/home/panel/DgPanel.vue";
</script>

<style lang="sass" scoped>

</style>
