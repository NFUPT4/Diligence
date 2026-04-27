<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div class="dg-clock dc">
        <main class="dc-main">
            <!-- 返回主页 -->
            <router-link
                class="dc-main-back"
                to="/">
                <i class="fas fa-arrow-left" />

                <i18n-t
                    keypath="common.back-to"
                    tag="span">
                    <template #name>
                        {{ $t("common.link.home") }}
                    </template>
                </i18n-t>
            </router-link>

            <!-- 实时信息 -->
            <div class="dc-main-realtime">
                <!-- 时间 -->
                <div class="dc-main-realtime-time">
                    {{ timeInfo.hours }}:{{ timeInfo.minutes }}:{{ timeInfo.seconds }}
                </div>

                <!-- 日期 -->
                <div class="dc-main-realtime-date">
                    {{ timeInfo.year }}{{ $t("common.year") }}{{ timeInfo.month }}{{ $t("common.month")
                    }}{{ timeInfo.day }}
                    {{ $t("common.day-ri") }}
                </div>
            </div>

            <!-- 有即将到来或截止的打卡 -->
            <template v-if="recentClock">
                <!-- 位置信息 -->
                <div class="dc-main-location">
                    <div class="dc-main-location-title">
                        <i
                            class="fas fa-location-dot"
                            style="color: var(--primary-color); font-size: 1.6rem" />

                        <h3 style="font-size: 1rem; font-weight: 600">{{ $t(LOCAL("location-pos")) }}</h3>
                    </div>

                    <!-- 位置信息 -->
                    <div class="dc-main-location-info">
                        <template v-if="isLoading">
                            <i class="fas fa-spinner fa-pulse" /> {{ $t(LOCAL("loading-pos")) }}
                        </template>

                        <template v-else-if="error || !position">
                            {{ error }}
                        </template>

                        <template v-else>
                            <i class="fas fa-map-pin" />

                            {{ $t("common.longitude") }} {{ position.coords.longitude.toFixed(6) }}

                            {{ $t("common.latitude") }} {{ position.coords.latitude.toFixed(6) }}
                        </template>
                    </div>

                    <!-- 距离信息 -->
                    <i18n-t
                        class="dc-main-location-destance"
                        :keypath="LOCAL('distance')"
                        tag="div">
                        <template #distance>{{ distance?.toFixed(2) || "---" }}</template>

                        <template #range>{{ location?.radius.toFixed(2) || "---" }}</template>
                    </i18n-t>
                </div>

                <!-- 打卡按钮 -->
                <button
                    class="dc-main-btn"
                    @click="handleClock">
                    <i class="fas fa-fingerprint" />

                    <i18n-t
                        :keypath="LOCAL('clock-in')"
                        tag="span">
                        <template #name>
                            {{ recentClock?.name || "" }}
                        </template>
                    </i18n-t>
                </button>
            </template>

            <!-- 无打卡信息 -->
            <div
                v-else
                class="dc-main-noclock">
                {{ $t(LOCAL(checkInStat.total ? "finish" : "no-clock")) }}
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgClock.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/27 09:56
     * @desc 打卡页面
     * @copyright CC BY-NC-SA
     * */
    import { ref, computed, watch, onMounted, onUnmounted } from "vue";
    import useClockStore from "@/stores/clock.store";
    import { attendanceApi, clockApi } from "@/api";
    import { useAsyncState } from "@vueuse/core";
    import { Nullable } from "@/types/common";
    import { storeToRefs } from "pinia";
    import { haversine } from "@/utils";

    // TODO: 1. 在距离信息下方添加错误指南信息，2. 打卡按钮禁用逻辑，3. 今日打卡记录（以替代错过打卡）

    /* state */

    const LOCAL = (key: string, type: string = "template") => `clock.${type}.${key}`;

    const now = ref<Date>(new Date());
    let interval: Nullable<number> = null;

    const { recentClock, checkInStat } = storeToRefs(useClockStore());

    const {
        state: position,
        isLoading,
        error
    } = useAsyncState(
        () => {
            return new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
        },
        null,
        { immediate: true }
    );

    const { state: location, execute } = useAsyncState(
        async () => (recentClock.value ? attendanceApi.getLocation(recentClock.value.locationId) : null),
        null,
        { immediate: true }
    );

    /* computed */

    const timeInfo = computed(() => ({
        year: now.value.getFullYear(),
        month: (now.value.getMonth() + 1).toString().padStart(2, "0"),
        day: now.value.getDate().toString().padStart(2, "0"),
        hours: now.value.getHours().toString().padStart(2, "0"),
        minutes: now.value.getMinutes().toString().padStart(2, "0"),
        seconds: now.value.getSeconds().toString().padStart(2, "0")
    }));

    const distance = computed<Nullable<number>>(() => {
        if (position.value && location.value)
            return haversine(
                position.value.coords.longitude,
                position.value.coords.latitude,
                location.value.longitude,
                location.value.latitude
            );

        return null;
    });

    /* methods */

    const updateTime = () => {
        now.value = new Date();
    };

    const handleClock = () => {
        if (!position.value || !recentClock.value) return;

        // TODO: 传回bool并弹出
        clockApi.clockIn({
            longitude: position.value.coords.longitude,
            latitude: position.value.coords.latitude,
            locationId: recentClock.value?.locationId,
            time: now.value.toISOString()
        });
    };

    /* watch */

    watch(() => recentClock.value?.locationId, execute);

    /* onMounted */

    onMounted(() => {
        updateTime();

        interval = window.setInterval(updateTime, 1000);
    });

    /* onUnmounted */

    onUnmounted(() => {
        if (interval !== null) {
            clearInterval(interval);

            interval = null;
        }
    });
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    .dc
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        background: linear-gradient(145deg, #eef2f5 0%, #e2e8f0 100%)
        font-family: 'Inter', sans-serif
        color: #1e293b

        &-main
            background: rgba(255, 255, 255, 0.98)
            backdrop-filter: blur(4px)
            border-radius: 48px
            padding: 32px 28px 40px
            transition: all 0.2s
            max-width: 500px
            width: 100%
            margin: 0 auto

            +pc()
                box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0,0,0,0.02)
                border: 1px solid rgba(255,255,255,0.6)

            +mobile()
                height: 100%
                padding: 0 28px

            &-back
                display: inline-flex
                align-items: center
                gap: 8px
                color: var(--text-muted)
                text-decoration: none
                font-size: 0.85rem
                margin-bottom: 20px
                cursor: pointer

                +mobile()
                    margin-top: 20px

                &:hover
                    color: var(--primary-color)

            &-realtime
                text-align: center
                margin-bottom: 28px

                +mobile()
                    height: 40%
                    display: flex
                    flex-direction: column
                    justify-content: center

                &-time
                    font-size: 3.2rem
                    font-weight: 700
                    letter-spacing: 2px
                    color: var(--time-text-color)
                    font-family: monospace

                &-date
                    font-size: 0.9rem
                    color: var(--date-date-color)
                    margin-top: 6px

            &-location
                background: var(--location-bg)
                border-radius: 36px
                padding: 20px
                margin-bottom: 28px
                border: 1px solid var(--location-border)

                &-title
                    display: flex
                    align-items: center
                    gap: 12px
                    margin-bottom: 12px

                &-info
                    font-size: 0.85rem
                    color: var(--location-info-color)
                    line-height: 1.4
                    margin-bottom: 12px
                    word-break: break-word

                &-destance
                    font-size: 0.7rem
                    background: var(--location-dest-bg)
                    display: inline-block
                    padding: 4px 12px
                    border-radius: 40px
                    color: var(--primary-color)

            &-btn
                background: var(--primary-color)
                border: none
                width: 100%
                padding: 18px
                border-radius: 60px
                font-weight: 700
                font-size: 1.2rem
                color: white
                display: flex
                align-items: center
                justify-content: center
                gap: 12px
                cursor: pointer
                transition: all 0.2s
                box-shadow: 0 8px 20px rgba(45, 106, 79, 0.3)
                margin-bottom: 20px

                &:active
                    transform: scale(0.98)

                &:disabled
                    background: var(--disabled-color)
                    cursor: not-allowed
                    box-shadow: none
</style>
