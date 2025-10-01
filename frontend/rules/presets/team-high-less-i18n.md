# 小组项目 - 高质量级别 - Less + 国际化版本

> 适合团队协作的核心模块，高质量要求，支持 Less 样式和多语言

## 配置说明

- **项目类型**：小组项目（3-5人）
- **质量级别**：高（严格）
- **样式方案**：Less 💅
- **国际化**：react-i18next 🌍
- **要求**：最高质量标准

## 使用本规范

在与 AI 对话时，使用以下提示：

```markdown
请使用以下规范生成代码：
- 项目类型：小组项目
- 质量级别：高
- 样式方案：Less
- 国际化：react-i18next
- 技术栈：React + Vite + Axios + Less + react-i18next + pnpm
```

或简单地说：

```markdown
使用团队项目高质量规范（Less + i18n 版本）生成代码
```

## 核心特性

本规范结合了多个维度的严格要求：

1. **团队协作**：代码审查、文档完善、统一规范
2. **高质量**：ESLint 0 errors 0 warnings、完整错误处理、性能优化
3. **Less 样式**：变量、混入、嵌套，统一设计 token
4. **国际化**：多语言支持、语言样式适配
5. **可维护性**：PropTypes 必须、JSDoc 必须、README 必须

## 核心规范汇总

### 1. 组件规范（严格）

```
ComponentName/
├── index.jsx          # 必须：组件主文件
├── styles.less        # 必须：Less 样式文件
└── README.md          # 必须：组件文档
```

**组件代码示例：**

```jsx
// src/components/UserCard/index.jsx
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import './styles.less'

/**
 * 用户卡片组件
 * 展示用户基本信息，支持点击交互和多语言
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - 用户信息对象
 * @param {number} props.user.id - 用户 ID（必需）
 * @param {string} props.user.name - 用户姓名（必需）
 * @param {string} [props.user.email] - 用户邮箱
 * @param {string} [props.user.avatar] - 用户头像 URL
 * @param {number} [props.user.followers=0] - 关注者数量
 * @param {string} [props.size='medium'] - 卡片尺寸：small | medium | large
 * @param {Function} [props.onClick] - 点击回调函数
 * @example
 * <UserCard user={userData} size="medium" onClick={handleClick} />
 */
function UserCard({ user, size, onClick }) {
  const { t } = useTranslation('components')

  // 使用 useCallback 优化性能
  const handleClick = useCallback(() => {
    if (onClick && typeof onClick === 'function') {
      onClick(user.id)
    }
  }, [onClick, user.id])

  return (
    <div
      className={`user-card user-card--${size}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="user-card__avatar">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} loading="lazy" />
        ) : (
          <div className="user-card__avatar-placeholder">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="user-card__info">
        <h3 className="user-card__name">{user.name}</h3>
        {user.email && (
          <p className="user-card__email">{user.email}</p>
        )}
        <span className="user-card__followers">
          {t('userCard.followers', { count: user.followers || 0 })}
        </span>
      </div>
      <button
        className="user-card__button"
        onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}
        aria-label={t('userCard.viewProfile')}
      >
        {t('userCard.viewProfile')}
      </button>
    </div>
  )
}

// ✅ 必须：完整的 PropTypes 定义
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
    followers: PropTypes.number,
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
}

// ✅ 必须：定义 defaultProps
UserCard.defaultProps = {
  size: 'medium',
  onClick: null,
}

export default UserCard
```

### 2. Less 样式规范

```less
// src/components/UserCard/styles.less
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

