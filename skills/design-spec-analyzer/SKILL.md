---
name: design-spec-analyzer
description: 设计规范分析专家,专注于提取和总结项目的设计系统规范(Design Token)。支持分析 CSS 变量、Less/Sass 变量、组件内联样式等多种格式,生成包含颜色系统、字体系统、间距系统、组件使用统计的 Markdown 文档。适用于设计规范文档化、设计系统审计、代码规范检查等场景。
allowed-tools: Read, Write, Glob, Grep, Bash
---

# 设计规范分析 Skill

你是一位专业的设计系统分析专家，精通前端样式规范提取和文档化工作。

## 核心能力

### 1. 多样式格式支持

能够解析和分析多种样式格式：

- **CSS 变量**：提取 `:root` 块中的 CSS Custom Properties（`--variable-name`）
- **Less 变量**：解析 Less 预处理器变量（`@variable-name`），支持变量引用链展开
- **Sass/SCSS 变量**：解析 Sass 变量（`$variable-name`），支持 map、嵌套等特性
- **组件内联样式**：从 JSX/TSX、Vue 组件中提取内联样式和 styled-components

### 2. 设计 Token 提取与分类

智能提取和分类设计元素：

- **颜色系统**：提取颜色变量和硬编码值，按语义分类（primary、success、warning、error、text、background 等）
- **字体系统**：提取字号、字重、行高、字体族，自动归类到尺寸层级
- **间距系统**：提取 padding、margin、gap，自动检测间距比例系统（如 8px 基数）
- **圆角系统**：提取 border-radius 值并分类
- **阴影系统**：提取 box-shadow 并按强度分类
- **边框系统**：提取边框宽度和样式

### 3. 智能分析与统计

提供深度分析功能：

- **变量使用统计**：统计每个设计变量的使用频率和位置
- **硬编码检测**：识别未使用变量的硬编码值，标记为潜在问题
- **相似颜色合并**：使用 Delta E 算法检测相似颜色，建议统一
- **间距比例检测**：自动检测间距系统的基数和比例类型（线性、斐波那契、指数）
- **一致性评分**：计算变量使用率，评估设计规范的一致性
- **高频模式识别**：识别重复出现的样式模式，建议提取为混入或工具类

### 4. Markdown 文档生成

生成专业的设计规范文档：

- **可视化色板**：使用 HTML table 展示颜色系统
- **统计图表**：使用 ASCII 字符绘制柱状图
- **分级建议**：按优先级（高/中/低）提供优化建议
- **使用示例**：生成 CSS、Less、JSX 等多种格式的使用示例
- **详细附录**：记录变量定义位置、分析详情等元数据

## 工作流程

### 完整分析流程（5 阶段）

#### 阶段 1: 范围确认与交互

**目标**：与用户确定分析范围和输出偏好

**步骤**：

1. **询问分析范围**（使用 AskUserQuestion 工具，如果用户未指定）：
   - 选项 A：整个项目（默认）
   - 选项 B：特定目录（如 `src/pages/Dashboard/`）
   - 选项 C：特定文件列表

2. **自动检测样式格式**：
   - 使用 Glob 工具扫描样式文件
   - 检测项目使用的样式格式：CSS/Less/Sass/SCSS
   - 询问是否包含组件内联样式分析

3. **确认输出配置**：
   - 输出路径（默认：`docs/design-spec.md`）
   - 文档详细程度（简洁/标准/详细）
   - 是否生成使用示例代码

**输出**：用户配置对象

```javascript
{
  scope: 'project' | 'directory' | 'files',
  targetPath: string | string[],
  includeInlineStyles: boolean,
  outputPath: string,
  detailLevel: 'concise' | 'standard' | 'detailed',
  includeExamples: boolean
}
```

#### 阶段 2: 文件扫描

**目标**：扫描并收集所有相关样式文件

**使用的工具**：
- `Glob`：批量查找文件
- `Bash`：统计文件数量和大小

**扫描策略**：

```bash
# 1. 样式文件扫描（按优先级）
**/*.css          # CSS 文件
**/*.less         # Less 文件
**/*.scss         # Sass/SCSS 文件
**/*.sass         # Sass（缩进语法）
**/*.module.css   # CSS Modules
**/*.module.less  # Less Modules

# 2. 组件文件扫描（可选）
**/*.jsx          # React JSX
**/*.tsx          # React TypeScript
**/*.vue          # Vue 单文件组件

# 3. 优先级文件（全局样式）
src/assets/styles/**
src/styles/**
styles/**
```

**排除模式**：

```javascript
const excludePatterns = [
  'node_modules/**',
  'dist/**',
  'build/**',
  '.next/**',
  'coverage/**',
  '__tests__/**',
  '*.test.*',
  '*.spec.*',
  '*.stories.*'
]
```

**输出展示**：

```
📸 找到 85 个样式文件:
  - CSS: 32 个
  - Less: 48 个
  - Sass/SCSS: 5 个
  - 组件文件（含内联样式）: 120 个

⏱️ 预计分析时间: 2-3 分钟

继续分析? (yes/no)
```

#### 阶段 3: 样式规范解析（核心）

**目标**：提取所有设计 Token 并分类统计

**3.1 颜色系统分析**

**解析正则表达式**：

```javascript
// CSS 变量（颜色相关）
const cssColorVarPattern = /--([a-zA-Z0-9-_]*(?:color|bg|background|border)[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// Less 变量（颜色相关）
const lessColorVarPattern = /@([a-zA-Z0-9-_]*(?:color|bg|background|border)[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// Sass 变量（颜色相关）
const sassColorVarPattern = /\$([a-zA-Z0-9-_]*(?:color|bg|background|border)[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// CSS 属性值（颜色）
const cssColorValuePattern = /(?:color|background-color|background|border-color|border)\s*:\s*([#a-zA-Z0-9(),.\s]+);/gi

// 内联样式（JSX/TSX）
const jsxColorPattern = /(?:color|backgroundColor|borderColor):\s*['"]([^'"]+)['"]/gi
```

**颜色值处理策略**：

1. **标准化颜色格式**：
   - `#RGB` → `#RRGGBB`（如 `#abc` → `#aabbcc`）
   - `rgb(r,g,b)` → `#RRGGBB`
   - `rgba(r,g,b,a)` → `{ hex: '#RRGGBB', alpha: a }`
   - `hsl(h,s,l)` → `#RRGGBB`
   - 颜色名称（`red`, `blue`）→ `#RRGGBB`

2. **提取透明度信息**：
   - 单独记录 `rgba` 和 `hsla` 的 alpha 值
   - 透明度分类：完全不透明（1.0）、半透明（0.1-0.9）

3. **计算颜色特征**：
   - 亮度（Lightness）：0-100
   - 饱和度（Saturation）：0-100
   - 色相（Hue）：0-360

**颜色分类策略**：

1. **基于命名模式**：

```javascript
const categories = {
  primary: /primary|main|brand/i,
  success: /success|green|positive/i,
  warning: /warning|yellow|orange|caution/i,
  error: /error|danger|red|negative/i,
  info: /info|blue/i,
  text: /text|font-?color|heading/i,
  background: /bg|background/i,
  border: /border|divider|separator/i,
  disabled: /disabled|inactive/i,
  link: /link|anchor/i
}
```

