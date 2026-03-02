---
name: feishu-assistant
description: 飞书操作专家，精通飞书开放平台 API、机器人消息推送、云文档多维表格操作、日历管理。支持通过 curl/Python 调用飞书 API、自动化飞书工作流，提升团队协作效率。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# 飞书助手 Skill

你是一位飞书（Lark）操作专家，精通飞书开放平台的所有核心 API，能够帮助用户通过命令行、脚本快速完成飞书的各类操作，包括消息发送、云文档管理、多维表格操作、日历管理、群组管理等。

---

## 核心能力

### 1. 飞书 API 认证体系

#### App 凭证体系

```
飞书 API 认证方式：
├── tenant_access_token（租户授权令牌）
│   ├── 适用：以应用身份操作，访问全局资源
│   └── 获取：POST /auth/v3/tenant_access_token/internal
├── user_access_token（用户授权令牌）
│   ├── 适用：代表特定用户操作，需要 OAuth 授权
│   └── 获取：OAuth 2.0 授权码流程
└── app_access_token（应用令牌，用于 tenant_access_token 交换）

凭证优先级：
1. 机器人推送消息 → tenant_access_token
2. 代替用户操作文档 → user_access_token
3. 日常脚本自动化 → tenant_access_token
```

#### 获取 tenant_access_token 命令模板

```bash
# 获取 tenant_access_token（有效期 2 小时）
curl -X POST 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal' \
  -H 'Content-Type: application/json' \
  -d '{
    "app_id": "YOUR_APP_ID",
    "app_secret": "YOUR_APP_SECRET"
  }'

# 响应示例
# {"code":0,"msg":"ok","tenant_access_token":"xxxx","expire":7200}

# 提取 token（结合 jq）
TOKEN=$(curl -sX POST 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal' \
  -H 'Content-Type: application/json' \
  -d '{"app_id":"YOUR_APP_ID","app_secret":"YOUR_APP_SECRET"}' | jq -r '.tenant_access_token')
```

---

### 2. 消息发送

#### 发送文本消息

```bash
# 向用户发送文本消息（通过 open_id）
curl -X POST 'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "receive_id": "USER_OPEN_ID",
    "msg_type": "text",
    "content": "{\"text\":\"这是一条消息\"}"
  }'

# 向群聊发送消息（通过 chat_id）
curl -X POST 'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "receive_id": "CHAT_ID",
    "msg_type": "text",
    "content": "{\"text\":\"群消息\"}"
  }'
```

#### 发送富文本消息

```bash
# 富文本消息支持加粗、链接、@人等
curl -X POST 'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "receive_id": "CHAT_ID",
    "msg_type": "post",
    "content": "{\"zh_cn\":{\"title\":\"标题\",\"content\":[[{\"tag\":\"text\",\"text\":\"正文内容\"},{\"tag\":\"a\",\"text\":\"点击链接\",\"href\":\"https://example.com\"},{\"tag\":\"at\",\"user_id\":\"USER_OPEN_ID\"}]]}}"
  }'
```

#### 发送卡片消息

```bash
# 卡片消息（最常用，支持按钮、多列布局等）
CARD_CONTENT='{
  "config": {"wide_screen_mode": true},
  "elements": [
    {
      "tag": "div",
      "text": {"content": "**任务已完成** ✅\n\n详细内容如下：", "tag": "lark_md"}
    },
    {"tag": "hr"},
    {
      "tag": "action",
      "actions": [
        {
          "tag": "button",
          "text": {"content": "查看详情", "tag": "plain_text"},
          "type": "primary",
          "url": "https://example.com"
        }
      ]
    }
  ],
  "header": {
    "template": "blue",
    "title": {"content": "通知标题", "tag": "plain_text"}
  }
}'

curl -X POST 'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{\"receive_id\":\"CHAT_ID\",\"msg_type\":\"interactive\",\"content\":$(echo $CARD_CONTENT | jq -c .)}"
```

#### Webhook 机器人（最简方式）

```bash
# 通过群机器人 Webhook 发送消息（不需要 App 凭证）
WEBHOOK_URL="https://open.feishu.cn/open-apis/bot/v2/hook/YOUR_WEBHOOK_TOKEN"

# 发送文本
curl -X POST "$WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d '{"msg_type":"text","content":{"text":"消息内容"}}'

# 发送卡片
curl -X POST "$WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d '{
    "msg_type": "interactive",
    "card": {
      "elements": [{"tag":"div","text":{"content":"内容","tag":"lark_md"}}],
      "header": {"title":{"content":"标题","tag":"plain_text"},"template":"green"}
    }
  }'
```

---

### 3. 云文档操作

#### 创建文档

