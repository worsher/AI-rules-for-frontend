# 通用前端 AI Agent 系统

一套专业的、可复用的前端 AI Agent 集合，涵盖产品、设计、开发、审查、架构全流程。支持多种技术栈（React/Vue、TypeScript/JavaScript、多种样式方案），适用于 Web 应用、Node.js 后端、浏览器插件、桌面应用等多种项目类型。

## ✨ 特色亮点

- **👔 项目经理协调**：项目经理 Agent 作为总协调者，调动其他 agents 进行项目全局规划和审查
- **🎯 全流程覆盖**：从需求分析到架构设计、从项目启动到交付管理，覆盖完整开发流程
- **🔧 通用可复用**：不绑定特定项目，可在任何项目中使用
- **🌈 多技术栈支持**：React/Vue、CSS/Less/Sass/Tailwind、TS/JS
- **💡 跨领域创意**：UI 设计师 Agent 可借鉴艺术、建筑等领域经验
- **📊 系统化审查**：代码审查包含质量、性能、安全、可维护性、可访问性五大维度
- **🏗️ 多项目类型**：支持 Web 应用、Node.js、浏览器插件、Electron、微前端

## 📦 包含的 Agents

### 0. 项目经理 Agent (`project-manager.md`) ⭐ 总协调者

**职责**：项目全局规划、团队协调、进度管理、风险控制，调动其他 agents 进行综合性评估

**核心功能**：
- ✅ **项目评估**：规模评估、资源需求、风险识别、可行性分析
- ✅ **团队协调**：调动产品经理/架构师/设计师/代码审查等 agents
- ✅ **项目规划**：制定计划、里程碑、任务分配、资源分配
- ✅ **进度管理**：进度跟踪、里程碑检查、问题解决、变更管理
- ✅ **项目审查**：综合审查（需求/技术/代码/设计），生成评估报告
- ✅ **交付管理**：交付清单、验收标准、上线检查、项目回顾

**工作模式**：
- **新项目启动**：需求分析 → 技术选型 → 设计规划 → 项目计划
- **现有项目审查**：多维度审查 → 问题汇总 → 优化路线图
- **迭代规划**：需求梳理 → 工作量评估 → 任务分配 → Sprint Plan

**适用场景**：
- 新项目启动，需要整体规划
- 现有项目评估和审查
- Sprint 迭代规划
- 项目风险管理

**示例**：
```bash
"启动一个电商项目，需要整体规划"
"审查当前项目的整体情况"
"规划下一个 Sprint 的任务"
```

---

### 1. 产品经理 Agent (`product-manager.md`)

**职责**：需求分析、任务拆解、逆向推导、优先级排序、用户故事编写

**核心功能**：
- ✅ 需求分析与澄清（识别模糊点、补充边界场景）
- ✅ 任务拆解（4 种方法：功能模块、用户旅程、优先级、技术依赖）
- ✅ 需求逆向工程（从代码推导需求文档）
- ✅ 优先级排序（MoSCoW 方法）
- ✅ 工作量估算（Story Points、工时）
- ✅ 用户故事编写（标准格式 + 验收标准）

**适用场景**：
- 接到模糊需求，需要澄清细节
- 复杂功能需要拆解成小任务
- 接手遗留项目，需要从代码逆推需求
- 评估功能工作量

**示例**：
```bash
"帮我分析这个需求并拆解任务"
"从 src/pages/UserManagement 逆向推导需求文档"
"评估一下这个功能的工作量"
```

---

### 2. UI 设计师 Agent (`ui-designer.md`)

**职责**：提供 UI/UX 设计建议，包括风格选择、配色方案、布局建议、交互设计

**核心功能**：
- ✅ **7+ 种设计风格**：Material Design、Ant Design、简约风、扁平化、拟物化、渐变风、玻璃态
- ✅ **每种风格的完整规范**：配色、字体、圆角、阴影、动效
- ✅ **响应式布局方案**：Grid、Flexbox、断点设计
- ✅ **可访问性建议**：WCAG 对比度、键盘导航、ARIA 属性
- ✅ **✨ 跨领域创意借鉴**：
  - 🎨 艺术领域：黄金分割、色彩心理学、留白艺术
  - 🏛️ 建筑领域：空间层次、模块化、光影运用
  - 🔧 工业设计：人机工程学、材质语言、功能优先
  - 📐 平面设计：网格系统、字体层级、视觉引导
  - 🎬 电影美学：景深效果、镜头语言、色调风格
  - 🌿 自然界：黄金螺旋、分形几何、有机形态

