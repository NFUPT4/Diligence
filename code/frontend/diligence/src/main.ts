/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

import { createPinia, type PiniaPluginContext } from "pinia";
import { createI18nInstance } from "@/locales/i18n";
import { createApp } from 'vue';

import App from './App.vue';
import router from './router/router';
import useEventStore from "@/stores/event.store";
import useSizeStore from "@/stores/size.store";

import "element-plus/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const pinia = createPinia();

pinia.use(function ({ store }: PiniaPluginContext) {
    if (store.$id === "event") {
        const eventStore = store as ReturnType<typeof useEventStore>;

        eventStore.init(() => {
            useSizeStore().init();
        });
    }
});

createApp(App).use(pinia).use(await createI18nInstance()).use(router).mount('#app')