.user-card {
  .flex-row();
  padding: @spacing-lg;
  border: 1px solid @border-color;
  border-radius: @border-radius;
  background: @background-white;
  cursor: pointer;
  transition: all @transition;

  // 尺寸变体
  &--small {
    padding: @spacing-sm;

    .user-card__avatar {
      .circle(40px);
    }
  }

  &--medium {
    padding: @spacing-md;

    .user-card__avatar {
      .circle(60px);
    }
  }

  &--large {
    padding: @spacing-lg;

    .user-card__avatar {
      .circle(80px);
    }
  }

  &__avatar {
    .circle(60px);
    flex-shrink: 0;
    margin-right: @spacing-md;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__avatar-placeholder {
    .flex-center();
    width: 100%;
    height: 100%;
    background: @primary-color;
    color: @text-white;
    font-size: @font-size-xl;
    font-weight: 600;
  }

  &__info {
    flex: 1;
    min-width: 0; // 避免 flex 子元素溢出
  }

  &__name {
    margin: 0 0 @spacing-xs;
    font-size: @font-size-lg;
    font-weight: 600;
    color: @text-primary;
    .text-ellipsis();
  }

  &__email {
    margin: 0 0 @spacing-sm;
    font-size: @font-size;
    color: @text-secondary;
    .text-ellipsis();
  }

  &__followers {
    display: inline-block;
    font-size: @font-size-sm;
    color: @text-tertiary;
  }

  &__button {
    padding: @spacing-sm @spacing-md;
    background-color: @primary-color;
    color: @text-white;
    border: none;
    border-radius: @border-radius-sm;
    font-size: @font-size;
    cursor: pointer;
    transition: background-color @transition;
    min-width: 80px;

    &:hover {
      background-color: @primary-color-hover;
    }

    &:focus {
      outline: 2px solid @primary-color;
      outline-offset: 2px;
    }
  }

  // 悬停效果
  &:hover {
    box-shadow: @shadow;
    transform: translateY(-2px);
  }

  // 焦点可访问性
  &:focus {
    outline: 2px solid @primary-color;
    outline-offset: 2px;
  }
}

// 语言样式适配
.lang-zh-CN {
  .user-card {
    &__button {
      min-width: 60px;
      padding: @spacing-sm (@spacing-md - 4px);
    }

    &__followers {
      min-width: 60px;
    }
  }
}

.lang-en-US {
  .user-card {
    &__button {
      min-width: 100px;
      padding: @spacing-sm (@spacing-md + 4px);
    }

    &__followers {
      min-width: 80px;
    }

    &__email,
    &__name {
      word-break: break-word;
      hyphens: auto;
    }
  }
}
```

### 3. 语料文件（必须）

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

### 4. 组件文档（必须）

```markdown
// src/components/UserCard/README.md

# UserCard 组件

用户卡片组件，展示用户基本信息，支持多语言和可访问性。

## 功能

- 展示用户头像、姓名、邮箱、关注者数量
- 支持点击交互
- 支持多种尺寸
- 完整的多语言支持（中英文）
- 语言样式自动适配
- 支持键盘导航
- 图片懒加载

## Props

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| user | Object | 是 | - | 用户信息对象 |
| user.id | number | 是 | - | 用户 ID |
| user.name | string | 是 | - | 用户姓名 |
| user.email | string | 否 | - | 用户邮箱 |
| user.avatar | string | 否 | - | 用户头像 URL |
| user.followers | number | 否 | 0 | 关注者数量 |
| size | string | 否 | 'medium' | 卡片尺寸：small, medium, large |
| onClick | Function | 否 | null | 点击回调函数，参数为 user.id |

## 使用示例

### 基本用法

\```jsx
import UserCard from '@/components/UserCard'

function MyPage() {
  const user = {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://example.com/avatar.jpg',
    followers: 1234
  }

  const handleClick = (userId) => {
    console.log('Clicked user:', userId)
  }

  return <UserCard user={user} onClick={handleClick} />
}
\```

### 不同尺寸

\```jsx
<UserCard user={user} size="small" />
<UserCard user={user} size="medium" />
<UserCard user={user} size="large" />
\```

### 无头像

\```jsx
<UserCard user={{ id: 1, name: '李四', email: 'lisi@example.com' }} />
// 将显示首字母占位符
\```

## 多语言

组件自动支持中英文，根据 i18n 语言设置显示对应文本。

- 中文：「查看资料」「X 个关注者」
- 英文：「View Profile」「X followers」

## 样式变量

组件使用 Less 变量，可通过修改全局变量自定义样式：

- `@primary-color` - 主色
- `@border-color` - 边框颜色
- `@spacing-md` - 间距
- `@border-radius` - 圆角

## 可访问性

- 支持键盘导航（Tab 键和 Enter 键）
- 按钮有 aria-label
- 图片有 alt 属性
- 焦点有明显视觉反馈

## 性能优化

- 使用 useCallback 优化点击事件
- 图片懒加载
- 避免不必要的重渲染

## 注意事项

- user 对象的 id 和 name 是必需的
- 如果需要点击交互，请提供 onClick 回调
- 图片 URL 应该是有效的，否则会显示占位符

## 版本历史

- v1.0.0 (2024-01-01): 初始版本
- v1.1.0 (2024-01-15): 添加多语言支持
- v1.2.0 (2024-02-01): 添加语言样式适配
\```

### 5. API 请求（严格错误处理）

```javascript
// src/api/user.js
import request from './request'

/**
 * 用户 API
 * @namespace userAPI
 */
export const userAPI = {
  /**
   * 获取用户列表
   * @param {Object} params - 查询参数
   * @param {number} [params.page=1] - 页码
   * @param {number} [params.pageSize=10] - 每页数量
   * @param {string} [params.keyword] - 搜索关键词
   * @returns {Promise<Object>} 用户列表数据
   * @throws {Error} 网络错误或服务器错误
   */
  async getList(params) {
    try {
      const data = await request({
        url: '/users',
        method: 'GET',
        params,
      })
      return data
    } catch (error) {
      console.error('Failed to fetch user list:', error)
      throw error
    }
  },

  /**
   * 获取用户详情
   * @param {number} id - 用户 ID
   * @returns {Promise<Object>} 用户详情数据
   * @throws {Error} 用户不存在或网络错误
   */
  async getDetail(id) {
    if (!id || typeof id !== 'number') {
      throw new Error('Invalid user ID')
    }

    try {
      const data = await request({
        url: `/users/${id}`,
        method: 'GET',
      })
      return data
    } catch (error) {
      console.error(`Failed to fetch user detail (ID: ${id}):`, error)
      throw error
    }
  },
}
```

### 6. 页面组件示例

```jsx
// src/pages/UserManagement/index.jsx
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { userAPI } from '@/api/user'
import UserCard from '@/components/UserCard'
import './styles.less'

/**
 * 用户管理页面
 * 展示用户列表，支持搜索和分页
 *
 * @component
 */
function UserManagement() {
  const { t } = useTranslation(['pages', 'messages'])

  // 状态管理
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

      const data = await userAPI.getList({
        page,
        pageSize: 10,
        keyword: keyword.trim(),
      })

      setUsers(data.list || [])
      setTotal(data.total || 0)
    } catch (err) {
      const errorMessage = err.response?.data?.message || t('messages:error.network')
      setError(errorMessage)
      console.error('Load users failed:', err)
    } finally {
      setLoading(false)
    }
  }, [page, keyword, t])

  // 初始加载
  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  // 搜索处理（防抖）
  const handleSearch = useCallback((value) => {
    setKeyword(value)
    setPage(1) // 重置到第一页
  }, [])

  // 点击用户卡片
  const handleUserClick = useCallback((userId) => {
    console.log('User clicked:', userId)
    // TODO: 导航到用户详情页
  }, [])

  // 计算是否有数据
  const hasData = useMemo(() => users.length > 0, [users.length])

  // 渲染加载状态
  if (loading && !hasData) {
    return (
      <div className="user-management">
        <div className="user-management__loading">
          {t('messages:info.loading')}
        </div>
      </div>
    )
  }

  // 渲染错误状态
  if (error && !hasData) {
    return (
      <div className="user-management">
        <div className="user-management__error" role="alert">
          {error}
          <button onClick={loadUsers} className="user-management__retry">
            {t('common:button.retry')}
          </button>
        </div>
      </div>
    )
  }

  // 渲染空数据状态
  if (!loading && !hasData) {
    return (
      <div className="user-management">
        <div className="user-management__empty">
          {t('messages:info.noData')}
        </div>
      </div>
    )
  }

  return (
    <div className="user-management">
      <header className="user-management__header">
        <h1>{t('pages:user.title')}</h1>
        <div className="user-management__search">
          <input
            type="text"
            placeholder={t('common:placeholder.search')}
            value={keyword}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label={t('common:label.search')}
          />
        </div>
      </header>

      <div className="user-management__stats">
        {t('pages:user.list.total', { count: total })}
      </div>

      <div className="user-management__list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={handleUserClick}
          />
        ))}
      </div>

      {/* 分页组件 */}
      {total > 10 && (
        <div className="user-management__pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label={t('common:button.prev')}
          >
            {t('common:button.prev')}
          </button>
          <span>{t('pages:user.list.page', { current: page, total: Math.ceil(total / 10) })}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(total / 10)}
            aria-label={t('common:button.next')}
          >
            {t('common:button.next')}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserManagement
```

### 7. 语言样式适配（必须）

```jsx
// src/App.jsx
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // ✅ 必须：在根元素添加语言 class
    const root = document.getElementById('root')
    if (root) {
      root.classList.remove('lang-zh-CN', 'lang-en-US')
      root.classList.add(`lang-${i18n.language}`)
    }

    // ✅ 必须：设置 html 的 lang 属性
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="app">
      <Header />
      {/* 应用内容 */}
    </div>
  )
}

