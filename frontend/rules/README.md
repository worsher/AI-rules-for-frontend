# AI 代码生成规范使用说明

> 本目录包含可直接使用的 AI 代码生成规范文件

## 📁 目录结构

```
rules/
├── base/                    # 基础规范（模块化）
│   ├── common.md           # 通用代码规范
│   ├── naming.md           # 命名规范
│   ├── validation.md       # 生成前验证规则
│   ├── styles-less.md      # Less 样式规范（可选）
│   ├── i18n.md             # 国际化规范（可选）
│   └── responsive.md       # 响应式设计规范（可选）
│
├── project-type/           # 项目类型规范
│   ├── solo.md             # 单人项目
│   └── team.md             # 小组项目（3-5人）
│
├── quality-level/          # 质量级别规范
│   ├── high.md             # 高质量（严格）
│   ├── medium.md           # 中质量（平衡）
│   └── low.md              # 低质量（快速）
│
├── presets/                       # 预设规范集（推荐使用）
│   ├── solo-medium.md             # 单人项目 + 中质量 ⭐ 推荐
│   ├── solo-medium-less.md        # 单人项目 + 中质量 + Less
│   ├── solo-medium-i18n.md        # 单人项目 + 中质量 + i18n
│   ├── solo-medium-responsive.md  # 单人项目 + 中质量 + 响应式
│   ├── team-high.md               # 小组项目 + 高质量
│   └── ...                        # 其他组合
│
├── README.md               # 本文件
└── USAGE_CURSOR_CLAUDE.md  # Cursor/Claude 使用指南
```

## 🚀 快速开始

### 在 Cursor 和 Claude Code 中使用

**📖 详细使用指南：[USAGE_CURSOR_CLAUDE.md](./USAGE_CURSOR_CLAUDE.md)**

#### Cursor 快速配置

创建 `.cursorrules` 文件：
```markdown
参考规范：frontend/rules/presets/solo-medium.md
```

或在对话中使用 `@` 引用：
```markdown
@frontend/rules/presets/solo-medium.md 创建用户卡片组件
```

#### Claude Code 快速配置

在 `CLAUDE.md` 中添加：
```markdown
## AI 代码生成规范
使用规范：frontend/rules/presets/solo-medium.md
```

或在对话中引用：
```markdown
请按照 frontend/rules/presets/solo-medium.md 的规范生成代码
```

---

### 方式一：使用预设规范集（推荐）

最简单的方式是直接使用预设的规范集：

```markdown
# 在与 AI 对话时，引用规范文件

请按照 frontend/rules/presets/solo-medium.md 的规范生成代码
```

或者更简单：

```markdown
使用单人项目中质量规范生成代码
```

### 方式二：自定义组合

根据需求灵活组合不同维度的规范：

```markdown
请按照以下规范生成代码：
- 基础规范：frontend/rules/base/common.md
- 项目类型：frontend/rules/project-type/solo.md
- 质量级别：frontend/rules/quality-level/medium.md
```

### 方式三：提供配置信息

直接告诉 AI 你的项目配置：

```markdown
请使用以下配置生成代码：
- 项目类型：单人项目
- 质量级别：中
- 技术栈：React + Vite + Axios + pnpm
```

## 📊 规范选择指南

### 预设规范集推荐

| 预设 | 适用场景 | 开发效率 | 代码质量 | 样式方案 | 国际化 | 响应式 |
|------|---------|---------|---------|---------|------|------|
| **solo-medium** ⭐ | 个人项目常规开发 | ⚡⚡⚡ 高 | ⭐⭐⭐ 中 | CSS | - | - |
| **solo-medium-less** | 个人项目 + Less | ⚡⚡⚡ 高 | ⭐⭐⭐ 中 | Less 💅 | - | - |
| **solo-medium-i18n** | 个人项目 + 多语言 | ⚡⚡⚡ 高 | ⭐⭐⭐ 中 | CSS | i18n 🌍 | - |
| **solo-medium-responsive** | 个人项目 + PC/H5 | ⚡⚡⚡ 高 | ⭐⭐⭐ 中 | CSS | - | 📱💻 |
| solo-low | 快速原型、实验 | ⚡⚡⚡⚡ 最高 | ⭐⭐ 低 | CSS | - | - |
| team-high | 团队核心模块 | ⚡⚡ 中 | ⭐⭐⭐⭐⭐ 最高 | CSS | - | - |
| team-medium | 团队常规开发 | ⚡⚡⚡ 高 | ⭐⭐⭐⭐ 高 | CSS | - | - |

