# Prompt 工程与代码规范

> 本文档是 AI 代码生成质量保证的核心，详细说明如何通过精心设计的 Prompt 和代码规范来确保生成代码的质量。

## 目录

- [第一部分：Prompt 工程基础](#第一部分prompt-工程基础)
- [第二部分：单人项目代码规范](#第二部分单人项目代码规范)
- [第三部分：小组项目代码规范](#第三部分小组项目代码规范-3-5人)
- [第四部分：生成前验证规则](#第四部分生成前验证规则)

---

## 第一部分：Prompt 工程基础

### 1.1 系统提示词设计

系统提示词是确保 AI 理解项目规范的基础，应该在每次会话开始时提供。

#### 基础结构模板

```markdown
# 项目信息
- 项目类型：[单人项目 / 3-5人小组项目]
- 技术栈：React 18 + Vite 5 + Axios + pnpm
- TypeScript：[是 / 否]
- 质量级别：[高 / 中 / 低]

# 代码规范
[根据项目类型引用对应规范章节]

# 当前任务上下文
- 目标：[具体功能描述]
- 涉及模块：[列出相关文件/组件]
- 约束条件：[特殊要求或限制]
```

#### 示例：单人项目系统提示词

```markdown
# 项目信息
- 项目类型：单人项目
- 技术栈：React 18 + Vite 5 + Axios + pnpm
- TypeScript：否
- 质量级别：中

# 代码规范要点
1. 组件使用文件夹形式创建（ComponentName/index.jsx + styles.css）
2. 全局组件放在 src/components，页面组件放在页面同级 components
3. 使用 Context 进行跨层级参数传递，避免深层 props drilling
4. API 请求统一使用 axios 实例，配置在 src/api
5. 页面级样式添加页面 id/class 避免全局污染
6. 包管理使用 pnpm

# 当前任务
生成一个用户信息展示卡片组件，需要从 API 获取数据并展示用户头像、姓名、简介。
```

### 1.2 上下文管理策略

#### 上下文分层

将项目上下文分为三个层级：

**1. 全局上下文（会话级别）**
- 项目技术栈和架构
- 代码规范配置
- 目录结构说明
- 全局依赖和工具

**2. 模块上下文（功能级别）**
- 当前模块的业务逻辑
- 相关组件和 API 接口
- 数据流和状态管理
- 已有代码片段

**3. 任务上下文（操作级别）**
- 具体要实现的功能
- 输入输出要求
- 边界条件和异常处理
- 性能和体验要求

#### 上下文提供模板

```markdown
# 全局上下文
项目目录结构：
src/
├── components/     # 全局组件
├── pages/          # 页面
├── api/            # API 请求
├── context/        # React Context
├── hooks/          # 自定义 Hooks
├── utils/          # 工具函数
└── assets/         # 静态资源

已安装依赖：
- axios: ^1.6.0
- react: ^18.2.0
- react-router-dom: ^6.20.0

# 模块上下文
当前模块：用户管理
相关文件：
- src/pages/UserManagement/index.jsx
- src/api/user.js
- src/context/UserContext.jsx

数据流：
UserManagement → UserContext → UserCard → UserAPI

# 任务上下文
需求：在用户列表页面添加搜索过滤功能
要求：
- 支持按姓名和邮箱搜索
- 实时搜索（防抖 300ms）
- 搜索结果高亮显示
- 无结果时显示空状态
```

### 1.3 场景化 Prompt 模板

根据不同的开发场景，提供专门的 Prompt 模板。

#### 场景 1：创建新组件

```markdown
请创建一个新组件，要求如下：

**组件信息**
- 组件名：[ComponentName]
- 类型：[全局组件 / 页面组件]
- 位置：[根据类型确定路径]

**功能需求**
[详细描述组件功能]

**Props 接口**
- prop1: [类型] - [说明]
- prop2: [类型] - [说明]

**样式要求**
- [列出样式需求]
- [是否需要响应式]

**依赖项**
- [需要使用的第三方库]
- [需要引用的其他组件]

**注意事项**
- 遵循 [单人/小组] 项目规范
- 质量级别：[高/中/低]
- [其他特殊要求]
```

#### 场景 2：实现 API 请求

```markdown
请实现以下 API 请求功能：

**接口信息**
- 接口路径：[/api/...]
- 请求方法：[GET / POST / PUT / DELETE]
- 请求参数：
  ```javascript
  {
    param1: type, // 说明
    param2: type, // 说明
  }
  ```

**响应格式**
```javascript
{
  code: number,
  data: {
    // 数据结构
  },
  message: string
}
```

**功能要求**
- 使用 axios 实例（src/api/request.js）
- 添加错误处理和提示
- [是否需要 loading 状态]
- [是否需要重试机制]

**规范要求**
- 遵循 API 请求规范（见 2.5 节）
- 错误信息用户友好
- 添加请求/响应日志（开发环境）
```

#### 场景 3：状态管理（Context）

```markdown
请实现一个 React Context 用于管理 [业务名称] 状态：

**状态结构**
```javascript
{
  state1: type, // 说明
  state2: type, // 说明
}
```

**操作方法**
- method1: [功能说明]
- method2: [功能说明]

**使用范围**
- [哪些组件需要访问此状态]

**持久化要求**
- [是否需要 localStorage]
- [是否需要同步到服务器]

**规范要求**
- 遵循 Context 规范（见 2.6 节）
- 提供 Provider 和自定义 Hook
- 添加类型检查（PropTypes 或 TypeScript）
```

#### 场景 4：重构现有代码

```markdown
请重构以下代码以符合规范：

**原代码**
```javascript
[粘贴需要重构的代码]
```

**重构目标**
- [列出需要改进的点]
- [性能优化需求]
- [可读性改进需求]

**规范要求**
- 遵循 [单人/小组] 项目规范
- 保持功能不变
- 添加必要的注释
- [是否需要拆分组件]

**测试要求**
- [是否需要保证向后兼容]
- [关键测试点]
```

### 1.4 Prompt 最佳实践

#### ✅ DO - 推荐做法

1. **提供完整的上下文**
   ```markdown
   ❌ 不好：帮我写一个按钮组件
   ✅ 好：请创建一个全局按钮组件，支持 primary/secondary 两种样式，
         包含 loading 状态，按照单人项目规范，放在 src/components/Button
   ```

2. **明确约束条件**
   ```markdown
   ✅ 必须使用现有的 src/api/request.js axios 实例
   ✅ 不要使用内联样式，创建单独的 styles.css
   ✅ 组件必须支持 ref 转发
   ```

3. **分步骤执行复杂任务**
   ```markdown
   第一步：创建基础组件结构
   第二步：实现数据获取逻辑
   第三步：添加错误处理
   第四步：优化性能（添加 memo 和 useMemo）
   ```

4. **引用已有代码作为示例**
   ```markdown
   参考 src/components/UserCard 的实现方式，创建一个类似的 ProductCard 组件
   ```

#### ❌ DON'T - 避免做法

1. **模糊的需求描述**
   ```markdown
   ❌ 帮我做一个用户页面
   ```

2. **缺少技术约束**
   ```markdown
   ❌ 实现一个状态管理
   （没有说明使用 Context/Redux/Zustand）
   ```

3. **一次性提出过多需求**
   ```markdown
   ❌ 创建用户管理模块，包括列表、详情、编辑、删除、搜索、
       分页、导出、权限控制...
   （应该拆分成多个小任务）
   ```

---

## 第二部分：单人项目代码规范

> 适用于个人开发者的轻量级规范，注重开发效率和快速迭代。

### 2.1 总体原则

- **简洁优先**：避免过度设计，优先选择简单直接的方案
- **快速迭代**：允许先实现功能，后续优化
- **自我一致**：保持个人编码风格的一致性
- **可读性**：代码应该是自解释的，减少文档依赖

### 2.2 目录结构规范

```
project-root/
├── src/
│   ├── components/          # 全局组件
│   │   ├── Button/
│   │   │   ├── index.jsx
│   │   │   └── styles.css
│   │   └── Modal/
│   │       ├── index.jsx
│   │       └── styles.css
│   │
│   ├── pages/               # 页面
│   │   ├── Home/
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
│   │   │   └── components/  # 页面私有组件
│   │   │       └── HomeCard/
│   │   └── About/
│   │
│   ├── api/                 # API 请求
│   │   ├── request.js       # axios 实例配置
│   │   ├── user.js          # 用户相关 API
│   │   └── product.js       # 产品相关 API
│   │
│   ├── context/             # React Context
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   ├── utils/               # 工具函数
│   │   ├── format.js
│   │   └── validate.js
│   │
│   ├── assets/              # 静态资源
│   │   ├── images/
│   │   └── styles/
│   │       └── global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── vite.config.js
```

### 2.3 组件规范

#### 组件创建规则

1. **组件使用文件夹形式**
   ```
   ✅ 正确
   components/Button/
   ├── index.jsx
   └── styles.css

   ❌ 错误
   components/Button.jsx
   components/Button.css
   ```

2. **组件分类**
   - **全局组件**：放在 `src/components/`，多个页面复用
   - **页面组件**：放在页面同级的 `components/`，仅当前页面使用
   - **路径共享组件**：如 `pages/dashboard/` 下多个页面共享，放在 `pages/dashboard/components/`

3. **组件命名**
   - 文件夹名：PascalCase（如 `UserCard`）
   - 文件名：`index.jsx` 和 `styles.css`
   - 组件名：与文件夹名一致

#### 组件代码结构

```jsx
// src/components/UserCard/index.jsx
import { useState } from 'react'
import './styles.css'

/**
 * 用户信息卡片组件
 * @param {Object} props
 * @param {Object} props.user - 用户信息对象
 * @param {Function} props.onClick - 点击回调
 */
function UserCard({ user, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  // 事件处理函数
  const handleClick = () => {
    onClick?.(user.id)
  }

  return (
    <div
      className="user-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
    </div>
  )
}

export default UserCard
```

### 2.4 样式规范

#### 样式组织原则

1. **作用域分离**
   - **全局样式**：`src/assets/styles/global.css`（重置样式、通用类）
   - **页面样式**：页面文件夹内的 `styles.css`（添加页面 id/class 前缀）
   - **组件样式**：组件文件夹内的 `styles.css`（使用组件 class 前缀）

2. **避免样式污染**
   ```css
   /* ✅ 正确 - 页面级样式添加前缀 */
   /* pages/Home/styles.css */
   .home-page {
     padding: 20px;
   }

   .home-page .hero-section {
     background: #f0f0f0;
   }

   /* ❌ 错误 - 直接使用通用类名 */
   .hero-section {
     background: #f0f0f0;
   }
   ```

3. **组件样式命名**
   ```css
   /* components/UserCard/styles.css */
   .user-card {
     border: 1px solid #ddd;
     border-radius: 8px;
   }

   .user-card img {
     width: 60px;
     height: 60px;
     border-radius: 50%;
   }

   .user-card h3 {
     margin: 10px 0 5px;
   }
   ```

#### 全局样式管理

```css
/* src/assets/styles/global.css */

/* CSS 变量 */
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --error-color: #ff4d4f;
  --text-color: #333;
  --border-color: #d9d9d9;
  --border-radius: 4px;
}

/* 重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 通用工具类 */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 2.5 API 请求规范

#### axios 实例配置

```javascript
// src/api/request.js
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 开发环境日志
    if (import.meta.env.DEV) {
      console.log('Request:', config.method.toUpperCase(), config.url, config.data)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 开发环境日志
    if (import.meta.env.DEV) {
      console.log('Response:', response.config.url, response.data)
    }

    return response.data
  },
  (error) => {
    // 统一错误处理
    const message = error.response?.data?.message || '请求失败'
    console.error('API Error:', message)

    // 可以在这里添加全局错误提示
    // showToast(message)

    return Promise.reject(error)
  }
)

export default request
```

#### API 模块组织

```javascript
// src/api/user.js
import request from './request'

export const userAPI = {
  // 获取用户列表
  getList(params) {
    return request({
      url: '/users',
      method: 'GET',
      params,
    })
  },

  // 获取用户详情
  getDetail(id) {
    return request({
      url: `/users/${id}`,
      method: 'GET',
    })
  },

  // 创建用户
  create(data) {
    return request({
      url: '/users',
      method: 'POST',
      data,
    })
  },

  // 更新用户
  update(id, data) {
    return request({
      url: `/users/${id}`,
      method: 'PUT',
      data,
    })
  },

  // 删除用户
  delete(id) {
    return request({
      url: `/users/${id}`,
      method: 'DELETE',
    })
  },
}
```

#### 在组件中使用

```jsx
import { useState, useEffect } from 'react'
import { userAPI } from '../api/user'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await userAPI.getList()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### 2.6 状态管理规范（Context）

#### Context 文件结构

```javascript
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

// 创建 Context
const AuthContext = createContext(null)

// Provider 组件
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 初始化：从 localStorage 恢复用户信息
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // 登录
  const login = async (credentials) => {
    // API 调用
    const userData = await loginAPI(credentials)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // 登出
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

// 自定义 Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

#### Context 使用示例

```jsx
// main.jsx
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)

// 在组件中使用
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header>
      {user ? (
        <>
          <span>欢迎，{user.name}</span>
          <button onClick={logout}>退出</button>
        </>
      ) : (
        <span>未登录</span>
      )}
    </header>
  )
}
```

### 2.7 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `UserCard`, `ProductList` |
| 函数/变量 | camelCase | `handleClick`, `isLoading` |
| 常量 | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_COUNT` |
| CSS 类名 | kebab-case | `user-card`, `btn-primary` |
| 文件夹 | PascalCase（组件）<br>camelCase（其他） | `components/Button`<br>`utils/format` |
| API 文件 | camelCase | `api/user.js`, `api/product.js` |
| Hook | use 前缀 + camelCase | `useAuth`, `useFetch` |

