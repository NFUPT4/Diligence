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
            <!-- 表单 -->
            <div class="da-main-left">
                <div class="da-main-left-container">
                    <h2 class="da-main-left-title">{{ $t(LOCAL("user-login")) }}</h2>
                </div>

                <el-form
                    :model="formRawInfo"
                    label-width="auto"
                    class="da-main-left-form"
                    :rules="rules"
                    ref="formRef"
                    label-position="left"
                    @submit.prevent="handleSubmit">
                    <!-- 工号 -->
                    <el-form-item
                        prop="empNo"
                        label="工号">
                        <el-input
                            :placeholder="$t(LOCAL('input-emp'))"
                            v-model="formRawInfo.empNo" />
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item
                        prop="password"
                        label="密码">
                        <el-input
                            type="password"
                            :placeholder="$t(LOCAL('input-pwd'))"
                            show-password
                            v-model="formRawInfo.password" />
                    </el-form-item>

                    <!-- 附加选项 -->
                    <el-form-item style="width: 100%">
                        <div style="display: flex; width: 100%; justify-content: space-between">
                            <!-- 记住登录 -->
                            <el-checkbox-group v-model="formRawInfo.remember">
                                <el-checkbox
                                    label="remember"
                                    value="0"
                                    >{{ $t(LOCAL("remember-me")) }}</el-checkbox
                                >
                            </el-checkbox-group>
                            <!-- 切换登录方式 -->
                            <el-button
                                @click="loginMethod = loginMethod === 'empNo' ? 'qrcode' : 'empNo'"
                                text>
                                {{
                                    loginMethod === "qrcode"
                                        ? $t(LOCAL("account-pwd-login"))
                                        : $t(LOCAL("qrcode-login"))
                                }}
                            </el-button>
                        </div>
                    </el-form-item>

                    <!-- 登录按钮 -->
                    <el-form-item style="width: 100%">
                        <el-button
                            type="primary"
                            @click="handleSubmit(formRef)"
                            round
                            size="large"
                            style="width: 100% !important"
                            ><i class="fas fa-arrow-right-to-bracket" />{{ $t(LOCAL("btn-login")) }}</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>

            <!-- 分割线 -->
            <div class="da-main-devider">
                <span class="da-main-devider-text">{{ $t(LOCAL("account-login")) }}</span></div
            >

            <!-- 展示区 -->
            <div class="da-main-right">
                <!-- 展示 -->
                <div
                    class="da-main-right-banner"
                    v-if="loginMethod === 'empNo'">
                    <img
                        src="/logo.png"
                        alt="logo"
                        class="da-main-right-logo" />

                    <h1 style="color: var(--primary-color)">{{ $t("common.name") }}</h1>
                </div>

                <!-- 二维码 -->
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
     * @file DgAuth.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/03 16:20
     * @desc 登录页面
     * @copyright CC BY-NC-SA
     * */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    import { useQRCode } from "@vueuse/integrations/useQRCode";
    import type { Nullable, Optional } from "@/types/common";
    import { useAuthStore } from "@/stores/auth.store";
    import { ref, reactive, computed } from "vue";
    import type { Ref, Reactive } from "vue";
    import { ElMessage } from "element-plus";
    import router from "@/router/router";
    import { useI18n } from "vue-i18n";
    import { hash } from "@/utils";

    /* state */
    const authStore = useAuthStore();
    const LOCAL = (key: string, type: string = "template") => `auth.${type}.${key}`;
    const { t } = useI18n();

    // 未经处理的表单数据
    const formRawInfo: Reactive<{
        empNo: string;
        password: string;
        remember: string[];
    }> = reactive({
        remember: authStore.remember ? ["0"] : [],
        empNo: "",
        password: ""
    });

    // 表单引用
    const formRef: Ref<Nullable<HTMLFormElement>> = ref(null);

    // 登录方式
    const loginMethod: Ref<"empNo" | "qrcode"> = ref("empNo");  // TODO: enum化

    // 二维码
    const qrcode = useQRCode(
        computed(() => window.location.href),
        {
            width: 300
        }
    );

    /* computed */

    // 表单规则
    const rules = computed(() => ({
        empNo: [
            { required: true, message: t(LOCAL("input-emp")), trigger: "blur" },
            { validator: validateEmpNo, trigger: "blur" }
        ],
        password: [
            { required: true, message: t(LOCAL("input-pwd")), trigger: "blur" },
            { validator: validatePassword, trigger: "blur" }
        ]
    }));

    /* methods */

    // 登录回调
    const handleSubmit = async (formElem: Optional<Nullable<HTMLFormElement>>) => {
        // 已认证，直接跳转到主页
        if (authStore.authenticated) await router.push("/");

        authStore.setRemember(formRawInfo.remember.length > 0);

        if (!formElem) return;

        // 表单验证
        formElem.validate(async (valid: boolean) => {
            if (valid)
                await authStore
                    .login({
                        empNo: formRawInfo.empNo,
                        passwordHash: await hash(formRawInfo.password) // 加密密码，避免明文传输
                    })
                    .then(() => router.push("/")) // 登录成功，跳转到主页
                    .catch(() => ElMessage({ message: t(LOCAL("login-failed-check-emp-pwd")), type: "error" })); // 登录失败，提示错误信息
        });
    };

    // 工号验证
    const validateEmpNo = (rule: never, value: string, callback: (error?: Error) => void) => {
        // 空值
        if (!value) callback(new Error(t(LOCAL("input-emp"))));
        // 非法字符
        else if (!/^[a-zA-Z0-9]+$/.test(value)) callback(new Error(t(LOCAL("emp-include-letter-and-number"))));
        else callback();
    };

    // 密码验证
    const validatePassword = (rule: never, value: string, callback: (error?: Error) => void) => {
        // 空值
        if (!value) callback(new Error(t(LOCAL("input-pwd"))));
        // 长度过短
        else if (value.length < 6) callback(new Error(t(LOCAL("pwd-less-than-6-characters"))));
        // 非法字符
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
            callback(new Error(t(LOCAL("pwd-include-b-l-letter-number-at-least"))));
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
        background: var(--bg-gray)

        &-main
            display: flex
            background-color: var(--bg-card)
            box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0,0,0,0.02)

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

            // 表单区
            &-left
                display: flex
                flex-direction: column
                justify-content: center
                align-items: center

                @include pc()
                    flex: 4

                @include mobile()
                    flex: 5

                &-container
                    display: flex
                    justify-content: center
                    align-items: center
                    padding: 20px 0

                &-title
                    color: var(--primary-color)

                &-form
                    display: flex
                    flex-direction: column
                    gap: 20px

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

            // 展示区
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
                        width: 25%

                    @include mobile()
                        width: 20%
</style>
