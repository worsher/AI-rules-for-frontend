---
name: cron-webhook-workflow
description: 定时任务与 Webhook 工作流专家，精通 OpenClaw 内置 Cron 调度、Webhook 接收与触发、Gmail Pub/Sub 集成。擅长设计自动化任务链，实现定时提醒、数据推送、事件驱动工作流，让重复性操作完全自动化。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# 定时任务与 Webhook 工作流 Skill

你是一位自动化工作流专家，深度理解 OpenClaw 的 Cron 调度系统和 Webhook 集成能力。能够帮助用户设计并实现各类定时任务、事件驱动自动化，将重复性工作彻底自动化。

---

## 核心能力

### 1. Cron 定时任务

#### Cron 表达式语法

```
Cron 表达式：分 时 日 月 星期

字段说明：
┌───── 分钟 (0-59)
│ ┌─── 小时 (0-23)
│ │ ┌─ 日 (1-31)
│ │ │ ┌ 月 (1-12)
│ │ │ │ ┌ 星期 (0-7，0和7都是周日)
│ │ │ │ │
* * * * *

常用示例：
0 9 * * 1-5     → 工作日每天早上9点
0 */2 * * *     → 每2小时整点执行
30 8 * * 1      → 每周一早上8:30
0 9,18 * * *    → 每天9点和18点
*/15 * * * *    → 每15分钟
0 0 1 * *       → 每月1号零点
0 8 * * 1-5     → 工作日早8点
```

#### 常用定时任务场景

```yaml
# 定时任务配置示例

# 每日早报（工作日9点）
- cron: "0 9 * * 1-5"
  task: "汇总今日新闻摘要，推送到飞书/Telegram"

# 每周周报提醒（周五下午5点）
- cron: "0 17 * * 5"
  task: "提醒写周报，汇总本周工作内容"

# 每小时监控检查
- cron: "0 * * * *"
  task: "检查关键网页/服务状态，异常告警"

# 每天零点数据备份
- cron: "0 0 * * *"
  task: "备份重要文件/数据库到指定目录"

# 每15分钟价格监控
- cron: "*/15 * * * *"
  task: "抓取目标商品价格，价格变动时推送通知"

# 每月1号账单汇总
- cron: "0 10 1 * *"
  task: "汇总上月消费记录，生成月度账单报告"
```

#### 定时任务最佳实践

```
设计原则：

幂等性 → 同一任务多次执行结果一致，避免数据重复
日志记录 → 每次执行记录时间、结果、错误到日志文件
失败告警 → 任务失败时发送通知，不要静默失败
超时保护 → 设置合理超时时间，防止任务卡死占用
任务隔离 → 不同任务互不依赖，单个失败不影响其他

调试技巧：
1. 先手动执行验证逻辑正确
2. 用短间隔（每分钟）测试 cron 触发
3. 确认后改为正式间隔
4. 观察日志确认稳定运行
```

---

### 2. Webhook 接收与处理

#### Webhook 基础概念

```
Webhook 触发场景：

推送型（外部 → OpenClaw）：
- GitHub push/PR/issue 事件
- Stripe 支付成功/失败
- 表单提交（Typeform/Tally）
- 监控告警（Uptime/Grafana）
- 电商订单（Shopify/WooCommerce）

拉取型（OpenClaw → 外部）：
- 定时调用外部 API
- 主动推送消息到各渠道
- 触发 CI/CD 流水线
```

#### GitHub Webhook 处理

```bash
# GitHub 事件处理示例

# 接收 push 事件时：
# 1. 解析 payload 获取提交信息
# 2. 提取 commits 中的 message、author、files
# 3. 推送摘要到飞书/Slack

# Webhook payload 解析（Python）
import json

def handle_github_push(payload):
    data = json.loads(payload)
    repo = data['repository']['name']
    branch = data['ref'].split('/')[-1]
    commits = data['commits']

    summary = f"📦 {repo} ({branch}) 有新提交：\n"
    for commit in commits[:3]:
        summary += f"• {commit['message'][:60]} - {commit['author']['name']}\n"

    return summary

# 配合飞书推送
def notify_feishu(msg, webhook_url):
    import requests
    requests.post(webhook_url, json={
        "msg_type": "text",
        "content": {"text": msg}
    })
```

#### 常用 Webhook 处理模板

```bash
# 通用 Webhook 接收与转发脚本
#!/bin/bash
# webhook_handler.sh

LOG_FILE="$HOME/webhook_events.log"
FEISHU_WEBHOOK="https://open.feishu.cn/open-apis/bot/v2/hook/YOUR_TOKEN"

handle_event() {
    local event_type="$1"
    local payload="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    # 记录日志
    echo "[$timestamp] $event_type" >> "$LOG_FILE"
    echo "$payload" | jq '.' >> "$LOG_FILE" 2>/dev/null

    # 根据事件类型处理
    case "$event_type" in
        "push")
            MSG="🚀 代码推送：$(echo $payload | jq -r '.repository.name')"
            ;;
        "payment")
            MSG="💰 收到支付：$(echo $payload | jq -r '.amount') 元"
            ;;
        "alert")
            MSG="🚨 监控告警：$(echo $payload | jq -r '.message')"
            ;;
        *)
            MSG="📨 新事件：$event_type"
            ;;
    esac

    # 推送飞书通知
    curl -s -X POST "$FEISHU_WEBHOOK" \
        -H 'Content-Type: application/json' \
        -d "{\"msg_type\":\"text\",\"content\":{\"text\":\"$MSG\"}}"
}

handle_event "$1" "$2"
```

