# 模板库与范例

> 提供常用的代码模板和实际应用范例，帮助理解如何使用 AI 生成高质量代码。

## 目录

- [组件模板](#组件模板)
- [API 请求模板](#api-请求模板)
- [Context 状态管理模板](#context-状态管理模板)
- [自定义 Hook 模板](#自定义-hook-模板)
- [实际应用范例](#实际应用范例)

---

## 组件模板

### 模板 1：基础展示组件

**适用场景：** 纯展示型组件，无内部状态，通过 Props 接收数据

#### 模板代码

```jsx
// src/components/ComponentName/index.jsx
import PropTypes from 'prop-types'
import './styles.css'

/**
 * [组件功能描述]
 * @component
 * @param {Object} props
 * @param {Type} props.propName - Props 说明
 */
function ComponentName({ propName }) {
  return (
    <div className="component-name">
      {/* 组件内容 */}
    </div>
  )
}

ComponentName.propTypes = {
  propName: PropTypes.string.isRequired,
}

export default ComponentName
```

```css
/* src/components/ComponentName/styles.css */
.component-name {
  /* 样式定义 */
}
```

#### 实际范例：UserCard

```jsx
// src/components/UserCard/index.jsx
import PropTypes from 'prop-types'
import './styles.css'

/**
 * 用户信息卡片组件
 * @component
 */
function UserCard({ user, size = 'medium', onClick }) {
  const handleClick = () => {
    onClick?.(user.id)
  }

  return (
    <div
      className={`user-card user-card--${size}`}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {user.avatar ? (
        <img
          className="user-card__avatar"
          src={user.avatar}
          alt={`${user.name}的头像`}
        />
      ) : (
        <div className="user-card__avatar-placeholder">
          {user.name[0]}
        </div>
      )}

      <div className="user-card__content">
        <h3 className="user-card__name">{user.name}</h3>
        {user.email && (
          <p className="user-card__email">{user.email}</p>
        )}
        {user.bio && (
          <p className="user-card__bio">{user.bio}</p>
        )}
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
}

export default UserCard
```

```css
/* src/components/UserCard/styles.css */
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: white;
  transition: all var(--transition);
  cursor: pointer;
}

.user-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.user-card__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-card__avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  flex-shrink: 0;
}

.user-card__content {
  flex: 1;
  min-width: 0;
}

.user-card__name {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.user-card__email {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--text-secondary);
}

.user-card__bio {
  margin: 0;
  font-size: 14px;
  color: var(--text-tertiary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 尺寸变体 */
.user-card--small .user-card__avatar,
.user-card--small .user-card__avatar-placeholder {
  width: 40px;
  height: 40px;
  font-size: 16px;
}

.user-card--small .user-card__name {
  font-size: 14px;
}

.user-card--large {
  padding: 24px;
}

.user-card--large .user-card__avatar,
.user-card--large .user-card__avatar-placeholder {
  width: 80px;
  height: 80px;
  font-size: 32px;
}

.user-card--large .user-card__name {
  font-size: 18px;
}
```

**使用方式：**
```jsx
import UserCard from '@/components/UserCard'

function UserList({ users }) {
  const handleUserClick = (userId) => {
    console.log('Clicked user:', userId)
  }

  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          size="medium"
          onClick={handleUserClick}
        />
      ))}
    </div>
  )
}
```

---

### 模板 2：有状态的交互组件

**适用场景：** 需要内部状态管理的组件，如表单、搜索框、可折叠面板等

#### 模板代码

```jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * [组件功能描述]
 * @component
 */
function ComponentName({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (newValue) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="component-name">
      {/* 组件内容 */}
    </div>
  )
}

ComponentName.propTypes = {
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
}

export default ComponentName
```

#### 实际范例：SearchBox

```jsx
// src/components/SearchBox/index.jsx
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * 搜索框组件
 * 支持实时搜索、防抖、清除按钮
 * @component
 */
function SearchBox({
  placeholder = '请输入搜索关键词',
  debounceTime = 300,
  onSearch,
  onClear,
}) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const timerRef = useRef(null)

  // 防抖搜索
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      if (value) {
        onSearch?.(value)
      }
    }, debounceTime)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value, debounceTime, onSearch])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
    onClear?.()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(value)
    }
  }

  return (
    <div className={`search-box ${isFocused ? 'search-box--focused' : ''}`}>
      <svg className="search-box__icon" viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>

      <input
        type="text"
        className="search-box__input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {value && (
        <button
          className="search-box__clear"
          onClick={handleClear}
          aria-label="清除搜索"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  debounceTime: PropTypes.number,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
}

export default SearchBox
```

**使用方式：**
```jsx
import SearchBox from '@/components/SearchBox'

function UserList() {
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
    // 执行搜索逻辑
  }

  const handleClear = () => {
    setSearchKeyword('')
    // 清除搜索
  }

  return (
    <div>
      <SearchBox
        placeholder="搜索用户姓名或邮箱"
        debounceTime={300}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      {/* 列表内容 */}
    </div>
  )
}
```

---

### 模板 3：数据加载组件

**适用场景：** 需要从 API 获取数据并展示的组件

#### 模板代码

```jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * [组件功能描述]
 * @component
 */
function ComponentName({ apiParams }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [apiParams])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction(apiParams)
      setData(result)
    } catch (err) {
      setError(err.message || '加载失败')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">{error}</div>
  if (!data) return null

  return (
    <div className="component-name">
      {/* 渲染数据 */}
    </div>
  )
}

ComponentName.propTypes = {
  apiParams: PropTypes.object,
}

export default ComponentName
```

#### 实际范例：UserList

```jsx
// src/pages/UserManagement/components/UserList/index.jsx
import { useState, useEffect, useCallback } from 'react'
import { userAPI } from '../../../../api/user'
import UserCard from '../../../../components/UserCard'
import SearchBox from '../../../../components/SearchBox'
import './styles.css'

/**
 * 用户列表组件
 * 支持数据加载、搜索、分页
 * @component
 */
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const pageSize = 10

  // 加载用户列表
  useEffect(() => {
    loadUsers()
  }, [page, searchKeyword])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await userAPI.getList({
        page,
        pageSize,
        keyword: searchKeyword,
      })

      setUsers(result.list)
      setTotal(result.total)
    } catch (err) {
      setError('加载用户列表失败，请稍后重试')
      console.error('Load users failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // 搜索处理
  const handleSearch = useCallback((keyword) => {
    setSearchKeyword(keyword)
    setPage(1) // 重置到第一页
  }, [])

  // 清除搜索
  const handleClearSearch = useCallback(() => {
    setSearchKeyword('')
    setPage(1)
  }, [])

  // 用户点击
  const handleUserClick = useCallback((userId) => {
    console.log('Clicked user:', userId)
    // 跳转到用户详情页等
  }, [])

  // 重试加载
  const handleRetry = () => {
    loadUsers()
  }

  // Loading 状态
  if (loading && users.length === 0) {
    return (
      <div className="user-list">
        <div className="user-list__loading">
          <div className="spinner" />
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  // Error 状态
  if (error && users.length === 0) {
    return (
      <div className="user-list">
        <div className="user-list__error">
          <p>{error}</p>
          <button onClick={handleRetry}>重试</button>
        </div>
      </div>
    )
  }

  // Empty 状态
  if (users.length === 0) {
    return (
      <div className="user-list">
        <SearchBox
          placeholder="搜索用户姓名或邮箱"
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
        <div className="user-list__empty">
          <p>暂无用户数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className="user-list">
      <div className="user-list__header">
        <h2>用户列表</h2>
        <p className="user-list__total">共 {total} 个用户</p>
      </div>

      <SearchBox
        placeholder="搜索用户姓名或邮箱"
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      <div className="user-list__content">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onClick={handleUserClick}
          />
        ))}
      </div>

      {/* 分页 */}
      {total > pageSize && (
        <div className="user-list__pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            上一页
          </button>
          <span>第 {page} 页 / 共 {Math.ceil(total / pageSize)} 页</span>
          <button
            disabled={page * pageSize >= total}
            onClick={() => setPage(page + 1)}
          >
            下一页
          </button>
        </div>
      )}

      {/* 加载更多时的 Loading */}
      {loading && (
        <div className="user-list__loading-more">
          <div className="spinner spinner--small" />
        </div>
      )}
    </div>
  )
}

export default UserList
```

---

## API 请求模板

### 模板：RESTful API 模块

```javascript
// src/api/resource.js
import request from './request'

/**
 * [资源名称] API
 * @module api/resource
 */

/**
 * 获取列表
 * @param {Object} params
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=10] - 每页数量
 * @param {string} [params.keyword] - 搜索关键词
 * @returns {Promise<{list: Array, total: number}>}
 */
export function getList(params) {
  return request({
    url: '/resources',
    method: 'GET',
    params,
  })
}

/**
 * 获取详情
 * @param {number|string} id - 资源 ID
 * @returns {Promise<Object>}
 */
export function getDetail(id) {
  return request({
    url: `/resources/${id}`,
    method: 'GET',
  })
}

/**
 * 创建资源
 * @param {Object} data - 资源数据
 * @returns {Promise<Object>}
 */
export function create(data) {
  return request({
    url: '/resources',
    method: 'POST',
    data,
  })
}

/**
 * 更新资源
 * @param {number|string} id - 资源 ID
 * @param {Object} data - 要更新的数据
 * @returns {Promise<Object>}
 */
export function update(id, data) {
  return request({
    url: `/resources/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 删除资源
 * @param {number|string} id - 资源 ID
 * @returns {Promise<void>}
 */
export function remove(id) {
  return request({
    url: `/resources/${id}`,
    method: 'DELETE',
  })
}

// 导出对象形式（可选）
export const resourceAPI = {
  getList,
  getDetail,
  create,
  update,
  delete: remove,
}
```

#### 实际范例：Product API

```javascript
// src/api/product.js
import request from './request'

/**
 * 产品 API
 * @module api/product
 */

/**
 * 获取产品列表
 * @param {Object} params
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=10] - 每页数量
 * @param {string} [params.keyword] - 搜索关键词
 * @param {string} [params.category] - 分类筛选
 * @param {string} [params.sortBy] - 排序字段 (price|sales|created)
 * @param {string} [params.order] - 排序方向 (asc|desc)
 * @returns {Promise<{list: Array, total: number, categories: Array}>}
 */
export function getProductList(params) {
  return request({
    url: '/products',
    method: 'GET',
    params,
  })
}

/**
 * 获取产品详情
 * @param {number} id - 产品 ID
 * @returns {Promise<Object>}
 */
export function getProductDetail(id) {
  return request({
    url: `/products/${id}`,
    method: 'GET',
  })
}

/**
 * 创建产品
 * @param {Object} data
 * @param {string} data.name - 产品名称
 * @param {string} data.description - 产品描述
 * @param {number} data.price - 价格（单位：分）
 * @param {string} data.category - 分类
 * @param {Array<string>} data.images - 图片 URL 数组
 * @returns {Promise<Object>}
 */
export function createProduct(data) {
  return request({
    url: '/products',
    method: 'POST',
    data,
  })
}

/**
 * 更新产品
 * @param {number} id - 产品 ID
 * @param {Object} data - 要更新的字段
 * @returns {Promise<Object>}
 */
export function updateProduct(id, data) {
  return request({
    url: `/products/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 删除产品
 * @param {number} id - 产品 ID
 * @returns {Promise<void>}
 */
export function deleteProduct(id) {
  return request({
    url: `/products/${id}`,
    method: 'DELETE',
  })
}

/**
 * 批量更新产品状态
 * @param {Array<number>} ids - 产品 ID 数组
 * @param {string} status - 状态 (active|inactive)
 * @returns {Promise<void>}
 */
export function batchUpdateStatus(ids, status) {
  return request({
    url: '/products/batch/status',
    method: 'POST',
    data: { ids, status },
  })
}

export const productAPI = {
  getList: getProductList,
  getDetail: getProductDetail,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  batchUpdateStatus,
}
```

---

## Context 状态管理模板

### 模板：通用 Context

```jsx
// src/context/SomeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// 创建 Context
const SomeContext = createContext(null)

/**
 * [Context 名称] Provider
 * @component
 */
export function SomeProvider({ children }) {
  const [state, setState] = useState(initialState)

  // 初始化逻辑
  useEffect(() => {
    // 从 localStorage 或 API 加载初始数据
  }, [])

  // 操作方法
  const someAction = () => {
    // 更新状态
    setState(newState)
  }

  const value = {
    state,
    someAction,
  }

  return (
    <SomeContext.Provider value={value}>
      {children}
    </SomeContext.Provider>
  )
}

SomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * 使用 [Context 名称]
 * @returns {Object} Context value
 */
export function useSome() {
  const context = useContext(SomeContext)
  if (!context) {
    throw new Error('useSome must be used within SomeProvider')
  }
  return context
}
```

#### 实际范例：Theme Context

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext(null)

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
}

/**
 * 主题 Context Provider
 * 管理应用的主题状态
 * @component
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.AUTO)
  const [effectiveTheme, setEffectiveTheme] = useState(THEMES.LIGHT)

  // 初始化：从 localStorage 读取主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || THEMES.AUTO
    setTheme(savedTheme)
  }, [])

  // 监听系统主题变化（当设置为 AUTO 时）
  useEffect(() => {
    if (theme !== THEMES.AUTO) {
      setEffectiveTheme(theme)
      return
    }

    // 监听系统主题
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      setEffectiveTheme(e.matches ? THEMES.DARK : THEMES.LIGHT)
    }

    // 初始值
    setEffectiveTheme(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT)

    // 监听变化
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // 应用主题到 DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme)
  }, [effectiveTheme])

  // 切换主题
  const setThemeMode = (mode) => {
    if (!Object.values(THEMES).includes(mode)) {
      console.error('Invalid theme mode:', mode)
      return
    }
    setTheme(mode)
    localStorage.setItem('theme', mode)
  }

  // 切换到下一个主题
  const toggleTheme = () => {
    const themes = [THEMES.LIGHT, THEMES.DARK, THEMES.AUTO]
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setThemeMode(nextTheme)
  }

  const value = {
    theme, // 用户设置的主题
    effectiveTheme, // 实际应用的主题
    setTheme: setThemeMode,
    toggleTheme,
    isDark: effectiveTheme === THEMES.DARK,
    isLight: effectiveTheme === THEMES.LIGHT,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * 使用主题 Context
 * @returns {Object} Theme context value
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export { THEMES }
```

**使用方式：**
```jsx
// main.jsx
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

// 在组件中使用
import { useTheme, THEMES } from '@/context/ThemeContext'

function Header() {
  const { theme, effectiveTheme, setTheme, toggleTheme, isDark } = useTheme()

  return (
    <header>
      <h1>My App</h1>
      <div>
        <span>当前主题：{effectiveTheme}</span>
        <button onClick={toggleTheme}>
          切换主题
        </button>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value={THEMES.LIGHT}>浅色</option>
          <option value={THEMES.DARK}>深色</option>
          <option value={THEMES.AUTO}>自动</option>
        </select>
      </div>
    </header>
  )
}
```

---

## 自定义 Hook 模板

### 模板：数据获取 Hook

```javascript
// src/hooks/useFetch.js
import { useState, useEffect } from 'react'

/**
 * 数据获取 Hook
 * @param {Function} fetchFunction - API 请求函数
 * @param {any} params - 请求参数
 * @param {Object} options - 配置选项
 * @returns {Object} { data, loading, error, refetch }
 */
export function useFetch(fetchFunction, params, options = {}) {
  const { immediate = true } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction(params)
      setData(result)
    } catch (err) {
      setError(err.message || '请求失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [params])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}
```

#### 实际范例：useUserList

```javascript
// src/hooks/useUserList.js
import { useState, useEffect, useCallback } from 'react'
import { userAPI } from '../api/user'

/**
 * 用户列表 Hook
 * 封装用户列表的数据获取、搜索、分页逻辑
 * @param {Object} options
 * @param {number} [options.pageSize=10] - 每页数量
 * @param {boolean} [options.autoLoad=true] - 自动加载
 * @returns {Object}
 */
export function useUserList(options = {}) {
  const { pageSize = 10, autoLoad = true } = options

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [keyword, setKeyword] = useState('')

  // 加载用户列表
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await userAPI.getList({
        page,
        pageSize,
        keyword,
      })

      setUsers(result.list)
      setTotal(result.total)
    } catch (err) {
      setError(err.message || '加载失败')
      console.error('Load users failed:', err)
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, keyword])

  // 自动加载
  useEffect(() => {
    if (autoLoad) {
      loadUsers()
    }
  }, [autoLoad, loadUsers])

  // 搜索
  const search = useCallback((searchKeyword) => {
    setKeyword(searchKeyword)
    setPage(1) // 重置到第一页
  }, [])

  // 清除搜索
  const clearSearch = useCallback(() => {
    setKeyword('')
    setPage(1)
  }, [])

  // 翻页
  const nextPage = useCallback(() => {
    if (page * pageSize < total) {
      setPage(page + 1)
    }
  }, [page, pageSize, total])

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const goToPage = useCallback((targetPage) => {
    const maxPage = Math.ceil(total / pageSize)
    if (targetPage >= 1 && targetPage <= maxPage) {
      setPage(targetPage)
    }
  }, [total, pageSize])

  // 刷新
  const refresh = useCallback(() => {
    loadUsers()
  }, [loadUsers])

  return {
    // 数据
    users,
    loading,
    error,
    page,
    total,
    keyword,
    pageSize,

    // 计算属性
    totalPages: Math.ceil(total / pageSize),
    hasNextPage: page * pageSize < total,
    hasPrevPage: page > 1,

    // 方法
    search,
    clearSearch,
    nextPage,
    prevPage,
    goToPage,
    refresh,
  }
}
```

**使用方式：**
```jsx
import { useUserList } from '@/hooks/useUserList'

function UserListPage() {
  const {
    users,
    loading,
    error,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    search,
    clearSearch,
    nextPage,
    prevPage,
    refresh,
  } = useUserList({ pageSize: 20 })

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>

  return (
    <div>
      <SearchBox onSearch={search} onClear={clearSearch} />

      <div>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div>
        <button onClick={prevPage} disabled={!hasPrevPage}>
          上一页
        </button>
        <span>第 {page} / {totalPages} 页</span>
        <button onClick={nextPage} disabled={!hasNextPage}>
          下一页
        </button>
        <button onClick={refresh}>刷新</button>
      </div>
    </div>
  )
}
```

---

## 实际应用范例

### 范例 1：完整的 CRUD 页面

**场景：** 产品管理页面，包含列表、搜索、创建、编辑、删除功能

```jsx
// src/pages/ProductManagement/index.jsx
import { useState } from 'react'
import { useProductList } from '../../hooks/useProductList'
import ProductCard from './components/ProductCard'
import ProductForm from './components/ProductForm'
import SearchBox from '../../components/SearchBox'
import Modal from '../../components/Modal'
import { productAPI } from '../../api/product'
import './styles.css'

function ProductManagement() {
  const {
    products,
    loading,
    error,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    search,
    clearSearch,
    nextPage,
    prevPage,
    refresh,
  } = useProductList({ pageSize: 12 })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // 创建产品
  const handleCreate = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  // 编辑产品
  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  // 删除产品
  const handleDelete = async (productId) => {
    if (!confirm('确定要删除这个产品吗？')) {
      return
    }

    try {
      await productAPI.delete(productId)
      refresh()
      alert('删除成功')
    } catch (err) {
      alert('删除失败：' + err.message)
    }
  }

  // 提交表单
  const handleFormSubmit = async (data) => {
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, data)
        alert('更新成功')
      } else {
        await productAPI.create(data)
        alert('创建成功')
      }
      setIsFormOpen(false)
      refresh()
    } catch (err) {
      alert('操作失败：' + err.message)
    }
  }

  return (
    <div className="product-management">
      <div className="product-management__header">
        <h1>产品管理</h1>
        <button onClick={handleCreate}>创建产品</button>
      </div>

      <SearchBox
        placeholder="搜索产品名称"
        onSearch={search}
        onClear={clearSearch}
      />

      {loading && <div className="loading">加载中...</div>}
      {error && <div className="error">{error}</div>}

      <div className="product-management__grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="empty">暂无产品数据</div>
      )}

      <div className="product-management__pagination">
        <button onClick={prevPage} disabled={!hasPrevPage}>
          上一页
        </button>
        <span>第 {page} / {totalPages} 页</span>
        <button onClick={nextPage} disabled={!hasNextPage}>
          下一页
        </button>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProduct ? '编辑产品' : '创建产品'}
      >
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default ProductManagement
```

---

## 总结

### 如何使用这些模板

1. **识别场景** - 确定你要实现的功能类型
2. **选择模板** - 找到对应的模板代码
3. **定制 Prompt** - 使用模板生成具体的 Prompt
4. **生成代码** - 让 AI 基于模板和 Prompt 生成代码
5. **审查调整** - 检查生成的代码并根据需要调整

### Prompt 示例

```markdown
请基于"数据加载组件"模板，创建一个产品列表组件：

**组件信息**
- 组件名：ProductList
- 位置：src/pages/ProductManagement/components/ProductList/
- 类型：页面组件

**功能需求**
- 从 API 获取产品列表 (productAPI.getList)
- 支持搜索（按产品名称）
- 支持分页（每页 12 个）
- 支持按分类筛选

**技术要求**
- 使用 useProductList Hook（如果不存在需要创建）
- 使用 ProductCard 组件展示单个产品
- 使用 SearchBox 组件实现搜索
- 遵循小组项目规范
- 质量级别：中

请先生成执行计划，确认后再生成代码。
```

---

**下一步：** 阅读 [05-监控与反馈](./05-monitoring.md) 了解如何优化 AI 代码生成效果。