2. **基于颜色特征**：
   - 饱和度 < 10% → `grayscale`（灰度色）
   - 亮度 > 90% → `background`（背景色）
   - 亮度 < 20% → `text`（文本色）

**相似颜色合并**：

使用 Delta E (CIEDE2000) 算法检测相似颜色：
- 阈值：5（肉眼难以分辨）
- 阈值 < 5：建议合并为同一颜色
- 阈值 5-10：建议确认是否需要区分

**输出数据结构**：

```javascript
{
  colorSystem: {
    variables: [
      {
        name: '--primary-color',
        value: '#1890ff',
        type: 'css-variable',
        category: 'primary',
        usageCount: 45,
        locations: [
          { file: 'src/assets/styles/variables.css', line: 10 },
          // ...
        ]
      }
    ],
    hardcodedColors: [
      {
        value: '#1890ff',
        usageCount: 12,
        locations: [
          { file: 'src/components/Button/index.jsx', line: 23, context: 'color: #1890ff' }
        ]
      }
    ],
    statistics: {
      totalVariables: 48,
      totalHardcoded: 23,
      categoryBreakdown: {
        primary: 8,
        text: 12,
        background: 15
      },
      colorPalette: [
        { hex: '#1890ff', name: 'Primary Blue', usageCount: 45 }
      ]
    }
  }
}
```

**3.2 字体系统分析**

**解析正则表达式**：

```javascript
// 字号变量（支持 CSS/Less/Sass）
const fontSizeVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*font-?size[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// 字重变量
const fontWeightVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*font-?weight[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// 行高变量
const lineHeightVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*line-?height[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// 字体族变量
const fontFamilyVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*font-?family[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// CSS 属性值
const fontSizeValuePattern = /font-size\s*:\s*([^;]+);/gi
const fontWeightValuePattern = /font-weight\s*:\s*([^;]+);/gi
```

**字号分类策略**：

```javascript
function categorizeFontSize(size) {
  const pxValue = convertToPx(size) // 统一转换为 px

  if (pxValue <= 12) return 'xs'
  if (pxValue <= 14) return 'sm'
  if (pxValue <= 16) return 'base'
  if (pxValue <= 18) return 'lg'
  if (pxValue <= 20) return 'xl'
  if (pxValue <= 24) return 'xxl'
  return 'xxxl'
}
```

**单位转换**：

```javascript
function convertToPx(value) {
  // rem -> px（假设 1rem = 16px）
  // em -> px（根据上下文字号，默认 16px）
  // pt -> px（1pt = 1.333px）
  // vw/vh -> 跳过（响应式单位）
}
```

**字重映射**：

```javascript
const weightNameToNumber = {
  'thin': 100,
  'extralight': 200,
  'light': 300,
  'regular': 400,
  'normal': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
  'extrabold': 800,
  'black': 900
}

function categorizeFontWeight(weight) {
  const numWeight = typeof weight === 'string' ? weightNameToNumber[weight.toLowerCase()] || 400 : weight

  // 找到最接近的标准字重
  const standardWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
  return standardWeights.reduce((closest, current) =>
    Math.abs(current - numWeight) < Math.abs(closest - numWeight) ? current : closest
  )
}
```

**输出数据结构**：

```javascript
{
  fontSystem: {
    sizes: [
      {
        name: '--font-size-base',
        value: '14px',
        category: 'base',
        usageCount: 120,
        locations: [...]
      }
    ],
    weights: [
      {
        name: '--font-weight-medium',
        value: '500',
        category: 'medium',
        usageCount: 45,
        locations: [...]
      }
    ],
    statistics: {
      sizeScale: ['12px', '14px', '16px', '18px', '20px', '24px'],
      weightScale: [400, 500, 600, 700],
      mostUsedSize: '14px',
      mostUsedWeight: 500
    }
  }
}
```

**3.3 间距系统分析**

**解析策略**：

```javascript
// 间距变量
const spacingVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*(?:spacing|space|padding|margin|gap)[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// CSS 属性值
const paddingPattern = /padding(?:-(?:top|right|bottom|left))?\s*:\s*([^;]+);/gi
const marginPattern = /margin(?:-(?:top|right|bottom|left))?\s*:\s*([^;]+);/gi
const gapPattern = /gap\s*:\s*([^;]+);/gi
```

**间距值归一化**：

```javascript
function parseSpacingValue(value) {
  // 1. 解析 shorthand
  // padding: 10px 20px -> { top: '10px', right: '20px', bottom: '10px', left: '20px' }
  // padding: 10px -> { top: '10px', right: '10px', bottom: '10px', left: '10px' }

  // 2. 统一单位为 px
  // rem -> px（1rem = 16px）
  // em -> px（根据上下文）

  // 3. 提取数值
  // '16px' -> 16
}
```

**间距比例自动检测**：

```javascript
function detectSpacingScale(allValues) {
  const sortedUnique = [...new Set(allValues)].sort((a, b) => a - b)

  // 计算最大公约数（GCD）
  const gcd = sortedUnique.reduce((a, b) => {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  })

  // 检测比例类型
  const scaleType = detectScaleType(sortedUnique)

  return {
    baseUnit: gcd,
    scale: sortedUnique,
    scaleType // 'linear' | 'fibonacci' | 'exponential' | 'custom'
  }
}

function detectScaleType(values) {
  // 线性：差值相等（4, 8, 12, 16...）
  const isLinear = values.every((v, i) =>
    i === 0 || v - values[i-1] === values[1] - values[0]
  )
  if (isLinear) return 'linear'

  // 斐波那契：F(n) = F(n-1) + F(n-2)
  const isFibonacci = values.every((v, i) =>
    i < 2 || v === values[i-1] + values[i-2]
  )
  if (isFibonacci) return 'fibonacci'

  // 指数：比率相等（4, 8, 16, 32...）
  const isExponential = values.every((v, i) =>
    i === 0 || v / values[i-1] === values[1] / values[0]
  )
  if (isExponential) return 'exponential'

  return 'custom'
}
```

**8px 网格检查**：

```javascript
function checkEightPxGrid(values) {
  const notMultipleOfEight = values.filter(v => v % 8 !== 0)

  return {
    compliant: notMultipleOfEight.length === 0,
    violations: notMultipleOfEight,
    complianceRate: ((values.length - notMultipleOfEight.length) / values.length * 100).toFixed(2) + '%'
  }
}
```

**输出数据结构**：

```javascript
{
  spacingSystem: {
    variables: [
      {
        name: '--spacing-md',
        value: '16px',
        usageCount: 230,
        usedIn: ['padding', 'margin', 'gap'],
        locations: [...]
      }
    ],
    hardcodedValues: [
      {
        value: '16px',
        usageCount: 89,
        properties: ['padding', 'margin'],
        locations: [...]
      }
    ],
    statistics: {
      scale: {
        baseUnit: 4,
        values: [4, 8, 12, 16, 20, 24, 32, 48],
        scaleType: 'linear'
      },
      eightPxGrid: {
        compliant: false,
        violations: [6, 10, 14],
        complianceRate: '85%'
      },
      mostUsedValue: '16px',
      consistencyScore: 85 // 使用变量的比例
    }
  }
}
```

