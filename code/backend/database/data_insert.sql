-- 先选中数据库
USE diligence;


-- =====================================================
-- 插入初始数据
-- =====================================================

-- 1. 插入部门数据
INSERT INTO `department` (`dept_id`, `dept_name`, `parent_id`, `dept_leader_id`, `status`) VALUES
(1, '技术部', NULL, NULL, 1),
(2, '产品部', NULL, NULL, 1),
(3, '人事部', NULL, NULL, 1),
(4, '销售部', NULL, NULL, 1);

-- 2. 插入岗位数据
INSERT INTO `position` (`position_id`, `position_name`, `status`) VALUES
(1, '普通员工', 1),
(2, '部门主管', 1),
(3, '技术总监', 1),
(4, '产品经理', 1),
(5, '人事专员', 1),
(6, '销售经理', 1);

-- 3. 插入考勤规则数据
INSERT INTO `attendance_rule` (`rule_id`, `rule_name`, `rule_type`, `morning_start`, `morning_end`, `afternoon_start`, `afternoon_end`, `late_minutes`, `early_minutes`, `status`) VALUES
(1, '标准考勤规则', 0, '09:00:00', '12:00:00', '13:30:00', '18:00:00', 30, 30, 1),
(2, '弹性考勤规则', 1, NULL, NULL, NULL, NULL, 30, 30, 1);

-- 4. 插入打卡地点数据
INSERT INTO `location` (`loc_id`, `loc_name`, `address`, `longitude`, `latitude`, `radius`, `status`) VALUES
(1, '总部办公楼', '北京市朝阳区XX路88号', 116.3971280, 39.9165270, 100, 1),
(2, '研发中心', '北京市海淀区YY街99号', 116.3081460, 39.9833340, 100, 1),
(3, '销售中心', '北京市朝阳区ZZ大厦12层', 116.4545450, 39.9250000, 100, 1);

-- 5. 插入考勤组数据
INSERT INTO `attendance_group` (`group_id`, `group_name`, `rule_id`, `dept_id`, `status`) VALUES
(1, '技术部考勤组', 1, 1, 1),
(2, '产品部考勤组', 1, 2, 1),
(3, '人事部考勤组', 1, 3, 1),
(4, '销售部考勤组', 2, 4, 1);

-- 6. 插入考勤组地点关联数据
INSERT INTO `group_loc` (`group_id`, `loc_id`) VALUES
(1, 1), (1, 2),  -- 技术部可以在总部和研发中心打卡
(2, 1),           -- 产品部在总部打卡
(3, 1),           -- 人事部在总部打卡
(4, 1), (4, 3);   -- 销售部可以在总部和销售中心打卡

-- 7. 插入员工数据（使用明文密码）
INSERT INTO `employee` (`employee_id`, `emp_no`, `password`, `name`, `gender`, `phone`, `email`, `dept_id`, `position_id`, `role`, `group_id`, `status`) VALUES
(1, 'EMP001', '123456', '张三', 1, '13800138001', 'zhangsan@company.com', 1, 1, 0, 1, 1),
(2, 'EMP002', '123456', '李四', 1, '13800138002', 'lisi@company.com', 1, 2, 1, 1, 1),
(3, 'EMP003', '123456', '王五', 0, '13800138003', 'wangwu@company.com', 2, 4, 1, 2, 1),
(4, 'EMP004', '123456', '赵六', 0, '13800138004', 'zhaoliu@company.com', 3, 5, 0, 3, 1),
(5, 'EMP005', '123456', '钱七', 1, '13800138005', 'qianqi@company.com', 4, 6, 1, 4, 1),
(6, 'ADMIN001', '123456', '管理员', 1, '13800138000', 'admin@company.com', 1, 3, 2, 1, 1);

-- 更新部门的负责人ID（需要等员工插入完成后）
UPDATE `department` SET `dept_leader_id` = 2 WHERE `dept_id` = 1;  -- 技术部负责人：李四
UPDATE `department` SET `dept_leader_id` = 3 WHERE `dept_id` = 2;  -- 产品部负责人：王五
UPDATE `department` SET `dept_leader_id` = 4 WHERE `dept_id` = 3;  -- 人事部负责人：赵六
UPDATE `department` SET `dept_leader_id` = 5 WHERE `dept_id` = 4;  -- 销售部负责人：钱七

-- 8. 插入打卡记录数据（张三的打卡记录）
INSERT INTO `clock_record` (`employee_id`, `clock_date`, `clock_time`, `clock_type`, `longitude`, `latitude`, `location`, `is_valid`, `status`) VALUES
-- 张三 2024年12月1日（正常打卡）
(1, '2024-12-01', '2024-12-01 08:55:00', 0, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 0),
(1, '2024-12-01', '2024-12-01 18:05:00', 1, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 0),
-- 张三 2024年12月2日（迟到）
(1, '2024-12-02', '2024-12-02 09:25:00', 0, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 1),
(1, '2024-12-02', '2024-12-02 18:10:00', 1, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 0),
-- 张三 2024年12月3日（早退）
(1, '2024-12-03', '2024-12-03 08:58:00', 0, 116.3081460, 39.9833340, '北京市海淀区YY街99号', 1, 0),
(1, '2024-12-03', '2024-12-03 17:40:00', 1, 116.3081460, 39.9833340, '北京市海淀区YY街99号', 1, 1),
-- 张三 2024年12月4日（正常打卡，在研发中心）
(1, '2024-12-04', '2024-12-04 08:50:00', 0, 116.3081460, 39.9833340, '北京市海淀区YY街99号', 1, 0),
(1, '2024-12-04', '2024-12-04 18:00:00', 1, 116.3081460, 39.9833340, '北京市海淀区YY街99号', 1, 0),
-- 张三 2024年12月5日（正常打卡）
(1, '2024-12-05', '2024-12-05 08:52:00', 0, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 0),
(1, '2024-12-05', '2024-12-05 18:03:00', 1, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 0),
-- 张三 2024年12月6日（补卡申请，暂无打卡记录）
-- 张三 2024年12月7日（周末，无打卡）
-- 张三 2024年12月8日（正常打卡）
(1, '2024-12-08', '2024-12-08 08:48:00', 0, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 0),
(1, '2024-12-08', '2024-12-08 17:55:00', 1, 116.3971280, 39.9165270, '北京市朝阳区XX路88号', 1, 0);

