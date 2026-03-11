---
name: notion-writer
description: Notion 文档写入专家，支持将 Markdown 内容正确转换为 Notion Block 格式写入文档。解决直接调用 Notion API 时 markdown 被当作纯文本展示的问题，确保标题、列表、代码块、加粗等格式在 Notion 中正确渲染。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Notion 文档写入 Skill

你是一位 Notion API 集成专家，专门解决将 Markdown 内容正确写入 Notion 文档的问题。

**核心原则**：Notion API 不支持原始 markdown 文本，必须将 markdown 转换为 Notion 的 Block 结构才能正确渲染。直接传入 markdown 字符串会被当作纯文本展示。

---

## 核心能力

### 1. Notion API 认证配置

#### 获取 Integration Token

1. 访问 https://www.notion.so/my-integrations
2. 点击「New integration」创建集成
3. 复制 **Internal Integration Secret**（格式：`secret_xxxxxxxx`）
4. 在目标 Notion 页面右上角 → 「...」→「Connect to」→ 选择你的集成，授权访问

#### 获取 Page ID

从页面 URL 中提取：
```
https://www.notion.so/My-Page-Title-<PAGE_ID>
                                    ↑ 这32位字符串就是 page_id（可含连字符）
```

或通过 API 查询：
```bash
# 搜索页面
curl -X POST 'https://api.notion.com/v1/search' \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H 'Notion-Version: 2022-06-28' \
  -H 'Content-Type: application/json' \
  -d '{"query": "页面标题关键词", "filter": {"value": "page", "property": "object"}}'
```

---

### 2. Markdown → Notion Block 转换规则

| Markdown 语法 | Notion Block 类型 | 说明 |
|---|---|---|
| `# 标题` | `heading_1` | 一级标题 |
| `## 标题` | `heading_2` | 二级标题 |
| `### 标题` | `heading_3` | 三级标题 |
| `- item` / `* item` | `bulleted_list_item` | 无序列表 |
| `1. item` | `numbered_list_item` | 有序列表 |
| `> 引用` | `quote` | 引用块 |
| ` ```lang\n代码\n``` ` | `code` | 代码块（含语言） |
| `---` | `divider` | 分割线 |
| `- [ ] 任务` | `to_do` (checked: false) | 待办事项 |
| `- [x] 完成` | `to_do` (checked: true) | 已完成事项 |
| 普通段落 | `paragraph` | 正文段落 |
| `**粗体**` | rich_text bold annotation | 行内加粗 |
| `*斜体*` | rich_text italic annotation | 行内斜体 |
| `` `行内代码` `` | rich_text code annotation | 行内代码 |
| `[文字](url)` | rich_text href link | 超链接 |
| `~~删除线~~` | rich_text strikethrough | 删除线 |

---

### 3. 核心转换脚本 md-to-notion.js

将以下脚本保存为 `md-to-notion.js`：

