<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-panel class="dg-home-notice dhn">
        <template #title>
            <h3><i class="fas fa-bullhorn"></i> {{ $t(LOCAL("title")) }}</h3>
        </template>

        <template #default>
            <!-- 通知列表 -->
            <div
                v-if="notices?.length"
                class="dhn-list">
                <div
                    v-for="notice in notices"
                    :key="notice.id"
                    class="dhn-list-item">
                    <i class="far fa-file-alt" />

                    {{ notice.title }}

                    <span class="dhn-list-item-time">{{ notice.publishTime }}</span>
                </div>
            </div>

            <!-- 空列表 -->
            <div
                v-else
                class="dhn-empty">
                {{ $t(LOCAL("empty")) }}
            </div>
        </template>
    </dg-panel>
</template>

<script lang="ts" setup>
    /**
     * @file DgNotice.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/17 13:19
     * @desc 主页通知面板组件
     * @copyright CC BY-NC-SA
     * */
    import DgPanel from "@/views/home/panel/DgPanel.vue";
    import { useAsyncState } from "@vueuse/core";
    import { homeApi } from "@/api";

    /* state */
    const LOCAL = (key: string, type: string = "template") => `home.notice.${type}.${key}`;
    const { state: notices } = useAsyncState(homeApi.getNotices, null, { immediate: true });
</script>

<style lang="sass" scoped>

    .dhn
        &-empty
            text-align: center
            color: var(--text-muted)
            padding: 20px

        &-list
            display: flex
            flex-direction: column
            gap: 12px

            &-item
                padding-bottom: 10px
                border-bottom: 1px solid var(--notice-border)

                &:first-child
                    padding-top: 0

                &:last-child
                    padding-bottom: 0
                    border-bottom: none

                &-time
                    float: right
                    font-size: 0.7rem
</style>