**3.4 其他系统分析**

**圆角系统**：

```javascript
const borderRadiusPattern = /border-radius\s*:\s*([^;]+);/gi
const borderRadiusVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*(?:radius|rounded)[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi
```

**阴影系统**：

```javascript
const boxShadowPattern = /box-shadow\s*:\s*([^;]+);/gi
const boxShadowVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*shadow[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi

// 阴影强度分类
function categorizeBoxShadow(shadow) {
  // 解析 blur 半径
  const blurRadius = parseBoxShadow(shadow).blur

  if (blurRadius <= 4) return 'sm'
  if (blurRadius <= 12) return 'md'
  return 'lg'
}
```

**边框系统**：

```javascript
const borderWidthPattern = /border(?:-width)?\s*:\s*([^;]+);/gi
const borderWidthVarPattern = /(?:--|\@|\$)([a-zA-Z0-9-_]*border[a-zA-Z0-9-_]*)\s*:\s*([^;]+);/gi
```

#### 阶段 4: Markdown 文档生成

**目标**：生成专业的设计规范文档

**文档结构模板**：

```markdown
# 项目设计规范文档

> 自动生成于 [生成时间]
> 分析范围: [分析范围]
> 生成工具: design-spec-analyzer skill

---

## 📊 概览统计

| 类别 | 变量数量 | 硬编码数量 | 一致性评分 |
|------|---------|-----------|-----------|
| 颜色系统 | 48 | 23 | 68% ⚠️ |
| 字体系统 | 32 | 45 | 42% ⚠️ |
| 间距系统 | 24 | 89 | 21% ❌ |
| 圆角 | 8 | 12 | 40% ⚠️ |
| 阴影 | 6 | 8 | 43% ⚠️ |

**一致性评分说明**：
- ✅ 优秀（≥80%）：设计规范一致性良好
- ⚠️ 一般（50-79%）：建议优化
- ❌ 较差（<50%）：需要重点改进

---

## 🎨 颜色系统

### 色板

（使用 HTML table 生成可视化色板）

### 主题色

| 变量名 | 值 | 使用次数 | 定义位置 |
|-------|---|---------|---------|
| `--primary-color` | #1890ff | 45 | src/assets/styles/variables.css:10 |
| `@primary-color` | #1890ff | 38 | src/assets/styles/variables.less:12 |

### 文本颜色

| 变量名 | 值 | 使用次数 | 用途 |
|-------|---|---------|------|
| `--text-primary` | #333333 | 120 | 主要文本 |
| `--text-secondary` | #666666 | 89 | 次要文本 |

### 硬编码颜色警告 ⚠️

发现 **23 处**硬编码颜色值，建议统一使用颜色变量：

| 颜色值 | 使用次数 | 出现位置（部分） |
|-------|---------|-------------|
| #1890ff | 12 | Button.jsx:23, Card.jsx:45, ... |

---

## 🔤 字体系统

### 字号比例

（使用 ASCII 字符绘制柱状图）

### 字号变量

| 变量名 | 值 | 使用次数 | 建议用途 |
|-------|---|---------|---------|
| `--font-size-xs` | 12px | 45 | 辅助信息 |
| `--font-size-sm` | 14px | 120 | 正文 |

---

## 📏 间距系统

### 间距比例

检测到的间距系统: **4px 基数, 线性增长**

（可视化间距比例）

### 8px 网格检查

- **合规率**: 85%
- **不符合项**: 6px (3处), 10px (5处), 14px (2处)
- **建议**: 调整为最接近的 8px 倍数

---

## 💡 优化建议

### 🔴 高优先级

1. **统一间距系统** (一致性: 21%)
   - 当前问题: 89 处硬编码间距值
   - 建议: 创建完整的间距变量系统
   - 影响范围: 全项目

---

## 📖 使用示例

（CSS、Less、JSX 使用示例）

---

## 📚 附录

### 变量定义位置

- **CSS 变量**: src/assets/styles/variables.css
- **Less 变量**: src/assets/styles/variables.less

### 分析详情

- 分析文件总数: 85
- 分析代码行数: 12,450
- 识别变量总数: 148
- 硬编码值总数: 267

---

*本文档由 design-spec-analyzer skill 自动生成*
```

**可视化元素生成**：

1. **色板可视化**（HTML table）：

```html
<table>
  <tr>
    <td style="background: #1890ff; color: white; padding: 10px; text-align: center;">
      #1890ff<br/>Primary Blue<br/>45 次
    </td>
    <td style="background: #52c41a; color: white; padding: 10px; text-align: center;">
      #52c41a<br/>Success Green<br/>23 次
    </td>
  </tr>
</table>
```

2. **字号比例柱状图**（ASCII）：

```
12px (xs)   ━━━━━━━━━━ 45 次
14px (base) ━━━━━━━━━━━━━━━━━━━━ 120 次 ⭐ 最常用
16px (lg)   ━━━━━━━━━━━━━━ 78 次
18px (xl)   ━━━━━━━ 34 次
```

3. **间距比例可视化**：

```
 4px (xs)   ━━━━━ 23 次
 8px (sm)   ━━━━━━━━━━ 45 次
12px (md)   ━━━━━━━━━━━━━━━ 67 次
16px (lg)   ━━━━━━━━━━━━━━━━━━━━━━━━ 120 次 ⭐
```

#### 阶段 5: 后处理与总结

**目标**：输出摘要并提供后续建议

**输出摘要模板**：

```
✨ 设计规范文档生成完成!

📄 文档位置: docs/design-spec.md

📊 分析结果概览:
  - 颜色变量: 48 个 (一致性: 68%)
  - 字体变量: 32 个 (一致性: 42%)
  - 间距变量: 24 个 (一致性: 21% ⚠️)
  - 总体评分: 54% (建议优化)

💡 主要建议:
  1. [高优] 统一间距系统 (当前一致性仅 21%)
  2. [高优] 规范字体使用 (45 处硬编码)
  3. [中优] 统一颜色变量 (23 处硬编码)

🔗 下一步:
  - 查看完整文档: cat docs/design-spec.md
  - 开始优化: 从间距系统开始
  - 持续监控: 定期重新分析

需要我帮你开始优化吗? (yes/no)
```

### 快速分析流程（简化版）

适用于已明确范围、仅需快速检查的场景：

```
1. 直接扫描指定范围的文件
2. 提取设计 Token（跳过详细分类）
3. 生成简洁版文档（仅包含统计和警告）
4. 输出关键问题清单
```

## 样式格式解析规则

### CSS 变量解析

**解析策略**：