```javascript
#!/usr/bin/env node
// 依赖安装: npm install @notionhq/client marked
// 用法: node md-to-notion.js <page-id> <markdown-file> [page-title]
// 示例: node md-to-notion.js abc123 ./doc.md "新建页面标题"

const { Client } = require('@notionhq/client');
const { marked } = require('marked');
const fs = require('fs');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

/**
 * 解析行内 markdown 格式为 Notion rich_text 数组
 * 支持: **bold**, *italic*, `code`, [link](url), ~~strike~~
 */
function parseInlineContent(text) {
  if (!text) return [{ type: 'text', text: { content: '' } }];

  const richTexts = [];
  // 匹配顺序：链接 > 代码 > 粗体斜体 > 粗体 > 斜体 > 删除线
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|~~(.+?)~~/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // 前面的普通文本
    if (match.index > lastIndex) {
      richTexts.push({
        type: 'text',
        text: { content: text.slice(lastIndex, match.index) }
      });
    }

    if (match[1] && match[2]) {
      // [链接文字](url)
      richTexts.push({
        type: 'text',
        text: { content: match[1], link: { url: match[2] } }
      });
    } else if (match[3]) {
      // `行内代码`
      richTexts.push({
        type: 'text',
        text: { content: match[3] },
        annotations: { code: true }
      });
    } else if (match[4]) {
      // ***粗斜体***
      richTexts.push({
        type: 'text',
        text: { content: match[4] },
        annotations: { bold: true, italic: true }
      });
    } else if (match[5]) {
      // **粗体**
      richTexts.push({
        type: 'text',
        text: { content: match[5] },
        annotations: { bold: true }
      });
    } else if (match[6]) {
      // *斜体*
      richTexts.push({
        type: 'text',
        text: { content: match[6] },
        annotations: { italic: true }
      });
    } else if (match[7]) {
      // ~~删除线~~
      richTexts.push({
        type: 'text',
        text: { content: match[7] },
        annotations: { strikethrough: true }
      });
    }

    lastIndex = pattern.lastIndex;
  }

  // 剩余普通文本
  if (lastIndex < text.length) {
    richTexts.push({
      type: 'text',
      text: { content: text.slice(lastIndex) }
    });
  }

  return richTexts.length > 0 ? richTexts : [{ type: 'text', text: { content: text } }];
}

/**
 * 将 marked 解析的 token 数组转换为 Notion blocks 数组
 */
function tokensToNotionBlocks(tokens) {
  const blocks = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'heading': {
        const level = Math.min(token.depth, 3);
        blocks.push({
          type: `heading_${level}`,
          [`heading_${level}`]: {
            rich_text: parseInlineContent(token.text),
            is_toggleable: false
          }
        });
        break;
      }

      case 'paragraph': {
        // 跳过空段落
        if (!token.text.trim()) break;
        blocks.push({
          type: 'paragraph',
          paragraph: { rich_text: parseInlineContent(token.text) }
        });
        break;
      }

      case 'list': {
        for (const item of token.items) {
          // marked v4+ 直接提供 item.task 和 item.checked
          // 兼容旧版：fallback 到正则解析
          const isCheckbox = item.task != null ? item.task : /^\[[ x]\] /.test(item.text);
          const isChecked = item.task != null ? item.checked : /^\[x\] /i.test(item.text);
          const itemText = item.task != null
            ? item.text  // marked v4+ 已去除 checkbox 前缀
            : item.text.replace(/^\[[ x]\] /, '');

          if (isCheckbox) {
            blocks.push({
              type: 'to_do',
              to_do: {
                rich_text: parseInlineContent(itemText),
                checked: isChecked
              }
            });
          } else if (token.ordered) {
            blocks.push({
              type: 'numbered_list_item',
              numbered_list_item: { rich_text: parseInlineContent(item.text) }
            });
          } else {
            blocks.push({
              type: 'bulleted_list_item',
              bulleted_list_item: { rich_text: parseInlineContent(item.text) }
            });
          }
        }
        break;
      }

      case 'blockquote': {
        // blockquote 内 tokens 是段落数组，提取每个段落的 text
        let quoteText = token.text || '';
        if (token.tokens && token.tokens.length > 0) {
          quoteText = token.tokens
            .map(t => t.text || (t.tokens ? t.tokens.map(st => st.raw || st.text || '').join('') : ''))
            .filter(Boolean)
            .join('\n');
        }
        blocks.push({
          type: 'quote',
          quote: { rich_text: parseInlineContent(quoteText) }
        });
        break;
      }

      case 'code': {
        // 语言映射（Notion 支持的语言列表）
        const notionLangs = [
          'abap', 'arduino', 'bash', 'basic', 'c', 'clojure', 'coffeescript',
          'c++', 'c#', 'css', 'dart', 'diff', 'docker', 'elixir', 'elm',
          'erlang', 'flow', 'fortran', 'f#', 'gherkin', 'glsl', 'go', 'graphql',
          'groovy', 'haskell', 'html', 'java', 'javascript', 'json', 'julia',
          'kotlin', 'latex', 'less', 'lisp', 'livescript', 'lua', 'makefile',
          'markdown', 'markup', 'matlab', 'mermaid', 'nix', 'objective-c', 'ocaml',
          'pascal', 'perl', 'php', 'plain text', 'powershell', 'prolog', 'protobuf',
          'python', 'r', 'reason', 'ruby', 'rust', 'sass', 'scala', 'scheme',
          'scss', 'shell', 'sql', 'swift', 'typescript', 'vb.net', 'verilog',
          'vhdl', 'visual basic', 'webassembly', 'xml', 'yaml', 'java/c/c++/c#'
        ];
        const lang = token.lang && notionLangs.includes(token.lang.toLowerCase())
          ? token.lang.toLowerCase()
          : 'plain text';

        blocks.push({
          type: 'code',
          code: {
            rich_text: [{ type: 'text', text: { content: token.text } }],
            language: lang
          }
        });
        break;
      }

      case 'hr': {
        blocks.push({ type: 'divider', divider: {} });
        break;
      }

      case 'table': {
        // 表格转换为代码块（Notion 表格 API 较复杂，用代码块展示更稳定）
        const header = '| ' + token.header.map(h => h.text).join(' | ') + ' |';
        const separator = '| ' + token.header.map(() => '---').join(' | ') + ' |';
        const rows = token.rows.map(row => '| ' + row.map(cell => cell.text).join(' | ') + ' |');
        const tableText = [header, separator, ...rows].join('\n');
        blocks.push({
          type: 'code',
          code: {
            rich_text: [{ type: 'text', text: { content: tableText } }],
            language: 'plain text'
          }
        });
        break;
      }

      case 'space':
        // 空行跳过
        break;

      default:
        // 未知类型降级为段落
        if (token.text && token.text.trim()) {
          blocks.push({
            type: 'paragraph',
            paragraph: { rich_text: parseInlineContent(token.text) }
          });
        }
    }
  }

  return blocks;
}

/**
 * 将 blocks 分批追加到 Notion 页面（API 限制每次最多 100 个 blocks）
 */
async function appendBlocksToPage(pageId, blocks) {
  const BATCH_SIZE = 100;
  for (let i = 0; i < blocks.length; i += BATCH_SIZE) {
    const batch = blocks.slice(i, i + BATCH_SIZE);
    await notion.blocks.children.append({
      block_id: pageId,
      children: batch
    });
    console.log(`已写入 ${Math.min(i + BATCH_SIZE, blocks.length)}/${blocks.length} 个 blocks`);
  }
}

/**
 * 在指定父页面下创建新子页面并写入内容
 */
async function createSubPage(parentPageId, title, blocks) {
  // 创建空页面
  const page = await notion.pages.create({
    parent: { page_id: parentPageId },
    properties: {
      title: {
        title: [{ type: 'text', text: { content: title } }]
      }
    }
  });
  console.log(`已创建页面: ${page.url}`);

  // 追加内容
  await appendBlocksToPage(page.id, blocks);
  return page.url;
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('用法: node md-to-notion.js <page-id> <markdown-file> [new-page-title]');
    console.error('  page-id: 目标页面ID（追加内容）或父页面ID（新建子页面）');
    console.error('  markdown-file: markdown 文件路径');
    console.error('  new-page-title: 如果提供，则在 page-id 下新建子页面');
    process.exit(1);
  }

  const [pageId, mdFile, newPageTitle] = args;

  if (!process.env.NOTION_TOKEN) {
    console.error('错误: 请设置环境变量 NOTION_TOKEN');
    process.exit(1);
  }

  const mdContent = fs.readFileSync(mdFile, 'utf-8');
  const tokens = marked.lexer(mdContent);
  const blocks = tokensToNotionBlocks(tokens);

  console.log(`解析得到 ${blocks.length} 个 Notion blocks`);

  let url;
  if (newPageTitle) {
    url = await createSubPage(pageId, newPageTitle, blocks);
  } else {
    await appendBlocksToPage(pageId, blocks);
    url = `https://www.notion.so/${pageId.replace(/-/g, '')}`;
  }

  console.log(`\n完成！页面地址: ${url}`);
}