**适用场景**：
- 需要设计方案和风格建议
- 不确定用什么设计风格
- 需要创意灵感和跨界思考
- 配色和布局需要专业建议

**示例**：
```bash
"设计一个高端咖啡品牌的落地页，给我一些创意灵感"
"Material Design 风格的用户卡片组件"
"检查这个设计的可访问性"
```

---

### 3. 组件生成 Agent (`component-generator.md`)

**职责**：通用组件生成器，支持多框架、多样式方案、多语言

**核心功能**：
- ✅ **框架支持**：
  - React（函数组件/类组件/HOC/Render Props/自定义 Hooks）
  - Vue 3（Composition API/Options API/Composables）
- ✅ **样式方案**：CSS、Less、Sass、Tailwind、CSS-in-JS (styled-components/emotion)
- ✅ **语言支持**：TypeScript（interface/type/泛型）、JavaScript（PropTypes/JSDoc）
- ✅ **组件设计模式**：受控/非受控、复合组件、Context 传递
- ✅ **性能优化**：React.memo、useCallback、useMemo、懒加载、虚拟滚动
- ✅ **可访问性**：语义化、键盘导航、ARIA、焦点管理

**适用场景**：
- 快速生成符合项目规范的组件
- 需要遵循最佳实践
- 自动生成类型定义和文档

**示例**：
```bash
"生成一个用户卡片组件，使用 React + TypeScript + CSS Modules"
"生成一个 Vue 3 的下拉菜单组件，使用 Composition API + Less"
"为这个组件添加可访问性支持"
```

---

### 4. 代码审查 Agent (`code-reviewer.md`)

**职责**：系统化的代码审查，涵盖多个维度，提供分级建议和修复方案

**核心功能**：
- ✅ **5 大审查维度**：
  1. **代码质量**：可读性、代码规范、复杂度、错误处理
  2. **性能**：React/Vue 性能、网络性能、资源优化、内存泄漏
  3. **安全**：XSS、CSRF、敏感信息、依赖安全
  4. **可维护性**：模块化、可测试性、文档、版本控制
  5. **可访问性**：语义化、键盘导航、ARIA、兼容性
- ✅ **问题严重性分级**：Critical 🔴 / High 🟠 / Medium 🟡 / Low 🟢
- ✅ **具体修复示例**：提供"问题代码 ❌"和"修复后 ✅"的对比
- ✅ **常见问题库**：React/Vue/安全/性能常见问题和解决方案

**适用场景**：
- 代码提交前的质量检查
- Code Review 时的参考
- 识别潜在的性能和安全问题

**示例**：
```bash
"审查这段代码"
"检查这个组件的性能问题"
"安全审查"
```

---

### 5. 前端架构师 Agent (`frontend-architect.md`)

**职责**：项目架构分析、技术选型、架构设计

**核心功能**：
- ✅ **多项目类型支持**：
  - Web 应用（SPA/SSR/SSG）
  - Node.js 后端（RESTful/GraphQL/全栈框架）
  - 浏览器插件（Chrome/Firefox Extension）
  - 桌面应用（Electron）
  - 微前端架构
- ✅ **技术选型方法论**：
  - 多方案对比（优缺点分析）
  - 框架对比（React vs Vue）
  - 状态管理对比（Redux/Zustand/Pinia 等）
  - 构建工具对比（Vite/Webpack/Turbopack）
- ✅ **目录结构设计**：提供清晰的目录结构模板
- ✅ **现有项目分析**：识别架构问题、技术债务、提供优化建议
- ✅ **新项目架构设计**：完整的技术栈、架构图、核心模块设计、部署方案