```javascript
// 1. 提取 :root 块
const parseCSSVariables = (content) => {
  const rootPattern = /:root\s*\{([^}]+)\}/gs
  const varPattern = /--([\w-]+)\s*:\s*([^;]+);/g

  const rootBlocks = [...content.matchAll(rootPattern)]
  const variables = []

  rootBlocks.forEach(block => {
    const vars = [...block[1].matchAll(varPattern)]
    variables.push(...vars.map(([_, name, value]) => ({
      name: `--${name}`,
      value: value.trim(),
      type: 'css-variable'
    })))
  })

  return variables
}

// 2. 查找使用位置
const findCSSVariableUsage = (content, varName) => {
  const usagePattern = new RegExp(`var\\(${varName}(?:,\\s*([^)]+))?\\)`, 'g')
  return [...content.matchAll(usagePattern)].map(match => ({
    usage: match[0],
    fallback: match[1] || null
  }))
}
```

**示例**：

```css
:root {
  --primary-color: #1890ff;
  --text-primary: #333;
  --spacing-md: 16px;
}

.button {
  color: var(--primary-color);
  padding: var(--spacing-md, 16px); /* 带回退值 */
}
```

### Less 变量解析

**解析策略**：

```javascript
// 1. 提取变量定义
const parseLessVariables = (content) => {
  const varPattern = /@([\w-]+)\s*:\s*([^;]+);/g

  return [...content.matchAll(varPattern)].map(([_, name, value]) => ({
    name: `@${name}`,
    value: value.trim(),
    type: 'less-variable',
    isReference: /^@[\w-]+$/.test(value.trim())
  }))
}

// 2. 展开变量引用链
const expandLessValue = (value, allVariables) => {
  // @primary-color: @blue-6;
  // @link-color: @primary-color;

  const variableMap = new Map(allVariables.map(v => [v.name, v.value]))

  let expandedValue = value
  let iterations = 0
  const maxIterations = 10 // 防止循环引用

  while (/^@[\w-]+$/.test(expandedValue) && iterations < maxIterations) {
    expandedValue = variableMap.get(expandedValue) || expandedValue
    iterations++
  }

  return expandedValue
}

// 3. 识别 Less 函数（记录但不执行）
const identifyLessFunctions = (value) => {
  const functionPattern = /(lighten|darken|fade|fadein|fadeout|mix|spin|saturate|desaturate)\(([^)]+)\)/gi

  return [...value.matchAll(functionPattern)].map(([_, func, args]) => ({
    function: func,
    arguments: args.split(',').map(arg => arg.trim()),
    note: '需要 Less 编译器执行'
  }))
}
```

**示例**：

```less
@blue-6: #1890ff;
@primary-color: @blue-6;           // 引用 @blue-6
@link-color: @primary-color;       // 引用 @primary-color

@link-hover-color: lighten(@primary-color, 10%);  // Less 函数
@link-active-color: darken(@primary-color, 10%);
```

### Sass/SCSS 变量解析

**解析策略**：

```javascript
// 1. 提取变量定义
const parseSassVariables = (content) => {
  const varPattern = /\$([\w-]+)\s*:\s*([^;]+);/g

  return [...content.matchAll(varPattern)].map(([_, name, value]) => ({
    name: `$${name}`,
    value: value.trim(),
    type: 'sass-variable'
  }))
}

// 2. 解析 Sass map
const parseSassMap = (content) => {
  const mapPattern = /\$([\w-]+)\s*:\s*\(([^)]+)\);/gs

  return [...content.matchAll(mapPattern)].map(([_, name, entries]) => {
    const entryPattern = /'([^']+)':\s*([^,\n]+)/g
    const map = {}

    for (const [_, key, value] of entries.matchAll(entryPattern)) {
      map[key] = value.trim()
    }

    return {
      name: `$${name}`,
      type: 'sass-map',
      entries: map
    }
  })
}

// 3. 处理嵌套规则
const processSassNesting = (content) => {
  // .button {
  //   &--primary { color: $primary; }
  //   &:hover { opacity: 0.8; }
  // }

  // 提取嵌套选择器和样式
  // 注：这是简化版，完整实现需要 Sass 解析器
}
```

**示例**：

```scss
$primary-color: #1890ff;
$text-primary: #333;

// Sass map
$colors: (
  'primary': #1890ff,
  'success': #52c41a,
  'warning': #faad14
);

// 嵌套规则
.button {
  background: $primary-color;

  &--secondary {
    background: lighten($primary-color, 20%);
  }

  &:hover {
    background: darken($primary-color, 10%);
  }
}
```

### 组件内联样式解析

**JSX/TSX 解析**：

```javascript
// 1. style 对象
const jsxStyleObjectPattern = /style=\{\{([^}]+)\}\}/g

// 2. className（配合 Tailwind 或 CSS Modules）
const jsxClassNamePattern = /className="([^"]+)"/g

// 3. styled-components
const styledComponentsPattern = /styled\.\w+`([^`]+)`/gs

// 示例提取
const parseJSXStyles = (content) => {
  const styles = []

  // style={{color: '#fff', padding: '16px'}}
  for (const [_, styleContent] of content.matchAll(jsxStyleObjectPattern)) {
    const propertyPattern = /(\w+):\s*['"]?([^,'"]+)['"]?/g
    for (const [_, prop, value] of styleContent.matchAll(propertyPattern)) {
      styles.push({
        type: 'jsx-inline',
        property: prop,
        value: value.trim()
      })
    }
  }

  // styled.div`color: #fff; padding: 16px;`
  for (const [_, styleContent] of content.matchAll(styledComponentsPattern)) {
    const propertyPattern = /([\w-]+)\s*:\s*([^;]+);/g
    for (const [_, prop, value] of styleContent.matchAll(propertyPattern)) {
      styles.push({
        type: 'styled-components',
        property: prop,
        value: value.trim()
      })
    }
  }

  return styles
}
```

**Vue 解析**：

```javascript
// 1. :style 绑定
const vueStyleBindingPattern = /:style="([^"]+)"/g

// 2. <style scoped> 块
const vueScopedStylePattern = /<style[^>]*scoped[^>]*>([^<]+)<\/style>/gs

// 示例提取
const parseVueStyles = (content) => {
  const styles = []

  // :style="{color: primaryColor, padding: '16px'}"
  for (const [_, styleContent] of content.matchAll(vueStyleBindingPattern)) {
    const propertyPattern = /(\w+):\s*([^,}]+)/g
    for (const [_, prop, value] of styleContent.matchAll(propertyPattern)) {
      styles.push({
        type: 'vue-binding',
        property: prop,
        value: value.trim()
      })
    }
  }

  // <style scoped> ... </style>
  for (const [_, styleContent] of content.matchAll(vueScopedStylePattern)) {
    // 使用 CSS 解析规则
    styles.push(...parseCSSStyles(styleContent))
  }

  return styles
}
```

### 变量引用处理

**引用链展开**：

```javascript
function resolveVariableReferences(variables) {
  const variableMap = new Map(variables.map(v => [v.name, v]))

  const resolved = new Map()

  for (const variable of variables) {
    resolved.set(variable.name, resolveVariable(variable, variableMap, new Set()))
  }

  return Array.from(resolved.values())
}

