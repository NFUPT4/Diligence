<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-state-card>
        <template #title>
            <i
                style="margin-right: 4px"
                class="fas fa-tasks" />
            {{ $t(LOCAL('title')) }}
        </template>

        <template #value>
            {{ pendingCount?.count ?? "--" }}
        </template>

        <template #sub>
            <i18n-t
                :keypath="LOCAL('sub')"
                tag="span">
                <template #count>
                    {{ pendingCount?.count ?? 0 }}
                </template>
            </i18n-t>
        </template>
    </dg-state-card>
</template>

<script lang="ts" setup>
    /**
     * @file DgPendingApproval.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:20
     * @desc 主页审批申请组件
     * @copyright CC BY-NC-SA
     * */
    import DgStateCard from "@/views/home/statistics/DgStateCard.vue";
    import { useAsyncState } from "@vueuse/core";
    import { homeApi } from "@/api";

    /* state */
    const { state: pendingCount } = useAsyncState(homeApi.getPendingApprovalCount, null, { immediate: true });
    const LOCAL = (key: string, type: string = "template") => `home.pending-approval.${type}.${key}`;

</script>

<style lang="sass" scoped></style>
