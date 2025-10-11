# 小组项目 - 高质量级别

> 适合3-5人团队协作的核心模块

## 组合说明

- **基础规范**：[`base/common.md`](../base/common.md)、[`base/naming.md`](../base/naming.md)、[`base/validation.md`](../base/validation.md)
- **项目类型**：[`project-type/team.md`](../project-type/team.md)
- **质量级别**：[`quality-level/high.md`](../quality-level/high.md)
- **可选拓展**：按需叠加 [`base/i18n.md`](../base/i18n.md)、[`base/styles-less.md`](../base/styles-less.md)、[`base/responsive.md`](../base/responsive.md)

## 配置说明

- **项目类型**：小组项目（3-5人）
- **质量级别**：高
- **重点**：代码一致性、可维护性、严格质量控制

## 使用本规范

```markdown
请使用以下规范生成代码：
- 项目类型：小组项目（3-5人）
- 质量级别：高
- 技术栈：React + Vite + Axios + pnpm
```

## 核心要求

### ✅ 强制要求（100%）

1. **代码规范**
   - ESLint: 0 errors, 0 warnings
   - Prettier: 已格式化
   - 无 console.log、debugger
   - 文件 < 200 行，函数 < 50 行

2. **类型和文档**
   - 所有组件必须有 PropTypes
   - 所有函数必须有 JSDoc
   - 复杂组件必须有 README.md

3. **样式规范**
   - 必须使用 BEM 命名
   - 必须使用 CSS 变量

4. **错误处理**
   - 完整的 try-catch
   - 用户友好的错误信息
   - 处理所有状态（loading/error/empty）

5. **性能优化**
   - 使用 useCallback、useMemo
   - 列表使用稳定 key（不用 index）
   - 大列表使用虚拟滚动

6. **安全性**
   - 无硬编码敏感信息
   - 用户输入验证和转义
   - 外部链接添加安全属性

7. **可访问性**
   - 图片有 alt
   - 表单有 label
   - 支持键盘操作

## 完整代码示例

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
 * @param {Object} props.user - 用户信息
 * @param {number} props.user.id - 用户 ID
 * @param {string} props.user.name - 用户姓名
 * @param {string} [props.user.avatar] - 头像 URL
 * @param {'small'|'medium'|'large'} [props.size='medium'] - 尺寸
 * @param {Function} [props.onClick] - 点击回调
 */
function UserCard({ user, size = 'medium', onClick }) {
  const handleClick = useCallback(() => {
    onClick?.(user.id)
  }, [onClick, user.id])

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
        <div className="user-card__avatar-placeholder">
          {user.name[0]}
        </div>
      )}
      <h3 className="user-card__name">{user.name}</h3>
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

```css
/* BEM 命名 + CSS 变量 */
.user-card {
  display: flex;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  transition: all var(--transition);
}

.user-card__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user-card__name {
  margin: 0;
  color: var(--text-primary);
}

.user-card--large {
  padding: var(--spacing-lg);
}
```

## 代码审查要求

- 至少 1 人 Review
- 必须通过所有自动检查
- 重要功能需要测试

## Git 提交规范

```
feat(user): 添加用户卡片组件

- 实现基础展示功能
- 支持 small/medium/large 三种尺寸
- 添加完整的键盘支持和无障碍标签

Closes #123
```

## 适用场景

✅ **必须使用：**
- 核心业务模块
- 公共组件库
- 金融/支付功能
- 数据安全相关
- 多人协作开发

## 检查清单

- [ ] ESLint 0 errors, 0 warnings
- [ ] 所有组件有 PropTypes
- [ ] 所有函数有 JSDoc
- [ ] 复杂组件有 README
- [ ] CSS 使用 BEM
- [ ] 完整错误处理
- [ ] 使用 useCallback/useMemo
- [ ] 支持键盘和无障碍
- [ ] 无硬编码敏感信息
- [ ] 构建成功

## 团队协作要点

- 遵守团队约定高于个人习惯
- 代码属于团队，不是个人
- 重要决定需要团队讨论
- 定期分享技术心得
