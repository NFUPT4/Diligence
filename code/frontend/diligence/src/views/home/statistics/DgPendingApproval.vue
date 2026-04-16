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

            <i style="margin-right: 4px" class="fas fa-tasks" />

            {{ $t("home.pending-approval.template.title") }}

        </template>

        <template #value>

            {{}}

        </template>

        <template #sub>

            {{ $t("home.pending-approval.template.sub") }}

        </template>

    </dg-state-card>

</template>

<script lang="ts">
    /**
     * @file DgPendingApproval.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:20
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import { defineComponent } from "vue";
    import DgStateCard from "@/views/home/statistics/DgStateCard.vue";


    export default defineComponent({
        components: { DgStateCard }
    })

</script>

<style lang="sass" scoped></style>
