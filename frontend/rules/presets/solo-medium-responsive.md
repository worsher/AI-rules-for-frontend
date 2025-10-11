# 单人项目 - 中质量级别 - 响应式版本

> 适合需要同时支持 PC 和 H5 的个人项目

## 组合说明

- **基础规范**：[`base/common.md`](../base/common.md)、[`base/naming.md`](../base/naming.md)、[`base/validation.md`](../base/validation.md)、[`base/responsive.md`](../base/responsive.md)
- **项目类型**：[`project-type/solo.md`](../project-type/solo.md)
- **质量级别**：[`quality-level/medium.md`](../quality-level/medium.md)
- **可选拓展**：按需叠加 [`base/i18n.md`](../base/i18n.md)、[`base/styles-less.md`](../base/styles-less.md)

## 配置说明

- **项目类型**：单人项目
- **质量级别**：中等
- **响应式**：PC + H5 兼容 📱💻
- **平衡**：开发效率与代码质量

## 使用本规范

在与 AI 对话时，使用以下提示：

```markdown
请使用以下规范生成代码：
- 项目类型：单人项目
- 质量级别：中
- 响应式：PC + H5 兼容
- 技术栈：React + Vite + Axios + 响应式设计 + pnpm
```

或简单地说：

```markdown
使用单人项目中质量规范（响应式版本）生成代码，需要同时支持 PC 和移动端
```

## 与基础版本的区别

本规范与 `solo-medium.md` 的主要区别是添加了响应式设计支持。

**主要变化：**
1. 组件需要适配 PC 和移动端
2. 使用媒体查询或 useMediaQuery hook
3. 样式需要响应式处理
4. 注意移动端特有问题（触摸、1px 边框等）
5. PC 和移动端交互差异化

## 核心规范汇总

### 1. 响应式断点

```css
/* 移动端（手机） */
@media (max-width: 767px) {
  /* 手机样式 */
}

/* 平板 */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 平板样式 */
}

/* PC 端（桌面） */
@media (min-width: 1024px) {
  /* PC 样式 */
}
```

### 2. Viewport 设置（必须）

```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 3. 响应式组件示例

```jsx
// src/components/UserCard/index.jsx
import { useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import PropTypes from 'prop-types'
import './styles.css'

/**
 * 用户卡片组件（响应式）
 */
function UserCard({ user, onClick }) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`user-card ${isMobile ? 'user-card--mobile' : 'user-card--desktop'}`}>
      <div className="user-card__avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="user-card__content">
        <h3 className="user-card__name">{user.name}</h3>
        <p className="user-card__email">{user.email}</p>

        {/* 移动端可展开，PC 端始终显示 */}
        {(isMobile && isExpanded) || !isMobile ? (
          <p className="user-card__bio">{user.bio}</p>
        ) : null}

        {isMobile && (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '收起' : '展开'}
          </button>
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
  onClick: PropTypes.func,
}

export default UserCard
```

### 4. 响应式样式（CSS）

```css
/* src/components/UserCard/styles.css */

/* 基础样式（移动优先） */
.user-card {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.user-card__avatar {
  width: 60px;
  height: 60px;
  margin: 0 auto 10px;
  border-radius: 50%;
  overflow: hidden;
}

.user-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-card__content {
  text-align: center;
}

.user-card__name {
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: 600;
}

/* 平板和 PC 样式 */
@media (min-width: 768px) {
  .user-card {
    flex-direction: row;
    padding: 20px;
  }

  .user-card__avatar {
    width: 80px;
    height: 80px;
    margin: 0 20px 0 0;
  }

  .user-card__content {
    text-align: left;
  }
}

/* 仅 PC 端悬停效果 */
@media (hover: hover) and (min-width: 1024px) {
  .user-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    transition: all 0.3s;
  }
}

/* 移动端点击态 */
@media (max-width: 767px) {
  .user-card:active {
    background-color: #f8f8f8;
  }
}
```

### 5. useMediaQuery Hook

```javascript
// src/hooks/useMediaQuery.js
import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (event) => setMatches(event.matches)

    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      media.addListener(listener)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        media.removeListener(listener)
      }
    }
  }, [query])

  return matches
}

// 预设的 Hooks
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
```

### 6. 响应式布局

```jsx
// src/pages/HomePage/index.jsx
import { useIsMobile } from '../../hooks/useMediaQuery'
import './styles.css'

function HomePage() {
  const isMobile = useIsMobile()

  return (
    <div className="home-page">
      {/* 移动端和 PC 端使用不同的导航 */}
      {isMobile ? <MobileNav /> : <DesktopNav />}

      <main className="home-page__content">
        <h1>欢迎</h1>
        {/* 内容 */}
      </main>

      {/* 移动端底部导航 */}
      {isMobile && <MobileTabBar />}
    </div>
  )
}

export default HomePage
```

```css
/* src/pages/HomePage/styles.css */

/* 移动端布局 */
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.home-page__content {
  flex: 1;
  padding: 10px;
}

