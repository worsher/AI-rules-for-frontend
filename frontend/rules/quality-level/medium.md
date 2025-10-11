# 中质量级别规范

> 适用于日常开发、常规功能，平衡质量与效率

> ESLint 配置：使用 `quality-level/medium.eslintrc.js`，TypeScript 项目可在此基础上扩展 `@typescript-eslint/*` 规则。

> TypeScript 配置：使用 `quality-level/medium.tsconfig.json`

## 适用场景

- 常规业务功能
- 后台管理页面
- 数据展示页面
- 非核心功能模块
- 日常迭代开发

## 检查标准

### ✅ 必须通过

#### 1. 代码规范

- [ ] ESLint检查：0 errors（允许少量 warnings）
- [ ] Prettier 格式化通过
- [ ] 生产代码无 console.log、debugger
- [ ] 文件长度 < 300 行
- [ ] 函数复杂度 < 20

#### 2. 类型和接口

- [ ] 复杂组件必须有 PropTypes
- [ ] API 函数必须有注释说明用途
- [ ] 简单工具函数可省略详细 JSDoc

#### 3. 文档

- [ ] 导出的 API 函数必须有注释
- [ ] 复杂组件（50+ 行）建议有 README
- [ ] 复杂业务逻辑建议有注释

#### 4. 错误处理

- [ ] API 请求必须有错误处理
- [ ] 错误信息应该用户友好
- [ ] 异步操作建议有 loading 状态

#### 5. 性能优化（按需）

- [ ] 列表渲染必须使用 key
- [ ] 明显的重复渲染应该优化
- [ ] 小型列表（< 50 项）不强制虚拟滚动

#### 6. 安全性

- [ ] 无硬编码敏感信息
- [ ] 用户输入应该验证

## 代码示例

### 组件示例

```jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * 用户卡片组件
 */
function UserCard({ user, onClick }) {
  const handleClick = () => {
    onClick?.(user.id)
  }

  return (
    <div className="user-card" onClick={handleClick}>
      {user.avatar && (
        <img
          className="user-card__avatar"
          src={user.avatar}
          alt={user.name}
        />
      )}
      <div className="user-card__content">
        <h3>{user.name}</h3>
      </div>
    </div>
  )
}

// 复杂组件必须有 PropTypes
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default UserCard
```

### API 请求示例

```javascript
/**
 * 获取用户列表
 */
export function getUserList(params) {
  return request({
    url: '/users',
    method: 'GET',
    params,
  })
}
```

### 数据加载组件示例

```jsx
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
      setError('加载失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

## ESLint 配置

```javascript
// .eslintrc.js (中级别)
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'prefer-const': 'warn',
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'complexity': ['warn', 20],
  },
}
```

## 通过标准

- 所有 ✅ 必须通过项通过
- 无 ESLint error（允许 warning）
- 构建成功

## 与高级别的主要差异

| 项目 | 高级别 | 中级别 |
|------|-------|-------|
| ESLint | 0 error, 0 warning | 0 error, 少量 warning |
| PropTypes | 所有组件必须 | 复杂组件必须 |
| 文档 | 完整 README | 复杂组件建议 |
| 性能优化 | 全面优化 | 明显问题优化 |
| 文件长度 | < 200 行 | < 300 行 |
| 函数复杂度 | < 15 | < 20 |

## 适合使用中级别的信号

- 常规功能开发
- 用户量适中
- 非敏感数据
- 开发时间有限
- 平衡质量与效率

## 优化建议

虽然是中级别，但建议：

- 重要功能添加 PropTypes
- 关键逻辑添加注释
- 明显的性能问题要优化
- 保持代码整洁易读
