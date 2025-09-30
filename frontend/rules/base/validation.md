# 生成前验证规则

> 在生成代码前必须执行的验证检查

## 验证流程

生成代码前按顺序执行以下验证：

1. 路径验证
2. 命名验证
3. 依赖检查
4. 冲突检测

## 1. 路径验证

### 组件路径验证

**全局组件**
```
✅ 正确：src/components/ComponentName/index.jsx
❌ 错误：src/components/ComponentName.jsx
❌ 错误：components/ComponentName/index.jsx
```

**页面组件**
```
✅ 正确：src/pages/PageName/components/ComponentName/index.jsx
❌ 错误：src/components/ComponentName/index.jsx（应该在页面下）
```

**路径共享组件**
```
✅ 正确：src/pages/dashboard/components/SharedComponent/index.jsx
用于：dashboard 下多个页面共用
```

### 其他文件路径验证

**API 文件**
```
✅ 正确：src/api/user.js
✅ 正确：src/api/request.js（axios 实例）
```

**Context 文件**
```
✅ 正确：src/context/AuthContext.jsx
❌ 错误：src/context/auth.jsx
```

**Hook 文件**
```
✅ 正确：src/hooks/useAuth.js
❌ 错误：src/hooks/auth.js
```

### 路径验证规则

在生成前确认：

1. **组件类型判断**
   - 询问：这是全局组件还是页面组件？
   - 全局组件 → `src/components/`
   - 页面组件 → `src/pages/[PageName]/components/`

2. **文件夹结构**
   - 组件必须在文件夹内（不是单文件）
   - 包含 `index.jsx` 和 `styles.css`

3. **不可操作路径**
   - 不修改 `node_modules/`
   - 不修改 `dist/`、`build/`
   - 不修改 `.git/`

## 2. 命名验证

### 验证规则

```javascript
// 组件名验证
✅ UserCard, ProductList
❌ userCard, user_card

// 函数/变量名验证
✅ handleClick, isLoading
❌ HandleClick, is_loading

// 常量名验证
✅ API_BASE_URL, MAX_COUNT
❌ apiBaseUrl, maxCount

// CSS 类名验证（kebab-case）
✅ user-card, btn-primary
❌ userCard, btnPrimary

// Hook 名验证
✅ useAuth, useFetch
❌ auth, fetchHook

// Context 名验证
✅ AuthContext, ThemeContext
❌ Auth, authContext
```

### 命名冲突检查

生成前检查：

- [ ] 组件名是否与现有组件重复
- [ ] CSS 类名是否可能与全局样式冲突
- [ ] API 函数名是否在同文件中已存在
- [ ] Context 名称是否已被使用

## 3. 依赖检查

### 检查项目

**必须依赖**
- [ ] react (已安装)
- [ ] react-dom (已安装)
- [ ] axios (已安装)

**可选依赖**
```javascript
// 如果代码中使用了这些库，检查是否已安装
- prop-types (PropTypes 验证)
- classnames (类名合并)
- lodash (工具函数)
- dayjs (日期处理)
```

### 依赖缺失处理

如果检测到缺少依赖：

```markdown
⚠️ 依赖检查警告

缺少依赖包：dayjs
引用位置：src/utils/format.js

建议操作：
```bash
pnpm install dayjs
```

是否继续？
1. 安装依赖后继续
2. 使用原生实现替代
3. 取消生成
```

### 导入路径检查

检查导入的组件/模块是否存在：

```javascript
// 检查导入
import UserCard from '@/components/UserCard'
// 验证：src/components/UserCard/index.jsx 是否存在

import { userAPI } from '@/api/user'
// 验证：src/api/user.js 是否存在且导出 userAPI
```

## 4. 冲突检测

### 文件冲突

**新建文件**
```
检查：目标路径是否已存在文件

如果存在：
  - 提示文件已存在
  - 询问处理方式：
    1. 覆盖（需二次确认）
    2. 创建新版本（加后缀）
    3. 取消操作
```

**修改文件**
```
检查：文件是否为重要文件

重要文件清单：
  - src/main.jsx
  - src/App.jsx
  - vite.config.js
  - package.json

如果是重要文件：
  - 显示将要修改的内容
  - 要求明确确认
```

### 代码冲突

**API 函数名冲突**
```javascript
// 检查 src/api/user.js 中是否已有同名函数
export function getUserList() {}  // 已存在

// 处理方式：
1. 在现有函数基础上修改
2. 重命名新函数
3. 取消生成
```

**CSS 类名冲突**
```css
/* 检查全局样式中是否已有同名类 */
.user-card {}  /* 如果全局样式中已存在 */

/* 处理方式：*/
1. 使用更具体的类名（添加页面前缀）
2. 使用 BEM 避免冲突
3. 确认覆盖
```

### 业务逻辑冲突

检查是否会影响现有功能：

```markdown
⚠️ 业务逻辑冲突警告

将要修改：src/pages/UserManagement/index.jsx

现有功能：
- 用户列表展示
- 用户搜索
- 用户编辑

新增功能：
- 批量删除

可能影响：
- 选择状态管理
- 列表刷新逻辑

建议：
1. 查看现有代码再决定
2. 创建新组件而非修改现有组件
```

## 验证报告模板

```markdown
# 生成前验证报告

## 目标
创建用户列表组件

## 验证结果

### ✅ 路径验证
- [x] 路径符合规范：src/pages/UserManagement/components/UserList/index.jsx
- [x] 文件夹结构正确

### ✅ 命名验证
- [x] 组件名 UserList 符合 PascalCase
- [x] CSS 类名使用 kebab-case

### ✅ 依赖检查
- [x] React 已安装
- [x] axios 已安装
- [x] 无缺失依赖

### ✅ 冲突检测
- [x] 无文件冲突
- [x] 无命名冲突
- [x] 无业务逻辑冲突

## 结论
验证通过，可以继续生成代码。

---

按 Enter 继续，或输入 'cancel' 取消操作。
```

## 验证失败处理

如果验证失败，必须：

1. **清晰说明问题**
   - 哪一项验证失败
   - 具体是什么问题

2. **提供建议方案**
   - 如何修正问题
   - 备选方案

3. **等待用户决定**
   - 修正后重试
   - 忽略警告继续（需明确确认）
   - 取消操作

## 快速验证检查清单

生成代码前快速检查：

- [ ] 文件路径正确（全局/页面组件）
- [ ] 使用文件夹形式（不是单文件）
- [ ] 命名符合规范（PascalCase/camelCase）
- [ ] 无明显的命名冲突
- [ ] 必需依赖已安装
- [ ] 不会覆盖重要文件（或已确认）
- [ ] 导入的组件/模块存在