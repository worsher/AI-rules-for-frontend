# 单人项目 - 中质量级别 - Less 版本

> 适合大多数个人项目的默认配置，使用 Less 作为样式方案

## 组合说明

- **基础规范**：[`base/common.md`](../base/common.md)、[`base/naming.md`](../base/naming.md)、[`base/validation.md`](../base/validation.md)、[`base/styles-less.md`](../base/styles-less.md)
- **项目类型**：[`project-type/solo.md`](../project-type/solo.md)
- **质量级别**：[`quality-level/medium.md`](../quality-level/medium.md)
- **可选拓展**：按需叠加 [`base/i18n.md`](../base/i18n.md)、[`base/responsive.md`](../base/responsive.md)

## 配置说明

- **项目类型**：单人项目
- **质量级别**：中等
- **样式方案**：Less ⭐
- **平衡**：开发效率与代码质量

## 使用本规范

在与 AI 对话时，使用以下提示：

```markdown
请使用以下规范生成代码：
- 项目类型：单人项目
- 质量级别：中
- 样式方案：Less
- 技术栈：React + Vite + Axios + Less + pnpm
```

或简单地说：

```markdown
使用单人项目中质量规范（Less 版本）生成代码
```

## 与 CSS 版本的区别

本规范与 `solo-medium.md` 的唯一区别是使用 Less 而非纯 CSS。

**主要变化：**
1. 样式文件扩展名：`.less` 而非 `.css`
2. 可使用 Less 变量、混入、嵌套
3. 需要安装 Less：`pnpm install -D less`

## 核心规范汇总

### 1. 组件规范

```jsx
// 组件必须使用文件夹形式
ComponentName/
├── index.jsx
└── styles.less      # 使用 .less

// 导入 Less 文件
import './styles.less'
```

### 2. Less 样式规范

```less
// src/components/UserCard/styles.less
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

.user-card {
  display: flex;
  padding: @spacing-md;
  border: 1px solid @border-color;
  border-radius: @border-radius;
  transition: all @transition;

  &:hover {
    box-shadow: @shadow;
  }

  &__avatar {
    .circle(60px);
    object-fit: cover;
  }

  &__name {
    margin: @spacing-sm 0;
    font-size: @font-size-lg;
    color: @text-primary;
  }
}
```

### 3. 全局样式结构

```
src/assets/styles/
├── variables.less    # 变量定义
├── mixins.less       # 混入函数
├── global.less       # 全局样式
└── index.less        # 入口文件
```

```less
// src/assets/styles/index.less
@import './variables.less';
@import './mixins.less';
@import './global.less';
```

```jsx
// src/main.jsx
import './assets/styles/index.less'
```

### 4. 变量使用

```less
// src/assets/styles/variables.less
@primary-color: #1890ff;
@success-color: #52c41a;
@error-color: #ff4d4f;

@spacing-sm: 8px;
@spacing-md: 16px;
@spacing-lg: 24px;

@border-radius: 4px;
@border-color: #d9d9d9;

@text-primary: #333;
@text-secondary: #666;

@font-size: 14px;
@font-size-lg: 16px;

@transition: 0.3s;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```

### 5. 混入使用

```less
// src/assets/styles/mixins.less

// 文本溢出
.text-ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Flex 居中
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
```

### 6. API 请求（与 CSS 版本相同）

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

### 7. 代码检查

```
✅ 必须：
- ESLint 0 errors（允许少量 warnings）
- 代码可以构建
- 基本功能完整
- Less 文件语法正确

💡 建议：
- 复杂组件添加 PropTypes
- 关键逻辑添加注释
- 使用 Less 变量和混入
```

## 具体规则

### ✅ 必须遵守

1. 组件使用文件夹形式，样式文件为 `.less`
2. 导入全局 Less 变量和混入
3. 使用统一的 axios 实例
4. API 请求有基本错误处理
5. 列表渲染使用 key
6. 无硬编码敏感信息
7. ESLint 无 error

### 💡 建议遵守

1. 使用 Less 变量替代硬编码值
2. 使用 Less 混入复用样式
3. 嵌套不超过 3 层
4. 复杂组件添加 PropTypes
5. 重要函数添加注释

### 🆓 可选

1. 简单组件的 PropTypes
2. 详细的文档
3. 单元测试
4. 高级 Less 特性（函数、循环等）

## 完整示例

### 组件示例

