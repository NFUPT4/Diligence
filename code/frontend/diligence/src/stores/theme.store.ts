/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file themeStore.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/01/19 20:17
 * @desc 样式主题相关的状态管理
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { DG_THEME_KEY } from "@/utils/constant";
import { defineStore } from "pinia";


/**
 * 主题状态管理存储
 * @class useThemeStore
 * @description 管理应用程序的主题状态，支持切换主题并保存到localStorage
 */
export const useThemeStore = defineStore("theme", {
    state() {
        return {
            theme: localStorage.getItem(DG_THEME_KEY) || "light"
        };
    },

    actions: {
        /**
         * 设置主题
         * @method set
         * @description 切换应用程序主题，应用到DOM并保存到localStorage
         * @param theme - 主题名称
         */
        set(theme: string) {
            this.theme = theme;

            this.apply(theme);

            localStorage.setItem(DG_THEME_KEY, theme);
        },

        apply(theme: string) {
            document.documentElement.setAttribute("data-theme", theme);
            document.documentElement.className = `${theme}-theme`;
        },

        init() {
            this.set(this.theme);
        }
    }
});