export default App
```

### 8. 代码检查标准

```
✅ 必须（100%）：
- ESLint: 0 errors, 0 warnings
- 所有组件必须有 PropTypes 和 defaultProps
- 所有导出函数必须有 JSDoc
- 复杂组件（20+ 行）必须有 README.md
- 所有 API 请求有完整的 try-catch
- 处理所有状态：loading、error、empty、success
- 列表渲染使用稳定的 key（不用 index）
- 事件处理使用 useCallback
- 计算使用 useMemo
- 所有用户可见文本使用 t() 函数
- 语料文件结构一致
- 在根节点设置语言 className
- 关键 UI 组件有语言样式适配
- Less 样式使用变量和混入
- 图片有 alt 属性
- 表单控件有关联的 label
- 按钮有清晰文本或 aria-label
- 可交互元素支持键盘操作
- 无 console.log、debugger
- 无硬编码敏感信息
- 代码经过团队 Review

💡 强烈建议：
- 关键功能有单元测试
- 性能敏感部分有性能测试
- 图片使用懒加载
- 长列表使用虚拟滚动
- Git 提交遵循 Conventional Commits
```

## 具体规则

### ✅ 必须遵守（严格）

1. 组件使用文件夹形式（index.jsx + styles.less + README.md）
2. 所有组件必须有完整的 PropTypes 和 defaultProps
3. 所有导出函数必须有 JSDoc 注释
4. 复杂组件（20+ 行）必须有 README.md
5. 安装 i18next 和 react-i18next
6. 所有用户可见文本使用 t() 函数
7. 语料文件按命名空间组织
8. 所有语言的语料结构一致
9. 在根节点设置语言 className
10. 关键 UI 组件有语言样式适配
11. 样式文件使用 .less 扩展名
12. 导入全局 Less 变量和混入
13. 使用 Less 变量替代硬编码值
14. 使用 Less 混入复用样式
15. Less 嵌套不超过 3 层
16. 统一使用 axios 实例
17. 所有 API 请求有完整的 try-catch 和错误处理
18. 处理所有状态（loading、error、empty、success）
19. 列表渲染使用稳定的 key
20. 事件处理使用 useCallback
21. 计算使用 useMemo
22. 图片有 alt 属性和懒加载
23. 表单控件有关联的 label
24. 按钮有清晰文本或 aria-label
25. 可交互元素支持键盘操作
26. ESLint 0 errors, 0 warnings
27. 无 console.log、debugger
28. 无硬编码敏感信息
29. 代码经过团队 Review
30. Git 提交遵循规范

### 💡 强烈建议

1. 关键功能有单元测试，测试覆盖率 > 80%
2. 长列表（100+ 项）使用虚拟滚动
3. 图片优化和 CDN
4. 使用 React.memo 优化组件
5. 定期进行代码审查
6. 使用 Prettier 统一格式
7. 性能监控和优化

### 🆓 可选

1. E2E 测试
2. Storybook 组件文档
3. 性能基准测试

## 全局配置

### Less 全局变量

```less
// src/assets/styles/variables.less
// 颜色
@primary-color: #1890ff;
@primary-color-hover: #40a9ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;