```jsx
// src/components/UserCard/index.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import './styles.less'

/**
 * 用户卡片组件
 */
function UserCard({ user, size = 'medium', onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.(user.id)
  }

  return (
    <div
      className={`user-card user-card--${size} ${isHovered ? 'user-card--hovered' : ''}`}
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
      {user.bio && <p className="user-card__bio">{user.bio}</p>}
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
}

export default UserCard
```

```less
// src/components/UserCard/styles.less
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: @spacing-md;
  border: 1px solid @border-color;
  border-radius: @border-radius;
  background: white;
  cursor: pointer;
  transition: all @transition;

  &--hovered {
    box-shadow: @shadow;
    transform: translateY(-2px);
  }

  &__avatar {
    .circle(60px);
    object-fit: cover;
  }

  &__avatar-placeholder {
    .circle(60px);
    .flex-center();
    background: @primary-color;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }

  &__name {
    margin: @spacing-sm 0;
    font-size: @font-size-lg;
    font-weight: 600;
    color: @text-primary;
  }

  &__bio {
    margin: 0;
    font-size: @font-size;
    color: @text-secondary;
    .text-ellipsis();
  }

  // 尺寸变体
  &--small {
    padding: @spacing-sm;

    .user-card__avatar,
    .user-card__avatar-placeholder {
      .circle(40px);
      font-size: 16px;
    }
  }

  &--large {
    padding: @spacing-lg;

    .user-card__avatar,
    .user-card__avatar-placeholder {
      .circle(80px);
      font-size: 32px;
    }
  }
}
```

### 页面示例

```jsx
// src/pages/UserManagement/index.jsx
import { useState, useEffect } from 'react'
import { userAPI } from '../../api/user'
import UserCard from '../../components/UserCard'
import './styles.less'

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
      <h1 className="user-management__title">用户管理</h1>
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

```less
// src/pages/UserManagement/styles.less
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

.user-management {
  padding: @spacing-lg;

  &__title {
    margin: 0 0 @spacing-lg;
    font-size: 24px;
    color: @text-primary;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: @spacing-md;
  }
}
```

## Less 配置

### 安装

```bash
pnpm install -D less
```

### Vite 配置（可选）

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 自动导入变量和混入（可选）
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `
      }
    }
  }
})
```

如果配置了 `additionalData`，组件中就不需要手动导入：

```less
// 不需要这两行了
// @import '~@/assets/styles/variables.less';
// @import '~@/assets/styles/mixins.less';

.user-card {
  padding: @spacing-md;  // 直接使用
  .flex-center();        // 直接使用
}
```

## 快速检查清单

生成代码前检查：

- [ ] 文件路径正确
- [ ] 组件使用文件夹形式
- [ ] 样式文件是 `.less`
- [ ] 导入了变量和混入（或配置了自动导入）
- [ ] 使用 Less 变量而非硬编码
- [ ] API 请求有错误处理
- [ ] 列表有 key
- [ ] 无硬编码敏感信息

## 适用场景

✅ **适合：**
- 个人项目
- 需要使用 Less 特性（变量、混入、嵌套）
- 中小型应用
- 常规功能开发
- 快速迭代

❌ **不适合：**
- 团队不熟悉 Less
- 项目非常简单（纯 CSS 足够）
- 需要其他预处理器（Sass/Stylus）

## 从 CSS 版本迁移

如果项目从 `solo-medium.md`（CSS）迁移到本规范（Less）：

1. **安装 Less**
   ```bash
   pnpm install -D less
   ```

2. **重命名样式文件**
   ```bash
   # 将所有 .css 改为 .less
   find src -name "*.css" -exec sh -c 'mv "$1" "${1%.css}.less"' _ {} \;
   ```

3. **创建变量和混入文件**
   - `src/assets/styles/variables.less`
   - `src/assets/styles/mixins.less`
   - `src/assets/styles/index.less`

4. **逐步重构样式**
   - 提取重复值为变量
   - 创建常用混入
   - 使用嵌套优化代码

## 优势

- **开发效率高**：减少不必要的规范束缚
- **代码复用**：变量和混入减少重复
- **易于维护**：统一管理样式 token
- **Less 特性**：嵌套、变量、混入、函数

## 相关文档

- [Less 样式规范完整文档](../base/styles-less.md)
- [通用代码规范](../base/common.md)
- [单人项目规范](../project-type/solo.md)
- [中质量级别规范](../quality-level/medium.md)
