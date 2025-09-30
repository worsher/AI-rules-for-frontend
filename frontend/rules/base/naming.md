# 命名规范

## 命名总则

- 使用有意义的描述性名称
- 避免使用缩写（除非是通用缩写如 id, url）
- 保持一致性

## 详细规范

### 组件命名

**规则：** PascalCase（大驼峰）

```javascript
✅ 正确
UserCard
ProductList
SearchBox
UserManagementPage

❌ 错误
userCard
user-card
Usercard
```

### 函数和变量命名

**规则：** camelCase（小驼峰）

```javascript
✅ 正确
const userName = 'John'
const isLoading = true
function handleClick() {}
function getUserList() {}

❌ 错误
const user_name = 'John'
const IsLoading = true
function HandleClick() {}
```

### 布尔值命名

**规则：** 使用 is/has/should/can/will 前缀

```javascript
✅ 正确
const isActive = true
const hasPermission = false
const shouldUpdate = true
const canEdit = false
const willNavigate = true

❌ 错误
const active = true
const permission = false
```

### 事件处理函数命名

**规则：** handle + 事件名

```javascript
✅ 正确
const handleClick = () => {}
const handleSubmit = () => {}
const handleChange = () => {}
const handleUserDelete = () => {}

❌ 错误
const onClick = () => {}
const submit = () => {}
const change = () => {}
```

### 常量命名

**规则：** UPPER_SNAKE_CASE（大写下划线）

```javascript
✅ 正确
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3
const DEFAULT_PAGE_SIZE = 10

❌ 错误
const apiBaseUrl = 'https://api.example.com'
const maxRetryCount = 3
```

### CSS 类名命名

**规则：** kebab-case（短横线）或 BEM

```css
/* kebab-case */
✅ 正确
.user-card {}
.btn-primary {}
.search-box {}

❌ 错误
.userCard {}
.btnPrimary {}
.SearchBox {}

/* BEM 规范 */
✅ 正确
.user-card {}
.user-card__avatar {}
.user-card__name {}
.user-card--large {}

/* Block__Element--Modifier */
```

### 文件和文件夹命名

**组件文件夹：** PascalCase
```
✅ 正确
components/UserCard/
components/SearchBox/
pages/UserManagement/

❌ 错误
components/userCard/
components/user-card/
```

**其他文件夹：** camelCase
```
✅ 正确
utils/format.js
hooks/useAuth.js
api/user.js

❌ 错误
Utils/Format.js
Hooks/UseAuth.js
```

### Hook 命名

**规则：** use + PascalCase

```javascript
✅ 正确
useAuth
useFetch
useLocalStorage
useUserList

❌ 错误
auth
fetchHook
localStorageHook
userList
```

### Context 命名

**规则：** PascalCase + Context 后缀

```javascript
✅ 正确
AuthContext
ThemeContext
UserContext

❌ 错误
authContext
Auth
theme
```

### API 函数命名

**规则：** 动词 + 名词

```javascript
✅ 正确
getUserList
createUser
updateUserProfile
deleteUser
fetchProductDetail

❌ 错误
users
user
profile
```

## 特殊场景

### 私有函数/变量

**约定：** 使用 _ 前缀（可选）

```javascript
// 私有辅助函数
const _formatDate = (date) => {}

// 或者放在组件/模块内部，不导出
function formatDate(date) {}
```

### 临时变量

**在循环或简短作用域中可以使用简短名称**

```javascript
✅ 可接受
users.map((u, i) => {})
data.forEach((item, index) => {})

// 但是在较长作用域中应该使用完整名称
const userData = users.map((user, index) => {
  const userName = user.name
  // ...
  return userData
})
```

### 复数和单数

```javascript
✅ 正确
const user = { name: 'John' }        // 单个对象用单数
const users = [{}, {}]                // 数组用复数
const userList = [{}, {}]             // 或使用 List 后缀

function getUser(id) {}               // 获取单个
function getUserList() {}             // 获取列表
```

## 命名检查清单

生成代码时检查：

- [ ] 组件名是否 PascalCase
- [ ] 函数/变量名是否 camelCase
- [ ] 布尔值是否有 is/has 等前缀
- [ ] 事件处理函数是否有 handle 前缀
- [ ] 常量是否 UPPER_SNAKE_CASE
- [ ] CSS 类名是否 kebab-case
- [ ] Hook 是否有 use 前缀
- [ ] Context 是否有 Context 后缀
- [ ] 名称是否有意义且易于理解