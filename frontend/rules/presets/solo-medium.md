# 单人项目 - 中质量级别（推荐）

> 适合大多数个人项目的默认配置

## 配置说明

- **项目类型**：单人项目
- **质量级别**：中等
- **平衡**：开发效率与代码质量

## 使用本规范

在与 AI 对话时，使用以下提示：

```markdown
请使用以下规范生成代码：
- 项目类型：单人项目
- 质量级别：中
- 技术栈：React + Vite + Axios + pnpm
```

或简单地说：

```markdown
使用单人项目中质量规范生成代码
```

## 核心规范汇总

### 1. 组件规范

```jsx
// 组件必须使用文件夹形式
ComponentName/
├── index.jsx
└── styles.css

// 复杂组件建议添加 PropTypes
import PropTypes from 'prop-types'

function UserCard({ user, onClick }) {
  return <div>{user.name}</div>
}

// 复杂组件建议添加
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}
```

### 2. 样式规范

```css
/* 使用 kebab-case 类名 */
.user-card {
  padding: 16px;
}

/* 页面样式添加页面前缀 */
.home-page .section {
  margin-bottom: 20px;
}
```

### 3. API 请求

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
  setError('加载失败')
}
```

### 4. 状态管理

```jsx
// 简单的跨组件状态使用 Context
// 层级不深可以使用 props
```

### 5. 代码检查

```
✅ 必须：
- ESLint 0 errors（允许少量 warnings）
- 代码可以构建
- 基本功能完整

💡 建议：
- 复杂组件添加 PropTypes
- 关键逻辑添加注释
```

## 具体规则

### ✅ 必须遵守

1. 组件使用文件夹形式
2. 使用统一的 axios 实例
3. API 请求有基本错误处理
4. 列表渲染使用 key
5. 无硬编码敏感信息
6. ESLint 无 error

### 💡 建议遵守

1. 复杂组件添加 PropTypes
2. 重要函数添加注释
3. 明显的性能问题优化
4. loading 状态处理

### 🆓 可选

1. 简单组件的 PropTypes
2. 详细的文档
3. 单元测试
4. 全面的性能优化

## 示例代码

### 完整组件示例

```jsx
// src/components/UserCard/index.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * 用户卡片组件
 */
function UserCard({ user, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

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
      {user.avatar && (
        <img className="user-card__avatar" src={user.avatar} alt={user.name} />
      )}
      <h3>{user.name}</h3>
      {user.bio && <p>{user.bio}</p>}
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default UserCard
```

```css
/* src/components/UserCard/styles.css */
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.user-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-card__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
```

### 页面组件示例

```jsx
// src/pages/UserManagement/index.jsx
import { useState, useEffect } from 'react'
import { userAPI } from '../../api/user'
import UserCard from '../../components/UserCard'
import './styles.css'

function UserManagement() {
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
      setError('加载失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>

  return (
    <div className="user-management">
      <h1>用户管理</h1>
      <div className="user-management__list">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UserManagement
```

## 快速检查清单

生成代码前检查：

- [ ] 文件路径正确
- [ ] 组件使用文件夹形式
- [ ] 有样式文件
- [ ] API 请求有错误处理
- [ ] 列表有 key
- [ ] 无硬编码敏感信息

## 适用场景

✅ **适合：**
- 个人项目
- 中小型应用
- 常规功能开发
- 快速迭代
- 平衡质量与效率

❌ **不适合：**
- 核心金融/支付功能
- 多人协作项目
- 需要严格质量控制的场景

## 何时升级

考虑升级到更高级别当：

- 项目变大（> 50 个组件）
- 有其他人加入
- 遇到较多维护问题
- 需要长期维护（> 1 年）

## 何时降级

考虑降级到低级别当：

- 快速原型验证
- 临时页面（< 1 个月）
- 实验性功能

## 优势

- **开发效率高**：减少不必要的规范束缚
- **质量有保证**：关键部分有质量控制
- **灵活调整**：可以随时改变决定
- **适合个人**：符合个人开发节奏