/* PC 端布局 */
@media (min-width: 1024px) {
  .home-page {
    flex-direction: row;
  }

  .home-page__sidebar {
    width: 250px;
    flex-shrink: 0;
  }

  .home-page__content {
    flex: 1;
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### 7. 移动端特殊处理

```css
/* 1. 触摸优化 */
.button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  user-select: none;
  /* 触摸区域至少 44x44px */
  min-width: 44px;
  min-height: 44px;
}

/* 2. 流畅滚动 */
.scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* 3. 安全区域适配（iOS） */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding-bottom: env(safe-area-inset-bottom);
}

/* 4. 1px 边框问题（可选） */
.box {
  position: relative;
}

.box::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  transform-origin: 0 0;
  pointer-events: none;
}

@media (-webkit-min-device-pixel-ratio: 2) {
  .box::after {
    width: 200%;
    height: 200%;
    transform: scale(0.5);
  }
}
```

### 8. 代码检查

```
✅ 必须：
- ESLint 0 errors（允许少量 warnings）
- 代码可以构建
- 基本功能完整
- PC 和移动端都能正常显示和交互
- 设置了正确的 viewport

💡 建议：
- 复杂组件添加 PropTypes
- 关键逻辑添加注释
- 使用 useMediaQuery hook 判断设备
- 移动端触摸区域至少 44x44px
- 注意 PC 和移动端交互差异（hover vs active）
```

## 具体规则

### ✅ 必须遵守

1. 组件使用文件夹形式
2. 设置正确的 viewport meta 标签
3. 使用响应式布局（媒体查询或 useMediaQuery hook）
4. PC 和移动端交互差异化（hover 仅 PC，active 仅移动端）
5. 移动端触摸区域至少 44x44px
6. 使用统一的 axios 实例
7. API 请求有基本错误处理
8. 列表渲染使用 key
9. 无硬编码敏感信息
10. ESLint 无 error

### 💡 建议遵守

1. 使用移动优先的设计方法
2. 使用 useMediaQuery hook 而非直接判断 navigator.userAgent
3. 图片使用响应式处理
4. 注意移动端特有问题（1px 边框、安全区域）
5. 复杂组件添加 PropTypes
6. 重要函数添加注释

### 🆓 可选

1. 简单组件的 PropTypes
2. 详细的文档
3. 单元测试
4. rem 或 vw 适配方案
5. 独立的 PC 和 H5 组件版本

## 响应式方案选择

### 方案 1：统一响应式（推荐）⭐

**适合场景：**
- 页面结构相似
- 内容基本一致
- 中小型项目

**实现方式：**
```css
/* 移动优先，使用媒体查询 */
.container {
  width: 100%;
  padding: 10px;
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
  }
}
```

### 方案 2：响应式 + 独立组件

**适合场景：**
- 基础布局可以响应式
- 部分复杂组件 PC 和 H5 差异大

**实现方式：**
```jsx
function UserList() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return isMobile ? <MobileUserList /> : <PCUserList />
}
```

### 方案 3：独立版本

**适合场景：**
- PC 和 H5 页面结构完全不同
- 功能差异很大

**实现方式：**
```javascript
// 设备检测后跳转
const isMobile = /Mobile|Android|iPhone/i.test(navigator.userAgent)
if (isMobile && !location.pathname.startsWith('/m/')) {
  location.href = '/m' + location.pathname
}
```

## 快速检查清单

生成代码前检查：

- [ ] 文件路径正确
- [ ] 组件使用文件夹形式
- [ ] 设置了 viewport meta 标签
- [ ] 样式使用了媒体查询或响应式单位
- [ ] 创建了 useMediaQuery hook
- [ ] PC 端 hover 效果仅在 PC 生效
- [ ] 移动端触摸区域足够大（≥ 44px）
- [ ] API 请求有错误处理
- [ ] 列表有 key
- [ ] 无硬编码敏感信息

## 适用场景

✅ **适合：**
- 个人项目需要 PC + H5 兼容
- 中小型应用
- 页面结构相似
- 快速迭代

❌ **不适合：**
- 仅 PC 或仅移动端（使用 [`solo-medium.md`](./solo-medium.md)）
- PC 和 H5 差异很大（考虑独立版本）
- 团队协作（使用 [`team-high.md`](./team-high.md) 或 [`team-medium.md`](./team-medium.md)）

## 从基础版本迁移

如果项目从 `solo-medium.md` 迁移到本规范（响应式）：

1. **添加 viewport meta 标签**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **创建 useMediaQuery hook**
   ```bash
   mkdir -p src/hooks
   touch src/hooks/useMediaQuery.js
   ```

3. **更新样式为响应式**
   - 使用移动优先的方式
   - 添加媒体查询断点
   - 区分 PC 和移动端交互

4. **测试不同设备**
   - 使用 Chrome DevTools 设备模拟
   - 测试手机、平板、PC 显示效果

## 优势

- **跨平台支持**：一套代码适配 PC 和移动端
- **开发效率高**：减少不必要的规范束缚
- **易于维护**：统一的代码库
- **SEO 友好**：单一 URL
- **用户体验好**：每个设备都有优化的显示效果

## 相关文档

- [响应式设计规范完整文档](../base/responsive.md)
- [通用代码规范](../base/common.md)
- [单人项目规范](../project-type/solo.md)
- [中质量级别规范](../quality-level/medium.md)
