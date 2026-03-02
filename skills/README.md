# 专项 Skills

这是一套专业的、垂直领域技能集合，作为 Agents 的补充，提供框架级别和特定场景的专业能力。

## 💡 Skills vs Agents 的区别

### Agents（核心角色）
- **定位**：通用角色，适用于所有项目
- **特点**：系统化、流程化、高频使用
- **示例**：产品经理、架构师、组件生成器、代码审查

### Skills（专项技能）
- **定位**：垂直领域专家，特定技术栈或场景
- **特点**：按需激活、专业度高、项目限定
- **示例**：Ant Design Pro 专家、React 性能优化、开源阅读

## 📦 包含的 Skills（共16个）

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

### 8. 飞书助手 (`feishu-assistant`)

**适用场景**：飞书消息推送、云文档操作、多维表格管理、日历自动化

**核心能力**：
- ✅ **API 认证**：tenant_access_token / user_access_token 获取与管理
- ✅ **消息发送**：文本/富文本/卡片消息、群机器人 Webhook 推送
- ✅ **云文档操作**：创建/读写文档、追加内容、格式化输出
- ✅ **多维表格**：记录增删改查、批量导入、条件过滤
- ✅ **日历管理**：创建日程、查询时间段事件、添加参与人
- ✅ **用户/群管理**：群列表查询、成员获取、邮箱转 open_id
- ✅ **实用脚本**：一键推送通知脚本、CSV 批量导入脚本

**何时使用**：
- 需要通过脚本自动推送飞书消息
- 操作飞书多维表格（批量读写）
- 创建或查询飞书日历日程
- 需要完整的 curl 命令模板

**使用示例**：
```bash
"用飞书机器人给群发送消息：今日构建已完成"
"查询多维表格中状态为「进行中」的所有记录"
"把这个 CSV 文件批量导入到飞书多维表格"
"创建一个明天下午3点的飞书日程"
```

---

### 9. 日常助手 (`daily-assistant`)

**适用场景**：信息整理、任务规划、文档生成、文件管理等日常效率提升

**核心能力**：
- ✅ **会议纪要**：快速整理会议记录，提炼行动项和决策
- ✅ **任务管理**：GTD 拆解、艾森豪威尔矩阵优先级排序
- ✅ **文档生成**：日报/周报/汇报材料标准化模板
- ✅ **文件管理**：批量重命名、按类型整理、重复文件查找
- ✅ **时间规划**：时间块规划、番茄工作法辅助
- ✅ **文本处理**：统计、提取、合并、JSON/CSV 快速处理

**何时使用**：
- 需要快速整理会议纪要或聊天记录
- 撰写日报/周报/汇报材料
- 批量处理文件（重命名/整理/搜索）
- 需要任务优先级排序和时间规划

**使用示例**：
```bash
"整理这段会议记录，生成会议纪要"
"帮我写今天的日报，今天做了：xxx"
"批量重命名这个目录下的图片，按日期前缀"
"把这些任务帮我排优先级：xxx"
```

---

### 10. 社媒运营专家 (`social-media-operator`)

**适用场景**：小红书、微信公众号的内容创作与账号运营

**核心能力**：
- ✅ **小红书创作**：爆款标题公式、正文结构、标签策略、封面建议
- ✅ **公众号写作**：推文结构、不同文体技巧、打开率优化
- ✅ **选题策划**：热点借势、常青内容矩阵、差异化角度
- ✅ **内容日历**：月度内容规划、发布节奏、平台差异管理
- ✅ **数据复盘**：核心指标解读、月度复盘模板、策略调整

**何时使用**：
- 创作小红书图文/视频内容
- 撰写公众号推文
- 策划内容选题和月度计划
- 分析运营数据、调整内容策略

**使用示例**：
```bash
"帮我写一篇小红书：主题是 [xxx]，目标用户是 [xxx]"
"给这个标题写 5 个优化版本：[原标题]"
"帮我策划下个月的内容日历，每周发 3 篇"
"帮我写公众号文章，主题：[xxx]，风格：干货"
```

