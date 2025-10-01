# 通用代码规范

> 本规范适用于所有 React + Vite + Axios 项目

## 技术栈

- 框架：React 18+
- 构建工具：Vite 5+
- HTTP 客户端：Axios
- 包管理器：pnpm
- 样式：CSS / Less（可选）
- 国际化：react-i18next（可选）

## 基本原则

1. **始终使用中文回答问题**
2. **破坏性更新前需确认，不要自动执行**
3. **验证使用 npm run build，除非要求，不使用 npm run dev**

## 组件规范

### 组件创建方式
- ✅ 使用文件夹形式：`ComponentName/index.jsx` + `styles.css` (或 `styles.less`)
- ❌ 不使用单文件形式：`ComponentName.jsx`

**样式文件：**
- 默认使用 CSS：`styles.css`
- 可选使用 Less：`styles.less` (详见 [Less 样式规范](./styles-less.md))

### 组件分类和位置
1. **全局组件**：放在 `src/components/`
   - 多个页面复用的组件

2. **页面组件**：放在页面同级的 `components/`
   - 仅当前页面使用的组件
   - 例：`src/pages/Home/components/HomeCard/`

3. **路径共享组件**：放在共同路径的 `components/`
   - 同路径下多个页面共用
   - 例：`src/pages/dashboard/components/`（dashboard 下多个页面共用）

### 组件代码结构
```jsx
import { useState } from 'react'
import './styles.css'

/**
 * 组件说明
 * @param {Object} props
 */
function ComponentName({ prop1, prop2 }) {
  // Hooks
  const [state, setState] = useState()

  // 事件处理函数
  const handleEvent = () => {
    // 逻辑
  }

  // 渲染
  return (
    <div className="component-name">
      {/* 内容 */}
    </div>
  )
}

export default ComponentName
```

## 样式规范

### 样式方案选择

**默认：纯 CSS**
- 文件扩展名：`.css`
- 适合：简单项目、团队不熟悉预处理器

**可选：Less**
- 文件扩展名：`.less`
- 适合：需要变量、混入、嵌套等特性
- 详细规范：[Less 样式规范](./styles-less.md)

### 样式作用域

**使用 CSS：**
- **全局样式**：`src/assets/styles/global.css`
- **页面样式**：页面文件夹内 `styles.css`，使用页面 id/class 前缀
- **组件样式**：组件文件夹内 `styles.css`，使用组件 class 前缀

**使用 Less：**
- **全局样式**：`src/assets/styles/index.less` (入口文件)
  - `variables.less` (变量定义)
  - `mixins.less` (混入函数)
  - `global.less` (全局样式)
- **页面样式**：页面文件夹内 `styles.less`
- **组件样式**：组件文件夹内 `styles.less`

### CSS 类名规范

```css
/* 页面样式 - 添加页面前缀避免污染 */
.home-page {
  padding: 20px;
}

.home-page .section {
  margin-bottom: 20px;
}

/* 组件样式 - 使用组件名前缀 */
.user-card {
  border: 1px solid #ddd;
}

.user-card__avatar {
  width: 60px;
  height: 60px;
}
```

### Less 示例（可选）

```less
// 使用变量和混入
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

.user-card {
  padding: @spacing-md;
  border: 1px solid @border-color;

  &__avatar {
    .circle(60px);
  }
}
```

详见：[Less 样式规范完整文档](./styles-less.md)

## 状态管理规范

### 跨层级传递
- ✅ 使用 React Context 完成
- ❌ 尽量不使用深层 props drilling

### Context 文件结构
```jsx
// src/context/SomeContext.jsx
import { createContext, useContext, useState } from 'react'

const SomeContext = createContext(null)

export function SomeProvider({ children }) {
  const [state, setState] = useState()

  const value = {
    state,
    setState,
  }

  return (
    <SomeContext.Provider value={value}>
      {children}
    </SomeContext.Provider>
  )
}

export function useSome() {
  const context = useContext(SomeContext)
  if (!context) {
    throw new Error('useSome must be used within SomeProvider')
  }
  return context
}
```

## API 请求规范

### 统一使用 axios 实例
```javascript
// src/api/request.js - 配置
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || '请求失败'
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

export default request
```

### API 模块组织
```javascript
// src/api/user.js
import request from './request'

export const userAPI = {
  getList(params) {
    return request({ url: '/users', method: 'GET', params })
  },

  getDetail(id) {
    return request({ url: `/users/${id}`, method: 'GET' })
  },

  create(data) {
    return request({ url: '/users', method: 'POST', data })
  },

  update(id, data) {
    return request({ url: `/users/${id}`, method: 'PUT', data })
  },

  delete(id) {
    return request({ url: `/users/${id}`, method: 'DELETE' })
  },
}
```

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `UserCard`, `ProductList` |
| 函数/变量 | camelCase | `handleClick`, `isLoading` |
| 常量 | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_COUNT` |
| CSS 类名 | kebab-case | `user-card`, `btn-primary` |
| 文件夹 | PascalCase（组件） | `components/Button` |
| API 文件 | camelCase | `api/user.js` |
| Hook | use + PascalCase | `useAuth`, `useFetch` |
| Context | PascalCase + Context | `AuthContext` |

## 错误处理

### API 请求必须有错误处理
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
      setError('加载失败，请稍后重试')
      console.error('Load users failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // 处理各种状态
  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>
  if (users.length === 0) return <div>暂无数据</div>

  return <div>{/* 渲染列表 */}</div>
}
```

## 文件和代码组织

### 目录结构
```
src/
├── components/          # 全局组件
├── pages/              # 页面
├── api/                # API 请求
├── context/            # React Context
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
├── constants/          # 常量定义
├── locales/            # 多语言文件（可选）
│   ├── zh-CN/
│   ├── en-US/
│   └── index.js
├── assets/             # 静态资源
│   ├── images/
│   └── styles/
│       └── global.css
├── App.jsx
└── main.jsx
```

## 国际化（可选）

### 是否使用 i18n

**需要多语言支持时使用：**
- ✅ 项目需要支持多种语言
- ✅ 使用 react-i18next
- 📝 详见：[i18n 国际化规范](./i18n.md)

**不需要多语言时：**
- ❌ 直接在组件中使用文本
- ❌ 无需安装 i18n 相关依赖

### 基本使用

```jsx
// 安装：pnpm install i18next react-i18next

// 使用
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('pages:home.title')}</h1>
      <button>{t('common:button.submit')}</button>
    </div>
  )
}
```

详细规范请参考：[i18n 国际化规范完整文档](./i18n.md)

## 环境变量

使用 Vite 的环境变量：
```javascript
// 访问环境变量
const apiUrl = import.meta.env.VITE_API_BASE_URL

// .env.development
VITE_API_BASE_URL=http://localhost:3000/api

// .env.production
VITE_API_BASE_URL=https://api.example.com
```

## 禁止事项

❌ 不要使用内联样式（除非动态计算）
❌ 不要硬编码 API 地址、密钥等敏感信息
❌ 不要直接修改 state（使用 setState）
❌ 不要在循环中创建新函数/对象
❌ 不要忽略 ESLint 警告（除非有充分理由）