### 2.8 单人项目快速检查清单

生成代码前，AI 应该检查：

- [ ] 文件路径是否正确（全局组件 vs 页面组件）
- [ ] 组件是否使用文件夹形式
- [ ] 样式是否有合适的 class 前缀
- [ ] API 请求是否使用统一的 axios 实例
- [ ] 跨层级数据传递是否考虑使用 Context
- [ ] 是否有明显的代码重复（可提取工具函数/组件）

---

## 第三部分：小组项目代码规范 (3-5人)

> 在单人项目规范基础上，增加协作相关规范，注重代码一致性和可维护性。

### 3.1 总体原则

- **一致性优先**：团队约定高于个人习惯
- **可维护性**：代码应该易于他人理解和修改
- **文档化**：复杂逻辑必须有注释和文档
- **代码审查**：所有代码需要经过 Review

### 3.2 增强的目录结构

```
project-root/
├── src/
│   ├── components/          # 全局组件
│   │   ├── Button/
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
│   │   │   └── README.md    # 复杂组件必须有文档
│   │   └── ...
│   │
│   ├── pages/
│   ├── api/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── constants/           # 常量定义（新增）
│   │   └── index.js
│   ├── types/               # TypeScript 类型（如使用 TS）
│   │   └── user.ts
│   └── assets/
│
├── docs/                    # 项目文档（新增）
│   ├── api.md              # API 接口文档
│   ├── components.md       # 组件库文档
│   └── workflow.md         # 开发流程
│
├── .eslintrc.js            # 必需
├── .prettierrc.js          # 必需
├── .env.development        # 环境配置
├── .env.production
└── README.md               # 项目说明
```

