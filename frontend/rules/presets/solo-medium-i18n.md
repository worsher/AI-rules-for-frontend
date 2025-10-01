# 单人项目 - 中质量级别 - 国际化版本

> 适合需要多语言支持的个人项目

## 配置说明

- **项目类型**：单人项目
- **质量级别**：中等
- **国际化**：react-i18next ⭐
- **平衡**：开发效率与代码质量

## 使用本规范

在与 AI 对话时，使用以下提示：

```markdown
请使用以下规范生成代码：
- 项目类型：单人项目
- 质量级别：中
- 国际化：react-i18next
- 技术栈：React + Vite + Axios + react-i18next + pnpm
```

或简单地说：

```markdown
使用单人项目中质量规范（国际化版本）生成代码
```

## 与基础版本的区别

本规范与 `solo-medium.md` 的主要区别是添加了 i18n 多语言支持。

**主要变化：**
1. 添加了 react-i18next 依赖
2. 组件中使用 `useTranslation` hook
3. 所有用户可见文本通过 `t()` 函数翻译
4. 需要维护语料文件（zh-CN、en-US）
5. 需要安装 i18next：`pnpm install i18next react-i18next`

## 核心规范汇总

### 1. 组件规范

```jsx
// 组件必须使用文件夹形式
ComponentName/
├── index.jsx
└── styles.css (或 styles.less)

// 导入 i18n
import { useTranslation } from 'react-i18next'
```

### 2. i18n 使用规范

```jsx
// src/components/UserCard/index.jsx
import { useTranslation } from 'react-i18next'
import './styles.css'

function UserCard({ user, onClick }) {
  const { t } = useTranslation('components') // 指定命名空间

  return (
    <div className="user-card" onClick={() => onClick(user.id)}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button>{t('userCard.viewProfile')}</button>
      <span>{t('userCard.followers', { count: user.followers })}</span>
    </div>
  )
}

export default UserCard
```

### 3. 语料文件结构

```
src/locales/
├── zh-CN/
│   ├── common.json        # 通用语料（按钮、标签）
│   ├── pages.json         # 页面语料
│   ├── components.json    # 组件语料
│   └── messages.json      # 提示消息
├── en-US/
│   ├── common.json
│   ├── pages.json
│   ├── components.json
│   └── messages.json
└── index.js               # i18n 配置
```

### 4. 语料文件示例

```json
// src/locales/zh-CN/components.json
{
  "userCard": {
    "viewProfile": "查看资料",
    "followers": "{{count}} 个关注者",
    "following": "关注中"
  },
  "header": {
    "home": "首页",
    "about": "关于",
    "logout": "退出"
  }
}
```

```json
// src/locales/en-US/components.json
{
  "userCard": {
    "viewProfile": "View Profile",
    "followers": "{{count}} followers",
    "following": "Following"
  },
  "header": {
    "home": "Home",
    "about": "About",
    "logout": "Logout"
  }
}
```

```json
// src/locales/zh-CN/messages.json
{
  "success": {
    "created": "创建成功",
    "updated": "更新成功",
    "deleted": "删除成功"
  },
  "error": {
    "network": "网络错误，请稍后重试",
    "notFound": "未找到相关数据"
  },
  "info": {
    "loading": "加载中...",
    "noData": "暂无数据"
  }
}
```

### 5. i18n 配置

```javascript
// src/locales/index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import zhCN_common from './zh-CN/common.json'
import zhCN_pages from './zh-CN/pages.json'
import zhCN_components from './zh-CN/components.json'
import zhCN_messages from './zh-CN/messages.json'

import enUS_common from './en-US/common.json'
import enUS_pages from './en-US/pages.json'
import enUS_components from './en-US/components.json'
import enUS_messages from './en-US/messages.json'

const resources = {
  'zh-CN': {
    common: zhCN_common,
    pages: zhCN_pages,
    components: zhCN_components,
    messages: zhCN_messages,
  },
  'en-US': {
    common: enUS_common,
    pages: enUS_pages,
    components: enUS_components,
    messages: enUS_messages,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'zh-CN',
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'pages', 'components', 'messages'],
    defaultNS: 'common',
  })

export default i18n
```

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './locales' // 导入 i18n 配置
import './assets/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### 6. 页面组件示例

```jsx
// src/pages/UserManagement/index.jsx
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { userAPI } from '../../api/user'
import UserCard from '../../components/UserCard'
import './styles.css'

function UserManagement() {
  const { t } = useTranslation(['pages', 'messages'])
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
      setError(t('messages:error.network'))
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>{t('messages:info.loading')}</div>
  if (error) return <div className="error">{error}</div>
  if (users.length === 0) return <div>{t('messages:info.noData')}</div>

  return (
    <div className="user-management">
      <h1>{t('pages:user.title')}</h1>
      <p>{t('pages:user.list.total', { count: users.length })}</p>
      <div className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UserManagement
```

### 7. 语言切换组件

```jsx
// src/components/LanguageSwitcher/index.jsx
import { useTranslation } from 'react-i18next'
import './styles.css'

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage('zh-CN')}
        className={i18n.language === 'zh-CN' ? 'active' : ''}
      >
        中文
      </button>
      <button
        onClick={() => changeLanguage('en-US')}
        className={i18n.language === 'en-US' ? 'active' : ''}
      >
        English
      </button>
    </div>
  )
}

export default LanguageSwitcher
```

### 8. API 请求（与基础版本相同）

```javascript
// 使用统一的 axios 实例
import request from './request'

export const userAPI = {
  getList: (params) => request.get('/users', { params }),
  getDetail: (id) => request.get(`/users/${id}`),
}

// 基本错误处理
try {
  const data = await userAPI.getList()
  setUsers(data)
} catch (err) {
  setError(t('messages:error.network'))
}
```

