/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig, type UserConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "node:url";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";


// https://vitejs.dev/config/
export default defineConfig(({ command }): UserConfig => {
    // 公共配置（开发、生产共用）
    const commonConfig: UserConfig = {
        esbuild: {
            target: "es2020"
        },
        css: {
            preprocessorOptions: {
                sass: {
                    api: "modern-compiler"
                }
            }
        },
        plugins: [
            vue({
                script: {
                    babelParserPlugins: ["decoratorAutoAccessors"]
                }
            }),
            vueDevTools(),
            // Mock 插件：开发环境启用，生产环境关闭
            viteMockServe({
                mockPath: "./src/mock",
                enable: command === "serve" // 只在开发时启用 mock
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            })
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url))
            }
        },
        assetsInclude: ["**/*.svg"],
        base: "/" // 基础路径，生产环境若需子路径可在此调整
    };

    // 开发环境专属配置
    if (command === "serve")
        return {
            ...commonConfig,
            server: {
                host: "0.0.0.0",
                port: 7265,
                open: true,
                proxy: {
                    "/api": {
                        target: "http://localhost:8080",
                        changeOrigin: true
                    }
                }
            }
        };


    // 生产环境专属配置
    else
        return {
            ...commonConfig,
            build: {
                outDir: "../../backend/diligence/src/main/resources/static", // Spring Boot 静态资源目录
                emptyOutDir: true,
                assetsDir: "",
                rolldownOptions: {
                    output: {
                        assetFileNames: "assets/[name]-[hash][extname]",
                        chunkFileNames: "assets/[name]-[hash].js",
                        entryFileNames: "assets/[name]-[hash].js"
                    }
                }
            }
        };

});
