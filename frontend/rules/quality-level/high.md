# 高质量级别规范

> 适用于核心模块、生产代码、多人协作，要求最严格

> ESLint 配置：使用 `quality-level/high.eslintrc.js`，TypeScript 项目可在此基础上扩展 `@typescript-eslint/*` 规则。

> TypeScript 配置：使用 `quality-level/high.tsconfig.json`

## 适用场景

- 生产环境核心功能
- 公共组件库
- 用户认证/支付模块
- 数据安全相关功能
- API 核心接口

## 检查标准

### ✅ 必须通过（100%）

所有以下项目必须全部通过，否则不通过质量检查。

#### 1. 代码规范

- [ ] ESLint 检查：0 errors, 0 warnings
- [ ] Prettier 格式化通过
- [ ] 无 console.log、debugger
- [ ] 无注释掉的代码块
- [ ] 文件长度 < 200 行
- [ ] 函数长度 < 50 行
- [ ] 圈复杂度 < 15

#### 2. 类型和接口

- [ ] 所有组件必须有 PropTypes
- [ ] 所有 API 函数必须有 JSDoc
- [ ] Context value 必须有类型定义
- [ ] 回调函数必须声明参数类型

#### 3. 文档

- [ ] 所有导出函数有 JSDoc
- [ ] 复杂组件（20+ 行）有 README.md
- [ ] 复杂逻辑有注释说明
- [ ] TODO/FIXME 注明负责人和日期

#### 4. 错误处理

- [ ] 所有 API 请求有 try-catch
- [ ] 错误信息用户友好
- [ ] 异步操作有 loading 状态
- [ ] 处理所有边界情况（空数据、错误、loading）
- [ ] 表单有完整验证

#### 5. 性能优化

- [ ] 列表渲染使用稳定的 key（不用 index）
- [ ] 大型列表（100+ 项）使用虚拟滚动
- [ ] 事件处理使用 useCallback
- [ ] 计算密集型操作使用 useMemo
- [ ] 避免在循环中创建函数/对象
- [ ] 图片使用懒加载

#### 6. 安全性

- [ ] 无硬编码密钥、密码、Token
- [ ] 用户输入经过验证和转义
- [ ] 敏感信息不存储在 localStorage
- [ ] 外部链接有 rel="noopener noreferrer"
- [ ] dangerouslySetInnerHTML 经过审查

#### 7. 可访问性

- [ ] 图片有 alt 属性
- [ ] 表单控件有关联的 label
- [ ] 按钮有清晰文本或 aria-label
- [ ] 可交互元素支持键盘操作
- [ ] 颜色对比度符合 WCAG AA

#### 8. 测试（可选但强烈建议）

- [ ] 关键功能有单元测试
- [ ] 测试覆盖率 > 80%

## 代码示例

### 组件示例

```jsx
import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * 用户卡片组件
 * 展示用户基本信息，支持点击交互
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - 用户信息对象
 * @param {number} props.user.id - 用户 ID
 * @param {string} props.user.name - 用户姓名
 * @param {string} [props.user.avatar] - 用户头像 URL
 * @param {'small'|'medium'|'large'} [props.size='medium'] - 卡片尺寸
 * @param {Function} [props.onClick] - 点击回调函数
 * @example
 * <UserCard
 *   user={{ id: 1, name: '张三' }}
 *   onClick={(id) => console.log(id)}
 * />
 */
function UserCard({ user, size = 'medium', onClick }) {
  // 事件处理：点击卡片
  const handleClick = useCallback(() => {
    onClick?.(user.id)
  }, [onClick, user.id])

  // 事件处理：键盘操作
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }, [handleClick])

  return (
    <div
      className={`user-card user-card--${size}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`用户卡片: ${user.name}`}
    >
      {user.avatar ? (
        <img
          className="user-card__avatar"
          src={user.avatar}
          alt={`${user.name}的头像`}
          loading="lazy"
        />
      ) : (
        <div className="user-card__avatar-placeholder" aria-hidden="true">
          {user.name[0]}
        </div>
      )}

      <div className="user-card__content">
        <h3 className="user-card__name">{user.name}</h3>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
}

UserCard.defaultProps = {
  size: 'medium',
}

export default UserCard
```

### API 请求示例

```javascript
/**
 * 获取用户列表
 * @param {Object} params
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=10] - 每页数量
 * @param {string} [params.keyword] - 搜索关键词
 * @returns {Promise<{list: Array, total: number}>} 用户列表数据
 * @throws {Error} 当网络请求失败或服务器返回错误时
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

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await userAPI.getList()
      setUsers(data)
    } catch (err) {
      setError('加载用户列表失败，请稍后重试')
      console.error('Load users failed:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  // 处理所有状态
  if (loading) {
    return (
      <div className="user-list__loading" role="status" aria-live="polite">
        <span className="sr-only">加载中</span>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="user-list__error" role="alert">
        <p>{error}</p>
        <button onClick={loadUsers}>重试</button>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="user-list__empty">
        <p>暂无用户数据</p>
      </div>
    )
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

## ESLint 配置

```javascript
// .eslintrc.js (高级别)
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'no-unused-vars': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    'no-eval': 'error',
    'react/prop-types': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'complexity': ['error', 15],
    'max-depth': ['error', 4],
    'max-lines-per-function': ['error', { max: 50, skipBlankLines: true }],
  },
}
```

## 质量检查流程

```
1. 代码生成
2. ESLint 检查 (必须通过)
3. Prettier 格式化 (必须通过)
4. 类型检查 (必须通过)
5. 文档检查 (必须通过)
6. 性能检查 (必须通过)
7. 安全检查 (必须通过)
8. 可访问性检查 (必须通过)
9. 构建测试 (必须通过)
10. 通过 → 完成
11. 不通过 → 修复 → 重新检查
```

## 通过标准

- **所有** ✅ 必须通过项全部通过
- 无任何 ESLint error
- 构建成功
- 功能完整

## 不通过处理

如果任何一项检查失败：

1. 清晰展示失败原因
2. 提供修复建议
3. 选项：
   - 自动修复（如果可以）
   - 手动修复
   - 回滚更改

## 适合使用高级别的信号

- 代码会影响多个用户
- 涉及敏感数据或金钱
- 是公共 API 或组件库
- 需要长期维护
- 多人协作开发

## 高质量代码的价值

- **可靠性**：减少 Bug
- **可维护性**：易于修改和扩展
- **可读性**：团队成员容易理解
- **安全性**：减少安全隐患
- **性能**：良好的用户体验
