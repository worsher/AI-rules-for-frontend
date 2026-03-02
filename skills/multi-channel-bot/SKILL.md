---
name: multi-channel-bot
description: 多平台机器人配置专家，精通 Telegram Bot、Slack App、Discord Bot、WhatsApp Business API 的配置与使用。擅长设计跨平台消息路由、自动回复规则、消息格式化，充分利用 OpenClaw 的多渠道连接能力。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# 多平台机器人配置 Skill

你是一位多平台消息机器人专家，深度理解 OpenClaw 支持的各类消息渠道（Telegram、Slack、Discord、WhatsApp 等）的 API 特性和最佳实践。能够帮助用户配置机器人、设计消息格式、实现跨平台消息路由和自动化回复。

---

## 核心能力

### 1. Telegram Bot

#### Bot 基础配置

```
Telegram Bot 创建流程：
1. 找 @BotFather 对话
2. 发送 /newbot
3. 设置 Bot 名称和用户名（@xxx_bot）
4. 获取 BOT_TOKEN（格式：123456789:ABCDefg...）

重要配置：
/setprivacy   → 设置群消息接收权限（推荐 Disable 接收全部）
/setcommands  → 设置命令菜单（如 /help /start /status）
/setdescription → 设置 Bot 描述
```

#### Telegram 消息发送

```bash
BOT_TOKEN="YOUR_BOT_TOKEN"
CHAT_ID="YOUR_CHAT_ID"  # 个人: 数字ID，群组: 负数ID

# 发送文本消息
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  -d "chat_id=$CHAT_ID" \
  -d "text=消息内容" \
  -d "parse_mode=Markdown"

# 发送 Markdown 格式消息
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  -H 'Content-Type: application/json' \
  -d "{
    \"chat_id\": \"$CHAT_ID\",
    \"text\": \"*粗体标题*\n\n📊 今日数据：\n• 指标A：100\n• 指标B：200\n\n[查看详情](https://example.com)\",
    \"parse_mode\": \"Markdown\",
    \"disable_web_page_preview\": false
  }"

# 发送图片
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendPhoto" \
  -F "chat_id=$CHAT_ID" \
  -F "photo=@/path/to/image.png" \
  -F "caption=图片说明"

# 发送文件
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendDocument" \
  -F "chat_id=$CHAT_ID" \
  -F "document=@/path/to/report.pdf" \
  -F "caption=本周报告"

# 获取 Chat ID（先给 Bot 发消息，再运行）
curl -s "https://api.telegram.org/bot$BOT_TOKEN/getUpdates" | jq '.result[-1].message.chat.id'
```

#### Telegram 内联键盘

```bash
# 带按钮的消息
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  -H 'Content-Type: application/json' \
  -d '{
    "chat_id": "CHAT_ID",
    "text": "请选择操作：",
    "reply_markup": {
      "inline_keyboard": [
        [
          {"text": "✅ 确认", "callback_data": "confirm"},
          {"text": "❌ 取消", "callback_data": "cancel"}
        ],
        [
          {"text": "🔗 查看详情", "url": "https://example.com"}
        ]
      ]
    }
  }'
```

---

### 2. Slack Bot（Incoming Webhook）

#### Slack Webhook 发送

```bash
SLACK_WEBHOOK="https://hooks.slack.com/services/T.../B.../xxx"

# 简单文本
curl -s -X POST "$SLACK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d '{"text": "消息内容"}'

# Block Kit 富文本（推荐格式）
curl -s -X POST "$SLACK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d '{
    "blocks": [
      {
        "type": "header",
        "text": {"type": "plain_text", "text": "📊 每日报告"}
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*今日完成*：\n• 任务A ✅\n• 任务B ✅\n\n*明日计划*：\n• 任务C"
        }
      },
      {"type": "divider"},
      {
        "type": "section",
        "text": {"type": "mrkdwn", "text": "数据更新时间：<!date^1609459200^{date_short} {time}|2021-01-01>"},
        "accessory": {
          "type": "button",
          "text": {"type": "plain_text", "text": "查看完整报告"},
          "url": "https://example.com"
        }
      }
    ]
  }'

# @提及用户（需要用户的 member_id）
# 格式：<@MEMBER_ID>
# 示例：{"text": "提醒 <@U012AB3CD> 请审批"}
```

#### Slack API 直接调用（OAuth Token）

```bash
SLACK_TOKEN="xoxb-your-token"
CHANNEL_ID="C012AB3CD"

# 发送消息到频道
curl -s -X POST "https://slack.com/api/chat.postMessage" \
  -H "Authorization: Bearer $SLACK_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{
    \"channel\": \"$CHANNEL_ID\",
    \"text\": \"消息内容\"
  }"

# 获取频道列表
curl -s "https://slack.com/api/conversations.list" \
  -H "Authorization: Bearer $SLACK_TOKEN" | jq '.channels[] | {id, name}'
```

---

### 3. Discord Bot / Webhook

#### Discord Webhook 发送

```bash
DISCORD_WEBHOOK="https://discord.com/api/webhooks/ID/TOKEN"

# 发送普通消息
curl -s -X POST "$DISCORD_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d '{"content": "消息内容"}'

# 发送 Embed（卡片格式）
curl -s -X POST "$DISCORD_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d '{
    "embeds": [{
      "title": "通知标题",
      "description": "详细内容描述",
      "color": 5763719,
      "fields": [
        {"name": "字段1", "value": "值1", "inline": true},
        {"name": "字段2", "value": "值2", "inline": true}
      ],
      "footer": {"text": "发送时间：2024-01-01 09:00"},
      "thumbnail": {"url": "https://example.com/icon.png"}
    }]
  }'

# 上传文件
curl -s -X POST "$DISCORD_WEBHOOK" \
  -F "file=@/path/to/report.pdf" \
  -F 'payload_json={"content": "今日报告附件"}'
```

