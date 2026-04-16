<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div class="dg-logo">
        <img
            src="/logo.png"
            alt="logo"
            :style="style" />
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgLogo.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/14 22:11
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import { ref, reactive, computed, watch } from "vue";
    import type { Ref, Reactive, PropType } from "vue";

    /* props */

    const props = defineProps({
        options: Object as PropType<
            { size: number | string; opacity: number } | { width: number | string; height: number | string }
        >
    });

    /* computed */

    const style = computed(() => {
        if (props.options)
            if ("size" in props.options)
                return {
                    width: process(props.options.size),
                    height: process(props.options.size),
                    opacity: props.options.opacity
                };
            else return { width: process(props.options.width), height: process(props.options.height) };

        return { width: "100px", height: "100px" };
    });

    /* methods */

    const process = (val: number | string): string => {
        if (typeof val === "number") return val + "px";

        return val;
    };
</script>

<style lang="sass" scoped></style>
