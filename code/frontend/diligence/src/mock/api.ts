/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file api.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 13:25
 * @desc Mock接口模拟文件
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */

import { MockServerBase, route as mockRoute } from "@/mock/common";
import type {
    AttendanceRateResult,
    HttpRequest,
    LoginData,
    LoginResult,
    Nullable,
    TodayStatusResult,
    UserInfo
} from "@/types/common";
import { randomBoolean, randomChoice, genRandomDatePairs } from "@/utils";

type AxiosRequest<T = unknown> = HttpRequest<{
    data: T;
}>;

interface DbUserInfo extends UserInfo {
    passwordHash: string;
    salt: string;
}

/**
 * @summary api接口前缀
 * @desc 接口前缀，所有接口都以此为前缀。
 *
 * @constant {string} PREFIX
 *
 * @version 1.0.0
 *
 * @see route
 * */
const PREFIX = "/api/v1";

/**
 * @summary 对原路由前缀免写封装
 * @desc 封装了对原路由前缀的免写，使得调用mockRoute时可以省略前缀。
 *
 * @param {...Parameters<typeof mockRoute>} args 原路由参数
 *
 * @returns {ReturnType<typeof mockRoute>} 原路由返回值
 *
 * @see mockRoute
 * @see PREFIX
 * */
function route(...args: Parameters<typeof mockRoute>): ReturnType<typeof mockRoute> {
    if (args.length && !args[0].startsWith(PREFIX)) args[0] = PREFIX + args[0];

    return mockRoute(...args);
}


/**
 * @class MockServer
 *
 * @summary 接口模拟类
 * @classDesc 通过继承 MockServerBase 类，一键生成和导出符合mock接口的模拟数据。
 * */
class MockServer extends MockServerBase {
    private userList: DbUserInfo[] = [];

    private readonly datePairs: ReturnType<typeof genRandomDatePairs> = [];

    private readonly startDate = new Date(Date.now());
    private readonly endDate = new Date(Date.now());

    constructor() {
        super();
        this.userList.push({
            empNo: "EXP20260001",
            passwordHash: "c4318372f98f4c46ed3a32c16ee4d7a76c832886d887631c0294b3314f34edf1aslidf",
            salt: "aslidf",
            employeeId: 0,
            name: "edocsitahw",
            role: 0,
            deptId: 0,
            deptName: "t"
        });

        this.startDate.setHours(6,30);
        this.endDate.setHours(23);

        this.datePairs = genRandomDatePairs(this.startDate, this.endDate, Math.floor(Math.random() * 4) + 1);
    }

    /**
     * @summary 登录接口
     * @desc 登录接口，模拟登录成功返回token，失败返回错误信息。
     *
     * @param {AxiosRequest<LoginData>} request 请求参数
     *
     * @returns {HttpRequest<null> | LoginResult} 登录成功返回token，失败返回错误信息。
     * */
    @route("/auth/login", "POST")
    login(request: AxiosRequest<LoginData>): HttpRequest<null> | LoginResult {
        const { empNo, passwordHash } = request.body.data;

        const uid = this.userList.findIndex(ui => ui.empNo === empNo);

        const userInfo = this.userList[uid];

        if (userInfo) {
            const realHash = passwordHash + userInfo.salt; // 在后端要加盐后在哈希

            if (realHash === userInfo.passwordHash) {
                const { passwordHash, salt, ...rest } = userInfo; // 剔除密码和盐

                const now = new Date();

                now.setHours(now.getHours() + 2);

                return { token: `${uid}-${empNo}-${now.getTime()}`, userInfo: rest };
            }
        }

        return { code: 401, msg: "用户名或密码错误", data: null };
    }

    /**
     * @summary 获取用户今日打卡状态
     * @desc 先检查token，然后随机生成打卡状态。
     *
     * @param {AxiosRequest<null>} request 请求参数（实际无需参数）
     *
     * @returns {HttpRequest<null> | TodayStatusResult} 打卡状态结果或错误信息
     * */
    @route("/clock/today-status", "POST")
    getTodayStatus(request: AxiosRequest<null>): HttpRequest<null> | TodayStatusResult {
        const info = MockServer.parseToken(request);

        if (!info) return { code: 401, msg: "请先登录", data: null };

        const { uid, empNo } = info;

        return {
            status: this.datePairs.map(pair => ({
                state: randomBoolean(),
                startTime: pair.start.toISOString(),
                endTime: pair.end.toISOString()
            }))
        };
    }