### 9. 代码检查

```
✅ 必须：
- ESLint 0 errors（允许少量 warnings）
- 代码可以构建
- 基本功能完整
- i18n 配置正确
- 所有用户可见文本都通过 t() 翻译

💡 建议：
- 复杂组件添加 PropTypes
- 关键逻辑添加注释
- 语料文件结构清晰
- 所有语言的语料 key 结构一致
```

## 具体规则

### ✅ 必须遵守

1. 组件使用文件夹形式
2. 安装 i18next 和 react-i18next
3. 所有用户可见文本使用 `t()` 函数
4. 语料文件按命名空间组织（common、pages、components、messages）
5. 所有支持的语言保持相同的语料结构
6. 使用统一的 axios 实例
7. API 请求有基本错误处理
8. 列表渲染使用 key
9. 无硬编码敏感信息
10. ESLint 无 error

### 💡 建议遵守

1. 关键页面和组件提供完整翻译
2. 使用有意义的语料 key 名称
3. 使用命名空间隔离语料
4. 变量使用有意义的名称（如 `{{userName}}` 而非 `{{0}}`）
5. 复杂组件添加 PropTypes
6. 重要函数添加注释

### 🆓 可选

1. 简单组件的 PropTypes
2. 详细的文档
3. 单元测试
4. 超过 2 种语言支持（基础是 zh-CN、en-US）
5. 按需加载语言包

## 完整示例

### 组件示例（带 i18n）

```jsx
// src/components/UserCard/index.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * 用户卡片组件
 */
function UserCard({ user, onClick }) {
  const { t } = useTranslation('components')
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.(user.id)
  }

  return (
    <div
      className={`user-card ${isHovered ? 'user-card--hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {user.avatar ? (
        <img className="user-card__avatar" src={user.avatar} alt={user.name} />
      ) : (
        <div className="user-card__avatar-placeholder">{user.name[0]}</div>
      )}
      <h3 className="user-card__name">{user.name}</h3>
      <p className="user-card__email">{user.email}</p>
      <button className="user-card__button">
        {t('userCard.viewProfile')}
      </button>
      <span className="user-card__followers">
        {t('userCard.followers', { count: user.followers })}
      </span>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
    followers: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
}

export default UserCard
```

### 对应的语料文件

```json
// src/locales/zh-CN/components.json
{
  "userCard": {
    "viewProfile": "查看资料",
    "followers": "{{count}} 个关注者",
    "followers_zero": "暂无关注者",
    "followers_one": "1 个关注者",
    "followers_other": "{{count}} 个关注者"
  }
}
```

```json
// src/locales/en-US/components.json
{
  "userCard": {
    "viewProfile": "View Profile",
    "followers": "{{count}} followers",
    "followers_zero": "No followers",
    "followers_one": "1 follower",
    "followers_other": "{{count}} followers"
  }
}
```

## i18n 配置

### 安装

```bash
pnpm install i18next react-i18next
```

### 初始化项目时创建的文件

1. `src/locales/index.js` - i18n 配置
2. `src/locales/zh-CN/` - 中文语料目录
3. `src/locales/en-US/` - 英文语料目录
4. 在 `main.jsx` 中导入 `./locales`

## 快速检查清单

生成代码前检查：

- [ ] 文件路径正确
- [ ] 组件使用文件夹形式
- [ ] 安装了 i18next 和 react-i18next
- [ ] i18n 配置文件已创建
- [ ] 组件中导入了 `useTranslation`
- [ ] 用户可见文本使用 `t()` 函数
- [ ] 语料文件已创建（至少 zh-CN、en-US）
- [ ] 语料文件结构一致
- [ ] API 请求有错误处理
- [ ] 列表有 key
- [ ] 无硬编码敏感信息

## 适用场景

✅ **适合：**
- 个人项目需要多语言支持
- 中小型国际化应用
- 需要支持 2-5 种语言
- 快速迭代但需要保持一定质量

❌ **不适合：**
- 不需要多语言支持（使用 `solo-medium.md`）
- 需要超过 10 种语言（考虑使用专业翻译管理平台）
- 团队协作（使用 `team-high.md` 或 `team-medium.md`）

## 从基础版本迁移

如果项目从 `solo-medium.md` 迁移到本规范（i18n）：

1. **安装 i18n 依赖**
   ```bash
   pnpm install i18next react-i18next
   ```

2. **创建语料文件结构**
   ```bash
   mkdir -p src/locales/zh-CN src/locales/en-US
   touch src/locales/index.js
   touch src/locales/zh-CN/{common,pages,components,messages}.json
   touch src/locales/en-US/{common,pages,components,messages}.json
   ```

3. **配置 i18n**
   - 在 `src/locales/index.js` 中配置 i18next
   - 在 `src/main.jsx` 中导入 `./locales`

4. **提取硬编码文本**
   - 找出所有硬编码的中文文本
   - 移动到语料文件中
   - 使用 `t()` 函数替换

5. **添加英文翻译**
   - 为所有语料添加英文版本
   - 保持结构一致

6. **添加语言切换功能**
   - 创建 LanguageSwitcher 组件
   - 添加到 Header 或合适的位置

## 优势

- **国际化支持**：轻松支持多种语言
- **开发效率高**：减少不必要的规范束缚
- **易于维护**：语料集中管理
- **灵活扩展**：可以轻松添加新语言
- **用户友好**：支持多语言切换

## 相关文档

- [i18n 国际化规范完整文档](../base/i18n.md)
- [通用代码规范](../base/common.md)
- [单人项目规范](../project-type/solo.md)
- [中质量级别规范](../quality-level/medium.md)
- [react-i18next 官方文档](https://react.i18next.com/)
