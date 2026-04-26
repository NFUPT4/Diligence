/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file constant.d.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 13:41
 * @desc 常量类型定义文件
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import type { SnakeCase } from "./utils";


/**
 * @summary 本地存储键值对的类型定义
 * @desc 用于统一本地存储键的格式，具体格式为：`DG_${T}_KEY`，其中 `${T}` 为具体的键值对名称。
 * */
export type LocalStorageKey<T extends string> = `DG_${Uppercase<T>}_KEY`;


/**
 * @summary 项目中使用的属性类型定义
 * @desc 用于统一项目中使用的属性名称的格式，具体格式为：`__dg__${T}__`，其中 `${T}` 为具体的属性名称。
 * */
export type DgAttribute<T extends string> = `__dg_${SnakeCase<T>}__`;
