<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div
        class="dg-float-input dfi"
        :class="{ 'has-value': hasValue }">
        <el-input
            :model-value="modelValue"
            v-bind="$attrs"
            @update:model-value="updateValue"
            @focus="focused = true"
            @blur="focused = false" />

        <label
            class="dfi-label"
            @click="focusInput"
            >{{ label }}</label
        >
    </div>
</template>

<script lang="ts" setup>
    /**
     * @file DgFloatInput.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/13 19:31
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import { computed, ref, getCurrentInstance } from "vue";

    const props = defineProps({
        label: { type: String, required: true },
        modelValue: { type: [String, Number], default: "" }
    });

    const emit = defineEmits(["update:modelValue"]);

    // 是否有内容（控制浮动标签的“有值”状态）
    const hasValue = computed(() => !!props.modelValue);
    const focused = ref(false);

    const updateValue = (val: unknown) => {
        emit("update:modelValue", val);
    };

    // 点击标签时聚焦内部的 input（提升用户体验）
    const instance = getCurrentInstance();
    const focusInput = () => {
        const inputEl = instance?.vnode?.el?.querySelector("input");

        if (inputEl) inputEl.focus();
    };
</script>

<style lang="sass" scoped>
    .dfi
        position: relative

        & :deep(.el-input__wrapper)
            padding-top: 18px
            padding-bottom: 4px
            transition: all 0.2s

        & :deep(.el-textarea__inner)
            padding-top: 22px
            padding-bottom: 8px

        &-label
            position: absolute
            left: 12px
            top: 50%
            transform: translateY(-50%)
            font-size: 14px
            color: #909399
            padding: 0 4px
            transition: 0.2s ease
            pointer-events: none
            background-color: transparent
            z-index: 1

        & :focus-within &-label, &.has-value &-label
            top: 0
            transform: translateY(-50%) scale(0.85)
            color: #409eff
            background-color: #fff
            pointer-events: auto

        & :deep(.el-form-item.is-error) & &-label
            color: #f56c6c
</style>