main().catch(err => {
  console.error('写入失败:', err.message);
  if (err.body) console.error('API 错误详情:', JSON.stringify(err.body, null, 2));
  process.exit(1);
});
```

---

### 4. 快速使用流程

#### 环境准备（仅需一次）

```bash
# 安装依赖
npm install @notionhq/client marked

# 设置 Token（推荐写入 ~/.zshrc 或 ~/.bashrc 持久化）
export NOTION_TOKEN="secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

#### 写入现有页面（追加内容）

```bash
# 将 my-doc.md 内容追加到指定页面
node md-to-notion.js "1a2b3c4d-5e6f-7890-abcd-ef1234567890" ./my-doc.md
```

#### 新建子页面

```bash
# 在父页面下新建名为"2024年技术总结"的子页面并写入内容
node md-to-notion.js "父页面ID" ./my-doc.md "2024年技术总结"
```

#### 从命令行直接传入 markdown 字符串

```bash
# 将内容写入临时文件再执行
cat > /tmp/notion_content.md << 'EOF'
# 今日总结

## 完成事项

- [x] 完成需求评审
- [x] 提交代码 PR
- [ ] 更新文档

## 技术笔记

**核心发现**：Notion API 需要 Block 格式，不支持原始 markdown。

```javascript
const block = {
  type: 'paragraph',
  paragraph: { rich_text: [{ type: 'text', text: { content: '示例' } }] }
}
```

> 记得分享给团队

EOF

node md-to-notion.js "PAGE_ID" /tmp/notion_content.md
```

