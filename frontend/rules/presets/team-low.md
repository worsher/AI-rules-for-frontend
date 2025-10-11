# 小组项目 - 低质量级别

> 团队快速验证或一次性活动页，建议谨慎使用并规划后续升级

## 组合说明

- **基础规范**：[`base/common.md`](../base/common.md)、[`base/naming.md`](../base/naming.md)、[`base/validation.md`](../base/validation.md)
- **项目类型**：[`project-type/team.md`](../project-type/team.md)
- **质量级别**：[`quality-level/low.md`](../quality-level/low.md)
- **可选拓展**：按需叠加 [`base/responsive.md`](../base/responsive.md) 等模块

## 使用本规范

```markdown
请使用以下规范生成代码：
- 项目类型：小组项目（3-5 人）
- 质量级别：低
- 技术栈：React + Vite + Axios + pnpm
```

## 核心要求（最低保障）

1. **能上线**：`npm run build` 通过，基本功能可用。
2. **基础约定**：保持组件目录结构与命名规范，便于后续重构。
3. **冲突控制**：合并前至少自检一次，避免彼此覆盖。
4. **风险标注**：在代码或文档中清晰标记临时方案、待优化项。

## 可放宽的部分

- PropTypes、详细注释可按需省略，但需在后续迭代补齐。
- 测试可采用手动验证，保留最关键的自动化检查。
- 错误处理允许简化，但应提供用户可理解的提示。

## 建议做法

- 为每个模块指定责任人，记录交接时间与复盘计划。
- 临时页面结束后尽快清理、升级到 `team-medium` 或更高标准。
- 如需长期维护，请勿继续使用本预设。
