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
            <template v-if="recentClock && distance && location">
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
                        <template v-if="loading">
                            <i class="fas fa-spinner fa-pulse" /> {{ $t(LOCAL("loading-pos")) }}
                        </template>

                        <template v-else-if="error || !position || errorMsgKey">
                            <i class="fas fa-exclamation-triangle" />{{ $t(LOCAL(errorMsgKey || "location-failed")) }}
                        </template>

                        <template v-else>
                            <i class="fas fa-map-pin" />

                            {{ address }}
                        </template>
                    </div>

                    <!-- 距离信息 -->
                    <i18n-t
                        class="dc-main-location-distance"
                        :class="{ invaild: !distanceValid }"
                        :keypath="LOCAL('distance')"
                        tag="div">
                        <template #distance>{{ distance?.toFixed(2) || "---" }}</template>

                        <template #range>{{ location?.radius.toFixed(2) || "---" }}</template>
                    </i18n-t>

                    <!-- 错误指南 -->
                    <div
                        class="dc-main-location-guide"
                        :class="{ invaild: !distanceValid }">
                        {{
                            $t(
                                LOCAL(
                                    distance && location
                                        ? distanceValid
                                            ? "pos-valid"
                                            : "pos-invalid"
                                        : errorMsgKey
                                          ? "request-permission"
                                          : "location-failed"
                                )
                            )
                        }}
                    </div>
                </div>

                <!-- 打卡按钮 -->
                <button
                    class="dc-main-btn"
                    :disabled="distanceValid || true"
                    @click="handleClock">
                    <i class="fas fa-fingerprint" />

                    <i18n-t
                        :keypath="LOCAL(distanceValid ? 'clock-in' : 'clock-disabled')"
                        tag="span">
                        <template #name>
                            {{ recentClock?.name || "" }}
                        </template>
                    </i18n-t>
                </button>

                <!-- 今日打卡记录 -->
                <div
                    class="dc-main-status"
                    v-if="todayStatus?.status">
                    <div><i class="far fa-calendar-check" /> {{ $t(LOCAL("today-records")) }}</div>
                    <div class="dc-main-status-list">
                        <div
                            class="dc-main-status-item"
                            v-for="(task, index) of todayStatus.status"
                            :key="index">
                            <i
                                class="dc-main-status-item-dot"
                                :class="{
                                    [task.state ? 'sucess' : task.startTime && task.startTime > now ? 'wait' : 'miss']:
                                        true
                                }" />

                            {{ task.name || formatClockTime(task) }}
                        </div>
                    </div>
                </div>
            </template>

            <!-- 加载中 -->
            <div v-else-if="todayStatusLoading || !checkInStat">
                <i class="fas fa-spinner fa-pulse" /> {{ $t(LOCAL("loading-data")) }}
            </div>

            <!-- 无打卡信息 -->
            <div
                v-else
                class="dc-main-noclock">
                {{ $t(LOCAL(checkInStat.total ? "finish" : "no-task")) }}
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
    import type { Nullable, TodayStatusItem } from "@/types/common";
    import useClockStore from "@/stores/clock.store";
    import useCoordStore from "@/stores/coord.store";
    import { attendanceApi, clockApi } from "@/api";
    import { useAsyncState } from "@vueuse/core";
    import { ElMessage } from "element-plus";
    import { storeToRefs } from "pinia";
    import { haversine } from "@/utils";
    import { useI18n } from "vue-i18n";

    /* state */

    const LOCAL = (key: string, type: string = "template") => `clock.${type}.${key}`;

    const { t } = useI18n();
    const now = ref<Date>(new Date());
    let interval: Nullable<number> = null;
    const coordStore = useCoordStore();

    // 错误信息键
    const errorMsgKey = ref<Nullable<string>>(null);

    const { recentClock, checkInStat, todayStatusLoading, todayStatus } = storeToRefs(useClockStore());

    // 坐标信息
    const {
        state: position,
        isLoading: positionLoading,
        error
    } = useAsyncState(
        () => {
            return new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            ).catch(e => {
                switch (e.code) {
                    case 1:
                        errorMsgKey.value = "user-refused";
                        break;
                    case 2:
                        errorMsgKey.value = "position-unavailable";
                        break;
                    case 3:
                        errorMsgKey.value = "location-timeout";
                        break;
                    default:
                        errorMsgKey.value = "location-failed";
                        break;
                }
            });
        },
        null,
        { immediate: true }
    );

    // 打卡应在地点信息
    const {
        state: location,
        isLoading: locationLoading,
        execute: locationExecute
    } = useAsyncState(
        async () => (recentClock.value ? attendanceApi.getLocation(recentClock.value.locationId) : null),
        null,
        { immediate: true }
    );

    // 当前地址信息
    const {
        state: address,
        isLoading: addressLoading,
        execute: addressExecute
    } = useAsyncState(
        async () => {
            if (!position.value) return null;

            // 通过高度获取逆地理编码
            return await coordStore.getAddress(position.value.coords.longitude, position.value.coords.latitude);
        },
        null,
        { immediate: true }
    );

    /* computed */

    // 当前时间信息
    const timeInfo = computed(() => processTime(now.value));

    // 当前位置与打卡位置的距离
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

    // 距离是否有效且合理
    const distanceValid = computed(() => distance.value && location.value && distance.value <= location.value.radius);

    // 地址相关部分是否在加载
    const loading = computed(() => positionLoading.value || locationLoading.value || addressLoading.value);

    /* methods */

    // 更新时间
    const updateTime = () => {
        now.value = new Date();
    };

    // 打卡
    const handleClock = () => {
        if (!position.value || !recentClock.value) return;

        clockApi
            .checkIn({
                longitude: position.value.coords.longitude,
                latitude: position.value.coords.latitude,
                locationId: recentClock.value?.locationId,
                time: now.value.toISOString()
            })
            .then(resp =>
                resp ? ElMessage.success(t(LOCAL("success", "script"))) : ElMessage.error(t("failed", "script"))
            )
            .catch(e => ElMessage.error(e.message));
    };

    // 处理时间
    const processTime = (date: Date) => ({
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        day: date.getDate().toString().padStart(2, "0"),
        hours: date.getHours().toString().padStart(2, "0"),
        minutes: date.getMinutes().toString().padStart(2, "0"),
        seconds: date.getSeconds().toString().padStart(2, "0")
    });

    // 格式化打卡时间
    const formatClockTime = (clockInfo: TodayStatusItem) => {
        const time = processTime((clockInfo.startTime || clockInfo.endTime)!);

        return `${time.hours}:${time.minutes}`;
    };

    /* watch */

    watch(
        () => recentClock.value?.locationId,
        () => locationExecute()
    );

    watch(
        () => position.value?.coords,
        () => addressExecute()
    );

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
            padding: 32px 28px 40px
            transition: all 0.2s
            max-width: 500px
            width: 100%
            margin: 0 auto

            +pc()
                box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0,0,0,0.02)
                border: 1px solid rgba(255,255,255,0.6)
                border-radius: 48px

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

                &-distance
                    font-size: 0.7rem
                    background: var(--location-dest-bg)
                    display: inline-block
                    padding: 4px 12px
                    border-radius: 40px
                    color: var(--primary-color)

                    &.invaild
                        background: var(--location-dest-err-bg)
                        color: var(--location-dest-err-color)

                &-guide
                    margin-top: 12px
                    font-size: 0.7rem
                    color: var(--primary-color)

                    &.invaild
                        color: var(--location-dest-err-color)

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
                    background: var(--clock-btn-disabled-color)
                    cursor: not-allowed
                    box-shadow: none

            &-status
                background: var(--clock-status-bg)
                border-radius: 28px
                padding: 16px
                font-size: 0.8rem
                display: flex
                justify-content: space-between
                align-items: center
                flex-wrap: wrap
                gap: 10px
                overflow-x: hidden

                &-list
                    overflow-x: auto

                &-item
                    &-dot
                        width: 10px
                        height: 10px
                        border-radius: 10px
                        display: inline-block
                        margin-right: 6px

                        &.sucess
                            background: var(--primary-color)
                        &.wait
                            background: var(--clock-status-wait)
                        &.miss
                            background: var(--clock-status-miss)
</style>