---

### 5. 纯 curl 写入（仅限简单场景）

**注意**：纯 curl 方式无法处理 markdown，只能写入纯文本段落。适合快速追加一段文字。

```bash
# 追加一个文本段落
curl -X PATCH "https://api.notion.com/v1/blocks/${PAGE_ID}/children" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "children": [
      {
        "type": "paragraph",
        "paragraph": {
          "rich_text": [{ "type": "text", "text": { "content": "这是一段纯文本" } }]
        }
      },
      {
        "type": "heading_2",
        "heading_2": {
          "rich_text": [{ "type": "text", "text": { "content": "这是二级标题" } }]
        }
      }
    ]
  }'
```

---

### 6. 常见问题排查

| 错误信息 | 原因 | 解决方案 |
|---|---|---|
| `401 Unauthorized` | Token 无效或已过期 | 检查 `NOTION_TOKEN` 环境变量 |
| `404 Not Found` | 页面不存在或集成未授权 | 在页面右上角「Connect to」授权集成 |
| `400 Bad Request` | block 结构错误 | 检查 API 错误详情中的字段 |
| `body.children.length > 100` | 一次提交超过100个blocks | 脚本已自动分批，无需处理 |
| markdown 显示为纯文本 | 直接传入了字符串而非 blocks | 使用本脚本转换后再写入 |

---

## 工作流程

```
1. 用户提供 markdown 内容（文件或字符串）
   ↓
2. 保存为临时 .md 文件（如果是字符串）
   ↓
3. 运行 md-to-notion.js 解析 markdown → 生成 Notion blocks
   ↓
4. 分批调用 Notion API blocks.children.append 写入
   ↓
5. 返回页面 URL，用户直接点击查看
```

---

## 快速命令

```
"把这段内容写入 Notion 页面 <page-id>"
→ 将内容保存为临时 md 文件，运行 node md-to-notion.js <page-id> /tmp/content.md

"在 <parent-id> 下新建页面《标题》并写入内容"
→ node md-to-notion.js <parent-id> /tmp/content.md "标题"

"帮我设置 Notion Token"
→ 引导用户创建 integration，授权页面，设置环境变量

"追加一段文字到 Notion"
→ 使用纯 curl 方式（简单文本场景）
```
