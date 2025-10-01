# 响应式设计规范（可选）

> PC 端和 H5（移动端）样式兼容性规范

## 适用场景

如果项目需要同时支持 PC 端和移动端，使用本规范。

## 设备类型

### PC 端
- 屏幕宽度：≥ 1024px
- 输入方式：鼠标 + 键盘
- 交互方式：悬停（hover）、点击
- 布局：多列布局、侧边栏

### H5 移动端
- 屏幕宽度：< 768px
- 输入方式：触摸
- 交互方式：触摸、滑动、长按
- 布局：单列布局、底部导航

### 平板（可选）
- 屏幕宽度：768px - 1023px
- 介于 PC 和移动端之间

## 响应式设计方案选择

### 方案 1：统一响应式（推荐）⭐

**适用场景：**
- 页面结构相似
- 内容基本一致
- 中小型项目

**实现方式：**
- 使用媒体查询（@media）
- 使用 CSS Grid / Flexbox 自适应布局
- 移动优先（Mobile First）或 PC 优先

**优势：**
- 一套代码维护
- SEO 友好
- 开发效率高

**示例：**
```css
/* 移动优先 */
.container {
  padding: 10px;
  width: 100%;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    padding: 20px;
    max-width: 750px;
    margin: 0 auto;
  }
}

/* PC */
@media (min-width: 1024px) {
  .container {
    padding: 30px;
    max-width: 1200px;
  }
}
```

### 方案 2：独立版本

**适用场景：**
- PC 和 H5 页面结构差异大
- 功能差异明显
- 大型项目

**实现方式：**
- PC 和 H5 独立路由
- 独立组件
- 根据设备跳转

**优势：**
- 每个端优化更彻底
- 代码职责清晰
- 性能更好

**示例：**
```javascript
// 设备检测
const isMobile = /Mobile|Android|iPhone/i.test(navigator.userAgent)

// 跳转到对应版本
if (isMobile && !location.pathname.startsWith('/m/')) {
  location.href = '/m' + location.pathname
} else if (!isMobile && location.pathname.startsWith('/m/')) {
  location.href = location.pathname.replace('/m', '')
}
```

### 方案 3：响应式 + 独立组件

**适用场景：**
- 大部分页面可以响应式
- 少数页面需要独立版本
- 平衡开发效率和用户体验

**实现方式：**
- 基础布局响应式
- 复杂组件按设备加载不同版本

**示例：**
```jsx
import { useMediaQuery } from './hooks/useMediaQuery'

function UserList() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return isMobile ? <MobileUserList /> : <PCUserList />
}
```

## 响应式断点

### 标准断点（推荐）

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

/* 大屏 PC */
@media (min-width: 1440px) {
  /* 大屏样式 */
}
```

### Less 变量定义

```less
// src/assets/styles/variables.less
@screen-xs: 480px;   // 小手机
@screen-sm: 576px;   // 手机
@screen-md: 768px;   // 平板
@screen-lg: 1024px;  // PC
@screen-xl: 1440px;  // 大屏
@screen-xxl: 1920px; // 超大屏
```

### Less 混入

```less
// src/assets/styles/mixins.less

// 移动端
.mobile(@rules) {
  @media (max-width: (@screen-md - 1px)) {
    @rules();
  }
}

// 平板
.tablet(@rules) {
  @media (min-width: @screen-md) and (max-width: (@screen-lg - 1px)) {
    @rules();
  }
}

// PC
.desktop(@rules) {
  @media (min-width: @screen-lg) {
    @rules();
  }
}

// 大屏
.large-desktop(@rules) {
  @media (min-width: @screen-xl) {
    @rules();
  }
}
```

## 移动端适配方案

### 1. Viewport 设置（必须）

```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**说明：**
- `width=device-width`：宽度等于设备宽度
- `initial-scale=1.0`：初始缩放比例
- `maximum-scale=1.0`：最大缩放比例
- `user-scalable=no`：禁止用户缩放（可选）

### 2. rem 适配方案（推荐）⭐

基于 rem 的移动端适配，根屏幕宽度动态设置 html 的 font-size。