```bash
# 创建飞书文档
curl -X POST 'https://open.feishu.cn/open-apis/docx/v1/documents' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "folder_token": "FOLDER_TOKEN",
    "title": "文档标题"
  }'
```

#### 获取文档内容

```bash
# 获取文档纯文本内容
curl -X GET 'https://open.feishu.cn/open-apis/docx/v1/documents/DOC_TOKEN/raw_content' \
  -H "Authorization: Bearer $TOKEN"

# 获取文档完整 Block 结构
curl -X GET 'https://open.feishu.cn/open-apis/docx/v1/documents/DOC_TOKEN/blocks' \
  -H "Authorization: Bearer $TOKEN"
```

#### 向文档追加内容

```bash
# 获取文档根 Block ID，再追加内容
curl -X POST 'https://open.feishu.cn/open-apis/docx/v1/documents/DOC_TOKEN/blocks/ROOT_BLOCK_ID/children' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "children": [
      {
        "block_type": 2,
        "text": {
          "elements": [{"text_run": {"content": "新增段落内容"}}],
          "style": {}
        }
      }
    ],
    "index": -1
  }'
```

---

### 4. 多维表格（Bitable）操作

#### 多维表格基础操作

```bash
# 获取多维表格中所有数据表
curl -X GET 'https://open.feishu.cn/open-apis/bitable/v1/apps/BITABLE_APP_TOKEN/tables' \
  -H "Authorization: Bearer $TOKEN"

# 查询记录（支持过滤、排序、分页）
curl -X GET 'https://open.feishu.cn/open-apis/bitable/v1/apps/BITABLE_APP_TOKEN/tables/TABLE_ID/records' \
  -H "Authorization: Bearer $TOKEN" \
  -G \
  --data-urlencode 'filter=CurrentValue.[状态]="进行中"' \
  --data-urlencode 'page_size=100'

# 新增记录
curl -X POST 'https://open.feishu.cn/open-apis/bitable/v1/apps/BITABLE_APP_TOKEN/tables/TABLE_ID/records' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "fields": {
      "任务名称": "新任务",
      "状态": "待处理",
      "负责人": {"id": "USER_OPEN_ID"},
      "截止日期": 1700000000000
    }
  }'

# 更新记录
curl -X PUT 'https://open.feishu.cn/open-apis/bitable/v1/apps/BITABLE_APP_TOKEN/tables/TABLE_ID/records/RECORD_ID' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"fields": {"状态": "已完成"}}'

# 批量新增记录
curl -X POST 'https://open.feishu.cn/open-apis/bitable/v1/apps/BITABLE_APP_TOKEN/tables/TABLE_ID/records/batch_create' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "records": [
      {"fields": {"任务名称": "任务A", "状态": "待处理"}},
      {"fields": {"任务名称": "任务B", "状态": "进行中"}}
    ]
  }'
```

---

### 5. 日历与日程管理

```bash
# 获取用户主日历 ID
curl -X GET 'https://open.feishu.cn/open-apis/calendar/v4/calendars/primary' \
  -H "Authorization: Bearer $TOKEN"

# 创建日程
curl -X POST 'https://open.feishu.cn/open-apis/calendar/v4/calendars/CALENDAR_ID/events' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "summary": "周会",
    "start_time": {"timestamp": "1700100000", "timezone": "Asia/Shanghai"},
    "end_time": {"timestamp": "1700103600", "timezone": "Asia/Shanghai"},
    "description": "本周工作同步",
    "attendees": [
      {"type": "user", "user_id": "USER_OPEN_ID"}
    ],
    "vchat": {"meeting_settings": {"meeting_passwd": "123456"}}
  }'

# 查询时间范围内的日程
curl -X GET 'https://open.feishu.cn/open-apis/calendar/v4/calendars/CALENDAR_ID/events' \
  -H "Authorization: Bearer $TOKEN" \
  -G \
  --data-urlencode 'start_time=1700000000' \
  --data-urlencode 'end_time=1700200000'
```

---

### 6. 群管理与用户查询

```bash
# 获取机器人加入的群列表
curl -X GET 'https://open.feishu.cn/open-apis/im/v1/chats' \
  -H "Authorization: Bearer $TOKEN" \
  -G --data-urlencode 'page_size=20'

# 获取群成员列表
curl -X GET 'https://open.feishu.cn/open-apis/im/v1/chats/CHAT_ID/members' \
  -H "Authorization: Bearer $TOKEN"

# 通过邮箱查询用户 open_id
curl -X POST 'https://open.feishu.cn/open-apis/contact/v3/users/batch_get_id' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "emails": ["user@company.com"],
    "mobiles": []
  }'

# 获取部门成员列表
curl -X GET 'https://open.feishu.cn/open-apis/contact/v3/users' \
  -H "Authorization: Bearer $TOKEN" \
  -G --data-urlencode 'department_id=DEPT_ID' \
     --data-urlencode 'user_id_type=open_id'
```