### 3.3 组件规范（增强版）

#### 组件文档要求

**简单组件**（5-20 行）：
- 顶部 JSDoc 注释说明功能和 Props

**复杂组件**（20+ 行 或 有内部状态/逻辑）：
- JSDoc 注释
- 单独的 README.md 文件

```markdown
<!-- components/UserCard/README.md -->
# UserCard 组件

## 功能说明
展示用户基本信息的卡片组件，支持头像、姓名、简介展示，以及点击交互。

## Props

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| user | Object | 是 | - | 用户信息对象 |
| user.id | number | 是 | - | 用户 ID |
| user.name | string | 是 | - | 用户姓名 |
| user.avatar | string | 否 | - | 头像 URL |
| user.bio | string | 否 | - | 用户简介 |
| onClick | Function | 否 | - | 点击回调，参数为 userId |
| size | 'small' \| 'medium' \| 'large' | 否 | 'medium' | 卡片尺寸 |

## 使用示例

```jsx
import UserCard from '@/components/UserCard'

function UserList() {
  const handleUserClick = (userId) => {
    console.log('Clicked user:', userId)
  }

  return (
    <UserCard
      user={{
        id: 1,
        name: '张三',
        avatar: 'https://...',
        bio: '前端工程师'
      }}
      onClick={handleUserClick}
      size="large"
    />
  )
}
```

## 更新日志

- 2024-01-15: 初始版本
- 2024-01-20: 添加 size 属性支持
```

