# 单人项目 - 低质量级别

> 用于临时页面、概念验证或一次性脚本，优先快速产出

## 组合说明

- **基础规范**：[`base/common.md`](../base/common.md)、[`base/naming.md`](../base/naming.md)
- **项目类型**：[`project-type/solo.md`](../project-type/solo.md)
- **质量级别**：[`quality-level/low.md`](../quality-level/low.md)
- **可选拓展**：按需叠加 [`base/styles-less.md`](../base/styles-less.md)、[`base/responsive.md`](../base/responsive.md) 等模块

## 使用本规范

```markdown
请使用以下规范生成代码：
- 项目类型：单人项目
- 质量级别：低
- 技术栈：React + Vite + Axios + pnpm
```

## 核心要求（保持最低限度）

1. **能运行即可**：`npm run build` 必须通过。
2. **基本结构**：组件仍使用文件夹结构（`index.jsx` + `styles.css`）。
3. **错误处理**：异步请求至少打印错误日志，避免应用直接崩溃。
4. **命名清晰**：遵守 CamelCase / PascalCase / kebab-case 约定，避免混乱。
5. **敏感信息**：依然禁止硬编码密钥、Token 等。

## 可放宽的部分

- PropTypes、默认值、详尽注释可按需省略。
- 可暂不拆分 hook / utils，适当内联逻辑。
- 样式可以更灵活，可混用内联样式满足临时需求。

## 建议做法

- 明确标注临时代码的位置与 TODO，便于后续重构。
- 若后续要投入生产，请尽快升级到 `solo-medium` 或 `solo-high` 规范。