function resolveVariable(variable, variableMap, visited) {
  // 防止循环引用
  if (visited.has(variable.name)) {
    return { ...variable, error: 'Circular reference detected' }
  }

  visited.add(variable.name)

  // 检查值是否是变量引用
  const refPattern = /^(?:var\()?(?:--|@|\$)([\w-]+)\)?$/
  const match = variable.value.match(refPattern)

  if (match) {
    const refName = `${variable.type === 'css-variable' ? '--' : variable.type === 'less-variable' ? '@' : '$'}${match[1]}`
    const refVariable = variableMap.get(refName)

    if (refVariable) {
      const resolvedRef = resolveVariable(refVariable, variableMap, visited)
      return {
        ...variable,
        resolvedValue: resolvedRef.resolvedValue || resolvedRef.value,
        references: [refName, ...(resolvedRef.references || [])]
      }
    }
  }

  return {
    ...variable,
    resolvedValue: variable.value,
    references: []
  }
}
```

**示例**：

```
输入:
  --blue-6: #1890ff
  --primary-color: var(--blue-6)
  --link-color: var(--primary-color)

输出:
  {
    name: '--link-color',
    value: 'var(--primary-color)',
    resolvedValue: '#1890ff',
    references: ['--primary-color', '--blue-6']
  }
```

## 分析算法

### 颜色分类算法

**基于命名模式分类**：

```javascript
function categorizeColorByName(varName) {
  const patterns = [
    { category: 'primary', pattern: /primary|main|brand/i },
    { category: 'success', pattern: /success|green|positive|ok/i },
    { category: 'warning', pattern: /warning|yellow|orange|caution/i },
    { category: 'error', pattern: /error|danger|red|negative|fail/i },
    { category: 'info', pattern: /info|blue|information/i },
    { category: 'text', pattern: /text|font-?color|heading|title|label/i },
    { category: 'background', pattern: /bg|background|surface/i },
    { category: 'border', pattern: /border|divider|separator|line/i },
    { category: 'disabled', pattern: /disabled|inactive|muted/i },
    { category: 'link', pattern: /link|anchor|href/i },
    { category: 'hover', pattern: /hover/i },
    { category: 'active', pattern: /active|pressed/i }
  ]

  for (const { category, pattern } of patterns) {
    if (pattern.test(varName)) {
      return category
    }
  }

  return 'other'
}
```

**基于颜色特征分类**：

```javascript
function categorizeColorByFeature(hexColor) {
  const { h, s, l } = hexToHsl(hexColor)

  // 灰度色
  if (s < 10) {
    return 'grayscale'
  }

  // 背景色（高亮度）
  if (l > 90) {
    return 'background'
  }

  // 文本色（低亮度）
  if (l < 20) {
    return 'text'
  }

  // 按色相分类
  if (h >= 0 && h < 30) return 'red'
  if (h >= 30 && h < 60) return 'orange'
  if (h >= 60 && h < 90) return 'yellow'
  if (h >= 90 && h < 150) return 'green'
  if (h >= 150 && h < 210) return 'cyan'
  if (h >= 210 && h < 270) return 'blue'
  if (h >= 270 && h < 330) return 'purple'
  return 'pink'
}
```

**RGB 欧氏距离**：

```javascript
function colorDistance(color1, color2) {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)

  return Math.sqrt(
    Math.pow(r1 - r2, 2) +
    Math.pow(g1 - g2, 2) +
    Math.pow(b1 - b2, 2)
  )
}

function colorSimilarity(color1, color2) {
  const distance = colorDistance(color1, color2)
  const maxDistance = Math.sqrt(3 * Math.pow(255, 2)) // 441.67

  return (1 - distance / maxDistance) * 100
}
```

**Delta E (CIEDE2000) 算法**：

```javascript
// 更精确的颜色差异算法
function deltaE2000(lab1, lab2) {
  // 实现 CIEDE2000 算法
  // 返回值 < 1: 无法察觉的差异
  // 返回值 1-2: 微小差异
  // 返回值 2-10: 可察觉的差异
  // 返回值 > 10: 明显差异

  // 简化版实现（完整实现较复杂）
  const deltaL = lab1.l - lab2.l
  const deltaA = lab1.a - lab2.a
  const deltaB = lab1.b - lab2.b

  return Math.sqrt(
    Math.pow(deltaL, 2) +
    Math.pow(deltaA, 2) +
    Math.pow(deltaB, 2)
  )
}

// 使用场景
function findSimilarColors(colors, threshold = 5) {
  const groups = []

  for (const color of colors) {
    const lab = rgbToLab(hexToRgb(color.hex))
    let grouped = false

    for (const group of groups) {
      const groupLab = rgbToLab(hexToRgb(group[0].hex))
      if (deltaE2000(lab, groupLab) < threshold) {
        group.push(color)
        grouped = true
        break
      }
    }

    if (!grouped) {
      groups.push([color])
    }
  }

  return groups
}
```

### 字体分类算法

**字号分类标准**：

```javascript
const fontSizeCategories = {
  'xs': { min: 0, max: 12 },
  'sm': { min: 12, max: 14 },
  'base': { min: 14, max: 16 },
  'lg': { min: 16, max: 18 },
  'xl': { min: 18, max: 20 },
  'xxl': { min: 20, max: 24 },
  'xxxl': { min: 24, max: 32 },
  'display': { min: 32, max: Infinity }
}

function categorizeFontSize(pxValue) {
  for (const [category, { min, max }] of Object.entries(fontSizeCategories)) {
    if (pxValue > min && pxValue <= max) {
      return category
    }
  }
  return 'custom'
}
```

**字重标准化**：

```javascript
const standardFontWeights = {
  100: 'thin',
  200: 'extralight',
  300: 'light',
  400: 'regular',
  500: 'medium',
  600: 'semibold',
  700: 'bold',
  800: 'extrabold',
  900: 'black'
}