---

### 11. 浏览器自动化 (`browser-automation`)

**适用场景**：网页数据抓取、自动填表、截图监控、登录态管理（利用 OpenClaw 内置 Chrome）

**核心能力**：
- ✅ **页面操作**：点击/填写/上传/拖拽，支持 uid 精准定位
- ✅ **数据采集**：JS 提取结构化数据，处理动态加载/无限滚动
- ✅ **截图监控**：全页/元素截图，关键指标变化检测
- ✅ **多账号管理**：isolatedContext 隔离 Cookie，多账号并行
- ✅ **网络分析**：监控 XHR 请求，发现隐藏 API
- ✅ **反爬应对**：验证码处理、登录态维持、弹窗处理

**何时使用**：
- 需要采集动态渲染的网页数据
- 自动化登录和操作网页
- 定时截图监控页面变化
- 发现并分析网页内部 API

**使用示例**：
```bash
"抓取 [URL] 的所有文章标题和链接"
"自动登录 [网站] 并截图首页"
"监控 [商品页] 的价格变化"
"分析 [URL] 的网络请求，找到数据接口"
```

---

### 12. 定时任务与 Webhook 工作流 (`cron-webhook-workflow`)

**适用场景**：定时自动化、Webhook 接收处理、事件驱动工作流（利用 OpenClaw 内置 Cron）

**核心能力**：
- ✅ **Cron 配置**：完整语法参考，常用时间表达式
- ✅ **Webhook 处理**：接收/解析/转发，GitHub/Stripe/表单等事件
- ✅ **Gmail 集成**：Pub/Sub 订阅，邮件触发自动化
- ✅ **工作流设计**：事件链式处理，状态管理，失败告警
- ✅ **通知路由**：P0-P3 分级推送策略
- ✅ **实用脚本**：通用 Webhook 处理器，流水线状态追踪

**何时使用**：
- 设置定时推送报告/提醒
- GitHub push 后自动通知
- 事件触发的自动化工作流
- 多步骤任务链的编排

**使用示例**：
```bash
"每天早上9点推送今日日程到飞书"
"设置 GitHub push 后自动通知飞书群"
"工作日下午5:30提醒我写日报"
"设计价格监控工作流，降价超过10%告警"
```

---

### 13. 多平台机器人配置 (`multi-channel-bot`)

**适用场景**：配置 Telegram/Slack/Discord Bot，跨平台消息路由（利用 OpenClaw 多渠道支持）

**核心能力**：
- ✅ **Telegram Bot**：消息/图片/文件发送，内联键盘，获取 Chat ID
- ✅ **Slack**：Webhook + API 双模式，Block Kit 富文本，频道管理
- ✅ **Discord**：Webhook 发送，Embed 卡片，颜色/图标配置
- ✅ **统一推送**：多渠道分级路由，紧急/普通/信息三级策略
- ✅ **消息格式化**：各平台 Markdown 差异对照，通用报告模板
- ✅ **排查指南**：常见错误码与解决方案

**何时使用**：
- 配置新的消息推送渠道
- 需要跨平台消息路由
- 设置机器人自动回复
- 推送格式化的富文本通知

**使用示例**：
```bash
"创建 Telegram Bot 每天推送今日天气"
"把飞书消息同步转发到 Telegram 群"
"设置 Discord Webhook，GitHub push 后通知"
"实现分级告警：错误发所有渠道，日志只发飞书"
```

---

### 14. 数据采集与整理 (`data-pipeline`)

**适用场景**：网页/API 数据采集、清洗转换、自动生成报告、数据流水线

**核心能力**：
- ✅ **多源采集**：curl API 调用，分页处理，Cookie 维持
- ✅ **数据清洗**：jq 处理 JSON，awk/Python 处理 CSV，去重合并
- ✅ **本地存储**：SQLite 数据库，规范目录结构，状态管理
- ✅ **报告生成**：Markdown 日报/周报自动生成，数据对比分析
- ✅ **流水线设计**：采集→清洗→转换→输出全链路，带失败告警
- ✅ **定时集成**：结合 cron 实现端到端自动化

