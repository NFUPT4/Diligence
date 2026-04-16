<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-panel class="dg-home-reviews">
        <template #title>
            <h3 class="dhr-title"
                ><i
                    class="fas fa-location-dot"
                    style="color: #2d6a4f" />{{ $t("home.reviews.template.title") }}</h3
            >
        </template>

        <template #badge>
            <span class="dhr-badge"><i class="fas fa-shield-alt" />{{ $t("home.reviews.template.badge") }}</span>
        </template>

        <template #default>
            <div class="dhr-clock">
                <!-- TODO: 带实现 -->
                <div class="dhr-clock-location"> </div>
            </div>

            <div class="dhr-tip"> <i class="fas fa-info-circle dhr-tip-icon" /> {{}} </div>
        </template>
    </dg-panel>
</template>

<script lang="ts">
    /**
     * @file DgReviews.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:41
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import { defineComponent } from "vue";
    import DgPanel from "@/views/home/panel/DgPanel.vue";

    export default defineComponent({
        components: { DgPanel }
    });
</script>

<style lang="sass" scoped>

    .dhr
        &-title
            font-weight: 600
            font-size: 1.2rem

        &-badge
            background: #ffedd5
            color: #b45309
            padding: 4px 12px
            border-radius: 40px
            font-size: 0.7rem
            font-weight: 600

        &-tip
            margin-top: 18px
            background: #f1f5f9
            border-radius: 20px
            padding: 12px
            font-size: 0.8rem

            &-icon
                color: var(--primary-color)
                margin-right: 6px
</style>
