# 前端开发专项 Skills

这是一套专业的、垂直领域的前端开发技能集合，作为 Agents 的补充，提供框架级别和特定场景的专业能力。

## 💡 Skills vs Agents 的区别

### Agents（核心角色）
- **定位**：通用角色，适用于所有项目
- **特点**：系统化、流程化、高频使用
- **示例**：产品经理、架构师、组件生成器、代码审查

### Skills（专项技能）
- **定位**：垂直领域专家，特定技术栈或场景
- **特点**：按需激活、专业度高、项目限定
- **示例**：Ant Design Pro 专家、React 性能优化、开源阅读

## 📦 包含的 Skills（共7个）

### 1. Ant Design Pro 专家 (`antd-pro-expert.md`)

**适用项目**：Ant Design Pro 企业级中后台项目

**核心能力**：
- ✅ **ProComponents 精通**：ProTable、ProForm、ProLayout、ProDescriptions
- ✅ **UmiJS 集成**：约定式路由、配置式路由、插件机制
- ✅ **权限管理**：access.ts 配置、多级权限控制
- ✅ **数据流管理**：@umijs/max、dva、全局状态
- ✅ **请求封装**：umi-request、拦截器、错误处理
- ✅ **标准模板**：CRUD 页面、列表页、详情页、表单页

**何时使用**：
- 开发 Ant Design Pro 项目
- 使用 ProComponents 组件
- 配置 UmiJS 路由和权限
- 需要标准后台页面模板

**使用示例**：
```bash
"使用 Ant Design Pro 创建一个用户管理页面"
"ProTable 怎么配置搜索表单？"
"如何实现 Ant Design Pro 的权限控制？"
```

---

### 2. Figma 设计稿还原专家 (`figma-to-code.md`)

**适用场景**：Figma 设计稿转代码、设计规范提取

**核心能力**：
- ✅ **多数据源支持**：Figma MCP、Figma API、JSON 文件、设计稿截图
- ✅ **Design Token 提取**：颜色、字体、间距、圆角等设计规范
- ✅ **像素级还原**：精确还原设计稿布局和样式
- ✅ **响应式适配**：自动处理多端适配
- ✅ **组件拆分**：智能识别并拆分可复用组件
- ✅ **多框架支持**：React、Vue、HTML/CSS
- ✅ **样式方案**：CSS Modules、Tailwind、styled-components

**何时使用**：
- 需要将 Figma 设计稿转换为代码
- 提取设计系统的 Design Token
- 需要像素级还原设计稿
- 团队协作（设计师 → 前端开发）
- 建立设计规范文档

**使用示例**：
```bash
"将这个 Figma 设计稿转换为 React 组件"
"提取这个设计文件的 Design Token"
"还原这个登录页面的设计稿"
"分析 Figma 文件并生成组件库"
```

---

### 3. 设计规范分析专家 (`design-spec-analyzer.md`)

**适用场景**：项目设计规范提取、Design Token 文档化、设计系统审计

**核心能力**：
- ✅ **多样式格式支持**：CSS 变量、Less/Sass 变量、组件内联样式
- ✅ **Design Token 提取**：颜色、字体、间距、圆角、阴影等系统
- ✅ **智能分析**：变量使用统计、硬编码检测、相似颜色合并
- ✅ **间距系统检测**：自动检测基数和比例类型（线性/斐波那契/指数）
- ✅ **一致性评分**：计算设计规范使用率，评估项目质量
- ✅ **可视化文档**：生成包含色板、统计图表的 Markdown 文档
- ✅ **优化建议**：按优先级提供可操作的改进建议

**何时使用**：
- 需要梳理项目的设计规范
- 建立或完善设计系统文档
- 检查设计一致性问题
- 发现硬编码值和不规范使用
- 定期审计设计质量
- 新成员了解项目设计规范

**使用示例**：
```bash
"分析整个项目的设计规范，生成详细文档"
"分析 src/pages/Dashboard/ 的设计规范"
"快速检查项目的设计一致性"
"分析项目的间距系统，检测是否符合 8px 网格"
"对比两个目录的设计规范差异"
```

---

### 4. React 性能优化专家 (`react-performance-optimization.md`)

**适用项目**：所有 React 项目（特别是复杂应用）

**核心能力**：
- ✅ **性能诊断**：识别渲染瓶颈、内存泄漏、Bundle 分析
- ✅ **渲染优化**：React.memo、useMemo、useCallback、虚拟滚动
- ✅ **代码分割**：动态导入、路由懒加载、组件懒加载
- ✅ **Bundle 优化**：Tree Shaking、代码压缩、依赖分析
- ✅ **Core Web Vitals**：LCP、FID、CLS 优化
- ✅ **工具使用**：React DevTools Profiler、Lighthouse、webpack-bundle-analyzer