### 项目类型选择

**单人项目（solo）**
- ✅ 个人开发者
- ✅ 小型项目
- ✅ 快速迭代
- ✅ 灵活调整

**小组项目（team, 3-5人）**
- ✅ 团队协作
- ✅ 代码一致性要求高
- ✅ 需要长期维护
- ✅ 有代码审查流程

### 质量级别选择

**高质量（high）**
- ✅ 核心业务功能
- ✅ 生产环境代码
- ✅ 公共组件库
- ✅ 金融/支付/安全相关
- ⏱️ 开发较慢，质量最好

**中质量（medium）** ⭐ 推荐
- ✅ 日常功能开发
- ✅ 常规业务页面
- ✅ 平衡效率与质量
- ⏱️ 开发适中，质量良好

**低质量（low）**
- ✅ 快速原型验证
- ✅ 临时页面（< 1 个月）
- ✅ 实验性功能
- ⏱️ 开发最快，质量基本
- ⚠️ 需要后续优化

### 样式方案选择

**CSS（默认）**
- ✅ 简单项目
- ✅ 团队不熟悉预处理器
- ✅ 不需要高级特性
- 📝 文件：`.css`

**Less（可选）** 💅
- ✅ 需要变量、混入、嵌套
- ✅ 希望代码复用性更强
- ✅ 统一管理设计 token
- 📝 文件：`.less`
- 📚 详见：[Less 样式规范](./base/styles-less.md)

### 国际化方案选择

**不使用 i18n（默认）**
- ✅ 单一语言项目
- ✅ 快速开发
- ✅ 无额外依赖

**使用 i18n（可选）** 🌍
- ✅ 需要支持多语言
- ✅ 国际化业务需求
- ✅ 使用 react-i18next
- 📝 语料文件：`locales/zh-CN/`, `locales/en-US/`
- 📚 详见：[i18n 国际化规范](./base/i18n.md)

### 响应式方案选择

**不使用响应式（默认）**
- ✅ 仅 PC 或仅移动端
- ✅ 单一平台项目
- ✅ 无需多端适配

**使用响应式（可选）** 📱💻
- ✅ 需要同时支持 PC 和 H5
- ✅ 跨平台业务需求
- ✅ 使用媒体查询、rem、vw 等
- 📝 断点：768px（平板）、1024px（PC）
- 📚 详见：[响应式设计规范](./base/responsive.md)

## 💡 使用示例

### 示例 1：创建新组件

```markdown
请按照单人项目中质量规范，创建一个用户卡片组件：

**需求：**
- 组件名：UserCard
- 位置：src/components/UserCard/
- 功能：展示用户头像、姓名、简介
- Props：user 对象，onClick 回调

**规范：** frontend/rules/presets/solo-medium.md
```

AI 会生成符合规范的代码，包括：
- 文件夹结构（index.jsx + styles.css）
- 合适的 PropTypes（复杂组件）
- 基本的注释
- 规范的样式类名

### 示例 2：创建页面

```markdown
使用小组项目高质量规范，创建用户管理页面：

**需求：**
- 页面路径：src/pages/UserManagement/
- 功能：用户列表、搜索、分页
- 数据来源：API

**规范：** frontend/rules/presets/team-high.md
```

AI 会生成高质量代码，包括：
- 完整的 PropTypes 和 JSDoc
- 完整的错误处理（loading/error/empty）
- BEM 样式命名
- 性能优化（useCallback/useMemo）
- README.md 文档

### 示例 3：快速原型

```markdown
使用低质量规范快速实现一个产品列表原型：

**需求：**
- 简单的产品卡片列表
- 从 API 获取数据
- 基本功能即可

**规范：** frontend/rules/quality-level/low.md
```

AI 会快速生成代码，允许：
- 省略 PropTypes
- 简化错误处理
- 使用 index 作为 key
- 最小化文档

### 示例 4：使用 Less

