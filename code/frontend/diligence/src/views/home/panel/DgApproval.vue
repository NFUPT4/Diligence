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
            <h3 class="dha-title">
                <i
                    class="fas fa-clipboard-list"
                    style="color: #2d6a4f" />
                {{ $t(LOCAL("title")) }}
            </h3>
        </template>

        <template #badge>
            <span class="dha-badge">
                <i18n-t
                    :keypath="LOCAL('badge')"
                    tag="span">
                    <template #count>
                        {{ approvalList?.length ?? 0 }}
                    </template>
                </i18n-t>
            </span>
        </template>

        <template #default>
            <!-- 申请列表 -->
            <div
                v-if="approvalList?.length"
                class="dha-list">
                <div
                    v-for="item in approvalList"
                    :key="item.appId"
                    class="dha-list-item">
                    <div class="dha-list-item-info">
                        <p class="dha-list-item-info-brief">{{ item.applicantName }} · {{ item.appType }}</p>
                        <small class="dha-list-item-info-desc">{{ item.createTime }}</small>
                    </div>
                    <div class="dha-list-item-btn">
                        {{ $t(LOCAL("approve")) }}
                    </div>
                </div>
            </div>

            <!-- 空列表 -->
            <div
                v-else
                class="dha-empty">
                {{ $t(LOCAL("empty")) }}
            </div>

            <!-- 加载更多 -->
            <!-- TODO: 判断是否需要显示加载更多 -->
            <div style="margin-top: 16px; text-align: right">
                <span style="font-size: 0.75rem; color: var(--primary-color)"
                    >查看全部 <i class="fas fa-arrow-right"></i
                ></span>
            </div>
        </template>
    </dg-panel>
</template>

<script lang="ts" setup>
    /**
     * @file DgApproval.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 22:40
     * @desc 主页待审批面板
     * @todo 提供非管理人员提交的申请的审批情况
     * @copyright CC BY-NC-SA
     * */
    import DgPanel from "@/views/home/panel/DgPanel.vue";
    import { useAsyncState } from "@vueuse/core";
    import { homeApi } from "@/api/home";

    /* state */
    const LOCAL = (key: string, type: string = "template") => `home.approval.${type}.${key}`;
    const { state: approvalList } = useAsyncState(homeApi.getPendingApprovalList, null, { immediate: true });
</script>

<style lang="sass" scoped>

    .dha
        &-empty
            text-align: center
            color: var(--text-muted)
            padding: 20px

        &-list
            display: flex
            flex-direction: column
            gap: 12px

            &-item
                display: flex
                justify-content: space-between
                align-items: center
                padding: 14px 0
                border-bottom: 1px solid #f0f2f5

                &:first-child
                    padding-top: 0

                &:last-child
                    border-bottom: none
                    padding-bottom: 0

                &-info-brief
                    font-weight: 500
                    margin: 0

                &-info-desc
                    color: var(--text-muted)
                    font-size: 0.7rem

                &-btn
                    border: 1px solid var(--btn-border)
                    background: white
                    border-radius: 40px
                    padding: 6px 14px
                    font-size: 0.7rem
                    font-weight: 500
                    cursor: default
</style>
