<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-panel class="dg-home-reviews dhr">
        <template #title>
            <h3 class="dhr-title">
                <i
                    class="fas fa-location-dot"
                    style="color: #2d6a4f" />
                {{ $t(LOCAL("title")) }}
            </h3>
        </template>

        <template #badge>
            <span class="dhr-badge">
                <i class="fas fa-shield-alt" />
                {{ $t(LOCAL("badge")) }}
            </span>
        </template>

        <template #default>
            <!-- 打卡区域 -->
            <div
                class="dhr-clock"
                v-if="recentClock">
                <!-- 地址信息 -->
                <div class="dhr-clock-location">
                    <i
                        class="fas fa-map-marker-alt"
                        style="font-size: 1.3rem; color: var(--primary-color)" />

                    <div class="dhr-clock-location-info">
                        <strong style="margin: 0">{{ $t(LOCAL("current-location")) }}</strong>

                        <br />

                        <span style="font-size: 0.85rem">{{ address || $t(LOCAL("loading")) }}</span>

                        <div>{{}}</div>
                    </div>
                </div>

                <!-- 打卡按钮 -->
                <button class="dhr-clock-btn">
                    <i class="fas fa-fingerprint" /> {{ $t(LOCAL("clock-immediately")) }}

                    <i18n-t
                        v-if="recentClock?.name"
                        :keypath="LOCAL('clock-name')"
                        tag="span">
                        <template #name> · {{ recentClock.name }} </template>
                    </i18n-t>
                </button>

                <!-- 打卡信息 -->
                <div class="dhr-clock-info">
                    <i class="far fa-clock" />

                    <i18n-t
                        :keypath="LOCAL('clock-period')"
                        tag="span">
                        <template #start>
                            {{ recentClock?.startTime?.toTimeString().slice(0, 5) || "" }}
                        </template>

                        <template #end>
                            {{ recentClock?.endTime?.toTimeString().slice(0, 5) || "" }}
                        </template>
                    </i18n-t>
                </div>
            </div>

            <!-- 错过打卡 -->
            <i18n-t class="dhr-empty" v-else-if="checkInStat.miss" :keypath="LOCAL('miss-task')" tag="div">

                <template #count>

                    {{ checkInStat.miss }}

                </template>

            </i18n-t>

            <!-- 无打卡信息 -->
            <div class="dhr-empty" v-else>
                {{ $t(LOCAL(checkInStat.total ? "finish" : "no-task")) }}
            </div>
        </template>
    </dg-panel>
</template>

<script lang="ts" setup>
    /**
     * @file DgReviews.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:41
     * @desc 主页打卡组件
     * @copyright CC BY-NC-SA
     * */
    import DgPanel from "@/views/home/panel/DgPanel.vue";
    import { useCoordStore } from "@/stores/coord.store";
    import { useClockStore } from "@/stores/clock.store";
    import { useAsyncState } from "@vueuse/core";
    import { storeToRefs } from "pinia";

    /* state */
    const coordStore = useCoordStore();
    const { recentClock, checkInStat } = storeToRefs(useClockStore());
    const LOCAL = (key: string, type: string = "template") => `home.reviews.${type}.${key}`;

    const { state: address } = useAsyncState(
        async () => {
            // 获取当前经纬度
            const position = await new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );

            const { latitude, longitude } = position.coords;

            // 通过高度获取逆地理编码
            return await coordStore.getAddress(longitude, latitude);
        },
        null,
        { immediate: true }
    );
</script>

<style lang="sass" scoped>

    @mixin note-background
        background: var(--clock-bg)
        border-radius: 24px
        padding: 16px
        margin-top: 8px
        border: 1px solid var(--clock-border)

    .dhr
        &-clock
            text-align: center
            margin: 20px 0

            &-time
                font-size: 3rem
                font-weight: 700
                color: var(--text-dark)

            &-location
                margin-top: 8px
                color: var(--text-muted)
                i
                    margin-right: 4px

        &-btn
            width: 100%
            margin: 16px 0
            height: 48px
            font-size: 1.2rem

        &-tip
            margin-top: 18px
            background: #f1f5f9
            border-radius: 20px
            padding: 12px
            font-size: 0.8rem
            &-icon
                color: var(--primary-color)
                margin-right: 6px

        &-clock
            @include note-background

            &-location
                display: flex
                gap: 12px
                align-items: center
                background: var(--clock-location-bg)
                padding: 12px
                border-radius: 20px
                margin-bottom: 20px
                color: var(--text-dark)

                &-info
                    text-align: start

            &-btn
                background: var(--primary-color)
                border: none
                width: 100%
                padding: 16px
                border-radius: 60px
                font-weight: 700
                font-size: 1.1rem
                color: white
                display: flex
                align-items: center
                justify-content: center
                gap: 12px
                cursor: pointer
                transition: all 0.2s
                box-shadow: 0 6px 14px var(--primary-dark)

            &-info
                font-size: 0.7rem
                text-align: center
                margin-top: 14px
                color: var(--text-muted)

        &-empty
            @include note-background

            font-size: 1.2rem
            text-align: center
</style>
