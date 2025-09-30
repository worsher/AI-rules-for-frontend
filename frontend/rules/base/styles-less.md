# Less 样式规范（可选）

> 使用 Less 作为 CSS 预处理器的样式规范

## 适用场景

如果项目使用 Less 而非纯 CSS，请使用本规范。

## Less 安装配置

### 安装依赖

```bash
pnpm install -D less
```

### Vite 配置

Vite 原生支持 Less，无需额外配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        // Less 配置选项
        javascriptEnabled: true,
        // 全局变量文件（可选）
        additionalData: `@import "@/assets/styles/variables.less";`
      }
    }
  }
})
```

## 文件组织

### 目录结构

```
src/
├── assets/
│   └── styles/
│       ├── variables.less      # 全局变量
│       ├── mixins.less         # 混入函数
│       ├── global.less         # 全局样式
│       └── index.less          # 样式入口
│
├── components/
│   └── UserCard/
│       ├── index.jsx
│       └── styles.less         # 组件样式（Less）
│
└── pages/
    └── Home/
        ├── index.jsx
        └── styles.less         # 页面样式（Less）
```

### 样式入口

```less
// src/assets/styles/index.less

// 变量定义
@import './variables.less';

// 混入函数
@import './mixins.less';

// 全局样式
@import './global.less';
```

```jsx
// src/main.jsx
import './assets/styles/index.less'
```

## 变量定义

### 颜色变量

```less
// src/assets/styles/variables.less

// 主题色
@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #ff4d4f;

// 文本颜色
@text-primary: #333;
@text-secondary: #666;
@text-tertiary: #999;
@text-disabled: #ccc;

// 边框和背景
@border-color: #d9d9d9;
@background-color: #f5f5f5;
@background-white: #fff;

// 链接色
@link-color: @primary-color;
@link-hover-color: lighten(@primary-color, 10%);
@link-active-color: darken(@primary-color, 10%);
```

### 尺寸变量

```less
// 间距
@spacing-xs: 4px;
@spacing-sm: 8px;
@spacing-md: 16px;
@spacing-lg: 24px;
@spacing-xl: 32px;
@spacing-xxl: 48px;

// 圆角
@border-radius-sm: 2px;
@border-radius: 4px;
@border-radius-lg: 8px;
@border-radius-circle: 50%;

// 阴影
@shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
@shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
@shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);

// 动画时长
@transition-fast: 0.15s;
@transition: 0.3s;
@transition-slow: 0.5s;

// 字体大小
@font-size-sm: 12px;
@font-size: 14px;
@font-size-lg: 16px;
@font-size-xl: 18px;
@font-size-xxl: 20px;

// 断点（响应式）
@screen-xs: 480px;
@screen-sm: 576px;
@screen-md: 768px;
@screen-lg: 992px;
@screen-xl: 1200px;
@screen-xxl: 1600px;
```

## 混入函数（Mixins）

### 常用混入

```less
// src/assets/styles/mixins.less