#### 组件代码规范（增强）

```jsx
// src/components/UserCard/index.jsx
import { useState } from 'react'
import PropTypes from 'prop-types' // 小组项目必须使用 PropTypes
import './styles.css'

/**
 * 用户信息卡片组件
 * @component
 * @param {Object} props
 * @param {Object} props.user - 用户信息对象
 * @param {number} props.user.id - 用户 ID
 * @param {string} props.user.name - 用户姓名
 * @param {string} [props.user.avatar] - 头像 URL
 * @param {string} [props.user.bio] - 用户简介
 * @param {Function} [props.onClick] - 点击回调
 * @param {'small'|'medium'|'large'} [props.size='medium'] - 卡片尺寸
 */
function UserCard({ user, onClick, size = 'medium' }) {
  const [isHovered, setIsHovered] = useState(false)

  // 事件处理：点击卡片
  const handleClick = () => {
    onClick?.(user.id)
  }

  // 渲染：用户头像
  const renderAvatar = () => {
    if (!user.avatar) {
      return <div className="user-card__avatar-placeholder">{user.name[0]}</div>
    }
    return <img className="user-card__avatar" src={user.avatar} alt={user.name} />
  }

  return (
    <div
      className={`user-card user-card--${size} ${isHovered ? 'user-card--hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {renderAvatar()}
      <h3 className="user-card__name">{user.name}</h3>
      {user.bio && <p className="user-card__bio">{user.bio}</p>}
    </div>
  )
}