**适用场景**：
- 新项目启动，需要架构设计
- 现有项目架构评估和优化
- 技术选型决策参考
- 微前端架构设计

**示例**：
```bash
"分析这个项目的架构"
"设计一个电商平台的前端架构"
"React 和 Vue 该选哪个？"
"微前端架构设计"
```

---

## 🚀 安装和使用

### 方法一：安装到项目（推荐）

将 agents 复制到项目的 `.claude/agents/` 目录，仅在该项目中可用：

```bash
# 进入你的项目目录
cd your-project

# 创建 .claude/agents 目录
mkdir -p .claude/agents

# 复制所有 agent 文件
cp /path/to/agents/*.md .claude/agents/

# 或只复制需要的 agent
cp /path/to/agents/component-generator.md .claude/agents/
```

**优点**：
- ✅ 团队成员共享（通过 git）
- ✅ 项目特定配置
- ✅ 版本控制

### 方法二：安装到全局

将 agents 复制到用户目录的 `~/.claude/agents/`，所有项目都可用：

```bash
# 创建全局 agents 目录
mkdir -p ~/.claude/agents

# 复制所有 agent 文件
cp /path/to/agents/*.md ~/.claude/agents/
```

**优点**：
- ✅ 所有项目可用
- ✅ 一次安装，到处使用

### 使用方式

安装后，Claude 会根据你的请求**自动选择合适的 agent**：

```bash
# Claude 自动调用产品经理 agent
"帮我拆解这个需求"

# Claude 自动调用 UI 设计师 agent
"设计一个卡片组件，Material Design 风格"

# Claude 自动调用组件生成 agent
"生成一个用户列表组件，React + TypeScript"

# Claude 自动调用代码审查 agent
"审查这段代码的性能问题"

# Claude 自动调用前端架构师 agent
"分析当前项目的架构"
```

也可以明确指定 agent（如果需要）：

```bash
"@product-manager 帮我拆解这个需求"
"@ui-designer 给我一些创意灵感"
```

查看所有可用的 agents：

```bash
/agents
```

---

## 💡 使用示例

### 示例 1：新项目启动（项目经理协调）

```bash
用户："启动一个电商项目，需要用户登录、商品列表、购物车、订单管理功能"
Claude：[自动调用 project-manager]

项目经理 agent：
1. 调用 product-manager → 需求分析、功能拆解、优先级排序
2. 调用 frontend-architect → 技术选型（React + TypeScript + Vite）、架构设计
3. 调用 ui-designer → 设计风格（Ant Design）、配色方案
4. 综合规划 → 制定项目计划、里程碑、资源分配

输出：完整的项目启动文档
- 需求文档（用户故事、优先级）
- 技术方案（架构图、目录结构）
- 设计方案（配色、组件规范）
- 项目计划（4 个里程碑、12 周时间表、任务分解）
```

### 示例 2：完整的功能开发流程

```bash
# 1. 产品经理：需求分析和拆解
用户："我需要实现一个用户管理功能"
Claude：[自动调用 product-manager]
→ 需求澄清、任务拆解、优先级排序

# 2. UI 设计师：设计方案
用户："设计用户列表页面，要求简洁专业"
Claude：[自动调用 ui-designer]
→ 推荐 Ant Design 风格、配色方案、布局建议

# 3. 前端架构师：技术选型（如果是新项目）
用户："这个项目该用什么技术栈？"
Claude：[自动调用 frontend-architect]
→ 推荐 React + TypeScript + Ant Design + Zustand

# 4. 组件生成：实现组件
用户："生成用户列表组件"
Claude：[自动调用 component-generator]
→ 生成符合规范的组件代码

# 5. 代码审查：质量检查
用户："审查这段代码"
Claude：[自动调用 code-reviewer]
→ 发现问题、提供修复建议
```

### 示例 3：现有项目审查（项目经理协调）