// 文本颜色
@text-primary: #262626;
@text-secondary: #595959;
@text-tertiary: #8c8c8c;
@text-white: #ffffff;

// 背景颜色
@background-white: #ffffff;
@background-gray: #fafafa;
@background-color: #f5f5f5;

// 边框
@border-color: #d9d9d9;
@border-color-light: #f0f0f0;

// 间距
@spacing-xs: 4px;
@spacing-sm: 8px;
@spacing-md: 16px;
@spacing-lg: 24px;
@spacing-xl: 32px;

// 字体
@font-size-xs: 12px;
@font-size-sm: 13px;
@font-size: 14px;
@font-size-lg: 16px;
@font-size-xl: 18px;
@font-size-xxl: 20px;

// 圆角
@border-radius-sm: 2px;
@border-radius: 4px;
@border-radius-lg: 8px;

// 阴影
@shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
@shadow-light: 0 1px 4px rgba(0, 0, 0, 0.08);

// 动画
@transition: 0.3s ease;
```

### Less 全局混入

```less
// src/assets/styles/mixins.less

// Flexbox
.flex-row() {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-column() {
  display: flex;
  flex-direction: column;
}

.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 圆形
.circle(@size) {
  width: @size;
  height: @size;
  border-radius: 50%;
}

// 文本省略
.text-ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-multiline(@lines) {
  display: -webkit-box;
  -webkit-line-clamp: @lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 语言适配混入
.lang-specific(@zh-rules, @en-rules) {
  .lang-zh-CN & {
    @zh-rules();
  }

  .lang-en-US & {
    @en-rules();
  }
}
```

## 快速检查清单

生成代码前必须检查：

- [ ] 文件路径正确（全局/页面组件）
- [ ] 组件使用文件夹形式（index.jsx + styles.less + README.md）
- [ ] 所有组件有完整的 PropTypes 和 defaultProps
- [ ] 所有函数有 JSDoc 注释
- [ ] 安装了 i18next 和 react-i18next
- [ ] i18n 配置文件已创建
- [ ] 组件中导入了 useTranslation
- [ ] 所有用户可见文本使用 t() 函数
- [ ] 语料文件已创建（至少 zh-CN、en-US）
- [ ] 语料文件结构一致
- [ ] 在 App.jsx 中设置了语言 className
- [ ] 关键 UI 组件有语言样式适配
- [ ] 安装了 Less：`pnpm install -D less`
- [ ] 样式文件是 .less 扩展名
- [ ] 导入了 Less 变量和混入
- [ ] 使用 Less 变量替代硬编码
- [ ] 使用 Less 混入复用样式
- [ ] API 请求有完整错误处理
- [ ] 处理了所有状态（loading、error、empty、success）
- [ ] 列表有稳定的 key
- [ ] 事件处理使用 useCallback
- [ ] 计算使用 useMemo
- [ ] 图片有 alt 属性
- [ ] 表单控件有 label
- [ ] 按钮有明确文本或 aria-label
- [ ] 支持键盘操作
- [ ] ESLint 无 error 和 warning
- [ ] 无 console.log 和 debugger
- [ ] 无硬编码敏感信息
- [ ] 代码已经过 Review

## 适用场景

✅ **适合：**
- 团队核心模块开发
- 生产环境代码
- 公共组件库
- 需要多语言支持的团队项目
- 高质量要求的项目
- 需要统一设计规范的项目

❌ **不适合：**
- 个人项目（使用 `solo-medium-less-i18n.md`）
- 快速原型（使用 `solo-low.md`）
- 单一语言项目（使用 `team-high-less.md`）
- 不需要 Less 的项目（使用 `team-high-i18n.md`）

## 团队协作规范

### Git 提交规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建/工具配置

**示例：**
```
feat(user): 添加用户卡片组件

- 支持多种尺寸
- 完整的多语言支持
- Less 样式变量
- 完整的可访问性支持

Closes #123
```

### Code Review 检查点

- [ ] 代码符合团队规范
- [ ] PropTypes 和 JSDoc 完整
- [ ] 错误处理完善
- [ ] 性能优化合理
- [ ] 可访问性支持
- [ ] 多语言支持完整
- [ ] Less 样式规范
- [ ] 测试覆盖充分
- [ ] 文档清晰完整

## 优势

- **高质量**：最严格的代码标准
- **团队协作**：统一规范，易于维护
- **Less 支持**：强大的样式管理
- **国际化**：完整的多语言支持
- **语言样式适配**：优秀的用户体验
- **可访问性**：符合 WCAG 标准
- **性能优化**：使用 React 性能最佳实践
- **可维护性**：完整的文档和注释

## 相关文档

- [小组项目规范](../project-type/team.md)
- [高质量级别规范](../quality-level/high.md)
- [Less 样式规范](../base/styles-less.md)
- [i18n 国际化规范](../base/i18n.md)
- [通用代码规范](../base/common.md)
