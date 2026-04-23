/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18nInstance } from "@/locales/i18n";

import App from './App.vue';
import router from './router/router';

import "element-plus/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

createApp(App).use(createPinia()).use(await createI18nInstance()).use(router).mount('#app')
