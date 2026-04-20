
# Git 使用参考

> 以下命令均在 Windows 的 `cmd` 命令行中运行。

## 1. 配置个人信息（只需一次）

安装 Git 后，必须先告诉 Git 你是谁，否则无法提交。

```bash
git config --global user.email "你的邮箱（如 Gitee 注册邮箱）"
git config --global user.name "你的用户名（如 Gitee 昵称）"
```

**解释**：`--global` 表示对当前电脑上所有 Git 项目生效。这两条命令会在你的电脑上留下签名，每次提交代码时都会带上这个名字和邮箱。

## 2. 第一次从远端拉取项目（仅一次）

如果你电脑上还没有 `Diligence` 这个项目文件夹，就需要克隆下来。

```bash
# 先进入你希望存放项目的父文件夹，例如：
cd D:\myProjects

# 克隆主分支（main）
git clone https://gitee.com/nfupt4/Diligence.git

# 或者直接克隆开发分支（develop）—— 更常用
git clone -b develop https://gitee.com/nfupt4/Diligence.git
```

**解释**：`git clone` 会把整个项目从 Gitee 复制到你的电脑。`-b develop` 表示指定要克隆的分支是 `develop`，而不是默认的 `main`。我们日常开发都基于 `develop` 分支，所以建议使用第二条命令。

## 3. 进入项目目录

克隆完成后，项目根目录下有一个 `.git` 文件夹（隐藏），Git 靠它来管理版本。你需要先进入这个目录才能执行后续 Git 命令。

```bash
cd Diligence
```

## 4. 创建工作分支（每次新功能/任务时）

**不要直接在 `develop` 分支上改代码**，而是从 `develop` 分支切出一个属于自己的工作分支。

```bash
# 创建并切换到新分支，分支名建议用 feature/功能英文名
git checkout -b feature/登录功能
```

**解释**：`git checkout -b` 等于“创建分支 + 切换过去”。分支名示例：`feature/login`、`fix/bug-123`。如果继续做上一次未完成的功能，则不需要新建，直接切换回去即可：

```bash
git checkout feature/登录功能   # 切换到已有分支
```

## 5. 拉取最新代码（每次开始工作前必须做）

因为队友可能已经向 `develop` 分支提交了新代码，你需要在你的工作分支里把这些更新合并进来，避免将来提交时冲突。

```bash
# 确保当前在你的工作分支（例如 feature/登录功能）下执行
git pull origin develop
```

**解释**：`git pull origin develop` 的含义是：从远端（origin）的 `develop` 分支下载最新代码，并自动合并到你当前所在的分支。这样你就能在别人代码的基础上继续开发。

> ⚠️ 如果这是你刚创建的新分支（上一步刚用 `checkout -b` 创建），此时本地 `develop` 可能不是最新的。**建议在执行 `git checkout -b` 之前**，先切换到 `develop` 分支并拉取一次，再切回来创建新分支。更稳妥的顺序如下：

```bash
git checkout develop           # 切换到本地 develop
git pull origin develop        # 拉取远端最新 develop
git checkout -b feature/新功能 # 基于最新的 develop 创建新分支
```

## 6. 写代码（你的实际开发工作）

略。写完代码后，继续下面的步骤。

## 7. 排除不需要提交的文件

有些文件（如临时文件、编译结果、IDE配置）不应该被 Git 管理。项目根目录下有一个 `.gitignore` 文件，里面已经列出了常见的不需要提交的文件。你通常不需要手动修改。

如果你确定某个文件想忽略，但又不方便改 `.gitignore`（例如个人临时测试文件），可以使用另一个地方：

```bash
# 编辑项目根目录下的 .git/info/exclude 文件，在里面按行添加要忽略的文件名
```

**解释**：`.gitignore` 会提交到仓库，对所有人生效；`exclude` 只对你自己的电脑生效。新手通常不需要关心这个。

## 8. 添加要提交的文件

```bash
git add .
```

**解释**：`git add .` 会把当前文件夹下所有**未被忽略**的修改（新增、修改、删除）都记录下来，准备提交。`.` 代表当前目录。

## 9. 写提交说明（必须写清楚做了什么）

```bash
git commit -m "完成了登录页面的UI和表单校验"
```