function standardizeFontWeight(weight) {
  const numWeight = typeof weight === 'string'
    ? weightNameToNumber[weight.toLowerCase()] || 400
    : weight

  // 找到最接近的标准字重
  const standardWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
  const closest = standardWeights.reduce((prev, curr) =>
    Math.abs(curr - numWeight) < Math.abs(prev - numWeight) ? curr : prev
  )

  return {
    numericValue: closest,
    name: standardFontWeights[closest],
    isStandard: numWeight === closest
  }
}
```

### 间距比例检测

**最大公约数（GCD）计算**：

```javascript
function gcd(a, b) {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

function findBaseUnit(values) {
  if (values.length === 0) return null
  if (values.length === 1) return values[0]

  return values.reduce((acc, val) => gcd(acc, val))
}
```

**比例类型检测**：

```javascript
function detectSpacingScaleType(values) {
  const sorted = [...values].sort((a, b) => a - b)

  // 1. 线性比例检测
  if (sorted.length >= 3) {
    const diffs = sorted.slice(1).map((v, i) => v - sorted[i])
    const isLinear = diffs.every(d => d === diffs[0])

    if (isLinear) {
      return {
        type: 'linear',
        step: diffs[0],
        formula: `n × ${diffs[0]}`
      }
    }
  }

  // 2. 斐波那契检测
  if (sorted.length >= 4) {
    const isFibonacci = sorted.slice(2).every((v, i) =>
      v === sorted[i] + sorted[i + 1]
    )

    if (isFibonacci) {
      return {
        type: 'fibonacci',
        formula: 'F(n) = F(n-1) + F(n-2)'
      }
    }
  }

  // 3. 指数比例检测
  if (sorted.length >= 3) {
    const ratios = sorted.slice(1).map((v, i) => v / sorted[i])
    const isExponential = ratios.every(r => Math.abs(r - ratios[0]) < 0.1)

    if (isExponential) {
      return {
        type: 'exponential',
        ratio: ratios[0].toFixed(2),
        formula: `${sorted[0]} × ${ratios[0].toFixed(2)}^n`
      }
    }
  }

  // 4. 自定义比例
  return {
    type: 'custom',
    values: sorted,
    note: '未检测到标准比例系统'
  }
}
```

### 一致性评分计算

**总体一致性评分**：

```javascript
function calculateConsistencyScore(variables, hardcodedValues) {
  const totalVariableUsage = variables.reduce((sum, v) => sum + v.usageCount, 0)
  const totalHardcodedUsage = hardcodedValues.reduce((sum, v) => sum + v.usageCount, 0)
  const totalUsage = totalVariableUsage + totalHardcodedUsage

  if (totalUsage === 0) return 0

  const score = (totalVariableUsage / totalUsage) * 100

  return {
    score: Math.round(score),
    level: score >= 80 ? 'excellent' : score >= 50 ? 'good' : 'poor',
    emoji: score >= 80 ? '✅' : score >= 50 ? '⚠️' : '❌',
    totalVariableUsage,
    totalHardcodedUsage,
    totalUsage
  }
}
```

**分类一致性评分**：

```javascript
function calculateCategoryScores(systemData) {
  return {
    color: calculateConsistencyScore(
      systemData.colorSystem.variables,
      systemData.colorSystem.hardcodedColors
    ),
    font: calculateConsistencyScore(
      systemData.fontSystem.sizes,
      systemData.fontSystem.hardcodedSizes
    ),
    spacing: calculateConsistencyScore(
      systemData.spacingSystem.variables,
      systemData.spacingSystem.hardcodedValues
    ),
    borderRadius: calculateConsistencyScore(
      systemData.borderRadiusSystem.variables,
      systemData.borderRadiusSystem.hardcodedValues
    ),
    boxShadow: calculateConsistencyScore(
      systemData.boxShadowSystem.variables,
      systemData.boxShadowSystem.hardcodedValues
    )
  }
}
```

## 输出模板

### Markdown 文档结构

**完整文档模板**（详细版）：

参见"阶段 4: Markdown 文档生成"章节。

**简洁版文档模板**：

```markdown
# 设计规范快速检查报告

> 生成于 [时间] | 分析范围: [范围]

## 概览

- **总体一致性**: 54% ⚠️
- **主要问题**: 间距系统一致性低（21%）

## 关键发现

### ❌ 需要改进

1. 间距系统：89 处硬编码，建议统一为变量
2. 字体系统：45 处硬编码，建议规范化

### ⚠️ 建议优化

1. 颜色系统：23 处硬编码
2. 圆角系统：12 处硬编码

## 下一步

1. 统一间距变量
2. 规范字体使用
3. 完善颜色系统

---

*查看详细报告: [完整文档路径]*
```

### 可视化元素

**色板（HTML table）**：

```html
<table>
  <thead>
    <tr>
      <th colspan="4">主题色</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background: #1890ff; color: white; padding: 20px; text-align: center;">
        <strong>#1890ff</strong><br/>
        Primary Blue<br/>
        <small>45 次使用</small>
      </td>
      <td style="background: #52c41a; color: white; padding: 20px; text-align: center;">
        <strong>#52c41a</strong><br/>
        Success Green<br/>
        <small>23 次使用</small>
      </td>
      <td style="background: #faad14; color: white; padding: 20px; text-align: center;">
        <strong>#faad14</strong><br/>
        Warning Orange<br/>
        <small>18 次使用</small>
      </td>
      <td style="background: #ff4d4f; color: white; padding: 20px; text-align: center;">
        <strong>#ff4d4f</strong><br/>
        Error Red<br/>
        <small>15 次使用</small>
      </td>
    </tr>
  </tbody>
</table>

<table style="margin-top: 10px;">
  <thead>
    <tr>
      <th colspan="4">文本色</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="background: #333; color: white; padding: 20px; text-align: center;">
        <strong>#333333</strong><br/>
        Primary Text<br/>
        <small>120 次使用</small>
      </td>
      <td style="background: #666; color: white; padding: 20px; text-align: center;">
        <strong>#666666</strong><br/>
        Secondary Text<br/>
        <small>89 次使用</small>
      </td>
      <td style="background: #999; color: white; padding: 20px; text-align: center;">
        <strong>#999999</strong><br/>
        Tertiary Text<br/>
        <small>45 次使用</small>
      </td>
      <td style="background: #ccc; color: #333; padding: 20px; text-align: center;">
        <strong>#cccccc</strong><br/>
        Disabled Text<br/>
        <small>23 次使用</small>
      </td>
    </tr>
  </tbody>
</table>
```

**字号柱状图（ASCII）**：

```javascript
function generateFontSizeChart(fontSizes) {
  const maxCount = Math.max(...fontSizes.map(f => f.usageCount))
  const barLength = 30

  return fontSizes.map(size => {
    const barCount = Math.round((size.usageCount / maxCount) * barLength)
    const bar = '━'.repeat(barCount)
    const isMostUsed = size.usageCount === maxCount

    return `${size.value.padEnd(8)} (${size.category.padEnd(4)}) ${bar} ${size.usageCount} 次${isMostUsed ? ' ⭐ 最常用' : ''}`
  }).join('\n')
}

// 输出示例:
// 12px     (xs  ) ━━━━━━━━━━ 45 次
// 14px     (base) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 120 次 ⭐ 最常用
// 16px     (lg  ) ━━━━━━━━━━━━━━━━━━━━ 78 次
```

**间距比例可视化**：

```javascript
function generateSpacingChart(spacingValues) {
  const maxCount = Math.max(...spacingValues.map(s => s.usageCount))
  const barLength = 30

  return spacingValues.map(spacing => {
    const barCount = Math.round((spacing.usageCount / maxCount) * barLength)
    const bar = '━'.repeat(barCount)
    const isMostUsed = spacing.usageCount === maxCount

    return `${spacing.value.toString().padStart(3)}px (${spacing.category.padEnd(4)}) ${bar} ${spacing.usageCount} 次${isMostUsed ? ' ⭐' : ''}`
  }).join('\n')
}

// 输出示例:
//   4px (xs  ) ━━━━━ 23 次
//   8px (sm  ) ━━━━━━━━━━ 45 次
//  12px (md  ) ━━━━━━━━━━━━━━━ 67 次
//  16px (lg  ) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 120 次 ⭐
```

**一致性评分可视化**：

```javascript
function generateConsistencyScoreBar(score) {
  const barLength = 50
  const filledLength = Math.round((score / 100) * barLength)
  const emptyLength = barLength - filledLength

  const filled = '█'.repeat(filledLength)
  const empty = '░'.repeat(emptyLength)

  const emoji = score >= 80 ? '✅' : score >= 50 ? '⚠️' : '❌'
  const label = score >= 80 ? '优秀' : score >= 50 ? '一般' : '较差'

  return `${emoji} ${filled}${empty} ${score}% (${label})`
}

// 输出示例:
// ✅ ████████████████████████████████████████░░░░░░░░░░ 80% (优秀)
// ⚠️ █████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░ 50% (一般)
// ❌ ██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 20% (较差)
```

### 优化建议模板

**分级建议格式**：

```markdown
## 💡 优化建议

### 🔴 高优先级（Critical）

1. **统一间距系统** (一致性: 21% ❌)
   - **当前问题**: 发现 89 处硬编码间距值，仅 24 个使用了变量
   - **影响范围**: 全项目，影响布局一致性
   - **建议方案**:
     ```less
     // 创建完整的间距变量系统
     @spacing-xs: 4px;
     @spacing-sm: 8px;
     @spacing-md: 16px;
     @spacing-lg: 24px;
     @spacing-xl: 32px;
     ```
   - **修复步骤**:
     1. 在 `src/assets/styles/variables.less` 中定义间距变量
     2. 使用查找替换工具批量替换硬编码值
     3. 重新运行分析验证一致性提升
   - **预期收益**: 一致性提升至 80%+，便于后续调整

2. **规范字体使用** (一致性: 42% ⚠️)
   - **当前问题**: 45 处硬编码字号，缺乏统一的字体层级
   - **影响范围**: 文本显示一致性，视觉层级混乱
   - **建议方案**: 创建字体比例系统
   - **修复步骤**: [详细步骤]

### 🟡 中优先级（Important）

3. **统一颜色变量** (一致性: 68% ⚠️)
   - **当前问题**: 23 处硬编码颜色
   - **建议**: 统一使用颜色变量，便于主题切换

4. **提取高频样式模式**
   - **发现**: 45 处重复的 `display: flex; align-items: center; justify-content: center;`
   - **建议**: 提取为 Less mixin 或 Tailwind 工具类
   ```less
   .flex-center() {
     display: flex;
     align-items: center;
     justify-content: center;
   }
   ```

### 🟢 低优先级（Nice to Have）

5. **优化组件样式结构**
   - Dashboard 组件样式复杂度较高（380 行）
   - 建议: 拆分为子组件或使用 CSS Modules

6. **启用 8px 网格系统**
   - 当前合规率: 85%
   - 建议: 调整不符合项为 8px 倍数
```

## 使用示例

### 示例 1: 完整项目分析

**用户输入**：

```
用户: "请分析整个项目的设计规范，生成详细文档"
```

**Skill 执行过程**：

```
1. [询问用户] 确认分析范围
   ✓ 选择: 整个项目
   ✓ 包含内联样式: 是
   ✓ 输出路径: docs/design-spec.md
   ✓ 详细程度: 详细

2. [文件扫描] 扫描项目文件
   - 使用 Glob 查找样式文件
   - 发现 85 个文件（CSS: 32, Less: 48, SCSS: 5）
   - 发现 120 个组件文件（含内联样式）

3. [样式解析] 提取设计 Token
   - 颜色系统: 48 个变量, 23 个硬编码
   - 字体系统: 32 个变量, 45 个硬编码
   - 间距系统: 24 个变量, 89 个硬编码
   - 检测到间距比例: 4px 基数, 线性增长

4. [文档生成] 生成 Markdown 文档
   - 创建色板可视化
   - 生成统计图表
   - 编写优化建议（3 个高优先级）

5. [输出摘要]
   ✨ 文档已生成: docs/design-spec.md
   📊 总体一致性: 54% ⚠️
   💡 主要建议: 统一间距系统（一致性仅 21%）
```

**生成的文档片段**：

```markdown
# 项目设计规范文档

> 自动生成于 2025-12-27 14:30:00
> 分析范围: 整个项目 (85 个样式文件)
> 生成工具: design-spec-analyzer skill

---

## 📊 概览统计

| 类别 | 变量数量 | 硬编码数量 | 一致性评分 |
|------|---------|-----------|-----------|
| 颜色系统 | 48 | 23 | 68% ⚠️ |
| 字体系统 | 32 | 45 | 42% ⚠️ |
| 间距系统 | 24 | 89 | 21% ❌ |
| 圆角 | 8 | 12 | 40% ⚠️ |
| 阴影 | 6 | 8 | 43% ⚠️ |

**总体评分**: 54% ⚠️ (建议优化)

---

## 🎨 颜色系统

### 色板

[色板可视化 HTML table]

### 主题色

| 变量名 | 值 | 使用次数 | 定义位置 |
|-------|---|---------|---------|
| `--primary-color` | #1890ff | 45 | src/assets/styles/variables.css:10 |
| `@primary-color` | #1890ff | 38 | src/assets/styles/variables.less:12 |

[更多章节...]
```

**后续建议**：

```
🔗 下一步操作:
  1. 查看完整文档: cat docs/design-spec.md
  2. 优先修复间距系统（一致性最低）
  3. 创建 Less 变量文件定义间距
  4. 批量替换硬编码值
  5. 重新分析验证改进效果

需要帮助创建间距变量吗? (yes/no)
```

### 示例 2: 特定目录分析

**用户输入**：

```
用户: "分析 src/pages/Dashboard/ 目录的设计规范"
```

**Skill 执行过程**：

```
1. [范围确认]
   ✓ 分析范围: src/pages/Dashboard/
   ✓ 包含内联样式: 是
   ✓ 输出路径: docs/dashboard-design-spec.md

2. [文件扫描]
   - 扫描 src/pages/Dashboard/**
   - 发现 12 个文件（CSS: 3, Less: 7, JSX: 2）

3. [样式解析]
   - 颜色: 8 个变量, 5 个硬编码
   - 字体: 6 个变量, 12 个硬编码
   - 间距: 4 个变量, 23 个硬编码

4. [文档生成]
   - 生成简化版文档（仅包含该目录）
   - 对比全局规范，标注差异

5. [输出摘要]
   ✨ Dashboard 目录分析完成
   📊 一致性: 45% ⚠️
   💡 主要问题: 间距硬编码过多（23 处）
```

**生成的文档片段**：

```markdown
# Dashboard 目录设计规范

> 分析范围: src/pages/Dashboard/
> 文件数量: 12 个

## 概览

- **一致性评分**: 45% ⚠️
- **主要问题**: 间距系统未使用变量

## 与全局规范对比

| 设计元素 | 本目录 | 全局规范 | 差异 |
|---------|--------|---------|------|
| 主题色 | #1890ff | #1890ff | ✅ 一致 |
| 文本色 | #333, #666 | #333, #666, #999 | ⚠️ 缺少 tertiary |
| 间距基数 | 混乱 | 4px | ❌ 不一致 |

## 建议

1. 引入全局间距变量
2. 补充 tertiary text color
3. 统一组件间距
```

### 示例 3: 特定文件分析

**用户输入**：

```
用户: "分析这 3 个文件的设计规范:
- src/components/Button/index.less
- src/components/Card/index.less
- src/components/Modal/index.less"
```

**Skill 执行过程**：

```
1. [范围确认]
   ✓ 分析范围: 指定的 3 个文件
   ✓ 输出路径: docs/components-design-spec.md

2. [文件读取]
   - Read: src/components/Button/index.less
   - Read: src/components/Card/index.less
   - Read: src/components/Modal/index.less

3. [样式解析]
   - 提取各组件使用的颜色、字体、间距
   - 检测组件间的设计差异

4. [对比分析]
   - Button: 使用 @primary-color, @spacing-md
   - Card: 使用硬编码 #1890ff, 16px
   - Modal: 使用 @primary-color, 硬编码 16px

5. [输出摘要]
   ✨ 组件分析完成
   🔍 发现差异: Card 组件未使用颜色变量
   💡 建议: 统一使用设计变量
```

**生成的文档片段**：

```markdown
# 组件设计规范分析

> 分析文件: Button, Card, Modal

## 设计一致性对比

### 颜色使用

| 组件 | 主题色 | 状态 |
|------|--------|------|
| Button | `@primary-color` | ✅ 使用变量 |
| Card | `#1890ff` | ❌ 硬编码 |
| Modal | `@primary-color` | ✅ 使用变量 |

**建议**: Card 组件应改用 `@primary-color`

### 间距使用

| 组件 | 内边距 | 状态 |
|------|--------|------|
| Button | `@spacing-md` | ✅ 使用变量 |
| Card | `16px` | ❌ 硬编码 |
| Modal | `16px` | ❌ 硬编码 |

**建议**: Card 和 Modal 应改用 `@spacing-md`

## 修复建议

```less
// Card/index.less
.card {
  // 修改前
  // background: #1890ff;
  // padding: 16px;

  // 修改后
  background: @primary-color;
  padding: @spacing-md;
}
```
```

## 注意事项

### 样式格式识别

1. **自动检测策略**：
   - 优先扫描项目根目录和 `package.json` 确定技术栈
   - 根据文件扩展名识别样式格式
   - 支持混合使用多种格式（如同时有 CSS 和 Less）

2. **格式优先级**：
   - 全局样式文件 > 组件样式文件
   - 变量定义文件 > 普通样式文件
   - 优先分析 `variables.*`, `theme.*`, `global.*` 等关键文件

3. **边界情况处理**：
   - **动态样式**：无法分析 JavaScript 运行时计算的样式
   - **第三方库**：默认排除 `node_modules/`，除非用户明确指定
   - **CSS-in-JS**：仅支持 styled-components 和常见的内联样式，不支持所有 CSS-in-JS 方案

### 变量命名约定假设

本 Skill 基于以下命名约定假设：

1. **颜色变量**通常包含：`color`, `bg`, `background`, `border`
2. **字体变量**通常包含：`font-size`, `font-weight`, `line-height`, `font-family`
3. **间距变量**通常包含：`spacing`, `space`, `padding`, `margin`, `gap`
4. **圆角变量**通常包含：`radius`, `rounded`
5. **阴影变量**通常包含：`shadow`

如果项目使用非常规命名（如 `@main-hue`, `@text-scale-1`），可能需要手动补充或调整正则表达式。

### 性能优化建议

对于大型项目（>1000 个文件），建议：

1. **分批分析**：先分析关键目录，再扩展到全项目
2. **使用排除模式**：明确排除不需要的目录（如 `dist/`, `build/`）
3. **限制内联样式分析**：组件内联样式解析较慢，可选择跳过
4. **增量分析**：针对修改过的文件重新分析，而非全量分析

**大型项目示例**：

```
1. 第一次：分析全局样式（src/assets/styles/）
2. 第二次：分析核心页面（src/pages/Dashboard/）
3. 第三次：分析全项目（如有必要）
```

### 工具依赖说明

本 Skill 依赖以下工具：

- **Glob**：文件模式匹配
- **Grep**：内容搜索（可选，用于加速查找）
- **Read**：读取文件内容
- **Write**：生成 Markdown 文档
- **Bash**：文件统计、目录操作

**注意**：
- 不依赖 Less/Sass 编译器，无法执行复杂的预处理器逻辑
- 不依赖 PostCSS，无法处理 CSS 转换
- 颜色值、间距值等均为静态分析，不执行任何计算

### 与其他 Agents/Skills 协作

**推荐协作流程**：

1. **design-spec-analyzer** → 分析现有项目设计规范
2. **figma-to-code** → 获取 Figma 设计稿的 Design Token
3. **design-spec-auditor** → 对比 Figma 与项目规范，生成差异报告
4. **component-generator** → 基于规范生成新组件

**协作示例**：

```
# 场景：基于设计规范创建新组件

1. 用户: "先分析项目的设计规范"
   → 使用 design-spec-analyzer

2. 分析结果显示:
   - 主题色: @primary-color (#1890ff)
   - 间距: @spacing-md (16px)
   - 圆角: @border-radius (4px)

3. 用户: "基于这些规范创建一个 Card 组件"
   → 调用 component-generator，传递规范参数

4. component-generator 生成组件:
   ```less
   .card {
     background: @primary-color;
     padding: @spacing-md;
     border-radius: @border-radius;
   }
   ```
```

### 最佳实践建议

1. **定期分析**：每个迭代结束后重新分析，监控设计一致性趋势
2. **版本对比**：保存每次分析结果，对比版本间的改进情况
3. **团队共享**：将生成的文档加入项目文档，供团队参考
4. **自动化集成**：考虑在 CI/CD 中集成设计规范检查
5. **渐进式优化**：不要一次性修复所有问题，优先解决高优先级问题

### 常见问题

**Q: 分析速度慢怎么办？**
A: 可以先分析关键目录，或排除不必要的文件（如测试文件）。

**Q: 检测到的颜色/间距不准确？**
A: 可能是正则表达式匹配问题，可以手动补充或排除特定值。

**Q: Less 函数值无法展开？**
A: 本 Skill 不执行 Less 编译，只记录函数调用，需要人工确认计算结果。

**Q: 如何处理响应式单位（vw, vh, %）？**
A: 响应式单位会被记录但不参与统一单位转换，单独列出。

**Q: 可以分析 Tailwind CSS 吗？**
A: 可以分析 Tailwind 的自定义配置文件（`tailwind.config.js`），但不分析工具类使用情况。

## 快速命令

以下是常用的快速命令示例：

```
# 完整项目分析（详细版）
"分析整个项目的设计规范，生成详细文档"

# 特定目录分析
"分析 src/pages/Dashboard/ 的设计规范"

# 特定文件分析
"分析这几个文件的设计规范: [文件路径1, 文件路径2]"

# 快速检查（简洁版）
"快速检查项目的设计一致性"

# 仅分析颜色系统
"分析项目的颜色系统"

# 仅分析间距系统
"分析项目的间距系统，检测是否符合 8px 网格"

# 对比两个目录的设计规范
"对比 src/pages/Dashboard/ 和 src/pages/Profile/ 的设计规范"

# 生成简洁版报告
"生成设计规范的快速检查报告（简洁版）"
```

---

**提示**：始终以项目设计一致性和可维护性为首要目标，提供可操作的建议！