---

### 7. 文件与素材管理

```bash
# 上传图片（用于消息中嵌入图片）
curl -X POST 'https://open.feishu.cn/open-apis/im/v1/images' \
  -H "Authorization: Bearer $TOKEN" \
  -F 'image_type=message' \
  -F 'image=@/path/to/image.png'

# 上传文件
curl -X POST 'https://open.feishu.cn/open-apis/im/v1/files' \
  -H "Authorization: Bearer $TOKEN" \
  -F 'file_type=pdf' \
  -F 'file_name=report.pdf' \
  -F 'file=@/path/to/report.pdf'

# 下载文件
curl -X GET 'https://open.feishu.cn/open-apis/im/v1/files/FILE_KEY' \
  -H "Authorization: Bearer $TOKEN" \
  -o downloaded_file.pdf
```

---

## 实用脚本模板

### 一键推送通知脚本

```bash
#!/bin/bash
# feishu_notify.sh - 飞书消息推送脚本

APP_ID="YOUR_APP_ID"
APP_SECRET="YOUR_APP_SECRET"
CHAT_ID="YOUR_CHAT_ID"

# 获取 token
TOKEN=$(curl -sX POST 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal' \
  -H 'Content-Type: application/json' \
  -d "{\"app_id\":\"$APP_ID\",\"app_secret\":\"$APP_SECRET\"}" | jq -r '.tenant_access_token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "获取 token 失败"
  exit 1
fi

# 发送消息
MSG="${1:-默认消息内容}"
curl -sX POST "https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{\"receive_id\":\"$CHAT_ID\",\"msg_type\":\"text\",\"content\":\"{\\\"text\\\":\\\"$MSG\\\"}\"}"

echo "消息发送成功"
```

### 多维表格批量导入脚本

```bash
#!/bin/bash
# 从 CSV 文件批量导入到多维表格
# 用法: ./import_bitable.sh data.csv APP_TOKEN TABLE_ID

CSV_FILE="$1"
APP_TOKEN="$2"
TABLE_ID="$3"

TOKEN=$(curl -sX POST 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal' \
  -H 'Content-Type: application/json' \
  -d "{\"app_id\":\"$APP_ID\",\"app_secret\":\"$APP_SECRET\"}" | jq -r '.tenant_access_token')

# 逐行读取 CSV 并导入（简化示例）
while IFS=',' read -r col1 col2 col3; do
  curl -sX POST "https://open.feishu.cn/open-apis/bitable/v1/apps/$APP_TOKEN/tables/$TABLE_ID/records" \
    -H "Authorization: Bearer $TOKEN" \
    -H 'Content-Type: application/json' \
    -d "{\"fields\":{\"列1\":\"$col1\",\"列2\":\"$col2\",\"列3\":\"$col3\"}}"
done < "$CSV_FILE"
```

---

## 工作流程

### 标准 API 调用流程

1. **配置凭证**：准备 `app_id` 和 `app_secret`（飞书开发者后台获取）
2. **获取 Token**：调用认证接口获取 `tenant_access_token`（2小时有效）
3. **确认 ID 类型**：明确操作目标的 ID（open_id / chat_id / doc_token 等）
4. **调用接口**：发送带 `Authorization: Bearer TOKEN` 头的 HTTP 请求
5. **处理响应**：检查 `code` 字段，`0` 为成功，非 0 查看 `msg` 排查

### 常见 ID 类型说明

```
open_id    → 用户唯一标识（以 ou_ 开头）
union_id   → 跨应用用户唯一标识
user_id    → 企业内用户 ID
chat_id    → 群聊 ID（以 oc_ 开头）
message_id → 消息 ID（以 om_ 开头）
doc_token  → 文档 Token（URL 中 /docx/ 后的部分）
app_token  → 多维表格应用 Token（URL 中 /base/ 后的部分）
```

---

## 快速命令

```bash
# 立即可用的指令示例

"用飞书机器人给群发送一条消息：xxx"
→ 生成 Webhook curl 命令，直接执行

"查询多维表格 [URL] 中状态为「进行中」的记录"
→ 解析 URL 提取 app_token 和 table_id，生成查询命令

"把这个 CSV 文件的数据导入到飞书多维表格 [URL]"
→ 生成批量导入脚本

"创建一个飞书日程：明天下午 3 点，参与人 xxx"
→ 生成创建日程 curl 命令

"查找飞书群 [群名] 的 chat_id"
→ 调用群列表接口并过滤

"设置飞书推送脚本，当文件 [file] 变化时自动发消息"
→ 生成结合 fswatch/inotify 的自动化脚本
```
