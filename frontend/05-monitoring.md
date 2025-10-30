# 监控与反馈优化

> 轻量级的监控方案，帮助追踪 AI 代码生成效果，持续优化生成质量。

## 目录

- [为什么需要监控](#为什么需要监控)
- [生成日志](#生成日志)
- [质量统计](#质量统计)
- [Prompt 效果评估](#prompt-效果评估)
- [持续优化建议](#持续优化建议)

---

## 为什么需要监控

### 监控目标

1. **追踪生成记录** - 知道生成了什么代码
2. **发现问题模式** - 哪类代码经常出错
3. **评估 Prompt 效果** - 哪些 Prompt 效果好
4. **优化规范配置** - 根据实际情况调整规范

### 轻量级原则

- 不增加额外工作量
- 自动收集基本信息
- 简单的数据统计
- 易于理解的报告

---

## 生成日志

### 日志结构

每次代码生成记录以下信息：

```json
{
  "id": "gen_2024011514302201",
  "timestamp": "2024-01-15T14:30:22.000Z",
  "type": "create-component",
  "description": "创建 UserList 组件",
  "files": {
    "created": [
      "src/pages/UserManagement/components/UserList/index.jsx",
      "src/pages/UserManagement/components/UserList/styles.css"
    ],
    "modified": [
      "src/pages/UserManagement/index.jsx"
    ]
  },
  "qualityLevel": "medium",
  "checks": {
    "validation": "passed",
    "qualityCheck": "passed",
    "build": "passed"
  },
  "stats": {
    "linesAdded": 165,
    "linesModified": 5,
    "duration": 12.5
  },
  "prompt": {
    "type": "create-component",
    "tokens": 1250
  },
  "result": "success"
}
```

### 日志存储

```
.ai-logs/
├── 2024-01/
│   ├── 15.json              # 每天一个日志文件
│   └── 16.json
└── summary.json             # 汇总统计
```

### 简单的日志工具

```javascript
// scripts/ai-logger.js

const fs = require('fs')
const path = require('path')

class AILogger {
  constructor() {
    this.logDir = '.ai-logs'
    this.ensureLogDir()
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true })
    }
  }

  log(entry) {
    const date = new Date()
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const day = String(date.getDate()).padStart(2, '0')

    const monthDir = path.join(this.logDir, yearMonth)
    if (!fs.existsSync(monthDir)) {
      fs.mkdirSync(monthDir, { recursive: true })
    }

    const logFile = path.join(monthDir, `${day}.json`)

    let logs = []
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf-8'))
    }

    logs.push({
      ...entry,
      id: `gen_${date.getTime()}`,
      timestamp: date.toISOString(),
    })

    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2))

    // 更新汇总
    this.updateSummary(entry)
  }

  updateSummary(entry) {
    const summaryFile = path.join(this.logDir, 'summary.json')

    let summary = {
      total: 0,
      byType: {},
      byQualityLevel: {},
      byResult: {},
    }

    if (fs.existsSync(summaryFile)) {
      summary = JSON.parse(fs.readFileSync(summaryFile, 'utf-8'))
    }

    summary.total++
    summary.byType[entry.type] = (summary.byType[entry.type] || 0) + 1
    summary.byQualityLevel[entry.qualityLevel] = (summary.byQualityLevel[entry.qualityLevel] || 0) + 1
    summary.byResult[entry.result] = (summary.byResult[entry.result] || 0) + 1

    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2))
  }

  // 查询最近的日志
  getRecent(count = 10) {
    // 实现查询逻辑
  }
}

module.exports = new AILogger()
```

---

## 质量统计

### 统计指标

#### 1. 成功率

```
成功率 = 成功生成数 / 总尝试次数
```

**目标：** > 85%

#### 2. 质量检查通过率

```
通过率 = 质量检查通过数 / 总生成数
```

**目标：**
- 高级别：> 90%
- 中级别：> 80%
- 低级别：> 60%

#### 3. 平均生成时间

```
平均时间 = 总生成时间 / 生成次数
```

**参考值：**
- 简单组件：< 15 秒
- 复杂组件：< 30 秒
- 完整页面：< 60 秒

#### 4. 代码修改率

```
修改率 = 需要手动修改的生成数 / 总生成数
```

**目标：** < 30%

### 统计报告示例

```markdown
# AI 代码生成统计报告

## 时间范围
2024-01-01 至 2024-01-31

## 总体数据
- 总生成次数：156
- 成功次数：142
- 成功率：91.0%
- 总代码行数：18,650 行

## 按类型分布
| 类型 | 次数 | 成功率 |
|------|-----|--------|
| 创建组件 | 68 | 94.1% |
| 创建 API | 32 | 96.9% |
| 创建 Hook | 18 | 88.9% |
| 创建页面 | 25 | 84.0% |
| 代码重构 | 13 | 84.6% |

## 按质量级别分布
| 级别 | 次数 | 通过率 |
|------|-----|--------|
| 高 | 45 | 91.1% |
| 中 | 89 | 86.5% |
| 低 | 22 | 68.2% |

## 常见问题
1. PropTypes 定义不完整（12 次）
2. 缺少错误处理（8 次）
3. CSS 类名不符合 BEM（6 次）
4. 缺少 JSDoc 注释（5 次）

## 改进建议
- 优化组件创建的 Prompt 模板，强调 PropTypes 要求
- 在系统提示词中增加错误处理的最佳实践
```

---

## Prompt 效果评估

### 评估维度

#### 1. 理解准确度

AI 是否正确理解了需求？

```
✅ 好的表现：
- 生成的代码符合需求描述
- 文件路径和命名正确
- 功能完整

❌ 需要改进：
- 理解偏差，需要多次澄清
- 生成了不需要的功能
- 遗漏关键需求
```

#### 2. 代码质量

生成的代码质量如何？

```
✅ 好的表现：
- 通过质量检查
- 代码结构清晰
- 符合规范

❌ 需要改进：
- 有明显的问题
- 需要大量手动修改
- 不符合项目规范
```

#### 3. 效率

生成速度和一次性成功率？

```
✅ 好的表现：
- 一次生成成功
- 无需或少量修改
- 快速完成

❌ 需要改进：
- 需要多次尝试
- 大量手动修改
- 耗时过长
```

### Prompt 评分卡

对每次生成进行简单评分（可选）：

```markdown
# Prompt 效果评分

生成 ID：gen_2024011514302201
描述：创建 UserList 组件

## 评分（1-5 分）

- 理解准确度：⭐⭐⭐⭐⭐ (5/5)
  生成的代码完全符合需求

- 代码质量：⭐⭐⭐⭐ (4/5)
  整体质量好，PropTypes 需要补充

- 效率：⭐⭐⭐⭐⭐ (5/5)
  一次生成成功，无需修改

## 总分：14/15 (93%)

## 备注
建议在 Prompt 中明确要求添加 PropTypes
```

### 优秀 Prompt 收藏

记录效果好的 Prompt，建立模板库：

```javascript
// .ai-prompts/favorites.json
{
  "create-list-component": {
    "name": "创建列表组件",
    "rating": 4.8,
    "usageCount": 15,
    "successRate": 93.3,
    "template": "请创建一个列表组件...",
    "lastUsed": "2024-01-15T14:30:22.000Z",
    "tags": ["component", "list", "data-loading"]
  }
}
```

---

## 隐私与合规

- PII 脱敏：日志中对姓名、邮箱、手机号等敏感信息做掩码或不记录。
- 可关闭：提供环境变量或配置开关，允许在敏感分支/环境停用日志。
- 保留策略：仅保留近 90 天数据；支持一键清理（脚本）。
- 最小化：只记录与质量改进相关的字段，不记录代码全文。

---

## CLI 汇总脚本示例（输出 Markdown 报告）

```javascript
// scripts/ai-report.js
const fs = require('fs')
const path = require('path')

function loadAllLogs(dir = '.ai-logs') {
  if (!fs.existsSync(dir)) return []
  const entries = []
  for (const ym of fs.readdirSync(dir)) {
    const ymDir = path.join(dir, ym)
    if (!fs.statSync(ymDir).isDirectory()) continue
    for (const f of fs.readdirSync(ymDir)) {
      if (!f.endsWith('.json')) continue
      const arr = JSON.parse(fs.readFileSync(path.join(ymDir, f), 'utf-8'))
      entries.push(...arr)
    }
  }
  return entries
}

function main() {
  const logs = loadAllLogs()
  const total = logs.length
  const success = logs.filter(l => l.result === 'success').length
  const byType = {}
  logs.forEach(l => { byType[l.type] = (byType[l.type] || 0) + 1 })

  console.log('# AI 代码生成周报')
  console.log(`\n- 总次数：${total}`)
  console.log(`- 成功：${success}（${total ? ((success/total)*100).toFixed(1) : 0}%）`)
  console.log('\n## 按类型分布')
  Object.entries(byType).forEach(([k, v]) => console.log(`- ${k}: ${v}`))
}

main()
```

---

## 问题 → 动作映射

- PropTypes/类型缺失 → 强化模板与 Lint 规则；在计划中新增“类型检查”项。
- 错误处理薄弱 → 在 Prompt 模板加入三态要求与错误提示规范。
- BEM/命名不一致 → 链接命名规范文档，增加 Lint 规则与示例。
- a11y 问题 → 开启 `eslint-plugin-jsx-a11y`，模板加 ARIA 与键盘示例。
- 性能指标不达标 → 引入懒加载/虚拟滚动；在计划中标注性能预算。

## 持续优化建议

### 每周回顾

每周花 15 分钟回顾本周的生成记录：

```markdown
# 每周回顾清单

## 数据查看
- [ ] 查看本周生成次数和成功率
- [ ] 查看质量检查通过率
- [ ] 查看常见问题列表

## 问题分析
- [ ] 识别重复出现的问题（3 次以上）
- [ ] 分析问题原因（Prompt、规范、模板？）
- [ ] 确定改进优先级

## 优化行动
- [ ] 更新 Prompt 模板
- [ ] 调整代码规范配置
- [ ] 补充示例代码
- [ ] 更新文档说明

## 记录结果
- [ ] 记录本周改进措施
- [ ] 设定下周观察目标
```

### 每月总结

每月做一次全面总结：

```markdown
# 月度总结模板

## 数据对比
- 本月 vs 上月成功率变化
- 本月 vs 上月质量通过率变化
- 本月 vs 上月平均生成时间变化

## 主要成果
- 完成了哪些优化
- 效果如何

## 经验总结
- 什么类型的代码生成效果最好
- 哪些 Prompt 模板最有用
- 遇到了哪些新问题

## 下月计划
- 重点优化方向
- 新模板开发计划
```

### 持续优化循环

```
收集数据 → 分析问题 → 改进措施 → 观察效果 → 收集数据 →
```

**关键点：**
1. **小步快跑** - 每次改进一个小问题
2. **数据驱动** - 基于实际数据而非猜测
3. **记录变化** - 记录每次优化的效果
4. **保持简单** - 不要过度复杂化

### 常见优化方向

#### 1. Prompt 模板优化

**发现：** 某类组件经常缺少 PropTypes

**优化：** 在模板中添加明确要求
```markdown
**强制要求：**
- 所有 Props 必须定义 PropTypes
- 示例如下：
ComponentName.propTypes = {
  ...
}
```

#### 2. 规范配置调整

**发现：** ESLint 某条规则经常被违反

**优化：** 调整规则严格度或添加说明
```javascript
// .eslintrc.js
rules: {
  'react/prop-types': 'error', // 提升到 error 级别
}
```

#### 3. 示例代码补充

**发现：** 某类功能生成效果不好

**优化：** 在文档中添加优秀示例
```markdown
// 在 04-templates.md 中添加新模板
### 模板 X：功能名称
...
```

#### 4. 上下文信息增强

**发现：** AI 经常不了解项目约定

**优化：** 在项目根目录添加 .ai-context.md
```markdown
# 项目上下文

## 特殊约定
- 用户相关组件统一放在 src/modules/user/
- API 请求必须使用 retry 机制
- ...
```

---

## 快速开始监控

### 最小化方案

如果暂时不想实现完整的监控，可以从以下简单方式开始：

#### 方案 1：手动记录（最简单）

创建一个 markdown 文件记录：

```markdown
# AI 代码生成记录

## 2024-01-15
- ✅ 创建 UserList 组件 - 一次成功，质量好
- ❌ 创建 ProductForm 组件 - PropTypes 不完整，手动补充
- ✅ 添加 getUserList API - 完美

## 问题记录
- [ ] PropTypes 经常遗漏，需要在 Prompt 中强调

## 优化记录
- 2024-01-16: 更新组件创建模板，强调 PropTypes
```

#### 方案 2：Git Commit Message

利用 Git 提交信息记录：

```bash
git commit -m "feat(user): 创建 UserList 组件 [AI-Generated] [Quality:High]"
```

后续可以用 git log 查看：

```bash
git log --grep="AI-Generated"
```

#### 方案 3：简单的 JSON 文件

```json
// .ai-log.json
{
  "generations": [
    {
      "date": "2024-01-15",
      "type": "create-component",
      "name": "UserList",
      "result": "success",
      "quality": "high",
      "notes": "一次成功，无需修改"
    }
  ]
}
```

### 从简单开始

**建议路径：**
1. **第 1 周：** 使用手动记录，感受监控价值
2. **第 2-4 周：** 根据记录发现问题，做简单优化
3. **第 1 个月后：** 如果觉得有价值，考虑使用自动化工具
4. **3 个月后：** 根据积累的数据建立完整的监控体系

---

## 总结

### 监控的价值

- **追踪进度** - 知道生成了多少代码
- **发现问题** - 识别重复出现的问题
- **持续改进** - 基于数据优化 Prompt 和规范
- **积累经验** - 建立自己的最佳实践库

### 核心原则

1. **从简单开始** - 不要一开始就追求完美
2. **保持轻量** - 监控本身不应成为负担
3. **定期回顾** - 数据收集后要定期查看和分析
4. **持续迭代** - 小步优化，逐步完善

### 实用工具建议

- **日志记录：** 简单的 JSON 文件 + Git commit message
- **数据分析：** Excel 或 Google Sheets
- **可视化：** 可选，有需要再考虑
- **自动化：** 从 Git hooks 开始，逐步完善

---

**完成！** 现在你已经了解了完整的 AI 代码生成质量保证框架。

**推荐阅读顺序：**
1. [README](./README.md) - 快速了解框架
2. [01-Prompt 工程与代码规范](./01-prompt-and-standards.md) - 重点阅读
3. [02-质量检查规范](./02-quality-check.md) - 选择合适的检查级别
4. [03-生成流程与用户交互](./03-workflow.md) - 了解完整流程
5. [04-模板库与范例](./04-templates.md) - 参考实用模板
6. [05-监控与反馈](./05-monitoring.md) - 持续优化