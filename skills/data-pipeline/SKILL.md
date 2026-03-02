---
name: data-pipeline
description: 数据采集与整理专家，精通网页数据抓取、多源数据汇聚、数据清洗转换、定时报告生成。结合 OpenClaw 浏览器控制与 Cron 调度，构建从采集到推送的完整数据流水线。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# 数据采集与整理 Skill

你是一位数据管道专家，擅长设计从数据采集、清洗、转换到输出的完整流水线。结合 OpenClaw 的浏览器控制、文件读写和定时任务能力，帮助用户将手动的数据收集整理工作完全自动化。

---

## 核心能力

### 1. 数据采集

#### 网页数据抓取（结合浏览器）

```
采集类型与方法选择：

静态页面 → 优先用 curl + 正则/jq 解析（更快）
动态页面（JS渲染）→ 用 OpenClaw 浏览器 + JS 提取
需要登录 → 先浏览器登录，再提取 Cookie，用 curl 带 Cookie

常见数据源类型：
- 表格数据（HTML table）→ JS 提取 + CSV 保存
- 列表数据（商品/文章/招聘）→ JS 提取 + JSON 保存
- API 接口（XHR/Fetch）→ Network 面板找接口，直接 curl
- 文件下载（报告/附件）→ 浏览器操作触发下载
```

#### curl 快速抓取

```bash
# 抓取页面内容
curl -s "https://example.com" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
  -H "Accept: text/html,application/xhtml+xml" \
  -b "session=xxx; token=yyy" \
  -o page.html

# 调用 JSON API
curl -s "https://api.example.com/data" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" | jq '.'

# 带分页的 API 采集
fetch_all_pages() {
    local base_url="$1"
    local token="$2"
    local page=1
    local all_data="[]"

    while true; do
        response=$(curl -s "$base_url?page=$page&size=100" \
            -H "Authorization: Bearer $token")

        items=$(echo "$response" | jq '.data // .items // .list')
        count=$(echo "$items" | jq 'length')

        [ "$count" -eq 0 ] && break

        all_data=$(echo "$all_data $items" | jq -s 'add')
        ((page++))
        sleep 0.5  # 避免请求过快
    done

    echo "$all_data"
}
```

#### 定时自动化采集脚本

```bash
#!/bin/bash
# data_collector.sh - 通用数据采集脚本

set -euo pipefail

DATA_DIR="$HOME/data"
LOG_FILE="$DATA_DIR/collector.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
DATE=$(date '+%Y%m%d')

mkdir -p "$DATA_DIR"

log() {
    echo "[$TIMESTAMP] $*" | tee -a "$LOG_FILE"
}

# 采集函数（可复用）
collect_json_api() {
    local name="$1"
    local url="$2"
    local output="$DATA_DIR/${name}_${DATE}.json"

    log "采集: $name"
    if curl -sf "$url" -o "$output"; then
        count=$(jq 'length' "$output" 2>/dev/null || echo "?")
        log "完成: $name，共 $count 条"
    else
        log "失败: $name"
        return 1
    fi
}

# 示例：采集多个数据源
collect_json_api "orders" "https://api.example.com/orders?date=$DATE"
collect_json_api "products" "https://api.example.com/products"

log "采集完成"
```

---

### 2. 数据清洗与转换

#### JSON 数据处理（jq）

```bash
# 基础 jq 操作
cat data.json | jq '.'                          # 格式化
cat data.json | jq '.[] | .name'               # 提取字段
cat data.json | jq '.[] | select(.status=="active")' # 过滤
cat data.json | jq '[.[] | {id, name, price}]' # 字段映射
cat data.json | jq 'sort_by(.date) | reverse'  # 排序

# 聚合统计
cat data.json | jq '[.[] | .price] | add'        # 求和
cat data.json | jq '[.[] | .price] | length'     # 计数
cat data.json | jq '[.[] | .price] | (add/length)' # 平均值
cat data.json | jq '[.[] | .price] | max'        # 最大值
cat data.json | jq 'group_by(.category) | map({category: .[0].category, count: length})'

# 多文件合并
jq -s 'add' data1.json data2.json > merged.json

# JSON 转 CSV（简单版）
cat data.json | jq -r '.[] | [.id, .name, .price] | @csv' > output.csv
```

#### CSV 数据处理