```bash
用户："审查当前项目的整体情况，给出优化建议"
Claude：[自动调用 project-manager]

项目经理 agent：
1. 调用 product-manager → 需求逆向、功能缺失分析
2. 调用 frontend-architect → 架构评估、技术债务识别
3. 调用 code-reviewer → 代码质量、性能、安全审查
4. 调用 ui-designer → 设计一致性检查
5. 综合评估 → 生成项目健康度报告

输出：完整的项目审查报告
- 综合评分：⭐⭐⭐⭐☆ (4.2/5)
- 各维度评估（需求/技术/代码/设计）
- 问题清单（Critical/High/Medium/Low）
- 优化路线图（短期/中期/长期）
```

### 示例 4：需求逆向工程

```bash
用户："帮我分析 src/pages/Dashboard 下的代码，生成需求文档"
Claude：[自动调用 product-manager]
→ 分析代码结构、推导业务逻辑、生成需求文档
```

### 示例 5：跨领域设计灵感

```bash
用户："我要设计一个高端房地产项目的官网，给我一些创意灵感"
Claude：[自动调用 ui-designer]
→ 借鉴建筑领域的空间层次感
→ 使用黄金分割布局
→ 采用低饱和度配色（莫兰迪色系）
→ 大量留白营造高端感
```

### 示例 6：性能优化

```bash
用户："这个列表组件渲染很慢，帮我优化"
Claude：[可能同时调用 code-reviewer 和 component-generator]
→ 识别性能问题（未使用虚拟滚动、不必要的重渲染）
→ 提供优化代码（react-window、React.memo、useMemo）
```

### 示例 7：架构评估

```bash
用户："分析当前项目架构，给出优化建议"
Claude：[自动调用 frontend-architect]
→ 分析技术栈、目录结构、识别技术债务
→ 提供架构评分、优化建议、重构路线图
```

---

## 🎯 最佳实践

### 1. 选择合适的安装方式
- **项目级安装**（`.claude/agents/`）：适合团队协作项目
- **全局安装**（`~/.claude/agents/`）：适合个人开发者

### 2. 组合使用多个 Agents
不同 agents 可以配合使用，覆盖完整流程：

**方式一：项目经理统筹**（推荐用于复杂项目）
```
项目经理（总协调）→ 自动调用产品经理/架构师/设计师等
→ 输出完整的项目计划/审查报告
```

**方式二：单独调用各 Agent**（适合具体任务）
```
产品经理（拆解需求）→ UI 设计师（设计方案）→
组件生成（实现代码）→ 代码审查（质量检查）
```

### 3. 明确需求描述
越详细的描述，agents 越能提供精准的建议：

**❌ 不好**：
```
"做个组件"
```

**✅ 好**：
```
"生成一个用户卡片组件，使用 React + TypeScript + CSS Modules，
需要展示头像、姓名、邮箱，支持点击事件"
```

### 4. 逐步迭代
不要一次性要求所有功能，可以分步骤：
1. 先设计方案
2. 再生成基础版本
3. 然后添加功能
4. 最后优化性能

### 5. 保存 Agent 输出
Agents 的输出（设计方案、架构文档、审查报告）可以保存为项目文档：
```
docs/
├── architecture.md      # 架构师 agent 输出
├── design-system.md     # UI 设计师 agent 输出
└── requirements.md      # 产品经理 agent 输出
```

---

## 🔧 技术栈支持

### 框架
- ✅ React 18+（函数组件、Hooks、Server Components）
- ✅ Vue 3（Composition API、`<script setup>`）
- ✅ Next.js（App Router、Pages Router）
- ✅ Nuxt 3
- ✅ Remix、Astro、Gatsby

### 语言
- ✅ TypeScript
- ✅ JavaScript

### 样式方案
- ✅ CSS（原生、Modules）
- ✅ Less
- ✅ Sass/SCSS
- ✅ Tailwind CSS
- ✅ CSS-in-JS（styled-components、emotion）

### 状态管理
- ✅ React：Context API、Redux、Zustand、Jotai、MobX、React Query
- ✅ Vue：Provide/Inject、Pinia、VueUse

### UI 组件库
- ✅ Ant Design
- ✅ Material-UI
- ✅ Chakra UI
- ✅ shadcn/ui
- ✅ Element Plus（Vue）

### 构建工具
- ✅ Vite
- ✅ Webpack
- ✅ Turbopack
- ✅ Rollup