    /**
     * @summary 获取用户的本月考勤率
     * @desc 先检查token，然后随机生成考勤率。
     *
     * @param {AxiosRequest<null>} request 请求参数（实际无需参数）
     *
     * @returns {HttpRequest<null> | { personalRate: number; deptAvgRate: number }} 考勤率结果或错误信息
     * */
    @route("/home/attendance-rate", "GET")
    getAttendanceRate(request: AxiosRequest<null>): HttpRequest<null> | AttendanceRateResult {
        const info = MockServer.parseToken(request);

        if (!info) return { code: 401, msg: "请先登录", data: null };

        return {
            personalRate: Math.floor(Math.random() * 30) + 70, // 70-100
            deptAvgRate: Math.floor(Math.random() * 20) + 75
        };
    }

    /**
     * @summary 获取待审批申请数量
     * @desc 先检查token，然后随机生成待审批申请数量。
     *
     * @param {AxiosRequest<null>} request 请求参数（实际无需参数）
     *
     * @returns {HttpRequest<null> | { count: number }} 待审批申请数量结果或错误信息
     * */
    @route("/home/pending-approval-count", "GET")
    getPendingApprovalCount(request: AxiosRequest<null>): HttpRequest<null> | { count: number } {
        const info = MockServer.parseToken(request);

        if (!info) return { code: 401, msg: "请先登录", data: null };

        return { count: Math.floor(Math.random() * 5) };
    }

    @route("/application/pending-list", "GET")
    getPendingApprovalList(request: AxiosRequest<null>):
        | HttpRequest<null>
        | Array<{
              appId: number;
              applicantName: string;
              appType: number;
              createTime: string;
          }> {
        const info = MockServer.parseToken(request);

        if (!info) return { code: 401, msg: "请先登录", data: null };

        const types = ["请假", "加班", "外勤", "补卡"];
        const names = ["张三", "李四", "王五", "赵六"];
        const count = Math.floor(Math.random() * 4);

        return Array.from({ length: count }, (_, i) => ({
            appId: i + 1,
            applicantName: names[Math.floor(Math.random() * names.length)],
            appType: Math.floor(Math.random() * 4),
            createTime: new Date(Date.now() - Math.random() * 86400000).toISOString()
        }));
    }

    @route("/home/notices", "GET")
    getNotices(
        request: AxiosRequest<null>
    ): HttpRequest<null> | Array<{ id: number; title: string; publishTime: string }> {
        const info = MockServer.parseToken(request);

        if (!info) return { code: 401, msg: "请先登录", data: null };

        return [
            { id: 1, title: "关于五一劳动节放假安排的通知", publishTime: "2026-04-18" },
            { id: 2, title: "考勤系统升级维护公告", publishTime: "2026-04-15" },
            { id: 3, title: "新员工入职培训通知", publishTime: "2026-04-10" }
        ];
    }

    @route("/home/monthly-trend", "GET")
    getMonthlyTrend(request: AxiosRequest<null>): HttpRequest<null> | { dates: string[]; rates: number[] } {
        const info = MockServer.parseToken(request);

        if (!info) return { code: 401, msg: "请先登录", data: null };

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const daysInMonth = new Date(year, month, 0).getDate();
        const dates: string[] = [];
        const rates: number[] = [];

        for (let i = 1; i <= daysInMonth; i++) {
            dates.push(`${month}/${i}`);
            rates.push(Math.floor(Math.random() * 40) + 60);
        }

        return { dates, rates };
    }

    static parseToken<T>(request: HttpRequest<T>): Nullable<{ uid: number; empNo: string }> {
        const authHeader = request.headers.authorization;

        const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

        if (token) {
            const [uid, empNo] = token.split("-");

            return { uid: Number(uid), empNo: empNo! };
        }

        return null;
    }

}

export default MockServer.export();