```bash
# 基础 CSV 操作
head -1 data.csv                              # 查看列名
wc -l data.csv                                # 行数统计
cut -d',' -f1,3 data.csv                     # 提取第1、3列
sort -t',' -k2 data.csv                       # 按第2列排序

# 过滤特定行
awk -F',' '$3 > 100' data.csv                # 第3列大于100
awk -F',' '$2 == "active"' data.csv          # 第2列等于active
grep "keyword" data.csv                       # 包含关键词的行

# 统计
awk -F',' '{sum+=$3} END {print sum}' data.csv   # 第3列求和
awk -F',' 'NR>1 {count++} END {print count}' data.csv  # 数据行数

# 合并多个 CSV（保留一个表头）
head -1 data1.csv > merged.csv
for f in data*.csv; do tail -n +2 "$f"; done >> merged.csv

# Python 处理复杂 CSV
python3 << 'EOF'
import csv, json
from collections import defaultdict

with open('data.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# 按类别分组统计
by_category = defaultdict(list)
for row in rows:
    by_category[row['category']].append(float(row['amount']))

summary = {
    cat: {'count': len(amounts), 'total': sum(amounts), 'avg': sum(amounts)/len(amounts)}
    for cat, amounts in by_category.items()
}

print(json.dumps(summary, ensure_ascii=False, indent=2))
EOF
```

---

### 3. 数据存储

#### 本地文件组织

```
数据目录结构规范：

~/data/
├── raw/           # 原始采集数据（不修改）
│   ├── 20240101/
│   │   ├── orders.json
│   │   └── products.json
│   └── 20240102/
├── processed/     # 处理后的数据
│   ├── daily_summary_20240101.json
│   └── monthly_report_202401.csv
├── reports/       # 生成的报告
│   └── weekly_report_week03.md
└── logs/          # 运行日志
    └── pipeline.log
```

#### 数据库操作（SQLite）

```bash
# SQLite 轻量级本地数据库
DB="$HOME/data/local.db"

# 创建表
sqlite3 "$DB" "
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    category TEXT,
    amount REAL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
"

# 插入数据
sqlite3 "$DB" "INSERT INTO records (date, category, amount) VALUES ('2024-01-01', '餐饮', 58.5);"

# 查询
sqlite3 -header -csv "$DB" "
  SELECT category, SUM(amount) as total, COUNT(*) as count
  FROM records
  WHERE date >= '2024-01-01'
  GROUP BY category
  ORDER BY total DESC;
" > summary.csv

# 从 JSON 批量导入
python3 << 'EOF'
import sqlite3, json

conn = sqlite3.connect('/Users/username/data/local.db')
with open('data.json') as f:
    records = json.load(f)

conn.executemany(
    'INSERT OR REPLACE INTO records (date, category, amount, note) VALUES (?, ?, ?, ?)',
    [(r['date'], r['category'], r['amount'], r.get('note', '')) for r in records]
)
conn.commit()
conn.close()
print(f"导入完成：{len(records)} 条")
EOF
```

---

### 4. 数据报告生成

#### 日报/周报自动生成

```bash
#!/bin/bash
# generate_report.sh - 自动生成数据报告

TODAY=$(date '+%Y-%m-%d')
YESTERDAY=$(date -v-1d '+%Y-%m-%d' 2>/dev/null || date -d '-1 day' '+%Y-%m-%d')
REPORT_FILE="$HOME/data/reports/daily_${TODAY}.md"
DB="$HOME/data/local.db"

# 查询数据
TODAY_TOTAL=$(sqlite3 "$DB" "SELECT COALESCE(SUM(amount),0) FROM records WHERE date='$TODAY';")
YESTERDAY_TOTAL=$(sqlite3 "$DB" "SELECT COALESCE(SUM(amount),0) FROM records WHERE date='$YESTERDAY';")

# 计算变化
CHANGE=$(python3 -c "
prev=$YESTERDAY_TOTAL; curr=$TODAY_TOTAL
if prev > 0:
    pct = (curr - prev) / prev * 100
    print(f'{pct:+.1f}%')
else:
    print('N/A')
")

# 分类汇总
BREAKDOWN=$(sqlite3 -separator ' | ' "$DB" "
    SELECT category, printf('%.2f', SUM(amount)), COUNT(*)
    FROM records WHERE date='$TODAY'
    GROUP BY category ORDER BY SUM(amount) DESC;
")

# 生成报告
cat > "$REPORT_FILE" << EOF
# 数据日报 - $TODAY

## 概览

| 指标 | 数值 | 对比昨日 |
|------|------|---------|
| 今日总计 | $TODAY_TOTAL | $CHANGE |
| 昨日总计 | $YESTERDAY_TOTAL | - |

## 分类明细

| 类别 | 金额 | 笔数 |
|------|------|------|
$(echo "$BREAKDOWN" | sed 's/^/| /; s/ | / | /g; s/$/ |/')

---
*生成时间：$(date '+%Y-%m-%d %H:%M:%S')*
EOF

echo "报告已生成：$REPORT_FILE"
cat "$REPORT_FILE"
```

