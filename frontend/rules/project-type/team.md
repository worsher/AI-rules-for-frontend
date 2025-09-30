# 小组项目规范（3-5人）

> 适用于小团队协作，注重代码一致性和可维护性

## 总体原则

- **一致性优先**：团队约定高于个人习惯
- **可维护性**：代码应该易于他人理解和修改
- **文档化**：复杂逻辑必须有注释和文档
- **代码审查**：所有代码需要经过 Review

## 组件规范（严格）

### 文件结构（必须）

```
ComponentName/
├── index.jsx          # 必须
├── styles.css         # 必须
└── README.md          # 复杂组件必须
```

### PropTypes（必须）

```jsx
import PropTypes from 'prop-types'

/**
 * 用户卡片组件
 * @component
 */
function UserCard({ user, size, onClick }) {
  return <div>{user.name}</div>
}

// ✅ 必须：完整的 PropTypes 定义
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
}

// ✅ 必须：定义 defaultProps
UserCard.defaultProps = {
  size: 'medium',
}

export default UserCard
```

### 注释要求（严格）

```jsx
/**
 * 用户卡片组件
 * 展示用户基本信息，支持点击交互
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - 用户信息对象
 * @param {number} props.user.id - 用户 ID
 * @param {string} props.user.name - 用户姓名
 * @param {Function} [props.onClick] - 点击回调
 * @example
 * <UserCard user={userData} onClick={handleClick} />
 */
function UserCard({ user, onClick }) {
  // 事件处理：用户卡片点击
  const handleClick = () => {
    onClick?.(user.id)
  }

  return <div onClick={handleClick}>{user.name}</div>
}
```

### 复杂组件文档（必须）

```markdown
<!-- components/UserCard/README.md -->
# UserCard 组件

## 功能说明
展示用户基本信息的卡片组件

## Props
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| user | Object | 是 | - | 用户信息 |
| onClick | Function | 否 | - | 点击回调 |

## 使用示例
\```jsx
<UserCard user={userData} onClick={handleClick} />
\```

## 更新日志
- 2024-01-15: 初始版本
```

## 样式规范（BEM）

### 必须使用 BEM 命名

```css
/* ✅ 正确：BEM 规范 */
.user-card {
  display: flex;
}

.user-card__avatar {
  width: 60px;
  height: 60px;
}

.user-card__name {
  font-size: 16px;
}

.user-card--large {
  padding: 24px;
}

.user-card--large .user-card__avatar {
  width: 80px;
  height: 80px;
}

/* ❌ 错误：不使用 BEM */
.user-card .avatar {
  width: 60px;
}
```

### CSS 变量（必须使用）

```css
/* 必须使用项目定义的 CSS 变量 */
.user-card {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  color: var(--text-primary);
}

/* ❌ 不要硬编码值 */
.user-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  color: #333;
}
```

## API 请求（严格）

### 完整的错误处理（必须）

```jsx
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await userAPI.getList()
      setUsers(data)
    } catch (err) {
      // ✅ 用户友好的错误信息
      setError('加载用户列表失败，请稍后重试')
      console.error('Load users failed:', err)
      // 可选：上报错误到监控系统
    } finally {
      setLoading(false)
    }
  }

  // ✅ 必须处理所有状态
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={loadUsers} />
  if (users.length === 0) return <EmptyState />

  return <div>{/* 渲染列表 */}</div>
}
```

### API 函数文档（必须）

```javascript
/**
 * 获取用户列表
 * @param {Object} params
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=10] - 每页数量
 * @param {string} [params.keyword] - 搜索关键词
 * @returns {Promise<{list: Array, total: number}>}
 * @throws {Error} 网络错误或服务器错误
 */
export function getUserList(params) {
  return request({
    url: '/users',
    method: 'GET',
    params,
  })
}
```

## 状态管理（规范）

### Context 结构（标准）

```jsx
// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)

/**
 * 认证 Context Provider
 * 管理用户登录状态
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (credentials) => {
    setLoading(true)
    try {
      const userData = await authAPI.login(credentials)
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * 使用认证 Context
 * @returns {Object} Auth context value
 * @throws {Error} 如果在 AuthProvider 外使用
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### 禁止深层 Props Drilling

```jsx
// ❌ 错误：深层传递（超过 2 层）
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data}>
      <GreatGrandChild data={data} />
    </GrandChild>
  </Child>
</Parent>

// ✅ 正确：使用 Context
<DataProvider value={data}>
  <Parent>
    <Child>
      <GrandChild>
        <GreatGrandChild />
      </GrandChild>
    </Child>
  </Parent>