// 清除浮动
.clearfix() {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

// 文本溢出省略
.text-ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-multi(@lines: 2) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @lines;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Flex 布局
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between() {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column() {
  display: flex;
  flex-direction: column;
}

// 绝对定位居中
.absolute-center() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// 正方形
.square(@size) {
  width: @size;
  height: @size;
}

// 圆形
.circle(@size) {
  .square(@size);
  border-radius: 50%;
}

// 隐藏滚动条
.hide-scrollbar() {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari */
  }
}

// 响应式混入
.respond-to(@breakpoint) when (@breakpoint = xs) {
  @media (max-width: @screen-xs) { @content(); }
}
.respond-to(@breakpoint) when (@breakpoint = sm) {
  @media (min-width: @screen-sm) { @content(); }
}
.respond-to(@breakpoint) when (@breakpoint = md) {
  @media (min-width: @screen-md) { @content(); }
}
.respond-to(@breakpoint) when (@breakpoint = lg) {
  @media (min-width: @screen-lg) { @content(); }
}
.respond-to(@breakpoint) when (@breakpoint = xl) {
  @media (min-width: @screen-xl) { @content(); }
}
```

## 组件样式规范

### 单人项目（简化版）

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
  background: @background-white;
  cursor: pointer;
  transition: all @transition;

  &:hover {
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
    color: @background-white;
    font-size: 24px;
    font-weight: bold;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__name {
    margin: @spacing-sm 0 @spacing-xs;
    font-size: @font-size-lg;
    font-weight: 600;
    color: @text-primary;
  }

  &__email {
    margin: 0 0 @spacing-xs;
    font-size: @font-size;
    color: @text-secondary;
  }

  &__bio {
    margin: 0;
    font-size: @font-size;
    color: @text-tertiary;
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

    .user-card__name {
      font-size: @font-size;
    }
  }

  &--large {
    padding: @spacing-lg;

    .user-card__avatar,
    .user-card__avatar-placeholder {
      .circle(80px);
      font-size: 32px;
    }

    .user-card__name {
      font-size: @font-size-xl;
    }
  }
}
```

### 小组项目（BEM + Less）

```less
// src/components/UserCard/styles.less
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

// Block
.user-card {
  display: flex;
  padding: @spacing-md;
  border: 1px solid @border-color;
  border-radius: @border-radius;
  background: @background-white;
  transition: all @transition;

  // Modifier: 可点击
  &--clickable {
    cursor: pointer;

    &:hover {
      box-shadow: @shadow;
      transform: translateY(-2px);
    }
  }

  // Modifier: 尺寸
  &--small {
    padding: @spacing-sm;
  }

  &--large {
    padding: @spacing-lg;
  }

  // Element: 头像
  &__avatar {
    .square(60px);
    border-radius: @border-radius-circle;
    object-fit: cover;
    flex-shrink: 0;

    .user-card--small & {
      .square(40px);
    }

    .user-card--large & {
      .square(80px);
    }
  }

  // Element: 头像占位
  &__avatar-placeholder {
    .square(60px);
    .flex-center();
    border-radius: @border-radius-circle;
    background: @primary-color;
    color: @background-white;
    font-size: 24px;
    font-weight: bold;
    flex-shrink: 0;

    .user-card--small & {
      .square(40px);
      font-size: 16px;
    }

    .user-card--large & {
      .square(80px);
      font-size: 32px;
    }
  }

  // Element: 内容区
  &__content {
    flex: 1;
    min-width: 0;
    margin-left: @spacing-md;
  }

  // Element: 姓名
  &__name {
    margin: 0 0 @spacing-xs;
    font-size: @font-size-lg;
    font-weight: 600;
    color: @text-primary;
  }

  // Element: 邮箱
  &__email {
    margin: 0 0 @spacing-xs;
    font-size: @font-size;
    color: @text-secondary;
  }

  // Element: 简介
  &__bio {
    margin: 0;
    font-size: @font-size;
    color: @text-tertiary;
    .text-ellipsis();
  }
}
```

## 页面样式规范

```less
// src/pages/UserManagement/styles.less
@import '~@/assets/styles/variables.less';
@import '~@/assets/styles/mixins.less';

// 页面容器（添加页面前缀避免污染）
.user-management {
  padding: @spacing-lg;

  // 页面内的样式都使用嵌套
  &__header {
    .flex-between();
    margin-bottom: @spacing-lg;
  }

  &__title {
    margin: 0;
    font-size: @font-size-xxl;
    font-weight: 600;
    color: @text-primary;
  }

  &__actions {
    display: flex;
    gap: @spacing-sm;
  }

  &__search {
    margin-bottom: @spacing-md;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: @spacing-md;
  }

  &__pagination {
    .flex-center();
    margin-top: @spacing-lg;
  }

  // 状态样式
  &__loading,
  &__error,
  &__empty {
    .flex-center();
    .flex-column();
    min-height: 400px;
  }

  &__loading {
    color: @text-tertiary;
  }

  &__error {
    color: @error-color;
  }

  &__empty {
    color: @text-tertiary;
  }

  // 响应式
  @media (max-width: @screen-md) {
    padding: @spacing-md;

    &__list {
      grid-template-columns: 1fr;
    }
  }
}
```

## 响应式设计

### 使用媒体查询

```less
.user-card {
  padding: @spacing-lg;

  // 平板
  @media (max-width: @screen-md) {
    padding: @spacing-md;
  }

  // 手机
  @media (max-width: @screen-sm) {
    padding: @spacing-sm;
  }
}
```

### 使用混入（更简洁）

```less
.user-card {
  padding: @spacing-lg;

  .respond-to(md, {
    padding: @spacing-md;
  });

  .respond-to(sm, {
    padding: @spacing-sm;
  });
}
```

## 主题定制

### 定义主题变量

```less
// src/assets/styles/themes/default.less
@theme: default;

@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #ff4d4f;

// 导出为 CSS 变量，支持动态切换
:root {
  --primary-color: @primary-color;
  --success-color: @success-color;
  --warning-color: @warning-color;
  --error-color: @error-color;
}
```

```less
// src/assets/styles/themes/dark.less
@theme: dark;

@primary-color: #177ddc;
@text-primary: #e8e8e8;
@text-secondary: #a6a6a6;
@background-color: #141414;
@background-white: #1f1f1f;

:root[data-theme='dark'] {
  --primary-color: @primary-color;
  --text-primary: @text-primary;
  --text-secondary: @text-secondary;
  --background-color: @background-color;
  --background-white: @background-white;
}
```

### 使用主题

```less
// 组件中同时使用 Less 变量和 CSS 变量
.user-card {
  // Less 编译时的默认值
  background: @background-white;

  // 支持运行时切换（优先级更高）
  background: var(--background-white, @background-white);
}
```

## 最佳实践

### ✅ 推荐做法

1. **使用变量和混入**
   ```less
   // ✅ 使用变量
   color: @primary-color;
   padding: @spacing-md;

   // ✅ 使用混入
   .flex-center();
   .text-ellipsis();
   ```

2. **嵌套不超过 3 层**
   ```less
   // ✅ 正确
   .user-card {
     &__content {
       .name {
         color: @text-primary;
       }
     }
   }

   // ❌ 错误：嵌套过深
   .page {
     .container {
       .wrapper {
         .content {
           .item {
             color: red;  // 5 层嵌套
           }
         }
       }
     }
   }
   ```

3. **& 符号的使用**
   ```less
   // ✅ BEM 命名
   .user-card {
     &__avatar { }
     &--large { }
   }

   // ✅ 伪类
   .button {
     &:hover { }
     &:active { }
   }

   // ✅ 修饰符
   .button {
     &.disabled { }
   }
   ```

### ❌ 避免做法

1. **不要过度嵌套**
   ```less
   // ❌ 错误
   .page {
     .section {
       .card {
         .header {
           .title { }
         }
       }
     }
   }
   ```

2. **不要滥用混入**
   ```less
   // ❌ 错误：简单的样式不需要混入
   .center-text() {
     text-align: center;
   }

   // ✅ 正确：直接写
   text-align: center;
   ```

3. **不要创建过于复杂的函数**
   ```less
   // ❌ 过于复杂
   .complex-mixin(@a, @b, @c, @d, @e) {
     // 很多复杂逻辑
   }
   ```

## 与纯 CSS 对比

### 迁移建议

如果项目从纯 CSS 迁移到 Less：

1. **重命名文件**
   ```bash
   # 将所有 .css 重命名为 .less
   find src -name "*.css" -exec rename 's/\.css$/.less/' {} \;
   ```

2. **提取变量**
   ```less
   // 之前：styles.css
   .user-card {
     color: #333;
     padding: 16px;
   }

   // 之后：styles.less
   .user-card {
     color: @text-primary;
     padding: @spacing-md;
   }
   ```

3. **使用嵌套和混入**
   ```less
   // 逐步重构为 Less 特性
   .user-card {
     padding: @spacing-md;
     .flex-center();

     &__avatar {
       .circle(60px);
     }
   }
   ```

## 性能考虑

1. **避免深层嵌套**
   - 编译后的 CSS 选择器会变长
   - 影响渲染性能

2. **合理使用混入**
   - 混入会复制代码，可能增加文件大小
   - 简单样式直接写，复杂的才用混入

3. **变量提取**
   - 提取常用值为变量
   - 减少重复代码

## 工具链配置

### VS Code 插件

推荐安装：
- Easy LESS（实时编译预览）
- Less IntelliSense（智能提示）

### ESLint Stylelint

```javascript
// .stylelintrc.js
module.exports = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-less',
  rules: {
    'selector-max-compound-selectors': 3,  // 最大嵌套层级
    'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*((__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?)?$',  // BEM
  }
}
```

## 总结

Less 样式规范要点：

- ✅ 使用变量统一管理设计 token
- ✅ 使用混入复用常见样式模式
- ✅ 嵌套不超过 3 层
- ✅ BEM 命名 + Less 嵌套
- ✅ 响应式设计使用混入简化
- ✅ 支持主题切换（Less 变量 + CSS 变量）
- ❌ 避免过度嵌套
- ❌ 避免滥用混入

选择 Less 还是 CSS：
- **Less**：需要变量、混入、嵌套等特性
- **CSS**：项目简单，或团队不熟悉 Less