**何时使用**：
- 定时采集某网站/API 数据
- 多数据源汇聚和清洗
- 自动生成数据报告并推送
- 建立轻量级数据管道

**使用示例**：
```bash
"每天定时抓取 [网站] 数据，保存为 CSV"
"把 JSON 文件导入 SQLite，按天聚合统计"
"自动生成每日数据报告并推送到飞书"
"监控 [API 接口]，数据更新时推送通知"
```

---

### 15. 语音助手配置 (`voice-tts-setup`)

**适用场景**：ElevenLabs TTS 配置、macOS 语音播报、语音提醒与告警（利用 OpenClaw 语音功能）

**核心能力**：
- ✅ **ElevenLabs 集成**：API 配置，音色选择，中文优化，流式播放
- ✅ **macOS 系统 TTS**：say 命令完整用法，中文声音配置，无需 API
- ✅ **系统通知**：osascript 通知 + 声音，与语音双通道提醒
- ✅ **语音场景**：日程播报、系统状态报告、任务完成提醒
- ✅ **实用脚本**：通用 TTS 脚本（含 ElevenLabs 降级），早间播报
- ✅ **环境配置**：工具安装，环境变量设置，声音测试

**何时使用**：
- 需要语音播报定时日程/提醒
- 任务完成/告警时语音通知
- 配置 ElevenLabs 高质量 TTS
- 构建免手动的语音交互工作流

**使用示例**：
```bash
"每天早上9点语音播报今日飞书日程"
"任务执行完毕后语音提醒我"
"测试 ElevenLabs 中文语音效果"
"服务器 CPU 超过80%时语音告警"
```

---

### 16. 会话管理 (`session-manager`)

**适用场景**：智能判断会话分割时机、结构化存储历史会话、跨会话数据检索与知识抽取

**核心能力**：
- ✅ **分割判断**：强/中/弱信号分级，4 个快速决策问题
- ✅ **存储结构**：按项目+话题+日期三维组织，含全局索引
- ✅ **会话记录**：YAML front matter + 结构化 Markdown，含行动项追踪
- ✅ **全文检索**：关键词/标签/项目/时间范围多维搜索
- ✅ **知识抽取**：自动提取结论、待办项、决策记录，生成项目快照
- ✅ **上下文注入**：新会话开场模板，自动生成历史摘要

**何时使用**：
- 开始新任务，不确定是否要新开会话
- 需要找回历史讨论过的某个结论或代码
- 会话内容很多，想整理保存关键信息
- 新开会话前，需要快速重建上下文

**使用示例**：
```bash
"帮我保存这次会话，标题 [xxx]，项目 [xxx]"
"搜索历史会话中关于 [关键词] 的内容"
"生成 [项目名] 的上下文快照，用于新会话"
"现在需要新开会话吗？当前在讨论 [xxx]"
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
└── skills/                          # 专项技能 Skills（16个）
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
    ├── feishu-assistant/
    │   └── SKILL.md                 # 飞书操作助手
    ├── daily-assistant/
    │   └── SKILL.md                 # 日常效率助手
    ├── social-media-operator/
    │   └── SKILL.md                 # 社媒运营专家
    ├── browser-automation/
    │   └── SKILL.md                 # 浏览器自动化专家
    ├── cron-webhook-workflow/
    │   └── SKILL.md                 # 定时任务与 Webhook 工作流
    ├── multi-channel-bot/
    │   └── SKILL.md                 # 多平台机器人配置
    ├── data-pipeline/
    │   └── SKILL.md                 # 数据采集与整理
    ├── voice-tts-setup/
    │   └── SKILL.md                 # 语音助手配置
    ├── session-manager/
    │   └── SKILL.md                 # 会话管理
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