**实现方式：**

```javascript
// src/utils/rem.js
(function(doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  const recalc = function() {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return

    // 设计稿宽度 750px，1rem = 100px
    // 实际设备宽度 / 750 * 100
    docEl.style.fontSize = (clientWidth / 750) * 100 + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
```

```jsx
// src/main.jsx
import './utils/rem' // 导入 rem 适配脚本
```

**使用方式：**

```css
/* 设计稿 750px，元素宽度 200px */
.box {
  width: 2rem;        /* 200 / 100 = 2rem */
  height: 1.5rem;     /* 150 / 100 = 1.5rem */
  font-size: 0.28rem; /* 28 / 100 = 0.28rem */
}
```

### 3. vw/vh 方案

使用视口单位 vw/vh 进行适配。

**使用方式：**

```css
/* 设计稿 750px，元素宽度 200px */
.box {
  width: 26.67vw;    /* 200 / 750 * 100 = 26.67vw */
  height: 20vw;      /* 150 / 750 * 100 = 20vw */
  font-size: 3.73vw; /* 28 / 750 * 100 = 3.73vw */
}
```

**使用 PostCSS 自动转换：**

```bash
pnpm install -D postcss-px-to-viewport
```

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import pxToViewport from 'postcss-px-to-viewport'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        pxToViewport({
          viewportWidth: 750, // 设计稿宽度
          unitPrecision: 5,   // 精确度
          viewportUnit: 'vw', // 单位
          selectorBlackList: ['.ignore'], // 忽略的类名
          minPixelValue: 1,   // 最小转换值
          mediaQuery: false   // 是否转换媒体查询中的 px
        })
      ]
    }
  }
})
```

使用后可以直接写 px，自动转换为 vw：

```css
/* 直接写 px */
.box {
  width: 200px;  /* 自动转换为 26.67vw */
  height: 150px; /* 自动转换为 20vw */
}
```

### 4. 响应式字体

```css
/* 使用 clamp() 函数 */
.text {
  font-size: clamp(14px, 2vw, 18px);
  /* 最小 14px，理想 2vw，最大 18px */
}
```

## 布局方案

### PC 端布局

```css
/* 多列布局 */
.layout {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}

.layout__sidebar {
  width: 250px;
  flex-shrink: 0;
}

.layout__main {
  flex: 1;
  padding: 0 20px;
}
```

### H5 移动端布局

```css
/* 单列布局 */
.layout {
  display: flex;
  flex-direction: column;
}

.layout__header {
  height: 44px;
  position: sticky;
  top: 0;
}

.layout__main {
  flex: 1;
  padding: 10px;
}

.layout__footer {
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
```

### 响应式布局

```css
/* 移动优先 */
.grid {
  display: grid;
  grid-template-columns: 1fr; /* 移动端单列 */
  gap: 10px;
}

/* 平板 */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 平板两列 */
    gap: 15px;
  }
}

/* PC */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* PC 三列 */
    gap: 20px;
  }
}
```

## 交互适配

### 悬停效果（PC 专用）

```css
/* 仅在支持 hover 的设备上显示悬停效果 */
@media (hover: hover) {
  .button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
}

/* 或使用 JS 检测 */
.button {
  transition: all 0.3s;
}

/* 仅 PC 添加 hover 类 */
.pc .button:hover {
  background-color: #0056b3;
}
```

### 触摸效果（移动端专用）

```css
/* 移动端点击高亮 */
.button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  -webkit-touch-callout: none;
  user-select: none;
}

