# 单人项目 - 高质量级别

> 适合个人项目中的核心模块，需要长期维护与高可靠性

## 组合说明

- **基础规范**：[`base/common.md`](../base/common.md)、[`base/naming.md`](../base/naming.md)、[`base/validation.md`](../base/validation.md)
- **项目类型**：[`project-type/solo.md`](../project-type/solo.md)
- **质量级别**：[`quality-level/high.md`](../quality-level/high.md)
- **可选拓展**：按需叠加 [`base/i18n.md`](../base/i18n.md)、[`base/responsive.md`](../base/responsive.md) 等模块

## 使用本规范

```markdown
请使用以下规范生成代码：
- 项目类型：单人项目
- 质量级别：高
- 技术栈：React + Vite + Axios + pnpm
```

## 核心要求

1. **代码规范**：ESLint 必须 0 error / 0 warning，保持文件 < 200 行、函数 < 50 行。
2. **类型与文档**：所有组件、导出函数都需 PropTypes/JSDoc；复杂组件补充 README。
3. **错误处理**：所有异步操作需要完整的 loading / error / empty 状态处理。
4. **性能优化**：使用 `useMemo`、`useCallback` 避免重复计算，大型列表需虚拟滚动或懒加载。
5. **可访问性**：图片提供 `alt`，交互组件支持键盘操作及适当 `aria-*` 属性。

## 快速检查清单

- [ ] ESLint / Prettier 已执行且通过
- [ ] 无 `console.log`、`debugger`、大段注释代码
- [ ] PropTypes + 默认值声明完整
- [ ] API 请求写有 JSDoc 并处理错误
- [ ] UI 状态覆盖 loading / error / empty

## 建议做法

- 将关键逻辑拆分为 `hooks/` 或 `utils/`，并添加单元测试。
- 对复杂组件维护 `README.md`，记录约定、用例与更新日志。
- 若涉及国际化、响应式，优先复用已有基础模块，避免在预设中重复定义。
