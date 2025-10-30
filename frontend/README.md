# AI 代码生成质量保证框架

> 基于 React + Axios + Vite 的 AI 代码生成规范与质量控制体系

## 📋 概述

本框架旨在确保 AI 生成的代码符合项目规范、保持高质量标准，同时提供灵活的配置以适应不同项目规模和开发效率需求。

## 🎯 核心目标

- **规范化**：确保 AI 生成的代码符合团队约定和行业最佳实践
- **质量保证**：通过多层次检查机制保证代码质量
- **可控性**：提供清晰的生成流程和人工审核节点
- **可配置**：支持单人项目和小组项目的不同需求
- **效率平衡**：提供高中低三档质量检查级别

## 📚 文档结构

### [01. Prompt 工程与代码规范](./01-prompt-and-standards.md) ⭐️ 重点
深入讲解如何通过 Prompt 工程确保代码质量，包含：
- **Prompt 设计模式**：系统提示词、上下文管理、场景化模板
- **单人项目代码规范**：轻量级规范，注重开发效率
- **小组项目代码规范**（3-5人）：协作规范，注重一致性和可维护性
- **生成前验证规则**：路径、命名、依赖、冲突检测

### [02. 质量检查规范](./02-quality-check.md)
三档质量检查配置，平衡质量与效率：
- **高级别**：最严格标准，适合核心模块和生产代码
- **中级别**：平衡质量与效率，适合常规开发
- **低级别**：快速开发模式，适合原型和实验性功能

### [03. 生成流程与用户交互](./03-workflow.md)
定义清晰的代码生成流程：
- 计划 → 预览 → 确认 → 生成 → 检查 → 应用
- 差异对比、分步确认、回滚机制

### [04. 模板库与范例](./04-templates.md)
实用的代码模板和最佳实践范例：
- 组件模板（全局组件、页面组件）
- API 请求模板
- 状态管理模板
- 常见场景示例

### [05. 监控与反馈](./05-monitoring.md)
轻量级监控方案：
- 生成日志记录
- 质量统计
- Prompt 效果优化

## 🚀 快速开始

### 快速开始矩阵

| 项目 | 质量级别 | 推荐预设 |
|---|---|---|
| 单人 | 高 | `frontend/rules/presets/solo-medium.md` + `quality-level/high.*` |
| 单人 | 中 | `frontend/rules/presets/solo-medium.md` + `quality-level/medium.*` |
| 单人 | 低 | `frontend/rules/presets/solo-low.md` + `quality-level/low.*` |
| 小组(3-5) | 高 | `frontend/rules/presets/team-high.md` + `quality-level/high.*` |
| 小组(3-5) | 中 | `frontend/rules/presets/team-medium.md` + `quality-level/medium.*` |
| 小组(3-5) | 低 | `frontend/rules/presets/team-low.md` + `quality-level/low.*` |

可选：Less 或 i18n 变体见 `frontend/rules/presets/*-less.md`、`*-i18n.md`。

### 1. 选择项目规范

根据团队规模选择对应的代码规范配置（亦可参考预设索引 `frontend/rules/presets/index.json`）：

```bash
# 单人项目 - 轻量级配置
cp config/solo-project.config.js .aiconfig.js

# 小组项目 (3-5人) - 协作配置
cp config/team-project.config.js .aiconfig.js
```

### 2. 选择质量检查级别

根据开发阶段和模块重要性选择检查级别：

```javascript
// .aiconfig.js
export default {
  qualityLevel: 'medium', // 'high' | 'medium' | 'low'
  // ...其他配置
}
```

或直接复制 ESLint/TS 配置：

```bash
# 高
cp frontend/rules/quality-level/high.eslintrc.js .eslintrc.js
cp frontend/rules/quality-level/high.tsconfig.json tsconfig.json

# 中
cp frontend/rules/quality-level/medium.eslintrc.js .eslintrc.js
cp frontend/rules/quality-level/medium.tsconfig.json tsconfig.json

# 低
cp frontend/rules/quality-level/low.eslintrc.js .eslintrc.js
cp frontend/rules/quality-level/low.tsconfig.json tsconfig.json
```

### 3. 配置 Prompt 上下文

在与 AI 对话前，提供必要的项目上下文：

```
请使用以下规范生成代码：
- 项目类型：[单人项目/小组项目]
- 质量级别：[高/中/低]
- 目标：[描述你要实现的功能]
- 约束：[特殊要求或限制]
```

快捷入口：优先阅读各文档顶部的「快速清单」
- 01 Prompt 与规范的清单：命名/目录/状态/a11y/i18n/验证
- 02 质量检查的清单：分级要求与测试/a11y/性能阈值
- 03 流程清单：设计到代码、计划、验证、回滚与安全

## 🔧 技术栈

- **框架**：React 18+
- **构建工具**：Vite 5+
- **HTTP 客户端**：Axios
- **包管理器**：pnpm
- **代码检查**：ESLint + Prettier
- **类型检查**：TypeScript（可选）

## 📖 使用建议

1. **新项目启动**：
   - 先阅读 [01-prompt-and-standards.md](./01-prompt-and-standards.md)
   - 选择合适的项目规范配置
   - 设置质量检查级别为"高"或"中"

2. **日常开发**：
   - 使用"中"级别质量检查
   - 参考 [04-templates.md](./04-templates.md) 中的模板
   - 遵循 [03-workflow.md](./03-workflow.md) 的生成流程

3. **快速原型**：
   - 使用"低"级别质量检查
   - 单人项目规范
   - 后续重构时提升检查级别

4. **核心模块**：
   - 使用"高"级别质量检查
   - 小组项目规范（即使是单人开发）
   - 严格遵循生成流程中的确认环节

## 🤝 配合使用

本框架可以与以下工具配合使用：

- **Git Hooks**：在提交前自动运行质量检查
- **CI/CD**：在构建流程中集成代码检查
- **IDE 插件**：实时提示规范违规
- **Code Review**：作为代码审查的参考标准

## ⚠️ 注意事项

1. AI 生成的代码**必须经过人工审查**，不应直接合并到生产代码
2. 对于涉及安全、支付等敏感功能，建议使用"高"级别检查或手动编写
3. 定期回顾生成日志，优化 Prompt 模板和规范配置
4. 本框架是指导性文档，具体执行需要配合实际工具实现

## 📝 版本说明

当前版本：v1.0.0

- 初始版本，包含完整的规范体系和质量检查机制
- 支持单人项目和小组项目（3-5人）两种配置
- 提供高中低三档质量检查级别

## 📄 许可

本文档采用 MIT 许可协议。