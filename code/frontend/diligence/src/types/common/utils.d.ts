/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file utils.d.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 13:52
 * @desc 定义一些通用类型
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

/**
 * @summary 定义一个可空类型
 * @desc 用于定义一个变量可以为null
 * */
export type Nullable<T> = T | null;


/**
 * @summary 定义一个可选类型
 * @desc 用于定义一个变量可以为undefined
 * @remarks 与Nullable不同，Optional可以用于定义可选参数，即参数可以不传，但必须声明类型
 * */
export type Optional<T> = T | undefined;
