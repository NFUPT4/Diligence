<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-panel class="dg-home-approval dha">
        <template #title>
            <h3 class="dha-title"
                ><i
                    class="fas fa-clipboard-list"
                    style="color: #2d6a4f"></i>
                {{ $t("home.approval.template.title") }}</h3
            >
        </template>

        <template #badge>
            <span class="dha-badge">{{}} {{ $t('home.approval.template.badge') }}</span>
        </template>

        <template #default>



        </template>

    </dg-panel>
</template>

<script lang="ts" setup>
    /**
     * @file DgApproval.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 22:40
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import DgPanel from "@/views/home/panel/DgPanel.vue";
</script>

<style lang="sass" scoped>


</style>