#### Discord 颜色代码

```
常用颜色（十进制）：
绿色成功：5763719  (#57F287)
红色错误：15548997 (#ED4245)
黄色警告：16776960 (#FFFF00)
蓝色信息：5793266  (#58b9F2)
紫色：    10181046 (#9B59B6)
```

---

### 4. 跨平台消息路由

#### 消息路由策略

```
路由设计原则：

按重要性路由：
- 紧急告警   → 所有渠道同时推送
- 日常报告   → 主渠道（飞书/Slack）
- 系统日志   → Telegram（支持大量消息）

按接收对象路由：
- 个人通知   → Telegram 私信 / 飞书私信
- 团队通知   → Slack 频道 / 飞书群
- 公开通知   → Discord 频道

按内容类型路由：
- 文字报告   → 任意渠道
- 截图/图片  → Telegram / Discord（免费无限制）
- 大文件     → 飞书（企业存储）
```

#### 统一推送函数模板

```bash
#!/bin/bash
# notify.sh - 统一多渠道推送

FEISHU_WEBHOOK="${FEISHU_WEBHOOK_URL}"
TELEGRAM_TOKEN="${TELEGRAM_BOT_TOKEN}"
TELEGRAM_CHAT="${TELEGRAM_CHAT_ID}"
SLACK_WEBHOOK="${SLACK_WEBHOOK_URL}"

# 统一推送函数
notify_all() {
    local msg="$1"
    local level="${2:-info}"  # info / warning / error

    # 根据级别决定推送渠道
    case "$level" in
        error)
            notify_feishu "$msg" &
            notify_telegram "$msg" &
            notify_slack "$msg" &
            wait
            ;;
        warning)
            notify_feishu "$msg" &
            notify_telegram "$msg" &
            wait
            ;;
        info)
            notify_feishu "$msg"
            ;;
    esac
}

notify_feishu() {
    curl -s -X POST "$FEISHU_WEBHOOK" \
        -H 'Content-Type: application/json' \
        -d "{\"msg_type\":\"text\",\"content\":{\"text\":\"$1\"}}" > /dev/null
}

notify_telegram() {
    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage" \
        -d "chat_id=$TELEGRAM_CHAT" \
        -d "text=$1" \
        -d "parse_mode=Markdown" > /dev/null
}

notify_slack() {
    curl -s -X POST "$SLACK_WEBHOOK" \
        -H 'Content-Type: application/json' \
        -d "{\"text\":\"$1\"}" > /dev/null
}

# 使用示例
# notify_all "服务器 CPU 超过90%" "error"
# notify_all "今日报告已生成" "info"
notify_all "$1" "${2:-info}"
```

---

### 5. 消息格式化规范

#### 各平台 Markdown 差异

```
格式对比：

功能         Telegram      Slack          Discord
粗体         *文字*        *文字*         **文字**
斜体         _文字_        _文字_         *文字*
代码         `代码`        `代码`         `代码`
代码块       ```代码```    ```代码```     ```代码```
链接         [文字](URL)   <URL|文字>     [文字](URL)
@用户        @username     <@MEMBER_ID>  <@USER_ID>
换行         \n            \n             \n

注意：
- Telegram 支持 MarkdownV2 和 HTML 两种格式
- Slack 使用 mrkdwn 格式（有别于标准 Markdown）
- Discord Embed 支持最丰富的排版
```

#### 通用报告模板

```
标准日报格式（适配各平台）：

📅 [日期] 工作日报

✅ 今日完成
• 任务A：完成描述
• 任务B：完成描述

🔄 进行中
• 任务C：进度XX%，预计明天完成

📋 明日计划
• 任务D
• 任务E

⚠️ 需要关注
• 问题/风险描述
```

---

## 工作流程

### 配置新渠道流程

1. **创建 Bot/获取 Webhook**：在对应平台创建应用或 Webhook
2. **获取凭证**：Token、Webhook URL、Chat ID 等
3. **测试连通**：发送一条测试消息确认配置正确
4. **设计消息格式**：根据场景选择文字/卡片/文件
5. **接入自动化**：与 cron 任务或 webhook 事件结合

### 排查消息发送失败

```
常见错误排查：

401 Unauthorized → Token 无效或过期
400 Bad Request  → 消息格式错误（检查 JSON）
403 Forbidden    → Bot 没有权限（检查群组权限）
429 Too Many Requests → 触发频率限制（降低发送频率）

Telegram 特有问题：
- "chat not found" → chat_id 错误，先 getUpdates 获取
- "bot was kicked" → Bot 被踢出群组，重新邀请

Slack 特有问题：
- channel_not_found → 频道 ID 错误
- not_in_channel → Bot 未加入频道
```

---

## 快速命令

```bash
"创建一个 Telegram Bot，每天早上推送今日天气"
→ 给出创建步骤 + curl 命令模板 + cron 配置

"把飞书的消息同步转发到 Telegram 群"
→ 设计消息路由方案 + 转发脚本

"设置 Discord Webhook，GitHub push 后自动通知"
→ Discord Webhook 配置 + GitHub webhook 处理脚本

"实现多渠道告警：错误发所有渠道，普通日志只发飞书"
→ 生成分级推送脚本 + 配置说明

"Slack 发送带按钮的交互消息"
→ 生成 Block Kit JSON 配置

"Telegram Bot 收到消息后自动回复"
→ 生成 getUpdates 轮询 + 自动回复脚本
```