// PropTypes 验证
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

// 默认值
UserCard.defaultProps = {
  size: 'medium',
}

export default UserCard
```

### 3.4 样式规范（增强版）

#### BEM 命名规范

小组项目推荐使用 BEM（Block Element Modifier）命名规范：

```css
/* components/UserCard/styles.css */

/* Block */
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s;
}

/* Element */
.user-card__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-card__avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.user-card__name {
  margin: 10px 0 5px;
  font-size: 16px;
  font-weight: 600;
}

.user-card__bio {
  margin: 0;
  font-size: 14px;
  color: #666;
  text-align: center;
}

/* Modifier */
.user-card--small {
  padding: 10px;
}

.user-card--small .user-card__avatar {
  width: 40px;
  height: 40px;
}

.user-card--large {
  padding: 30px;
}

.user-card--large .user-card__avatar {
  width: 80px;
  height: 80px;
}

.user-card--hovered {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

#### CSS 变量统一管理

```css
/* assets/styles/variables.css */

:root {
  /* 颜色 */
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #ff4d4f;
  --text-primary: #333;
  --text-secondary: #666;
  --text-tertiary: #999;
  --border-color: #d9d9d9;
  --background-color: #f5f5f5;

  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* 圆角 */
  --border-radius-sm: 2px;
  --border-radius: 4px;
  --border-radius-lg: 8px;

  /* 阴影 */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);

  /* 动画 */
  --transition-fast: 0.15s;
  --transition: 0.3s;
  --transition-slow: 0.5s;
}
```

### 3.5 API 请求规范（增强版）

#### 错误处理增强

```javascript
// src/api/request.js
import axios from 'axios'
import { message } from '../utils/message' // 假设有全局提示组件

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加请求 ID 用于追踪
    config.headers['X-Request-ID'] = generateRequestId()

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data)
    }

    // 统一处理业务错误码
    const { code, data, message: msg } = response.data

    if (code !== 0) {
      message.error(msg || '请求失败')
      return Promise.reject(new Error(msg))
    }

    return data
  },
  (error) => {
    // HTTP 错误处理
    const status = error.response?.status
    const msg = error.response?.data?.message || error.message

    switch (status) {
      case 401:
        message.error('登录已过期，请重新登录')
        // 跳转到登录页
        window.location.href = '/login'
        break
      case 403:
        message.error('没有权限访问')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器错误')
        break
      default:
        message.error(msg || '请求失败')
    }

    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: error.config?.url,
        status,
        message: msg,
        error,
      })
    }

    return Promise.reject(error)
  }
)

// 生成请求 ID
function generateRequestId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export default request
```

#### API 模块组织（增强）

```javascript
// src/api/user.js

/**
 * 用户相关 API
 * @module api/user
 */

import request from './request'

/**
 * 获取用户列表
 * @param {Object} params
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=10] - 每页数量
 * @param {string} [params.keyword] - 搜索关键词
 * @returns {Promise<{list: Array, total: number}>}
 */
export function getUserList(params) {
  return request({
    url: '/users',
    method: 'GET',
    params,
  })
}

/**
 * 获取用户详情
 * @param {number} id - 用户 ID
 * @returns {Promise<Object>} 用户信息对象
 */
export function getUserDetail(id) {
  return request({
    url: `/users/${id}`,
    method: 'GET',
  })
}

/**
 * 创建用户
 * @param {Object} data
 * @param {string} data.name - 用户名
 * @param {string} data.email - 邮箱
 * @param {string} data.password - 密码
 * @returns {Promise<Object>} 创建的用户信息
 */
export function createUser(data) {
  return request({
    url: '/users',
    method: 'POST',
    data,
  })
}

/**
 * 更新用户
 * @param {number} id - 用户 ID
 * @param {Object} data - 要更新的字段
 * @returns {Promise<Object>} 更新后的用户信息
 */
export function updateUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 删除用户
 * @param {number} id - 用户 ID
 * @returns {Promise<void>}
 */
export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'DELETE',
  })
}

// 导出对象形式（可选，根据团队约定选择一种）
export const userAPI = {
  getList: getUserList,
  getDetail: getUserDetail,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
}
```

### 3.6 常量管理

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
 * 用户角色
 */
export const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
}