</DataProvider>
```

## 文档要求（完整）

### 必须的文档

1. **项目 README**
   - 项目介绍
   - 技术栈
   - 安装和启动
   - 目录结构
   - 开发规范

2. **复杂组件 README**（20+ 行或有内部状态）
   - 功能说明
   - Props 接口
   - 使用示例
   - 更新日志

3. **API 文档**
   - 接口列表
   - 参数说明
   - 返回格式
   - 错误码

### 代码注释要求

```javascript
// ✅ 必须：导出的函数有 JSDoc
/**
 * 格式化用户姓名
 * @param {Object} user - 用户对象
 * @returns {string} 格式化后的姓名
 */
export function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`
}

// ✅ 必须：复杂逻辑有注释
function calculateDiscount(items) {
  // 第一步：计算商品总价
  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  // 第二步：根据总价计算折扣
  // 满100减10，满200减30，满500减100
  let discount = 0
  if (subtotal >= 500) {
    discount = 100
  } else if (subtotal >= 200) {
    discount = 30
  } else if (subtotal >= 100) {
    discount = 10
  }

  return discount
}

// ✅ 必须：TODO 注明负责人和日期
// TODO: 添加多语言支持 - 张三 2024-01-15
// FIXME: 修复 Safari 下的样式问题 - 李四 2024-01-16
```

## 代码审查（必须）

### Review 要点

1. **功能完整性**
   - 是否实现了需求
   - 是否有遗漏的边界情况

2. **代码规范**
   - 命名是否规范
   - 结构是否清晰
   - 是否有 PropTypes

3. **错误处理**
   - 是否有完整的错误处理
   - 错误信息是否友好

4. **性能考虑**
   - 是否有明显的性能问题
   - 是否需要优化

5. **文档完整性**
   - 复杂组件是否有 README
   - 注释是否完整

### Review 流程

```
1. 提交 PR
2. 自动检查（ESLint, Build）
3. 至少 1 人 Review
4. 修改意见
5. 再次 Review
6. 合并
```

## Git 提交规范（必须）

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**
- feat: 新功能
- fix: Bug 修复
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- perf: 性能优化
- test: 测试
- chore: 构建/工具

**示例：**
```bash
feat(user): 添加用户搜索功能

- 实现按姓名和邮箱搜索
- 添加防抖处理（300ms）
- 搜索结果高亮显示

Closes #123
```

### 分支命名规范

```
feature/用户搜索功能
fix/修复登录bug
docs/更新API文档
refactor/重构用户模块
```

## 常量管理（必须）

```javascript
// src/constants/index.js

/**
 * 用户状态
 */
export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
  BANNED: -1,
}

/**
 * API 响应码
 */
export const API_CODE = {
  SUCCESS: 0,
  ERROR: -1,
  UNAUTHORIZED: 401,
}

// ✅ 使用常量
if (user.status === USER_STATUS.ACTIVE) {
  // ...
}

// ❌ 不要使用魔法数字
if (user.status === 1) {
  // ...
}
```

## 文件长度限制

```
✅ 强制要求：
- 组件文件 < 200 行
- 函数长度 < 50 行
- 圈复杂度 < 15

超过限制必须拆分
```

## 代码质量工具（必须配置）

### ESLint 配置

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'error',
    'react/prop-types': 'error',
    'complexity': ['error', 15],
    'max-lines-per-function': ['error', { max: 50 }],
  },
}
```

### Prettier 配置

```javascript
// .prettierrc.js
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
}
```

## 团队协作要点

### 代码所有权

- 所有代码属于团队，不是个人
- 任何人都可以修改任何代码
- 但必须经过 Review

### 沟通要求

- 重要决定需要团队讨论
- 架构变更需要提前沟通
- 遇到问题及时寻求帮助

### 知识分享

- 定期分享技术心得
- 文档化复杂功能
- Code Review 时学习交流

## 检查清单（完整版）

生成代码时必须检查：

- [ ] 文件路径正确
- [ ] 组件使用文件夹形式
- [ ] 有 PropTypes 定义
- [ ] 有 JSDoc 注释
- [ ] 复杂组件有 README
- [ ] CSS 使用 BEM 命名
- [ ] 使用 CSS 变量
- [ ] 完整的错误处理
- [ ] 处理所有状态（loading/error/empty）
- [ ] 无硬编码的配置
- [ ] 无明显的性能问题
- [ ] 符合 Git 提交规范

## 小组项目的优势

- **代码一致性**：易于维护和协作
- **知识共享**：团队成员互相学习
- **质量保证**：通过 Review 发现问题
- **长期价值**：降低维护成本

## 注意事项

- **尊重规范**：即使不完全认同，也要遵守团队约定
- **主动沟通**：遇到问题及时讨论，不要闷头解决
- **持续改进**：规范不是一成不变的，可以提出改进建议
- **互相帮助**：团队协作的核心是相互支持