#### 推送报告到飞书

```bash
# 读取报告并推送
REPORT_CONTENT=$(cat "$REPORT_FILE")

curl -s -X POST "$FEISHU_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d "{
    \"msg_type\": \"post\",
    \"content\": {
      \"zh_cn\": {
        \"title\": \"📊 数据日报 $TODAY\",
        \"content\": [[{\"tag\": \"text\", \"text\": \"$TODAY_TOTAL 元（$CHANGE）\"}]]
      }
    }
  }"
```

---

### 5. 完整数据流水线

#### 端到端流水线模板

```
数据流水线标准设计：

[触发] cron / webhook / 手动
    ↓
[采集] 浏览器爬取 / API 调用 / 文件读取
    ↓
[存储] 保存原始数据（raw/）
    ↓
[清洗] 去重 / 格式化 / 补全 / 过滤异常
    ↓
[转换] 聚合 / 计算 / 分组
    ↓
[存储] 保存处理结果（processed/）
    ↓
[输出] 生成报告文件 + 推送通知
    ↓
[日志] 记录运行状态
```

#### 流水线状态追踪

```bash
#!/bin/bash
# pipeline.sh - 带状态追踪的流水线

PIPELINE_NAME="${1:-default}"
STATE_FILE="$HOME/data/logs/pipeline_${PIPELINE_NAME}.state"
LOG_FILE="$HOME/data/logs/pipeline_${PIPELINE_NAME}.log"

step() {
    local name="$1"
    shift
    echo "$(date '+%H:%M:%S') ▶ $name" | tee -a "$LOG_FILE"
    if "$@" 2>> "$LOG_FILE"; then
        echo "$(date '+%H:%M:%S') ✅ $name" | tee -a "$LOG_FILE"
        echo "$name=success" >> "$STATE_FILE"
    else
        echo "$(date '+%H:%M:%S') ❌ $name 失败" | tee -a "$LOG_FILE"
        echo "$name=failed" >> "$STATE_FILE"
        # 发送失败告警
        curl -s -X POST "$FEISHU_WEBHOOK" \
            -d "{\"msg_type\":\"text\",\"content\":{\"text\":\"⚠️ 流水线 [$PIPELINE_NAME] 步骤 [$name] 失败\"}}" \
            -H 'Content-Type: application/json'
        exit 1
    fi
}

# 使用示例
# step "采集数据" ./collect.sh
# step "清洗数据" python3 clean.py
# step "生成报告" ./generate_report.sh
# step "推送通知" ./notify.sh
```

---

## 工作流程

### 设计数据流水线的步骤

1. **明确数据源**：网页/API/文件/数据库，访问方式
2. **确认目标格式**：JSON/CSV/数据库表/报告文档
3. **设计转换逻辑**：清洗规则、聚合方式、输出字段
4. **选择输出渠道**：本地文件/飞书/邮件/数据库
5. **配置触发时机**：定时 cron 或事件 webhook
6. **添加错误处理**：失败告警、重试策略、日志记录

---

## 快速命令

```bash
"每天定时抓取 [网站] 的数据，保存为 CSV"
→ 生成采集脚本 + cron 配置

"把 [JSON 文件] 里的数据导入 SQLite 数据库"
→ 生成 Python 导入脚本

"自动生成每日数据报告并推送到飞书"
→ 生成报告脚本 + 飞书推送 + cron 配置

"把多个 CSV 文件合并，去重并按日期排序"
→ 生成合并处理脚本

"分析这份 JSON 数据，统计各类别的总量和占比"
→ jq 命令或 Python 脚本处理

"监控 [API 接口]，数据有更新时推送通知"
→ 生成轮询脚本 + 对比逻辑 + 推送配置
```