/**
 * 分页默认配置
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
}

/**
 * 本地存储键名
 */
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_info',
  THEME: 'theme_mode',
}

/**
 * API 响应状态码
 */
export const API_CODE = {
  SUCCESS: 0,
  ERROR: -1,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
}
```

### 3.7 代码注释规范

#### 函数/组件注释

使用 JSDoc 格式：

```javascript
/**
 * 格式化日期
 * @param {Date|string|number} date - 日期对象、日期字符串或时间戳
 * @param {string} [format='YYYY-MM-DD'] - 格式化模板
 * @returns {string} 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // => '2024-01-15 14:30:00'
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  // 实现...
}
```

#### 复杂逻辑注释

```javascript
function calculatePrice(items) {
  // 第一步：计算商品总价
  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  // 第二步：计算折扣
  // 满100减10，满200减30，满500减100
  let discount = 0
  if (subtotal >= 500) {
    discount = 100
  } else if (subtotal >= 200) {
    discount = 30
  } else if (subtotal >= 100) {
    discount = 10
  }

  // 第三步：计算运费
  // 满99包邮，否则运费10元
  const shipping = subtotal >= 99 ? 0 : 10

  // 返回最终价格
  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
  }
}
```

#### TODO 注释

```javascript
// TODO: 添加错误边界处理 - 张三 2024-01-15
// FIXME: 修复在 Safari 下的样式问题 - 李四 2024-01-16
// HACK: 临时方案，等待 API 修复后移除 - 王五 2024-01-17
// NOTE: 这里的逻辑比较复杂，修改前请先阅读设计文档
```

### 3.8 Git 提交规范

#### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

**示例：**
```
feat(user): 添加用户搜索功能

- 实现按姓名和邮箱搜索
- 添加防抖处理（300ms）
- 搜索结果高亮显示

Closes #123
```

### 3.9 小组项目检查清单（增强版）

生成代码前，AI 应该检查：

- [ ] 文件路径和命名是否符合规范
- [ ] 组件是否有 PropTypes 验证
- [ ] 复杂组件是否有 README.md
- [ ] 函数是否有 JSDoc 注释
- [ ] CSS 类名是否使用 BEM 规范
- [ ] 是否使用了统一的 CSS 变量
- [ ] API 请求是否有完整的错误处理
- [ ] 常量是否定义在 constants 目录
- [ ] 是否有代码重复（应提取复用）
- [ ] 是否有 TODO/FIXME 需要标注

---

## 第四部分：生成前验证规则

> 在 AI 生成代码之前，应该执行的自动化检查规则。

### 4.1 路径验证

#### 验证规则

```javascript
/**
 * 验证文件路径是否合法
 */
const pathValidation = {
  // 组件路径验证
  component: {
    // 全局组件必须在 src/components 下
    global: (path) => {
      return path.startsWith('src/components/')
    },

    // 页面组件必须在对应页面的 components 下
    page: (path, pagePath) => {
      return path.startsWith(`${pagePath}/components/`)
    },

    // 组件必须使用文件夹形式
    folder: (path) => {
      // 应该是 components/Button/index.jsx
      // 而不是 components/Button.jsx
      return /\/[A-Z][a-zA-Z]*\/index\.jsx$/.test(path)
    },
  },

  // API 文件路径验证
  api: (path) => {
    return path.startsWith('src/api/') && path.endsWith('.js')
  },

  // Context 路径验证
  context: (path) => {
    return path.startsWith('src/context/') && path.endsWith('Context.jsx')
  },

  // Hook 路径验证
  hook: (path) => {
    return path.startsWith('src/hooks/') && /use[A-Z][a-zA-Z]*\.js$/.test(path)
  },
}
```

#### 验证提示模板

```markdown
⚠️ 路径验证失败

问题：组件路径不符合规范
当前路径：src/components/UserCard.jsx
期望路径：src/components/UserCard/index.jsx

请确认：
1. 组件是否应该是全局组件？
2. 如果是页面组件，应该放在 pages/[PageName]/components/ 下
3. 组件必须使用文件夹形式（文件夹名/index.jsx）

