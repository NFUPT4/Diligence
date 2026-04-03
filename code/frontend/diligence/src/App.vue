<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<script lang="ts">
/**
 * @file App.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 12:51
 * @description
 * */
import { defineComponent } from 'vue';
import router from '@/router/router';

onload = () => {
  {
    router.push('/')
  }
}

export default defineComponent({
  name: 'App',
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="sass"></style>
