# 小组项目 - 中质量级别

> 面向 3-5 人团队的日常业务开发，兼顾效率与一致性

## 组合说明

- **基础规范**：[`base/common.md`](../base/common.md)、[`base/naming.md`](../base/naming.md)、[`base/validation.md`](../base/validation.md)
- **项目类型**：[`project-type/team.md`](../project-type/team.md)
- **质量级别**：[`quality-level/medium.md`](../quality-level/medium.md)
- **可选拓展**：根据项目增加 [`base/i18n.md`](../base/i18n.md)、[`base/styles-less.md`](../base/styles-less.md)、[`base/responsive.md`](../base/responsive.md)

## 使用本规范

```markdown
请使用以下规范生成代码：
- 项目类型：小组项目（3-5 人）
- 质量级别：中
- 技术栈：React + Vite + Axios + pnpm
```

## 核心要求

1. **代码规范**：ESLint 0 error（可接受少量 warning），统一使用 Prettier。
2. **组件约定**：组件目录包含 `index.jsx`、`styles.css`，复杂组件需 PropTypes 与 README。
3. **文档与注释**：重要逻辑给出简洁注释，公共模块补充使用说明。
4. **状态与 API**：统一使用 axios 实例；异步流程至少覆盖 loading、error、empty 三种 UI。
5. **协作流程**：提交信息规范、确保至少 1 名成员 Review，通过自动化检查后合并。

## 快速检查清单

- [ ] ESLint / Prettier 已执行
- [ ] 组件文件结构与命名符合约定
- [ ] PropTypes 覆盖外部暴露接口
- [ ] API 请求有错误处理与兜底提示
- [ ] 页面至少提供基础可访问性（按钮文本、图片 `alt` 等）

## 建议做法

- 将团队约定写入仓库 `CONTRIBUTING.md` 或 `README.md`，同步本预设内容。
- 使用 Git Hook（如 Husky）在提交前执行 lint、测试、构建。
- 重要模块可增加 Storybook / 单元测试，便于协作与回归。
