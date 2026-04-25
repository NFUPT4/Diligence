# 勤致 - 员工考勤管理系统


---

## 项目简介

“勤致”是一款轻量级、智能化的 Web 考勤管理系统，旨在解决传统考勤方式中数据分散、统计耗时、防作弊能力弱、难以适应弹性工作制等问题。系统支持基于 GPS 位置验证的打卡、灵活的考勤规则配置、自动化报表生成及请假审批流程，帮助企业实现考勤全流程数字化管理。


---

## 核心功能

- **员工信息管理**：支持部门、岗位及员工信息的增删改查。
- **考勤规则配置**：支持固定班次与弹性工时规则设置。
- **智能打卡**：基于 GPS 地理位置验证，防作弊机制（超出范围无法打卡）。
- **统计报表**：自动生成多维度考勤报表，支持图表可视化（如 ECharts）。
- **请假审批**：员工在线提交申请，主管审批，结果自动关联考勤统计。


---

## 技术栈

- **前端**：Vue.js (组合式 API) + Element Plus + ECharts + 高德地图 JS API
- **后端**：Spring Boot + Spring MVC + JPA / MyBatis
- **数据库**：MySQL
- **第三方服务**：高德地图地理编码 API
- **版本控制**：Git (Gitee / GitHub)


---

## 贡献准则

- 详见[贡献准则](CONTRIBUTING.md)

- 遵循[《贡献者公约》](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)


---

## 快速开始

### 前端

#### 开发环境

##### 安装Node.js

1. 前往[Node.js官网](https://nodejs.org/zh-cn) > 点击`获取Node.js` > 点击`Windows 安装程序(.msi)` > 安装安装包 > 完成安装。

2. 打开命令提示符，输入`node -v`查看是否安装成功。  
    如果出现版本号，则说明安装成功，如果没用需要配置环境变量`右键我的电脑` > `属性` > `高级系统设置` > `环境变量` > `系统变量` > `Path` > `编辑` > `新建`，将`Node.js的bin目录`添加进去。

3. 打开命令提示符，输入`npm -v`查看是否安装成功。
    如果出现版本号，则说明安装成功。

##### 安装pnpm

1. 打开命令提示符，输入`npm install -g pnpm`安装。

2. 克隆项目部分见[项目Wiki-git使用参考](https://gitee.com/nfupt4/Diligence/wikis/git%E4%BD%BF%E7%94%A8%E5%8F%82%E8%80%83)

3. **进入项目根目录**，输入`pnpm install`安装依赖。

##### 启动项目

1. **进入项目根目录**，输入`pnpm run dev`启动项目。

2. 默认自动打开浏览器，如果没有，请手动访问`http://localhost:8080`。


---

### 后端

#### 开发环境

- JDK 21
- Spring Boot 4.0.3
- MySQL 8.0.28+
- Maven 3.8.4+

##### 构建与部署前端资源

1. **进入`code/frontend/diligence`目录**，输入`pnpm run build-only`编译前端资源（如未安装依赖，请先运行`pnpm install`）。

2. 检查`code/backend/diligence/src/main/resources/static`目录，确认是否有编译好的前端资源。

##### 启动项目

1. **导入项目**，使用IDEA导入项目。

2. **创建数据库**，使用MySQL客户端或Navicat创建名为`diligence`的数据库。

3. **配置数据库**，修改`code/backend/diligence/src/main/resources/application.yml`中的数据库配置（包括密码）。

4. **使用maven编译项目**，在命令行中进入项目根目录，输入`mvn clean package`编译项目（或直接点击弹出的Maven编译按钮）。

5. **启动项目**，点击IDEA右侧的绿色运行按钮。

## 许可证

本项目为课程实训项目，遵循CC BY-NC-SA，仅供学习交流使用。
