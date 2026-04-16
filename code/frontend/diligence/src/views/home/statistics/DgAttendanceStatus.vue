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
                style="margin-right: 4px;"
                class="far fa-calendar-check" />

            {{ $t("home.attendance-status.template.title") }}
        </template>

        <template #value>
            {{ $t("home.attendance-status.template.value") }}
        </template>

        <template #sub>
            {{ $t("home.attendance-status.template.start-work") }}
        </template>
    </dg-state-card>
</template>

<script lang="ts">
    /**
     * @file DgAttendanceStatus.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 19:17
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import DgStateCard from "@/views/home/statistics/DgStateCard.vue";
    import { defineComponent } from "vue";

    export default defineComponent({
        components: { DgStateCard }
    });
</script>

<style lang="sass" scoped></style>
