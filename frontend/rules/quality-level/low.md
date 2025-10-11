# 低质量级别规范

> 适用于快速原型、实验性功能，优先保证功能实现

> ESLint 配置：使用 `quality-level/low.eslintrc.js`，TypeScript 项目可在此基础上扩展 `@typescript-eslint/*` 规则。

> TypeScript 配置：使用 `quality-level/low.tsconfig.json`

## 适用场景

- 快速原型验证
- 实验性功能
- 临时页面/活动页
- 概念验证（POC）
- 学习和探索

## 检查标准

### ✅ 必须通过（最低要求）

#### 1. 基本语法

- [ ] 代码能够成功构建（无语法错误）
- [ ] Prettier 格式化通过

#### 2. 基本安全

- [ ] 无明显安全漏洞
- [ ] 无硬编码敏感信息

### 💡 建议但不强制

- PropTypes 可选
- 注释可选
- 文档可选
- 性能优化可选
- 错误处理建议添加

## 代码示例

### 组件示例（最简化）

```jsx
import { useState } from 'react'
import './styles.css'

// TODO: 后续完善 PropTypes 和文档
function UserCard({ user, onClick }) {
  return (
    <div className="user-card" onClick={() => onClick?.(user.id)}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
    </div>
  )
}

export default UserCard
```

### API 请求示例（简化）

```javascript
// 快速实现，后续优化
export const userAPI = {
  getList: () => request.get('/users'),
  getDetail: (id) => request.get(`/users/${id}`),
}
```

### 数据加载组件示例（基础）

```jsx
function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // 简化的数据加载
    userAPI.getList()
      .then(setUsers)
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {users.map((user, index) => (
        // 允许使用 index 作为 key
        <UserCard key={index} user={user} />
      ))}
    </div>
  )
}
```

## ESLint 配置

```javascript
// .eslintrc.js (低级别)
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
  },
}
```

## 允许的快速方案

### ✅ 可以接受

```jsx
// 使用 index 作为 key
items.map((item, i) => <div key={i}>{item}</div>)

// 简化的错误处理
getData().catch(console.error)

// 内联的简单逻辑
<div>{user ? user.name : '未登录'}</div>

// 省略 PropTypes
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>
}

// 简单的 console.log 调试
console.log('User data:', user)

// 允许一定的代码重复（后续重构）
```

### 🔴 仍然禁止

```jsx
// ❌ 硬编码密钥
const API_KEY = 'sk-1234567890'

// ❌ 明显的 XSS 漏洞
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ 语法错误
const user = {
  name: '张三'
  age: 25  // 缺少逗号
}
```

## 通过标准

- 代码可以构建
- 无语法错误
- 无明显安全漏洞
- 基本功能实现

## 后续优化建议

当原型验证成功，转为正式功能时，建议升级到中或高级别：

```markdown
# 优化清单

- [ ] 添加 PropTypes
- [ ] 添加错误处理
- [ ] 添加 loading 状态
- [ ] 优化性能
- [ ] 完善文档
- [ ] 添加注释
- [ ] 使用稳定的 key
- [ ] 移除 console.log
```

## 适合使用低级别的信号

- 快速验证想法
- 功能可能会废弃
- 短期使用（< 1 个月）
- 用户量很小（< 10 人）
- 不涉及敏感数据

## 风险提示

### ⚠️ 注意事项

- **不适合生产环境**：低级别代码不应直接上线
- **技术债务**：快速代码会积累技术债
- **维护困难**：缺少文档和注释难以维护
- **性能问题**：未优化可能有性能问题

### 降低风险的方法

1. **明确标记**
   ```jsx
   // TODO: 临时实现，验证后需重构
   // 质量级别：LOW
   // 创建日期：2024-01-15
   ```

2. **限制使用范围**
   - 不要在核心功能中使用
   - 限制在实验性页面

3. **设置优化时间**
   - 验证成功后立即优化
   - 或在 2 周内升级质量级别

## 何时必须升级

当出现以下情况时，必须升级到更高级别：

- ✅ 功能验证成功，决定保留
- ✅ 用户量增长（> 100 人使用）
- ✅ 发现多个 Bug
- ✅ 需要长期维护（> 3 个月）
- ✅ 涉及用户数据
- ✅ 其他开发者需要修改

## 低级别的价值

- **快速验证**：快速实现想法
- **降低成本**：不浪费时间在可能废弃的功能上
- **灵活调整**：容易修改和重构
- **学习探索**：适合学习新技术

## 总结

低质量级别是**临时的、有时限的**：

- 适合快速原型
- 不适合生产代码
- 验证后必须优化
- 明确标记和时限