/* 移动端点击态 */
.button:active {
  background-color: #0056b3;
  transform: scale(0.98);
}
```

### 触摸滚动优化

```css
/* 移动端流畅滚动 */
.scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* iOS 惯性滚动 */
}
```

## 完整示例

### 响应式组件

```jsx
// src/components/UserCard/index.jsx
import { useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import './styles.css'

function UserCard({ user }) {
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

export default UserCard
```

### 响应式样式（CSS）

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

.user-card__email {
  margin: 0 0 10px;
  font-size: 14px;
  color: #666;
}

.user-card__bio {
  margin: 10px 0 0;
  font-size: 14px;
  color: #999;
  line-height: 1.5;
}

/* 平板样式 */
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

/* PC 样式 */
@media (min-width: 1024px) {
  .user-card {
    padding: 25px;
  }

  .user-card__avatar {
    width: 100px;
    height: 100px;
  }

  .user-card__name {
    font-size: 18px;
  }

  .user-card__email {
    font-size: 15px;
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

### 响应式样式（Less）

```less
// src/components/UserCard/styles.less
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

.user-card {
  display: flex;
  flex-direction: column;
  padding: @spacing-md;
  border: 1px solid @border-color;
  border-radius: @border-radius;
  background: @background-white;

  &__avatar {
    .circle(60px);
    margin: 0 auto @spacing-sm;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    text-align: center;
  }

  &__name {
    margin: 0 0 @spacing-xs;
    font-size: @font-size-lg;
    font-weight: 600;
    color: @text-primary;
  }

  &__email {
    margin: 0 0 @spacing-sm;
    font-size: @font-size;
    color: @text-secondary;
  }

  &__bio {
    margin: @spacing-sm 0 0;
    font-size: @font-size;
    color: @text-tertiary;
    line-height: 1.5;
  }

  // 平板样式
  .tablet({
    flex-direction: row;
    padding: @spacing-lg;

    .user-card__avatar {
      .circle(80px);
      margin: 0 @spacing-lg 0 0;
    }

    .user-card__content {
      text-align: left;
    }
  });

  // PC 样式
  .desktop({
    padding: @spacing-xl;

    .user-card__avatar {
      .circle(100px);
    }

    .user-card__name {
      font-size: @font-size-xl;
    }

    .user-card__email {
      font-size: @font-size-lg;
    }

    // 仅 PC 悬停效果
    @media (hover: hover) {
      &:hover {
        box-shadow: @shadow;
        transform: translateY(-2px);
        transition: all @transition;
      }
    }
  });

  // 移动端点击态
  .mobile({
    &:active {
      background-color: @background-color;
    }
  });
}
```

### 自定义 Hook：useMediaQuery

```javascript
// src/hooks/useMediaQuery.js
import { useState, useEffect } from 'react'

/**
 * 媒体查询 Hook
 * @param {string} query - 媒体查询字符串
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (event) => {
      setMatches(event.matches)
    }

    // 兼容旧版浏览器
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
  }, [matches, query])

  return matches
}

// 预设的媒体查询 Hooks
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
```

### 使用示例

```jsx
import { useIsMobile, useIsDesktop } from '../../hooks/useMediaQuery'

function HomePage() {
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  return (
    <div className="home-page">
      <h1>{isMobile ? '移动端首页' : 'PC 端首页'}</h1>

      {isMobile && <MobileNavigation />}
      {isDesktop && <DesktopNavigation />}

      <UserList />
    </div>
  )
}
```

## 常见问题和解决方案

### 1. 1px 边框问题（移动端）

在高清屏（Retina）上，1px 边框显示过粗。

**解决方案：**

```css
/* 使用伪元素 + transform */
.box {
  position: relative;
}

.box::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #ddd;
  transform-origin: 0 0;
  pointer-events: none;
}

@media (-webkit-min-device-pixel-ratio: 2) {
  .box::after {
    transform: scale(0.5);
    width: 200%;
    height: 200%;
  }
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .box::after {
    transform: scale(0.333);
    width: 300%;
    height: 300%;
  }
}
```

### 2. 图片适配

```css
/* 图片自适应容器 */
.image {
  width: 100%;
  height: auto;
  display: block;
}

/* 图片裁剪 */
.image-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

/* 响应式图片 */
.responsive-image {
  max-width: 100%;
  height: auto;
}
```

### 3. 固定定位元素适配

```css
/* 移动端底部导航 */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  /* iOS 安全区域适配 */
  padding-bottom: env(safe-area-inset-bottom);
}

