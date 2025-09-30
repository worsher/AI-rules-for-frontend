# 单人项目规范

> 适用于个人开发者，注重开发效率和快速迭代

## 总体原则

- **简洁优先**：避免过度设计，选择简单直接的方案
- **快速迭代**：允许先实现功能，后续优化
- **自我一致**：保持个人编码风格的一致性

## 组件规范

### 文件结构（简化）

```
ComponentName/
├── index.jsx
└── styles.css
```

**不强制要求：**
- README.md（简单组件可省略）
- 测试文件

### PropTypes（可选）

```jsx
// 简单组件可以省略 PropTypes
function UserCard({ user, onClick }) {
  return <div>{user.name}</div>
}

// 复杂组件建议添加
import PropTypes from 'prop-types'

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}
```

### 注释要求（宽松）

```jsx
// 组件顶部简单注释即可
/**
 * 用户卡片组件
 */
function UserCard({ user }) {
  return <div>{user.name}</div>
}

// 复杂逻辑建议添加注释
function calculatePrice(items) {
  // 计算总价
  const total = items.reduce((sum, item) => sum + item.price, 0)
  return total
}
```

## 样式规范（简化）

### CSS 类名

```css
/* 可以使用简单的 kebab-case */
.user-card {
  padding: 16px;
}

.user-card .avatar {
  width: 60px;
}

/* 不强制要求 BEM，但建议保持一致 */
```

### 样式组织

```
✅ 允许：
- 组件样式在组件文件夹内
- 页面样式在页面文件夹内
- 全局样式在 src/assets/styles/

✅ 灵活处理：
- 小项目可以将相关样式合并
- 可以使用内联样式处理动态样式
```

## API 请求（简化）

### 简化的错误处理

```jsx
// 基本错误处理即可
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    userAPI.getList()
      .then(setUsers)
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>加载中...</div>

  return <div>{/* 渲染列表 */}</div>
}
```

### API 组织（灵活）

```javascript
// 可以使用对象形式
export const userAPI = {
  getList: (params) => request.get('/users', { params }),
  getDetail: (id) => request.get(`/users/${id}`),
}

// 也可以直接导出函数
export function getUser(id) {
  return request.get(`/users/${id}`)
}
```

## 状态管理（简化）

### Context（按需使用）

```jsx
// 简单的跨组件状态可以使用 Context
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // 可以不单独提取 Hook，直接使用 Context
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// 或者提供简单的 Hook
export function useAuth() {
  return useContext(AuthContext)
}
```

### Props Drilling（小项目可接受）

```jsx
// 层级不深（2-3层）可以直接传递 props
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data} />
  </Child>
</Parent>
```

## 文档要求（最小化）

### 必须的文档

- **项目 README**：基本说明和启动方式

### 可选的文档

- 组件 README（复杂组件建议添加）
- API 文档（可以用注释代替）
- 开发日志（个人可自由选择）

## 测试要求

**不强制要求测试**

- 可以手动测试为主
- 关键功能建议添加测试
- 可以使用简单的 console.log 调试

## 代码审查

**自我审查**

- 生成代码后自己快速检查
- 确保基本功能正常
- 主要问题修复即可

## 文件长度（宽松）

```
✅ 允许：
- 组件文件 < 300 行
- 函数长度 < 80 行
- 复杂度适度即可

💡 建议：
- 超过 300 行考虑拆分
- 但不强制要求
```

## Git 提交（简化）

```bash
# 简单的 commit message
git commit -m "添加用户列表功能"
git commit -m "修复搜索bug"

# 不强制要求规范格式
# 但建议保持清晰
```

## 快速开发建议

### 优先实现功能

```
1. 先实现基本功能 ✅
2. 确保功能可用 ✅
3. 后续优化性能 💡
4. 完善文档注释 💡
```

### 允许的快速方案

```jsx
// ✅ 允许使用 index 作为 key（无更好选择时）
items.map((item, index) => <div key={index}>{item}</div>)

// ✅ 允许简化的错误处理
userAPI.getList().catch(console.error)

// ✅ 允许内联的简单逻辑
<div>{user ? user.name : '未登录'}</div>

// ✅ 允许省略 PropTypes（简单组件）
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>
}
```

### 不建议但可接受

```jsx
// 可接受：多个 state 未合并
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [data, setData] = useState(null)

// 可接受：未使用 useCallback（小项目）
const handleClick = () => {
  console.log('clicked')
}

// 可接受：未使用 memo（无性能问题时）
function UserCard({ user }) {
  return <div>{user.name}</div>
}
```

## 检查清单（简化版）

生成代码时检查以下最基本的事项：

- [ ] 文件路径正确
- [ ] 组件使用文件夹形式
- [ ] 样式文件存在
- [ ] 基本功能完整
- [ ] 无明显错误
- [ ] 代码可以运行

## 何时升级到团队规范

当出现以下情况时，考虑采用更严格的规范：

- 项目变大（> 50 个组件）
- 有其他人加入
- 需要长期维护
- 遇到较多维护问题

## 单人项目的优势

- **快速开发**：减少规范束缚
- **灵活调整**：可以随时改变决定
- **专注功能**：优先实现业务价值
- **降低成本**：减少文档和测试投入

## 注意事项

即使是单人项目，也应该：

- ✅ 使用统一的 axios 实例
- ✅ 使用环境变量存储配置
- ✅ 基本的错误处理
- ✅ 保持代码基本可读性
- ✅ 定期备份代码（Git）

避免：

- ❌ 完全没有注释
- ❌ 硬编码敏感信息
- ❌ 完全忽略错误处理
- ❌ 不使用版本控制