**何时使用**：
- 页面加载慢或卡顿
- React 组件重复渲染
- Bundle 体积过大
- Core Web Vitals 指标不达标
- 需要性能优化方案

**使用示例**：
```bash
"这个列表组件渲染很慢，帮我优化"
"分析 React 应用的性能瓶颈"
"优化 Bundle 体积"
"提升 Lighthouse 性能分数"
```

---

### 5. 开源项目阅读专家 (`opensource-reader.md`)

**适用场景**：学习优秀开源项目、技术调研、源码阅读

**核心能力**：
- ✅ **快速项目分析**：架构识别、技术栈分析、核心模块定位
- ✅ **代码结构梳理**：目录结构、依赖关系、数据流向
- ✅ **核心实现解读**：关键算法、设计模式、最佳实践
- ✅ **学习路径规划**：从入口到核心，循序渐进
- ✅ **对比分析**：同类项目对比、技术选型分析
- ✅ **文档输出**：项目总结、架构图、学习笔记

**何时使用**：
- 学习优秀开源项目
- 技术选型前调研
- 源码阅读和理解
- 需要借鉴优秀实现
- 准备技术分享

**使用示例**：
```bash
"帮我分析 React Query 的源码结构"
"阅读 Ant Design 的 Table 组件实现"
"对比 Zustand 和 Jotai 的实现差异"
"学习 Vite 的核心原理"
```

---

### 6. 自走棋设计专家 (`autochess-designer.md`)

**适用场景**:自走棋类游戏的完整设计,包括英雄、羁绊、装备、经济等系统

**核心能力**:
- ✅ **英雄设计系统**:费用分级、属性设计、技能设计、升星机制
- ✅ **种族与职业**:羁绊效果设计、平衡性调整、多样化组合
- ✅ **装备系统**:基础装备、合成装备、转职装、装备搭配
- ✅ **经济系统**:收入机制、利息系统、连胜/连败奖励、消耗设计
- ✅ **对战机制**:匹配规则、战斗计算、伤害公式、扣血机制
- ✅ **平衡性设计**:英雄强度评估、版本更新策略、数据驱动优化
- ✅ **阵容设计**:经典阵容搭配、克制关系、运营思路

**何时使用**:
- 设计自走棋游戏
- 设计英雄、羁绊、装备系统
- 平衡性调整和数值优化
- 阵容搭配和战术设计
- 版本更新规划

**使用示例**:
```bash
"设计一个3费战士英雄"
"设计兽人种族的羁绊效果"
"设计自走棋的经济系统"
"分析当前版本的平衡性问题"
"设计一个6战士阵容"
```

---

### 7. 图片背景去除专家 (`image-bg-remover.md`)

**适用场景**：批量处理图片、去除背景、生成透明PNG

**核心能力**：
- ✅ **多种处理方案**：rembg 本地处理（推荐）、remove.bg API
- ✅ **AI 模型支持**：U2-Net、U2-Net-Human、ISNET 等多种模型
- ✅ **批量处理**：支持目录批处理、递归处理、文件过滤
- ✅ **高级功能**：边缘优化、Alpha Matting、添加新背景
- ✅ **性能优化**：GPU 加速、并行处理、内存管理
- ✅ **多种场景**：电商产品图、人物证件照、Logo图标、动漫插画

**何时使用**：
- 电商产品图需要去除背景
- 批量处理证件照背景
- Logo 和图标透明化
- 设计素材预处理
- 自动化图片处理流程

**使用示例**：
```bash
"批量处理 products 目录下的所有图片，去除背景"
"将这个人物照片去除背景并生成证件照"
"处理这个 logo 图标，生成透明背景版本"
"使用动漫模型处理插画图片"
```

---

## 🚀 如何使用 Skills

### 方式 1：自动识别（推荐）
Claude 会根据你的项目和问题自动选择合适的 skill：

```bash
# 在 Ant Design Pro 项目中
"创建一个用户管理页面"
→ Claude 自动识别并调用 antd-pro-expert skill

# 遇到性能问题
"这个页面加载很慢"
→ Claude 可能调用 react-performance-optimization skill

# 学习开源项目
"帮我分析一下 zustand 的源码"
→ Claude 调用 opensource-reader skill
```

### 方式 2：明确指定
如果需要明确调用某个 skill：

```bash
# 使用技能前缀
"@antd-pro-expert 生成一个 CRUD 页面"
"@react-performance-optimization 优化这个组件"
"@opensource-reader 分析 React Router 源码"
```

### 方式 3：通过 Agent 调用
某些 Agent 会在需要时自动调用 Skill：

```bash
# component-generator 检测到 Ant Design Pro 项目
→ 自动调用 antd-pro-expert skill

# code-reviewer 发现性能问题
→ 建议使用 react-performance-optimization skill
```

---

## 📂 目录结构