```markdown
使用单人项目中质量规范（Less 版本）创建用户卡片：

**需求：**
- 组件名：UserCard
- 位置：src/components/UserCard/
- 样式方案：Less
- 使用变量和混入

**规范：** frontend/rules/presets/solo-medium-less.md
```

AI 会生成支持 Less 的代码：
- 样式文件为 `.less`
- 使用 Less 变量（`@primary-color`, `@spacing-md`）
- 使用混入（`.flex-center()`, `.circle(60px)`）
- BEM 命名 + Less 嵌套

### 示例 5：使用 i18n

```markdown
使用单人项目中质量规范（i18n 版本）创建用户列表页面：

**需求：**
- 页面路径：src/pages/UserList/
- 功能：用户列表展示、搜索、分页
- 国际化：支持中文和英文
- 使用 react-i18next

**规范：** frontend/rules/presets/solo-medium-i18n.md
```

AI 会生成支持多语言的代码：
- 组件中使用 `useTranslation` hook
- 用户可见文本通过 `t()` 函数翻译
- 创建语料文件（`locales/zh-CN/`, `locales/en-US/`）
- 语料按命名空间组织（common、pages、components、messages）
- 提供语言切换功能

### 示例 6：使用响应式

```markdown
使用单人项目中质量规范（响应式版本）创建用户列表页面：

**需求：**
- 页面路径：src/pages/UserList/
- 功能：用户列表展示、搜索
- 响应式：同时支持 PC 和移动端
- PC 端：多列布局，支持 hover 效果
- 移动端：单列布局，触摸优化

**规范：** frontend/rules/presets/solo-medium-responsive.md
```

AI 会生成响应式代码：
- 组件使用 `useMediaQuery` hook 判断设备
- 样式使用媒体查询适配不同屏幕
- PC 端 hover 效果仅在 PC 生效
- 移动端触摸区域至少 44x44px
- 移动端流畅滚动优化
- 设置正确的 viewport meta 标签

## 🔧 规范文件内容

### base/ - 基础规范模块

可以单独引用某个维度的规范：

```markdown
# 只需要命名规范
请遵循 frontend/rules/base/naming.md 的命名规范

# 只需要验证规则
生成前请按照 frontend/rules/base/validation.md 进行验证
```

**包含内容：**
- `common.md` - 技术栈、组件规范、样式规范、API 规范
- `naming.md` - 组件、函数、变量、CSS 类名等命名规则
- `validation.md` - 路径、命名、依赖、冲突检测规则

### project-type/ - 项目类型规范

定义不同项目规模的规范差异：

**solo.md - 单人项目**
- 轻量级规范
- 注重开发效率
- 允许快速方案
- PropTypes 可选
- 文档最小化

**team.md - 小组项目（3-5人）**
- 严格规范
- 注重一致性
- PropTypes 必须
- 完整文档
- 代码审查流程
- Git 提交规范

### quality-level/ - 质量级别规范

定义不同严格程度的代码质量要求：

**high.md - 高质量**
- ESLint: 0 errors, 0 warnings
- 所有组件必须 PropTypes
- 完整文档和注释
- 全面错误处理
- 性能优化必须
- 可访问性完整
- 适合：核心模块、生产代码

**medium.md - 中质量**
- ESLint: 0 errors
- 复杂组件必须 PropTypes
- 关键部分有文档
- 基本错误处理
- 明显性能问题优化
- 适合：常规开发

**low.md - 低质量**
- 可以构建即可
- PropTypes 可选
- 文档可选
- 简化错误处理
- 适合：原型、临时页面

### presets/ - 预设规范集

常用组合，开箱即用：

| 预设 | 项目类型 | 质量级别 | 特性 | 说明 |
|------|---------|---------|------|------|
| solo-medium | 单人 | 中 | CSS | ⭐ 最推荐，适合大多数个人项目 |
| solo-medium-less | 单人 | 中 | Less 💅 | 个人项目 + Less 样式预处理器 |
| solo-medium-i18n | 单人 | 中 | i18n 🌍 | 个人项目 + 多语言支持 |
| solo-high | 单人 | 高 | CSS | 个人项目的核心模块 |
| solo-low | 单人 | 低 | CSS | 快速原型验证 |
| team-high | 小组 | 高 | CSS | 团队协作的核心模块 |
| team-medium | 小组 | 中 | CSS | 团队日常开发 |
| team-low | 小组 | 低 | CSS | 团队快速验证（不推荐） |