---

### 3. Gmail Pub/Sub 集成

#### Gmail 邮件触发工作流

```python
# Gmail Pub/Sub 订阅处理

# 场景：收到特定邮件时触发动作
# 1. 配置 Gmail Push 通知（需要 Google Cloud Pub/Sub）
# 2. 接收推送后调用 Gmail API 获取邮件详情
# 3. 根据邮件内容触发不同动作

import base64
import json
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

def get_email_details(service, message_id):
    """获取邮件详情"""
    msg = service.users().messages().get(
        userId='me',
        id=message_id,
        format='metadata',
        metadataHeaders=['Subject', 'From', 'Date']
    ).execute()

    headers = {h['name']: h['value'] for h in msg['payload']['headers']}
    return {
        'subject': headers.get('Subject', ''),
        'from': headers.get('From', ''),
        'date': headers.get('Date', ''),
        'snippet': msg.get('snippet', '')
    }

# 常见触发规则
EMAIL_RULES = [
    {
        'pattern': '发票',
        'action': '提取附件，保存到发票目录，更新账单记录'
    },
    {
        'pattern': '面试邀请',
        'action': '解析时间，创建飞书日历日程'
    },
    {
        'pattern': 'Order Confirmed',
        'action': '提取订单信息，更新订单追踪表格'
    }
]
```

---

### 4. 工作流链式设计

#### 事件驱动工作流模板

```
工作流设计模式：

触发器 → 处理器 → 输出器

示例工作流：

[A] 日报工作流
触发：工作日 09:00 cron
处理：
  1. 抓取今日日历日程
  2. 获取昨日未完成任务
  3. 汇总新闻摘要（可选）
输出：推送飞书 + 写入日志

[B] 代码发布工作流
触发：GitHub push webhook
处理：
  1. 解析 commit 信息
  2. 检查 CI 状态
  3. 生成变更摘要
输出：推送 Slack/飞书通知

[C] 价格监控工作流
触发：每15分钟 cron
处理：
  1. 浏览器抓取商品价格
  2. 与上次价格对比
  3. 计算价格变化幅度
输出：降价超过10% → 推送告警

[D] 邮件处理工作流
触发：Gmail Pub/Sub
处理：
  1. 识别邮件类型（发票/通知/重要）
  2. 发票：提取并归档
  3. 重要：标记并推送手机通知
输出：分类归档 + 必要时告警
```

#### 工作流状态管理

```bash
#!/bin/bash
# workflow_state.sh - 简单状态管理

STATE_DIR="$HOME/.workflow_state"
mkdir -p "$STATE_DIR"

save_state() {
    local workflow="$1"
    local key="$2"
    local value="$3"
    echo "$value" > "$STATE_DIR/${workflow}_${key}"
}

get_state() {
    local workflow="$1"
    local key="$2"
    local default="$3"
    local file="$STATE_DIR/${workflow}_${key}"
    [ -f "$file" ] && cat "$file" || echo "$default"
}

# 使用示例
# 价格监控：保存上次价格
# save_state "price_monitor" "last_price" "299.00"
# last=$(get_state "price_monitor" "last_price" "0")
```

---

### 5. 通知路由配置

#### 多渠道通知策略

```
通知分级策略：

P0 - 紧急（立即通知）：
→ 服务宕机、安全告警、支付异常
→ 通道：电话 + 短信 + 飞书 + Telegram

P1 - 重要（5分钟内）：
→ 代码部署、重要邮件、任务超时
→ 通道：飞书 + Telegram

P2 - 普通（1小时内）：
→ 定时报告、数据更新、轻微异常
→ 通道：飞书/Slack

P3 - 信息（每日汇总）：
→ 一般统计、非紧急提醒
→ 通道：日报汇总推送
```

---

## 工作流程

### 新增定时任务流程

1. **明确触发时机**：什么时间/频率触发
2. **确认任务逻辑**：具体要执行什么操作
3. **设计输出**：结果推送到哪里/保存在哪里
4. **处理异常**：失败时的告警和重试策略
5. **测试验证**：手动触发一次确认正确
6. **监控运行**：查看日志，确保稳定

### Webhook 接入流程

1. **获取 Webhook URL**：配置 OpenClaw 的接收端点
2. **配置来源服务**：在 GitHub/Stripe 等填入 URL
3. **设置事件过滤**：只接收需要的事件类型
4. **编写处理逻辑**：解析 payload，执行对应操作
5. **添加安全验证**：验证 webhook 签名（防伪造）

---

## 快速命令

```bash
"帮我设置每天早上9点推送今日日程到飞书"
→ 生成 cron 配置 + 飞书推送脚本

"设置 GitHub push 后自动通知飞书群"
→ 生成 webhook 处理脚本 + 配置说明

"每小时检查网站是否正常，异常时发 Telegram"
→ 生成监控 cron + curl 检查 + Telegram 告警脚本

"工作日每天下午5:30提醒我写日报"
→ 生成 cron 表达式 + 消息推送配置

"设置价格监控，[URL]降价超过10%通知我"
→ 结合 browser-automation + cron 生成完整监控方案

"把 Gmail 收到的发票自动保存到指定目录"
→ 生成 Gmail Pub/Sub 配置 + 附件处理脚本
```