-- 9. 插入申请数据（张三的请假和补卡申请）
INSERT INTO `application` (`app_id`, `employee_id`, `app_type`, `start_time`, `end_time`, `duration`, `reason`, `attachment_url`, `status`, `current_approver`, `create_time`) VALUES
(1, 1, 0, '2024-12-09 09:00:00', '2024-12-09 18:00:00', 8.0, '身体不适，请病假一天', NULL, 2, 2, '2024-12-08 10:30:00'),
(2, 1, 3, '2024-12-06 09:00:00', '2024-12-06 09:30:00', 0.5, '早上堵车忘记打卡', '/uploads/leave/20241206.jpg', 0, 2, '2024-12-06 10:00:00'),
(3, 1, 0, '2024-12-12 14:00:00', '2024-12-12 18:00:00', 4.0, '参加面试', NULL, 1, 2, '2024-12-10 09:15:00'),
(4, 2, 0, '2024-12-10 13:30:00', '2024-12-10 18:00:00', 4.5, '处理私事', NULL, 2, 6, '2024-12-09 14:00:00'),
(5, 3, 1, '2024-12-14 18:00:00', '2024-12-14 21:00:00', 3.0, '项目紧急加班', NULL, 2, 6, '2024-12-13 16:30:00');

-- 10. 插入审批记录数据
INSERT INTO `approval_record` (`app_id`, `approver_id`, `approval_level`, `result`, `comment`, `approval_time`) VALUES
-- 申请1的审批记录（已通过）
(1, 2, 1, 0, '同意请假，注意休息', '2024-12-08 14:20:00'),
-- 申请4的审批记录（已通过）
(4, 6, 1, 0, '同意', '2024-12-09 16:00:00'),
-- 申请5的审批记录（已通过）
(5, 6, 1, 0, '批准加班，注意安全', '2024-12-13 17:30:00');

-- =====================================================
-- 查询验证数据
-- =====================================================

-- 查询张三的信息
SELECT '=== 张三的员工信息 ===' AS '';
SELECT e.emp_no AS '工号', e.name AS '姓名', e.password AS '密码', e.phone AS '手机号', e.email AS '邮箱',
       d.dept_name AS '部门', p.position_name AS '岗位', ag.group_name AS '考勤组'
FROM employee e
LEFT JOIN department d ON e.dept_id = d.dept_id
LEFT JOIN position p ON e.position_id = p.position_id
LEFT JOIN attendance_group ag ON e.group_id = ag.group_id
WHERE e.name = '张三';

-- 查询张三的打卡记录
SELECT '=== 张三的打卡记录 ===' AS '';
SELECT DATE(clock_time) AS '日期', 
       CASE clock_type WHEN 0 THEN '上班打卡' ELSE '下班打卡' END AS '打卡类型',
       clock_time AS '打卡时间',
       location AS '打卡地点',
       CASE `status` WHEN 0 THEN '正常' ELSE '异常' END AS '状态'
FROM clock_record
WHERE employee_id = 1
ORDER BY clock_time DESC;

-- 查询张三的申请记录
SELECT '=== 张三的申请记录 ===' AS '';
SELECT app_id AS '申请ID',
       CASE app_type WHEN 0 THEN '请假' WHEN 1 THEN '加班' WHEN 2 THEN '外勤' WHEN 3 THEN '补卡' END AS '申请类型',
       start_time AS '开始时间', end_time AS '结束时间', duration AS '时长(小时)',
       reason AS '事由',
       CASE `status` WHEN 0 THEN '待审批' WHEN 1 THEN '审批中' WHEN 2 THEN '已通过' WHEN 3 THEN '已驳回' WHEN 4 THEN '已撤销' END AS '审批状态'
FROM application
WHERE employee_id = 1
ORDER BY create_time DESC;

-- 统计各部门人数
SELECT '=== 各部门人数统计 ===' AS '';
SELECT d.dept_name AS '部门', COUNT(e.employee_id) AS '人数'
FROM department d
LEFT JOIN employee e ON d.dept_id = e.dept_id AND e.status = 1
GROUP BY d.dept_id;

-- 查询所有员工信息
SELECT '=== 所有员工信息 ===' AS '';
SELECT emp_no AS '工号', name AS '姓名', password AS '密码', phone AS '手机号', 
       CASE role WHEN 0 THEN '普通员工' WHEN 1 THEN '部门主管' WHEN 2 THEN '系统管理员' END AS '角色',
       CASE `status` WHEN 0 THEN '禁用' WHEN 1 THEN '启用' END AS '状态'
FROM employee;