## 📝 最佳实践

### 1. 项目初始化

在项目开始时选择一个默认规范：

```markdown
# 在项目根目录创建 .ai-rules 文件

本项目使用规范：frontend/rules/presets/solo-medium.md

生成代码时请遵循此规范。
```

### 2. 根据模块调整

不同模块可以使用不同级别：

```markdown
# 核心模块使用高质量
src/components/ (全局组件) → high
src/api/ (API 层) → high

# 常规模块使用中质量
src/pages/ (业务页面) → medium

# 原型使用低质量
src/pages/prototype/ → low
```

### 3. 逐步提升

项目发展过程中逐步提升质量：

```
初期（MVP）：
- 使用 low 或 medium
- 快速验证功能

成长期：
- 升级到 medium
- 完善文档和测试

成熟期：
- 核心模块升级到 high
- 建立完整质量体系
```

### 4. 团队约定

团队项目明确规范：

```markdown
# 团队规范约定

- 默认规范：team-medium
- 核心模块：team-high
- 实验功能：team-low（需 code review）
- 所有代码必须通过 ESLint
- 重要功能需要测试
```

## 🔄 规范演进

### 何时升级质量级别

- ✅ 原型验证成功，转为正式功能
- ✅ 用户量增长
- ✅ 发现较多质量问题
- ✅ 需要长期维护

### 何时降级质量级别

- ✅ 快速验证想法
- ✅ 临时活动页面（< 1 个月）
- ✅ 实验性功能（可能废弃）

### 何时从单人升级到团队

- ✅ 有其他开发者加入
- ✅ 项目变大（> 50 个组件）
- ✅ 需要更严格的质量控制
- ✅ 建立代码审查流程

## 🛠️ 工具集成

### ESLint 配置

根据质量级别选择不同的 ESLint 配置：

```javascript
// 高质量级别
"eslintConfig": "./frontend/rules/quality-level/high.eslintrc.js"

// 中质量级别
"eslintConfig": "./frontend/rules/quality-level/medium.eslintrc.js"
```

### Git Hooks

在提交前自动检查规范：

```bash
# .husky/pre-commit
npm run lint  # 运行 ESLint
npm run build # 确保可以构建
```

### VS Code 设置

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## ❓ 常见问题

### Q: 应该选择哪个预设？

**A:** 大多数情况推荐 `solo-medium`（单人）或 `team-medium`（团队）

### Q: 可以混合使用不同规范吗？

**A:** 可以。不同模块可以使用不同质量级别，但项目类型（单人/团队）应该统一

### Q: 规范太严格/太松怎么办？

**A:** 规范是灵活的，可以根据实际情况调整。建议在项目 README 中说明你的调整

### Q: 如何确保团队遵守规范？

**A:**
1. 配置 ESLint 和 Prettier
2. 设置 Git Hooks
3. 代码审查时检查
4. 团队培训和文档

### Q: AI 没有完全遵守规范怎么办？

**A:**
1. 更明确地引用规范文件
2. 指出具体哪里不符合
3. 要求重新生成

## 📚 相关文档

### 使用指南
- **[Cursor 和 Claude Code 使用方法](./USAGE_CURSOR_CLAUDE.md)** ⭐ 必读
  - Cursor 配置方法（.cursorrules、@ 引用、Composer）
  - Claude Code 配置方法（CLAUDE.md、对话引用）
  - 团队项目配置
  - 常见问题解答

### 完整框架文档
- [完整框架文档](../) - 详细的规范说明
- [01-Prompt 工程与代码规范](../01-prompt-and-standards.md)
- [02-质量检查规范](../02-quality-check.md)
- [03-生成流程与用户交互](../03-workflow.md)
- [04-模板库与范例](../04-templates.md)
- [05-监控与反馈](../05-monitoring.md)

## 🤝 贡献

欢迎根据实际使用经验改进规范！

1. 发现问题或有改进建议
2. 修改对应的规范文件
3. 更新相关文档
4. 分享你的实践经验

---

**开始使用：** 选择一个预设规范（推荐 `solo-medium`），在与 AI 对话时引用它！