/* PC 端侧边栏 */
@media (min-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 250px;
    height: calc(100vh - 60px);
  }
}
```

### 4. 字体大小适配

```css
/* PC 端 */
body {
  font-size: 14px;
}

/* 移动端 */
@media (max-width: 767px) {
  body {
    font-size: 16px; /* 移动端字体稍大，更易阅读 */
  }
}
```

## 最佳实践

### ✅ 推荐做法

1. **移动优先**
   ```css
   /* ✅ 先写移动端样式，再覆盖 PC 样式 */
   .box {
     width: 100%;
   }

   @media (min-width: 1024px) {
     .box {
       width: 1200px;
     }
   }
   ```

2. **使用语义化断点**
   ```css
   /* ✅ 使用有意义的断点名称 */
   @media (min-width: 1024px) { /* PC */ }

   /* ❌ 避免使用数字 */
   @media (min-width: 1024px) { /* 不知道什么意思 */ }
   ```

3. **避免过多断点**
   ```css
   /* ✅ 使用 3-4 个主要断点 */
   /* 移动端、平板、PC、大屏 */

   /* ❌ 避免过多断点 */
   /* 320px, 375px, 414px, 768px, 1024px... 太多了 */
   ```

4. **使用 CSS 变量配合媒体查询**
   ```css
   :root {
     --container-padding: 10px;
   }

   @media (min-width: 1024px) {
     :root {
       --container-padding: 30px;
     }
   }

   .container {
     padding: var(--container-padding);
   }
   ```

### ❌ 避免做法

1. **不要在移动端使用 hover 效果**
   ```css
   /* ❌ 移动端无法触发 hover */
   .button:hover {
     background-color: blue;
   }

   /* ✅ 使用媒体查询限制 */
   @media (hover: hover) {
     .button:hover {
       background-color: blue;
     }
   }
   ```

2. **不要使用固定的像素值**
   ```css
   /* ❌ 不灵活 */
   .box {
     width: 375px;
   }

   /* ✅ 使用相对单位 */
   .box {
     width: 100%;
     max-width: 1200px;
   }
   ```

3. **不要忽略触摸区域大小**
   ```css
   /* ❌ 触摸区域太小 */
   .button {
     width: 30px;
     height: 30px;
   }

   /* ✅ 移动端触摸区域至少 44x44px */
   .button {
     min-width: 44px;
     min-height: 44px;
   }
   ```

## 与项目规范集成

### 单人项目（中质量）

- ✅ 必须：基本的响应式布局
- 💡 建议：使用媒体查询适配 PC 和移动端
- 🆓 可选：rem 或 vw 方案

### 小组项目（高质量）

- ✅ 必须：完整的响应式支持
- ✅ 必须：统一的断点标准
- ✅ 必须：移动端优化（触摸、滚动）
- 💡 建议：使用自动化工具（PostCSS）

## 工具推荐

### 浏览器开发工具

- Chrome DevTools：设备模拟
- Firefox Responsive Design Mode
- Safari Web Inspector

### VS Code 插件

- **px to rem** - px 转 rem
- **Autoprefixer** - 自动添加浏览器前缀

### PostCSS 插件

- **postcss-px-to-viewport** - px 转 vw
- **autoprefixer** - 浏览器兼容性

## 总结

响应式设计规范要点：

- ✅ 选择合适的响应式方案（统一响应式 vs 独立版本）
- ✅ 使用标准断点（768px, 1024px）
- ✅ 移动端设置正确的 viewport
- ✅ 选择合适的适配方案（rem / vw / 媒体查询）
- ✅ PC 和移动端交互差异化处理
- ✅ 使用 useMediaQuery hook 判断设备类型
- ✅ 注意移动端特有问题（1px 边框、触摸区域、安全区域）
- ❌ 避免在移动端使用 hover 效果
- ❌ 避免使用过多断点
- ❌ 避免固定像素值

选择响应式方案：
- **统一响应式**：中小型项目，页面结构相似 → 使用媒体查询
- **独立版本**：大型项目，PC 和 H5 差异大 → 独立路由和组件
- **响应式 + 独立组件**：平衡方案 → 基础响应式 + 复杂组件分版本
