<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <div class="da dg-auth">
        <div class="da-main">
            <div class="da-main-left">
                <el-form
                    :model="formRawInfo"
                    label-width="auto"
                    class="da-main-left-form"
                    :rules="rules"
                    ref="formRef"
                    @submit.prevent="handleSubmit">
                    <h2>用户登录</h2>

                    <el-form-item prop="empNo">
                        <el-input
                            placeholder="请输入工号"
                            v-model="formRawInfo.empNo" />
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            placeholder="请输入密码"
                            show-password
                            v-model="formRawInfo.password" />
                    </el-form-item>

                    <el-form-item>
                        <el-checkbox-group v-model="formRawInfo.remember">
                            <el-checkbox label="remember">下次自动登录</el-checkbox>
                        </el-checkbox-group>
                        <el-button
                            type="text"
                            @click="loginMethod = loginMethod === 'empNo' ? 'qrcode' : 'empNo'">
                            {{ loginMethod === "qrcode" ? "账号密码登录" : "APP扫码登录" }}
                        </el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="handleSubmit(formRef)"
                            >登录</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>

            <!-- 分割线 -->
            <div class="da-main-devider"> <span class="da-main-devider-text">账号登录</span></div>

            <div class="da-main-right">
                <div
                    class="da-main-right-banner"
                    v-if="loginMethod === 'empNo'">
                    <img
                        src="/logo.png"
                        alt="logo"
                        class="da-main-right-logo" />

                    <h1>“致勤”-企业考勤系统</h1>
                </div>
                <div
                    class="da-main-right-qrcode"
                    v-else>
                    <img
                        :src="qrcode"
                        alt="qrcode" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    /**
     *
     * @file DgAuth.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/03 16:20
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import { ref, reactive, computed } from "vue";
    import type { Ref, Reactive } from "vue";
    import DgFloatInput from "@/components/DgFloatInput.vue";
    import { hash } from "@/utils";
    import { useAuthStore } from "@/stores/auth.store";
    import { Nullable, Optional } from "@/types/common";
    import { ElMessage } from "element-plus";
    import { useQRCode } from "@vueuse/integrations/useQRCode";
    import router from "@/router/router";

    /* state */
    const formRawInfo: Reactive<{
        empNo: string;
        password: string;
        remember: string[];
    }> = reactive({
        remember: [],
        empNo: "",
        password: ""
    });

    const formRef: Ref<Nullable<HTMLFormElement>> = ref(null);
    const loginMethod: Ref<"empNo" | "qrcode"> = ref("empNo");

    const qrcode = useQRCode(
        computed(() => window.location.href),
        {
            width: 300
        }
    );

    const authStore = useAuthStore();

    /* computed */
    const rules = computed(() => ({
        empNo: [
            { required: true, message: "请输入工号", trigger: "blur" },
            { validator: validateEmpNo, trigger: "blur" }
        ],
        password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { validator: validatePassword, trigger: "blur" }
        ]
    }));

    /* methods */
    const handleSubmit = async (formElem: Optional<Nullable<HTMLFormElement>>) => {
        if ((authStore.remember && authStore.authenticated) || authStore.authenticated)
            await router.push("/");

        if (!formElem) return;

        formElem.validate(async (valid: boolean) => {
            if (valid)
                await authStore
                    .login({
                        empNo: formRawInfo.empNo,
                        passwordHash: await hash(formRawInfo.password),
                        remember: formRawInfo.remember.length > 0
                    })
                    .then(() => router.push("/"))
                    .catch(() => ElMessage({ message: "登录失败，请检查账号或密码", type: "error" }));
        });
    };

    const validateEmpNo = (rule: never, value: string, callback: (error?: Error) => void) => {
        if (!value) callback(new Error("请输入工号"));
        else if (!/^[a-zA-Z0-9]+$/.test(value)) callback(new Error("工号只能包含字母和数字"));
        else callback();
    };

    const validatePassword = (rule: never, value: string, callback: (error?: Error) => void) => {
        if (!value) callback(new Error("请输入密码"));
        else if (value.length < 6) callback(new Error("密码长度不能少于6位"));
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) callback(new Error("密码至少包含大小写字母和数字"));
        else callback();
    };
</script>

<style lang="sass">
    @use "@/style/global" as *

    .da
        height: 100%
        width: 100%
        display: flex
        justify-content: center
        align-items: center

        &-main
            display: flex
            background-color: #d3cfcf

            @include pc()  // PC
                width: 50%
                height: 70%
                flex-direction: row
                border-radius: 20px
                justify-content: space-between

            @include mobile()  // 移动端
                width: 100%
                height: 100%
                flex-direction: column-reverse

            &-left
                display: flex
                justify-content: center
                align-items: center

                @include pc()
                    flex: 4

                @include mobile()
                    flex: 5

                &-form
                    display: flex
                    flex-direction: column
                    align-items: flex-start

                    @include pc()
                        width: 70%
                        height: 70%

                    @include mobile()
                        width: 90%
                        height: 90%

            // 分割线
            &-devider
                position: relative
                display: flex
                background-color: inherit

                @include pc()  // PC
                    height: 100%
                    justify-content: center
                    align-items: center
                    width: 2px

                @include mobile()  // 移动端
                    width: 100%
                    justify-content: center
                    align-items: center
                    height: 2px

                &-text
                    position: relative
                    z-index: 2
                    background-color: inherit

                &:before
                    content: ""
                    position: absolute
                    background-color: #333
                    transform: translateX(-50%)
                    z-index: 1

                    @include pc()
                        height: 90%
                        width: 1px
                        left: 50%
                        top: 5%
                        bottom: 0

                    @include mobile()
                        width: 90%
                        height: 1px
                        left: 50%
                        top: 50%
                        right: 0

            &-right
                transition: all 0.3s ease-in-out

                &-banner, &-qrcode
                    display: flex
                    flex-direction: column
                    justify-content: center
                    align-items: center

                    height: 100%
                    width: 100%

                @include pc()
                    flex: 3

                @include mobile()
                    flex: 2

                &-logo
                    aspect-ratio: 1/1

                    @include pc()
                        width: 15%

                    @include mobile()
                        width: 20%
</style>
