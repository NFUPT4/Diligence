/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file common.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/01/26 12:15
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { IncomingMessage, ServerResponse } from "node:http";
import type { HttpResponse } from "@/types/common/api";

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";

export interface MockOptions<T = unknown> {
    url: string;
    method?: RequestMethods;
    timeout?: number;
    statusCode?: number;
    response?: T;
    rawResponse?: (req: IncomingMessage, res: ServerResponse) => void;
}

export type RouteFunction<This, Args extends unknown[] = unknown[], R = unknown> = { __route__: boolean } & ((
    this: This,
    ...args: Args
) => MockOptions<HttpResponse<R> | ((this: This, ...args: Args) => HttpResponse<R>)>);

function httpResponse<T>(data: T, code: number = 200, message: string = "ok") {
    return { data, code, message };
}

function isHttpResponse<T>(obj: unknown): obj is HttpResponse<T extends { data: infer R } ? R : unknown> {
    return typeof obj === "object" && obj !== null && "code" in obj && "message" in obj && "data" in obj;
}

function unifiedResponse<This, Args extends unknown[], R = unknown>(fn: (this: This, ...args: Args) => R) {
    return function getFunc(this: This, ...args: Args) {
        const result = fn.apply(this, args);

        if (isHttpResponse<{ data: R }>(result)) return result;

        return httpResponse<R>(result);
    };
}

export function route<This, Args extends unknown[], R = unknown>(
    url: string,
    method: RequestMethods = "GET",
    fixed: boolean = false
) {
    return function getFunc(this: This, ...args: unknown[]): (...args: Args) => R {
        // 装饰器工厂
        function funcFectory(this: undefined, fn: (this: This, ...args: Args) => R) {
            function wrapper(
                this: This,
                ...params: Args
            ): MockOptions<((this: This, ...args: Args) => HttpResponse<R>) | HttpResponse<R>> {
                return {
                    url,
                    method,
                    response:
                        fixed || fn.length === 0
                            ? // 使用者显式说明返回是固定数据，则直接返回经unifyResponse包装（判断）过的函数结果
                              unifiedResponse<This, Args, R>(fn).apply(this, params)
                            : // 否则，根据函数参数长度而确定函数需不需要根据参数动态生成响应数据，如不需要参数，几乎可以确定返回固定数据，则直接返回经unifyResponse包装（判断）过的函数结果，否则返回一个函数，根据参数动态生成响应数据
                              unifiedResponse<This, Args, R>(fn).bind(this)
                };
            }

            wrapper.__route__ = true;

            return wrapper;
        }

        // 新版装饰器
        if (args.length == 2) {
            const [fn, { kind }] = args as [fn: (this: This, ...args: Args) => R, context: ClassMemberDecoratorContext];

            if (kind !== "method") throw new TypeError(`@route can only be used on methods, not on ${kind}, ${fn}}`);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return funcFectory(fn);
        }

        // 旧版装饰器
        else {
            const [, , descriptor] = args as [
                target: Object,
                propertyKey: string | symbol,
                descriptor: PropertyDescriptor
            ];

            const originalMethod = descriptor.value;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            descriptor.value = funcFectory(originalMethod);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return descriptor;
        }
    };
}

export class MockServerBase {
    static export() {
        const instance: MockServerBase = new this();
        const routes: MockOptions[] = [];

        const proto = Object.getPrototypeOf(instance);
        const methodNames = Object.getOwnPropertyNames(proto).filter(
            name => name !== "constructor"
        ) as (keyof MockServerBase)[];

        for (const name of methodNames) {
            const method = instance[name] as unknown as RouteFunction<MockServerBase>;

            if (typeof method === "function" && method.__route__) routes.push(method.call(instance));
        }

        return routes;
    }
}