### Node.js 后端
- ✅ Express
- ✅ Koa
- ✅ Fastify
- ✅ Nest.js
- ✅ Hono

### 其他
- ✅ 浏览器插件（Chrome/Firefox Extension、Manifest V3）
- ✅ Electron 桌面应用
- ✅ 微前端（qiankun、micro-app、Module Federation）

---

## 📚 Agents 详细文档

每个 agent 的 `.md` 文件都包含详细的使用说明：

- **系统提示**：agent 的核心能力和工作方式
- **功能清单**：详细的功能列表
- **输出模板**：标准化的输出格式
- **工作流程**：agent 的工作步骤
- **示例场景**：具体的使用示例
- **注意事项**：最佳实践和注意事项

建议阅读每个 agent 的文件以深入了解其能力。

---

## ❓ 常见问题

### Q1: 如何知道 Claude 使用了哪个 agent？

Claude 会在响应中说明调用了哪个 agent，例如：
```
"我将使用产品经理 agent 来帮你分析需求..."
```

### Q2: 可以同时使用多个 agents 吗？

可以。Claude 会根据任务复杂度自动协调多个 agents，例如：
- 先用产品经理 agent 拆解需求
- 再用 UI 设计师 agent 设计方案
- 最后用组件生成 agent 实现代码

### Q3: Agent 会读取我的项目代码吗？

会，agents 有 Read、Glob、Grep 等工具权限，可以：
- 分析项目结构
- 读取配置文件
- 搜索特定代码模式

这样才能提供符合项目规范的建议。

### Q4: Agents 支持哪些编程语言？

主要支持：
- **前端**：JavaScript、TypeScript
- **后端**：Node.js（JavaScript、TypeScript）

其他语言不在支持范围内。

### Q5: 如何自定义 agent？

你可以：
1. 复制现有 agent 的 `.md` 文件
2. 修改 YAML frontmatter（name、description、tools）
3. 修改系统提示内容
4. 保存到 `.claude/agents/` 或 `~/.claude/agents/`

### Q6: Agents 会自动执行代码吗？

- **project-manager**：会调用其他 agents，可能读取项目文件进行分析
- **product-manager**、**ui-designer**：只分析，不执行
- **code-reviewer**：只审查，可能运行 lint/test（需要项目配置）
- **component-generator**：会创建文件
- **frontend-architect**：可能运行 bash 命令分析项目

如果你不希望 agent 执行某些操作，可以在 frontmatter 中限制 `tools` 权限。

### Q7: 团队如何共享这些 agents？

**推荐方式**：
1. 将 `agents/` 目录复制到项目的 `.claude/agents/`
2. 提交到 git
3. 团队成员拉取代码后自动拥有

**可选**：
- 在团队文档中说明每个 agent 的用途
- 建立使用规范（何时使用哪个 agent）

---

## 🤝 贡献和反馈

### 改进建议
如果你有改进建议：
1. 修改对应的 `.md` 文件
2. 测试修改后的效果
3. 分享给团队

### 新增 Agent
你可以创建新的 agent：
1. 参考现有 agent 的格式
2. 编写 `.md` 文件（YAML frontmatter + 系统提示）
3. 放到 agents 目录

### 常见的自定义需求
- 添加特定项目的命名规范
- 集成公司的设计系统
- 添加特定的代码审查规则
- 适配特定的技术栈

---

## 📄 许可证

本 Agents 系统为开源项目，可自由使用和修改。

---

## 🎉 开始使用

1. **选择安装方式**：项目级或全局
2. **复制 agent 文件**：`cp agents/*.md .claude/agents/`
3. **开始对话**：直接向 Claude 描述需求，它会自动选择合适的 agent
4. **查看可用 agents**：输入 `/agents` 命令

**享受高效的 AI 辅助开发体验！** 🚀

---

## 📞 技术支持

如有问题或建议，请查阅：
- 每个 agent 的详细文档（`.md` 文件）
- [Claude Code 官方文档](https://docs.claude.com/claude-code)
- [Claude Code Sub-agents 文档](https://docs.claude.com/claude-code/sub-agents)