```
/Users/worsher/code/self/rules/
├── agents/                          # 核心通用 Agents（11个）
│   ├── product-manager.md
│   ├── ui-designer.md
│   ├── component-generator.md
│   ├── code-reviewer.md
│   ├── frontend-architect.md
│   ├── test-engineer.md
│   ├── devops-engineer.md
│   ├── technical-writer.md
│   ├── debugger.md
│   ├── consumer-ux-designer.md
│   ├── project-manager.md
│   └── README.md
│
└── skills/                          # 专项技能 Skills（7个）
    ├── antd-pro-expert/
    │   └── SKILL.md                 # Ant Design Pro 专家
    ├── figma-to-code/
    │   └── SKILL.md                 # Figma 设计稿还原
    ├── design-spec-analyzer/
    │   └── SKILL.md                 # 设计规范分析专家
    ├── react-performance-optimization/
    │   └── SKILL.md                 # React 性能优化
    ├── opensource-reader/
    │   └── SKILL.md                 # 开源项目阅读
    ├── autochess-designer/
    │   └── SKILL.md                 # 自走棋设计专家
    ├── image-bg-remover/
    │   └── SKILL.md                 # 图片背景去除专家
    └── README.md                    # 本文档
```

---

## 💡 何时应该是 Skill？

一个能力应该作为 Skill 而非 Agent，如果满足以下条件：

### ✅ 应该是 Skill
- **技术栈限定**：只适用于特定框架/库（如 Ant Design Pro）
- **偶发需求**：不是每个项目都需要（如性能优化、开源阅读）
- **垂直专业**：专注于某个特定领域（如性能、框架）
- **可被调用**：可以被其他 Agent 在需要时调用

### ❌ 应该是 Agent
- **通用角色**：适用于所有项目（如产品经理、架构师）
- **高频使用**：开发过程中频繁需要（如组件生成、代码审查）
- **完整流程**：有完整的工作流程（如项目规划、测试）
- **独立决策**：需要自主分析和决策

---

## 🔧 未来扩展

可以继续添加更多专项 Skills：

### 框架专家类
- `next.js-expert` - Next.js 应用开发
- `nuxt-expert` - Nuxt.js 应用开发
- `electron-expert` - Electron 桌面应用
- `taro-expert` - Taro 多端开发

### 专业领域类
- `web3-developer` - Web3/区块链开发
- `animation-expert` - 动画和交互设计
- `accessibility-expert` - 无障碍专家
- `i18n-expert` - 国际化专家

### 工具专家类
- `webpack-expert` - Webpack 配置优化
- `vite-expert` - Vite 配置优化
- `monorepo-expert` - Monorepo 架构

### 设计工具类
- `sketch-to-code` - Sketch 设计稿转代码
- `design-system-builder` - 设计系统构建（从零搭建）
- `design-token-generator` - Design Token 自动生成
- `ai-design-assistant` - AI 辅助设计

### 图片处理类
- `image-optimizer` - 图片压缩优化
- `image-format-converter` - 图片格式转换
- `image-watermark` - 批量添加水印

---

## 📚 相关文档

- **Agents 文档**：`../agents/README.md`
- **Claude Code 文档**：https://docs.claude.com/claude-code
- **Skills 开发指南**：https://docs.claude.com/claude-code/skills

---

## 🎯 最佳实践

### 1. 选择合适的工具
```
简单问题 → 直接提问
通用任务 → 使用 Agent
专项任务 → 使用 Skill
```

### 2. Skill 组合使用
```bash
# 场景：优化 Ant Design Pro 项目性能
@antd-pro-expert 分析项目结构
→ @react-performance-optimization 性能优化
→ @code-reviewer 审查优化后的代码

# 场景：设计规范化流程
@design-spec-analyzer 分析现有项目设计规范
→ @figma-to-code 获取 Figma 设计稿的 Design Token
→ @design-spec-auditor (Agent) 对比差异，生成规范文档
→ @component-generator (Agent) 基于规范生成新组件
```

### 3. 从 Skill 学习
```bash
# 使用 Skill 的同时学习最佳实践
"@opensource-reader 分析 Ant Design Pro 的实现"
→ 了解企业级项目的架构和规范
```

---

## ❓ 常见问题

### Q1: Skill 和 Agent 可以一起使用吗？
可以。Agent 在工作时可以调用 Skill，Skill 也可以建议使用某个 Agent。

### Q2: 如何知道使用了哪个 Skill？
Claude 会明确说明："我将使用 xxx skill 来帮你..."

### Q3: Skill 会读取项目代码吗？
会的，Skills 有 Read、Glob、Grep 等工具权限，可以分析项目。

### Q4: 可以自定义 Skill 吗？
可以！参考现有 Skill 的格式，创建 `.md` 文件放到 `skills/` 目录即可。

---

**享受专业的 AI 技能支持！** 🚀
