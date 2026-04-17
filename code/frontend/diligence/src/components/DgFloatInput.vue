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
        :class="{ 'has-error': error }">
        <!-- 错误状态 -->

        <label
            :for="id"
            class="dfi-label"
            >{{ label }}</label
        >

        <input
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            @focus="handleFocus"
            @blur="handleBlur"
            class="dfi-input"
            :class="{ 'has-value': hasValue, 'is-focused': isFocused }"
            :autocomplete="autocomplete" />

        <div
            v-if="icon"
            class="dfi-icon">
            <i :class="icon"></i>
        </div>

        <div
            v-if="error"
            class="dfi-error"
            >{{ errorMessage }}</div
        >
    </div>
</template>

<script lang="ts">
    /**
     * @file DgFloatInput.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/13 19:31
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import { defineComponent, ref, computed } from "vue";

    export default defineComponent({
        name: "DgFloatInput",
        props: {
            // 属性
            id: { type: String, required: true },
            type: {
                type: String,
                default: "text",
                validator: (value: string) => ["text", "password", "email", "tel", "number"].includes(value)
            },
            label: { type: String, required: true },
            placeholder: { type: String, required: true },
            // v-model
            modelValue: { type: String, default: "" },
            // 状态
            error: { type: Boolean, default: false },
            errorMessage: { type: String, default: "" },
            // 图标
            icon: { type: String, default: "" },
            // 自动完成
            autocomplete: { type: String, default: "off" }
        },
        emits: ["update:modelValue", "focus", "blur"],
        setup(props, { emit }) {
            // state
            const isFocused = ref(false);

            // computed
            const hasValue = computed(() => props.modelValue.length > 0);

            // methods
            const handleFocus = (event: FocusEvent) => {
                isFocused.value = true;
                emit("focus", event);
            };

            const handleBlur = (event: FocusEvent) => {
                isFocused.value = false;
                emit("blur", event);
            };

            return {
                isFocused,
                hasValue,
                handleFocus,
                handleBlur
            };
        }
    });
</script>

<style lang="sass" scoped>

    .dfi
        position: relative
        margin-bottom: 30px
        width: 100%

        &.has-error
            .dfi-input
                border-color: #FF9A76FF

                &:focus
                    border-color: #FF9A76FF
                    box-shadow: 0 0 0 2px rgba(#FF9A76FF, 0.3)

            .dfi-label
                color: #FF9A76FF


            .dfi-icon
                color: #FF9A76FF

        &-label
            position: absolute
            left: 20px
            top: 50%
            transform: translateY(-50%)
            color: #FFFFFF99
            font-size: 16px
            pointer-events: none
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            font-family: "Inter", "Noto Sans SC", sans-serif

        &-input
            width: 100%
            padding: 20px 20px 10px
            background: #1f1f1f
            border: 1px solid #333
            border-radius: 12px
            color: #fff
            font-size: 16px
            font-family: "Inter", "Noto Sans SC", sans-serif
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            outline: none

            &::placeholder
                color: transparent

            &:focus
                border-color: #679cec
                box-shadow: 0 0 0 2px rgba(103, 156, 236, 0.3)
                background: rgba(255, 255, 255, 0.08)

            &.has-value, &.is-focused
                & + .dfi-label
                    top: 12px
                    font-size: 12px
                    color: #679cec

            &[type="password"]
                font-family: Verdana, sans-serif
                letter-spacing: 0.1em

        &-icon
            position: absolute
            right: 20px
            top: 50%
            transform: translateY(-50%)
            color: #FFFFFF99
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)

            i
                font-size: 16px


            .dfi-input:focus ~ &
                color: #679cec

        &-error
            position: absolute
            bottom: -25px
            left: 0
            color: #FF9A76FF
            font-size: 13px
            opacity: 0
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)

            .dfi.has-error &
                opacity: 1
</style>