是否继续？
```

### 4.2 命名验证

#### 验证规则

```javascript
/**
 * 命名规范验证
 */
const namingValidation = {
  // 组件名验证（PascalCase）
  component: (name) => {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name)
  },

  // 变量/函数名验证（camelCase）
  variable: (name) => {
    return /^[a-z][a-zA-Z0-9]*$/.test(name)
  },

  // 常量名验证（UPPER_SNAKE_CASE）
  constant: (name) => {
    return /^[A-Z][A-Z0-9_]*$/.test(name)
  },

  // CSS 类名验证（kebab-case 或 BEM）
  className: (name, isBEM = false) => {
    if (isBEM) {
      // BEM: block__element--modifier
      return /^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$/.test(name)
    } else {
      // kebab-case
      return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)
    }
  },

  // Hook 名验证（use 开头）
  hook: (name) => {
    return /^use[A-Z][a-zA-Z0-9]*$/.test(name)
  },

  // Context 名验证（以 Context 结尾）
  context: (name) => {
    return /^[A-Z][a-zA-Z0-9]*Context$/.test(name)
  },
}
```

#### 命名建议

```javascript
/**
 * 根据用途建议合适的命名
 */
const namingSuggestions = {
  // 布尔值应该用 is/has/should 等前缀
  boolean: ['is', 'has', 'should', 'can', 'will'],

  // 事件处理函数用 handle 前缀
  eventHandler: 'handle',

  // 数据获取函数用 fetch/get/load
  dataFetch: ['fetch', 'get', 'load'],

  // 数据提交函数用 submit/save/create/update/delete
  dataSubmit: ['submit', 'save', 'create', 'update', 'delete'],
}
```

### 4.3 依赖检查

#### 验证规则

```javascript
/**
 * 依赖项检查
 */
const dependencyCheck = {
  // 检查 package.json 中是否已安装
  installed: (packageName, packageJson) => {
    return (
      packageJson.dependencies?.[packageName] ||
      packageJson.devDependencies?.[packageName]
    )
  },

  // 检查导入的组件是否存在
  componentExists: async (importPath, projectRoot) => {
    const fs = require('fs')
    const path = require('path')

    const fullPath = path.join(projectRoot, importPath)

    // 检查文件夹形式
    const folderIndexPath = path.join(fullPath, 'index.jsx')
    if (fs.existsSync(folderIndexPath)) {
      return { exists: true, path: folderIndexPath }
    }

    // 检查直接文件
    if (fs.existsSync(`${fullPath}.jsx`)) {
      return { exists: true, path: `${fullPath}.jsx` }
    }

    return { exists: false, path: null }
  },

  // 检查 API 函数是否存在
  apiExists: (apiPath, functionName, projectRoot) => {
    // 读取 API 文件并解析
    // 检查是否导出了指定的函数
    // 返回验证结果
  },
}
```

#### 检查提示模板

```markdown
⚠️ 依赖检查警告

缺少依赖包：dayjs
引用位置：src/utils/format.js:3

建议操作：
```bash
pnpm install dayjs
```

是否继续生成代码？（代码中会保留 import，但运行前需要安装依赖）
```

### 4.4 冲突检测

#### 验证规则

```javascript
/**
 * 冲突检测
 */
const conflictDetection = {
  // 文件是否已存在
  fileExists: (filePath) => {
    const fs = require('fs')
    return fs.existsSync(filePath)
  },

  // 组件名是否重复
  componentNameConflict: (componentName, projectRoot) => {
    // 搜索项目中是否已有同名组件
    // 返回所有匹配的路径
  },

  // CSS 类名是否可能冲突
  classNameConflict: (className, scope) => {
    // 检查全局样式或同层级样式中是否有同名类
    // 特别注意页面样式可能影响其他页面的情况
  },

  // API 函数名是否重复
  apiFunctionConflict: (functionName, apiFile) => {
    // 检查 API 文件中是否已有同名导出
  },
}
```

#### 冲突处理策略

```markdown
🚨 检测到冲突

文件已存在：src/components/UserCard/index.jsx

处理方案（请选择）：
1. 覆盖现有文件（⚠️ 危险操作，请确保已备份）
2. 创建新版本（UserCard_v2）
3. 合并更改（需要人工参与）
4. 取消操作

推荐：先查看现有文件内容，再决定如何处理
```

### 4.5 验证流程

#### 完整验证流程图

```
开始生成代码
    ↓
1. 路径验证
    ├─ 通过 → 继续
    └─ 失败 → 提示并询问是否继续
    ↓
