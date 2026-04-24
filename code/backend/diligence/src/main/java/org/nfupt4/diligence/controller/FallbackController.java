// Copyright (c) 2026 NFUPT4. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the organization's permission. If you have any questions or require
// permission, please contact NFUPT4 https://gitee.com/nfupt4.

package org.nfupt4.diligence.controller;

/*
 * <p>前端回退控制器，将非 API 请求转发至 index.html，支持 SPA 路由。</p>
 *
 * @file FallbackController.java
 * @author NFUPT4
 * @version 0.0.1-SNAPSHOT
 * @since 2026-04-24
 * @license CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 处理前端 SPA 路由，将未知路径转发到首页。
 *
 * <p>{@code @Controller}：标记为 Spring MVC 控制器（返回视图名，非 REST）。</p>
 */
@Controller
public class FallbackController {

    /**
     * 匹配所有不以 api/static/css/js/fonts/img 开头的路径，
     * 并转发到 /index.html，避免 404。
     */
    @RequestMapping(value = "/{path:^(?!api|static|css|js|fonts|img|favicon\\.ico|index\\.html).*$}")
    public String forwardToIndex() {
        return "forward:/index.html";
    }

}
