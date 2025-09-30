# 在 Cursor 和 Claude Code 中使用规范

> 本文档详细说明如何在 Cursor 和 Claude Code 中使用 AI 代码生成规范

## 📋 目录

- [Cursor 使用方法](#cursor-使用方法)
- [Claude Code 使用方法](#claude-code-使用方法)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

---

## Cursor 使用方法

### 方法 1：使用 .cursorrules 文件（推荐）

在项目根目录创建 `.cursorrules` 文件，Cursor 会自动读取。

#### 步骤 1：创建 .cursorrules 文件

```bash
# 在项目根目录
touch .cursorrules
```

#### 步骤 2：引用规范文件

**选项 A：引用预设规范（最简单）**

```markdown
# .cursorrules

# AI 代码生成规范
请严格遵循以下规范生成代码：

参考规范文件：frontend/rules/presets/solo-medium.md

## 核心要求
- 项目类型：单人项目
- 质量级别：中等
- 技术栈：React + Vite + Axios + pnpm

## 必须遵守
- 组件使用文件夹形式（ComponentName/index.jsx + styles.css）
- 全局组件放在 src/components/，页面组件放在页面的 components/
- API 请求使用统一的 axios 实例
- 跨层级传递使用 React Context，不要深层 props drilling
- 列表渲染必须使用稳定的 key
- 基本的错误处理和 loading 状态

## 命名规范
- 组件：PascalCase
- 函数/变量：camelCase
- 常量：UPPER_SNAKE_CASE
- CSS 类名：kebab-case

## 验证要求
生成代码前必须检查：
- 文件路径是否正确（全局组件 vs 页面组件）
- 组件是否使用文件夹形式
- 命名是否符合规范
- 是否有明显的命名冲突
```

**选项 B：完整内联规范**

```markdown
# .cursorrules

# 请阅读并严格遵循以下完整规范

<file:frontend/rules/base/common.md>

<file:frontend/rules/project-type/solo.md>

<file:frontend/rules/quality-level/medium.md>

# 以上规范必须严格遵守，生成代码前务必检查：
- 文件结构是否符合规范
- 命名是否正确
- 是否有完整的错误处理
```

**选项 C：分模块引用**

```markdown
# .cursorrules

# 通用规范
<file:frontend/rules/base/common.md>

# 命名规范
<file:frontend/rules/base/naming.md>

# 生成前验证
<file:frontend/rules/base/validation.md>

# 项目类型规范
<file:frontend/rules/project-type/solo.md>

# 质量级别
<file:frontend/rules/quality-level/medium.md>
```

### 方法 2：使用 @ 引用文件

在 Cursor 的聊天窗口中，使用 `@` 符号引用规范文件。

#### 使用步骤

```markdown
# 在 Cursor Chat 中输入

@frontend/rules/presets/solo-medium.md 请按照这个规范创建一个用户卡片组件
```

或者引用多个文件：

```markdown
@frontend/rules/base/common.md @frontend/rules/quality-level/high.md
请按照这些规范创建用户列表组件
```

### 方法 3：使用 Composer 模式

在 Cursor 的 Composer 模式中，可以一次性提供完整上下文。

#### 使用步骤

1. 打开 Composer（Cmd/Ctrl + I）
2. 添加规范文件到上下文

```markdown
# Composer 输入框

使用以下规范：
@frontend/rules/presets/solo-medium.md

任务：
创建一个用户管理页面，包含：
- 用户列表展示
- 搜索功能
- 分页

请先生成计划，确认后再生成代码。
```

### 方法 4：Rules for AI（推荐团队使用）

Cursor 的 Rules for AI 功能可以为整个项目设置规则。

#### 设置步骤

1. 打开 Cursor Settings（Cmd/Ctrl + ,）
2. 搜索 "Rules for AI"
3. 添加规则

```markdown
# Rules for AI

## 项目规范
项目类型：单人项目
质量级别：中等
技术栈：React + Vite + Axios

## 核心约定
- 组件使用文件夹形式
- 全局组件在 src/components/
- 页面组件在对应页面的 components/
- 使用 Context 跨层级传递
- API 使用统一 axios 实例

详细规范见：frontend/rules/presets/solo-medium.md
```

---

## Claude Code 使用方法

### 方法 1：使用 CLAUDE.md 文件（推荐）

Claude Code 会自动读取项目根目录的 `CLAUDE.md` 文件。

#### 步骤 1：创建或编辑 CLAUDE.md

```bash
# 在项目根目录
touch CLAUDE.md
```

#### 步骤 2：配置规范

**选项 A：引用预设规范**

```markdown
# CLAUDE.md

## 对话设置
- 始终使用中文回答问题
- 破坏性更新请循环，不要自动执行

## AI 代码生成规范

本项目使用 AI 代码生成规范，详见：`frontend/rules/presets/solo-medium.md`

### 核心配置
- 项目类型：单人项目
- 质量级别：中等
- 技术栈：React 18 + Vite 5 + Axios + pnpm

### 必须遵守的规范

#### 组件规范
- 组件使用文件夹形式：ComponentName/index.jsx + styles.css
- 全局组件放在 src/components/
- 页面组件放在页面同级的 components/
- 路径共享组件放在共同路径的 components/

#### 状态管理
- 跨层级传递使用 React Context
- 不要使用深层 props drilling（超过 2 层）

#### API 请求
- 统一使用 src/api/request.js 的 axios 实例
- 必须有基本的错误处理
- API 模块按资源组织（user.js, product.js）

#### 命名规范
- 组件：PascalCase (UserCard)
- 函数/变量：camelCase (handleClick)
- 常量：UPPER_SNAKE_CASE (API_BASE_URL)
- CSS 类名：kebab-case (user-card)
- Hook：use + PascalCase (useAuth)

#### 样式规范
- 页面级样式添加页面 id/class 前缀避免全局污染
- 组件样式使用组件 class 前缀

#### 代码检查
- ESLint 无 error（允许少量 warning）
- 复杂组件建议添加 PropTypes
- 列表渲染必须使用稳定的 key
- 基本的 loading 和 error 状态处理

### 生成前验证
生成代码前必须确认：
- [ ] 文件路径正确（全局/页面组件）
- [ ] 使用文件夹形式
- [ ] 命名符合规范
- [ ] 无明显冲突
- [ ] 依赖已安装

详细规范请参考：frontend/rules/ 目录下的完整文档
```

**选项 B：嵌入完整规范**

```markdown
# CLAUDE.md

## 对话设置
- 始终使用中文回答问题
- 破坏性更新请循环，不要自动执行

## 前端约定

### 包管理和验证
- 包管理器默认使用 pnpm
- 验证使用 npm run build，除非要求，不要使用 npm run dev

### 组件约定
- 组件创建之前判断是否是全局组件，如果不确定请确认
- 组件使用文件夹形式创建，不要使用单独文件的形式
- 全局组件放置在 src/components/ 目录下
- 当前页面组件放置在页面同级别的 components/ 目录下
- 如果同路径下，不同页面有共用组件，放置在路径目录的 components/ 目录下

### 参数传递约定
- 跨越多层级传递的参数方法，使用 react context 完成，尽量不使用 props

### 样式约定
- 增加样式之前判断是否是页面级别的样式
- 页面级别的样式尽量增加页面的 id 或者 class，避免全局影响
- 如果是全局样式，请提级到全局进行变更，变更前查询是否有冲突定义

### API 请求约定
- 统一使用 src/api/request.js 中配置的 axios 实例
- API 请求必须有基本的错误处理

### 命名约定
详见：frontend/rules/base/naming.md

### 代码质量要求
当前质量级别：中等
- ESLint 检查：0 errors（允许少量 warnings）
- 复杂组件建议添加 PropTypes
- 基本的错误处理和 loading 状态
- 列表渲染使用稳定的 key

完整规范文档：frontend/rules/presets/solo-medium.md
```

### 方法 2：在对话中引用规范

在与 Claude Code 对话时，直接引用规范文件。

#### 使用示例

```markdown
# 在 Claude Code 对话框中

请阅读 frontend/rules/presets/solo-medium.md，
然后按照规范创建一个用户卡片组件。

要求：
- 组件名：UserCard
- 位置：src/components/UserCard/
- 功能：展示用户头像、姓名、邮箱
- Props：user 对象，onClick 回调
```

### 方法 3：使用 Read 工具

Claude Code 可以主动读取规范文件。

```markdown
# 对话示例

我：创建一个用户列表组件

Claude：好的，让我先读取项目的代码规范。

[Claude 使用 Read 工具读取 frontend/rules/presets/solo-medium.md]

Claude：根据规范，我将创建以下文件...
```

### 方法 4：结合项目上下文

Claude Code 会自动读取 CLAUDE.md，然后在对话中补充具体需求。

```markdown
# CLAUDE.md 中已配置规范

# 对话中只需要说明需求
创建用户管理页面，包含列表、搜索、分页功能

# Claude 会自动应用 CLAUDE.md 中的规范
```

---

## 最佳实践

### 1. 项目初始化配置

#### Cursor 项目

```bash
# 1. 创建 .cursorrules
cat > .cursorrules << 'EOF'
# AI 代码生成规范
参考规范：frontend/rules/presets/solo-medium.md

项目配置：
- 类型：单人项目
- 质量：中等
- 技术栈：React + Vite + Axios

核心规范：
- 组件文件夹形式
- Context 跨层级传递
- 统一 axios 实例
- 基本错误处理
EOF

# 2. 添加到 .gitignore（可选）
echo ".cursorrules" >> .gitignore  # 如果规范是个人偏好
```

#### Claude Code 项目

```bash
# 1. 编辑或创建 CLAUDE.md
cat >> CLAUDE.md << 'EOF'

## AI 代码生成规范

使用规范：frontend/rules/presets/solo-medium.md

核心要求：
- 组件文件夹形式
- 全局组件在 src/components/
- 页面组件在页面的 components/
- Context 跨层级传递
- 统一 axios 实例

详见：frontend/rules/ 完整规范文档
EOF

# 2. 提交到版本控制
git add CLAUDE.md
git commit -m "docs: 添加 AI 代码生成规范"
```

### 2. 团队项目配置

#### Cursor 团队项目

```markdown
# .cursorrules (提交到 git)

# 团队 AI 代码生成规范
规范文件：frontend/rules/presets/team-high.md

## 强制要求
- 项目类型：小组项目（3-5人）
- 质量级别：高
- 所有代码必须经过 Review

## 核心规范
- 所有组件必须有 PropTypes
- 所有函数必须有 JSDoc 注释
- CSS 必须使用 BEM 命名
- 完整的错误处理
- 使用 useCallback/useMemo 优化性能

## Git 提交规范
<type>(<scope>): <subject>

类型：feat, fix, docs, style, refactor, perf, test, chore

详细规范：frontend/rules/project-type/team.md
```

#### Claude Code 团队项目

```markdown
# CLAUDE.md (提交到 git)

## 团队开发约定

### AI 代码生成规范
使用规范：frontend/rules/presets/team-high.md

### 强制要求
- 所有组件必须有 PropTypes
- 所有导出函数必须有 JSDoc
- 复杂组件（20+ 行）必须有 README.md
- CSS 使用 BEM 命名规范
- 使用项目的 CSS 变量

### 代码审查要求
- 至少 1 人 Review
- 必须通过 ESLint (0 errors, 0 warnings)
- 必须通过构建测试

### Git 规范
遵循 Conventional Commits 格式

详见：frontend/rules/project-type/team.md
```

### 3. 不同模块使用不同规范

```markdown
# .cursorrules 或 CLAUDE.md

## 分模块规范

### 默认规范
frontend/rules/presets/solo-medium.md

### 特殊模块

#### src/components/ (全局组件库)
使用高质量规范：frontend/rules/quality-level/high.md
- 必须有 PropTypes
- 必须有 README.md
- 完整的错误处理和可访问性

#### src/pages/prototype/ (原型页面)
使用低质量规范：frontend/rules/quality-level/low.md
- 快速实现功能
- 后续优化

生成代码时，请根据文件路径自动选择合适的质量级别。
```

### 4. 在对话中临时调整规范

#### Cursor

```markdown
# Chat 中临时使用不同规范

@frontend/rules/quality-level/high.md
这次创建的是核心组件，使用高质量规范
```

#### Claude Code

```markdown
# 对话中临时指定

这次创建核心支付组件，请使用高质量规范：
frontend/rules/quality-level/high.md

要求：
- 完整的 PropTypes 和 JSDoc
- 全面的错误处理
- 性能优化
- 可访问性支持
```

---

## 常见问题

### Q1: Cursor 不读取 .cursorrules 文件？

**A: 解决方法：**
1. 确保文件在项目根目录
2. 重启 Cursor
3. 检查文件名是否正确（`.cursorrules` 不是 `.cursorrule`）
4. 尝试在 Chat 中手动 @ 引用规范文件

### Q2: Claude Code 不遵守 CLAUDE.md 中的规范？

**A: 解决方法：**
1. 在 CLAUDE.md 中更明确地说明"必须遵守"
2. 在对话中再次提醒："请遵循 CLAUDE.md 中的规范"
3. 直接在对话中引用具体规范文件
4. 指出不符合规范的具体地方，要求修正

### Q3: 规范文件太长，AI 会读取吗？

**A: 解决方法：**
1. 使用预设规范（presets/），已经精简过
2. 在 .cursorrules 或 CLAUDE.md 中提取核心要点
3. 分模块引用（base、project-type、quality-level）
4. 使用摘要版本，详细规范作为参考

### Q4: 团队成员的 .cursorrules 不一致？

**A: 解决方法：**
1. 将 .cursorrules 提交到 git
2. 在 README 中说明必须使用项目的 .cursorrules
3. 定期同步和更新规范
4. 使用 Cursor 的 Rules for AI 功能（团队共享）

### Q5: 如何在生成代码时快速切换规范？

**A: Cursor 方法：**
```markdown
# 使用 @ 临时引用不同规范
@frontend/rules/quality-level/high.md 创建核心组件
@frontend/rules/quality-level/low.md 创建原型
```

**A: Claude Code 方法：**
```markdown
# 在对话中明确指定
使用高质量规范创建这个组件：
frontend/rules/quality-level/high.md
```

### Q6: 规范太严格，开发效率低怎么办？

**A: 解决方法：**
1. 使用 `medium` 质量级别替代 `high`
2. 使用 `solo` 项目类型替代 `team`
3. 在 .cursorrules 中标注"建议"而非"必须"
4. 为不同模块使用不同规范（核心高，非核心中/低）

### Q7: 如何确保 AI 理解了规范？

**A: 验证方法：**

```markdown
# 在 Cursor 或 Claude Code 中

问：请总结一下当前项目的代码规范，特别是组件创建规范。

如果 AI 能正确回答，说明已经理解规范。
```

### Q8: 多个规范文件冲突怎么办？

**A: 解决方法：**
1. 使用预设规范（presets/）避免冲突
2. 明确优先级：presets > quality-level > project-type > base
3. 在配置中明确说明："如有冲突，以 XXX 为准"

---

## 快速参考

### Cursor 最简配置

```markdown
# .cursorrules
参考：frontend/rules/presets/solo-medium.md
- 组件文件夹形式
- Context 跨层级传递
- 统一 axios 实例
```

### Claude Code 最简配置

```markdown
# CLAUDE.md
## AI 代码生成规范
使用规范：frontend/rules/presets/solo-medium.md
核心要求见上述规范文件
```

### 快速切换命令

**Cursor:**
```
@frontend/rules/presets/solo-medium.md [你的需求]
```

**Claude Code:**
```
请按照 frontend/rules/presets/solo-medium.md 生成 [你的需求]
```

---

## 总结

### Cursor 最佳实践
1. ✅ 使用 `.cursorrules` 文件配置默认规范
2. ✅ 使用 `@` 引用规范文件
3. ✅ 使用 Composer 处理复杂任务
4. ✅ 团队项目将 `.cursorrules` 提交到 git

### Claude Code 最佳实践
1. ✅ 在 `CLAUDE.md` 中配置规范
2. ✅ 在对话中引用具体规范文件
3. ✅ 让 Claude 主动读取规范文件
4. ✅ 团队项目在 `CLAUDE.md` 中明确规范

### 通用建议
- 从预设规范开始（`solo-medium` 或 `team-high`）
- 根据模块重要性调整质量级别
- 定期回顾和更新规范
- 团队项目统一规范配置

开始使用：选择一个预设规范，配置到你的 `.cursorrules` 或 `CLAUDE.md` 中！