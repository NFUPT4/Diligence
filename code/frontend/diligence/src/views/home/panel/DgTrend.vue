<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-panel class="dg-home-trend dht">
        <template #title>
            <h3 class="dht-title">
                <i class="fas fa-chart-column" />
                {{ $t(LOCAL("title")) }}
            </h3>
        </template>

        <template #badge>
            <i class="fas fa-ellipsis-h" />
        </template>

        <template #default>
            <div
                ref="chartRef"
                class="dht-chart"></div>
            <div class="dht-summary">
                <i class="fas fa-chart-simple"></i>
                {{ $t(LOCAL("summary")) }}
            </div>
        </template>
    </dg-panel>
</template>

<script lang="ts" setup>
    /**
     * @file DgTrend.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/17 11:31
     * @desc 主页考勤趋势组件
     * @copyright CC BY-NC-SA
     * */
    import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
    import { LabelLayout, LegacyGridContainLabel } from "echarts/features";
    import DgPanel from "@/views/home/panel/DgPanel.vue";
    import { CanvasRenderer } from "echarts/renderers";
    import { LineChart } from "echarts/charts";
    import * as echarts from "echarts/core";
    import { ref, onUnmounted } from "vue";
    import { homeApi } from "@/api";

    echarts.use([
        LegacyGridContainLabel,
        TooltipComponent,
        LegendComponent,
        CanvasRenderer,
        GridComponent,
        LabelLayout,
        LineChart,
    ]);

    /* state */

    // 图表容器引用
    const LOCAL = (key: string, type: string = "template") => `home.trend.${type}.${key}`;
    const chartRef = ref<HTMLElement>();
    let resizeHandler: () => void;

    homeApi.getMonthlyTrend().then(res => {
        if (chartRef.value) {
            const chart = echarts.init(chartRef.value, null, {
                width: chartRef.value.clientWidth + "px",
                height: chartRef.value.clientHeight + "px"
            });

            chart.setOption({
                grid: {
                    left: "5%", // 距离左侧边距（可调小）
                    right: "5%", // 距离右侧边距
                    bottom: 20, // 距离底部边距
                    top: 20, // 距离顶部边距（像素或百分比）
                    containLabel: true // 防止坐标轴标签被裁剪
                },
                xAxis: {
                    type: "category",
                    data: res.dates
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: res.rates,
                        type: "line",
                        smooth: true
                    }
                ]
            });

            resizeHandler = () => {
                if (chartRef.value)
                    chart.resize({ width: chartRef.value.clientWidth, height: chartRef.value.clientHeight });
            };

            window.addEventListener("resize", resizeHandler);
        }
    });

    onUnmounted(() => {
        window.removeEventListener("resize", resizeHandler);
    });
</script>

<style lang="sass" scoped>

    .dht
        &-chart
            width: 100%
            height: 200px

        &-summary
            margin-top: 10px
            color: var(--text-muted)
            font-size: 0.8rem
            i
                margin-right: 6px
</style>