2. 命名验证
    ├─ 通过 → 继续
    └─ 失败 → 建议正确命名并询问
    ↓
3. 依赖检查
    ├─ 完整 → 继续
    └─ 缺失 → 列出缺失依赖，询问是否继续
    ↓
4. 冲突检测
    ├─ 无冲突 → 继续
    └─ 有冲突 → 提供处理方案
    ↓
5. 生成代码
    ↓
6. 质量检查（见第三部分）
    ↓
完成
```

#### 验证报告模板

```markdown
# 代码生成前验证报告

## 基本信息
- 目标：创建用户列表组件
- 路径：src/pages/UserManagement/components/UserList/index.jsx
- 质量级别：中

## 验证结果

### ✅ 路径验证
- [x] 路径符合页面组件规范
- [x] 使用文件夹形式

### ✅ 命名验证
- [x] 组件名 UserList 符合 PascalCase
- [x] CSS 类名使用 BEM 规范

### ⚠️ 依赖检查
- [x] React 已安装
- [x] axios 已安装
- [ ] react-virtualized 未安装（用于虚拟列表）

**建议：** 如果列表数据量大，建议安装 react-virtualized

### ✅ 冲突检测
- [x] 无文件冲突
- [x] 无组件名冲突

## 总结
验证通过，可以继续生成代码。
注意：虚拟列表功能需要额外安装依赖。

是否继续？[Y/n]
```

---

## 附录：配置文件模板

### A1. 单人项目配置

```javascript
// .aiconfig.js (单人项目)
export default {
  // 项目类型
  projectType: 'solo',

  // 质量级别
  qualityLevel: 'medium',

  // 技术栈
  tech: {
    framework: 'react',
    version: '18.2.0',
    bundler: 'vite',
    packageManager: 'pnpm',
    typescript: false,
  },

  // 目录结构
  structure: {
    components: 'src/components',
    pages: 'src/pages',
    api: 'src/api',
    context: 'src/context',
    hooks: 'src/hooks',
    utils: 'src/utils',
    assets: 'src/assets',
  },

  // 代码规范
  conventions: {
    componentStyle: 'folder', // folder | file
    cssNaming: 'kebab-case', // kebab-case | BEM
    stateManagement: 'context', // context | redux | zustand
    propTypes: false, // 是否使用 PropTypes
  },

  // 验证规则
  validation: {
    path: true,
    naming: true,
    dependency: true,
    conflict: true,
  },

  // 文档要求
  documentation: {
    simpleComponent: 'jsdoc', // jsdoc | none
    complexComponent: 'jsdoc', // jsdoc | readme
    function: 'jsdoc',
  },
}
```

### A2. 小组项目配置

```javascript
// .aiconfig.js (小组项目)
export default {
  projectType: 'team',
  qualityLevel: 'high',

  tech: {
    framework: 'react',
    version: '18.2.0',
    bundler: 'vite',
    packageManager: 'pnpm',
    typescript: false,
  },

  structure: {
    components: 'src/components',
    pages: 'src/pages',
    api: 'src/api',
    context: 'src/context',
    hooks: 'src/hooks',
    utils: 'src/utils',
    constants: 'src/constants',
    assets: 'src/assets',
    docs: 'docs',
  },

  conventions: {
    componentStyle: 'folder',
    cssNaming: 'BEM', // 小组项目推荐 BEM
    stateManagement: 'context',
    propTypes: true, // 小组项目必须使用
  },

  validation: {
    path: true,
    naming: true,
    dependency: true,
    conflict: true,
  },

  documentation: {
    simpleComponent: 'jsdoc',
    complexComponent: 'readme', // 复杂组件必须有 README
    function: 'jsdoc',
  },

  // Git 规范
  git: {
    commitMessageFormat: 'conventional', // conventional commits
    branchNaming: 'feature|fix|docs|style|refactor|perf|test|chore/description',
  },

  // 代码审查
  codeReview: {
    required: true,
    minApprovals: 1,
  },
}
```

---

## 总结

本文档详细说明了如何通过 Prompt 工程和代码规范来确保 AI 生成代码的质量：

1. **Prompt 工程**：系统提示词、上下文管理、场景化模板
2. **单人项目规范**：轻量级规范，注重效率
3. **小组项目规范**：协作规范，注重一致性
4. **生成前验证**：路径、命名、依赖、冲突检测

遵循这些规范，可以显著提升 AI 生成代码的质量和可用性。

**下一步：** 阅读 [02-质量检查规范](./02-quality-check.md) 了解代码生成后的质量检查机制。