**解释**：`git commit` 会生成一个“版本快照”，`-m` 后面跟的是本次修改的简短说明。说明要写清楚做了什么，方便队友理解。

## 10. 把你的工作分支推送到远端（Gitee）

```bash
# 第一次推送该分支时，需要加 -u 参数建立关联
git push origin -u feature/登录功能

# 之后再次推送（同一分支有新的提交）时，只需：
git push
```

**解释**：`git push` 是把本地提交上传到远端仓库。`-u` 会记住本地分支与远端分支的对应关系，以后就可以直接用 `git push`。

## 11. 发起合并请求（Pull Request，简称PR）

推送成功后，去 Gitee 项目主页（https://gitee.com/nfupt4/Diligence），通常会看到一个黄色提示条，点击 **“创建 Pull Request”**。

- **源分支**：选择你刚刚推送的工作分支（如 `feature/登录功能`）
- **目标分支**：选择 `develop`（不要选 `main`）

点击确认后，项目管理员会看到你的请求。如果代码没问题，他会帮你合并；如果有小问题，他会评论指出，你只需在本地修改代码，然后重复第8~10步（`git add .` → `git commit -m "..."` → `git push`），PR 会自动更新。

## 12. 清理本地分支（功能合并后）

当你的 PR 被成功合并到 `develop` 后，你本地的工作分支就不再需要了。可以删除它，避免分支越积越多。

```bash
# 先切换回 develop 分支
git checkout develop

# 拉取最新的 develop（因为远端已经合并了你的代码）
git pull origin develop

# 删除本地的功能分支
git branch -d feature/登录功能
```

**解释**：`git branch -d` 删除分支。如果提示“未合并”，说明你忘记先合并或推送了，可以改用 `-D` 强制删除，但请谨慎。

之后如果要开发新功能，回到第4步，创建一个新的功能分支即可。

## 进入vim界面

有时候在`git commit`时忘记用`-m`加注释，git就会默认弹出vim窗口让你编辑你这次提交的注释，建议你写，格式如
```text
feat: 本次工作的简述
- 具体做了1
- 做了2
- 改了3
```

或者在`git pull`后出现了这个界面，通常说明 本次拉取触发了“非快进合并”，Git 需要你输入一段合并提交的说明信息。

<details>
<summary>为什么会发生？</summary>
git pull 实际执行的是 git fetch + git merge
<br><br>
如果本地分支和远端分支出现了分叉（例如你本地有提交，远端也有别人提交的新内容），Git 无法简单地把指针往前移动（快进合并），就会创建一次 合并提交（merge commit）
<br><br>
创建合并提交时，Git 会打开默认编辑器（很多环境下是 vim），让你填写或确认合并信息
</details>

### 典型场景
你忘了先 git pull，直接在旧代码上做了提交

然后执行 git pull，发现本地和远端都有了不同的新提交

Git 自动合并（没有冲突）后，弹出 vim 让你写一条合并说明（通常内容是 Merge branch 'develop' of ...）

### 怎么处理

- 保存并退出（接受默认信息）
   在 vim 中依次按：Esc → 输入 :wq → 回车
   这样合并就会完成，继续正常操作。

- 放弃本次合并（不想产生合并提交）
   按 Esc → 输入 :q! → 回车
   然后重新考虑更新方式，例如改用 git pull --rebase。

---

## 常见问题

| 问题 | 解决方法 |
|------|----------|
| 不小心在 `develop` 分支上改了代码 | 用 `git stash` 暂存修改，然后切回正确分支再用 `git stash pop` 恢复 |
| `git pull` 时报冲突 | 手动打开冲突文件，删除 `<<<<<<<` `=======` `>>>>>>>` 这些标记，保留你想要的代码，然后 `git add .` + `git commit` |
| 忘了写 `-m` 注释，进入了一个奇怪的界面 | 按 `Esc`，然后输入 `:wq` 再按回车（这是 Vim 编辑器） |
| 想撤销 `git add .` | `git reset` |
| 想修改上一次的 `commit` 注释 | `git commit --amend -m "新注释"` |

如果遇到其他问题，把报错信息复制到搜索引擎，或者直接问组里熟悉的同学。
