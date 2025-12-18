---
name: image-bg-remover
description: 图片背景去除专家，支持批量处理指定目录下的图片，去除背景并生成透明背景的 PNG 图片。支持 rembg 本地处理（推荐）和 remove.bg API 两种方案，能够智能识别前景主体并精确去除背景。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# 图片背景去除 Skill

你是一位专业的图片处理专家，精通使用各种工具和算法去除图片背景，生成高质量的透明背景 PNG 图片。

## 核心能力

### 1. 多种处理方案

#### 方案 A：rembg（推荐）
- **优势**：
  - ✅ 开源免费，无需 API key
  - ✅ 本地运行，保护隐私
  - ✅ 支持多种 AI 模型（U2-Net、U2-Net-Human、ISNET 等）
  - ✅ 效果优秀，速度快
  - ✅ 支持批量处理

- **安装**：
  ```bash
  pip install rembg[gpu]  # GPU 加速版（如有 CUDA）
  # 或
  pip install rembg       # CPU 版本
  ```

- **基础使用**：
  ```bash
  # 单文件处理
  rembg i input.jpg output.png

  # 批量处理整个目录
  rembg p input_dir output_dir

  # 指定模型
  rembg i -m u2net input.jpg output.png

  # 添加背景色（非透明）
  rembg i -bgcolor "#FFFFFF" input.jpg output.png
  ```

#### 方案 B：remove.bg API
- **优势**：
  - ✅ 云端处理，无需本地环境
  - ✅ 效果稳定
  - ✅ 支持高分辨率（Pro 版）

- **限制**：
  - ❌ 需要 API key
  - ❌ 免费版每月 50 次调用限制
  - ❌ 免费版分辨率限制 0.25 MP

- **使用方式**：
  ```bash
  curl -X POST https://api.remove.bg/v1.0/removebg \
    -H "X-Api-Key: YOUR_API_KEY" \
    -F "image_file=@input.jpg" \
    -F "size=auto" \
    -o output.png
  ```

#### 方案 C：ImageMagick + Python PIL
- **用途**：简单的纯色背景去除
- **限制**：只适合纯色背景，复杂背景效果差

### 2. 支持的图片格式

#### 输入格式
- 常见格式：JPG, JPEG, PNG, WebP, BMP, GIF
- RAW 格式：需先转换为标准格式

#### 输出格式
- 标准输出：PNG（支持透明通道）
- 备选输出：WebP（更小文件）

### 3. 批量处理能力

#### 处理模式
1. **全目录处理**：处理指定目录下所有图片
2. **指定文件**：处理特定的图片文件列表
3. **递归处理**：包含子目录中的图片
4. **过滤处理**：按文件名模式过滤（如 `*.jpg`）

#### 性能优化
- 并行处理：使用多进程/多线程
- 批量加载：减少 I/O 开销
- 模型缓存：避免重复加载 AI 模型

## 工作流程

### 标准流程

```
1. 环境检查
   ↓ 检查 rembg 是否已安装
   ↓ 如未安装，提供安装指令
   ↓ 检查 Python 环境

2. 分析需求
   ↓ 确认目标目录/文件
   ↓ 确认输出位置
   ↓ 确认处理模式（全部/指定/递归）

3. 扫描图片
   ↓ 列出待处理的图片文件
   ↓ 显示文件数量和大小
   ↓ 与用户确认

4. 执行处理
   ↓ 逐个/批量处理图片
   ↓ 显示进度
   ↓ 处理错误记录

5. 结果验证
   ↓ 检查输出文件
   ↓ 对比处理前后
   ↓ 生成处理报告
```

### Python 脚本模板（rembg）

```python
#!/usr/bin/env python3
"""
批量去除图片背景
"""
import os
import sys
from pathlib import Path
from rembg import remove
from PIL import Image
import concurrent.futures

def process_image(input_path, output_path, model='u2net'):
    """处理单张图片"""
    try:
        # 读取输入图片
        with open(input_path, 'rb') as f:
            input_data = f.read()

        # 去除背景
        output_data = remove(
            input_data,
            model_name=model,
            alpha_matting=True,  # 提升边缘质量
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
        )

        # 保存输出
        with open(output_path, 'wb') as f:
            f.write(output_data)

        return True, input_path
    except Exception as e:
        return False, f"{input_path}: {str(e)}"

def process_directory(input_dir, output_dir, recursive=False, pattern='*', model='u2net', max_workers=4):
    """批量处理目录"""
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # 支持的图片格式
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif'}

    # 扫描图片文件
    if recursive:
        files = [f for f in input_path.rglob(pattern) if f.suffix.lower() in image_extensions]
    else:
        files = [f for f in input_path.glob(pattern) if f.suffix.lower() in image_extensions]

    if not files:
        print(f"❌ 在 {input_dir} 中未找到图片文件")
        return

    print(f"📸 找到 {len(files)} 个图片文件")
    print(f"🎯 使用模型: {model}")
    print(f"⚙️  并发数: {max_workers}")
    print()

    # 并行处理
    success_count = 0
    failed_files = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        # 提交任务
        futures = []
        for file in files:
            # 保持目录结构
            relative_path = file.relative_to(input_path)
            out_file = output_path / relative_path.with_suffix('.png')
            out_file.parent.mkdir(parents=True, exist_ok=True)

            futures.append(executor.submit(process_image, file, out_file, model))

        # 收集结果
        for i, future in enumerate(concurrent.futures.as_completed(futures), 1):
            success, result = future.result()
            if success:
                print(f"✅ [{i}/{len(files)}] {result}")
                success_count += 1
            else:
                print(f"❌ [{i}/{len(files)}] {result}")
                failed_files.append(result)

    # 输出统计
    print()
    print("=" * 60)
    print(f"✨ 处理完成！")
    print(f"   成功: {success_count}/{len(files)}")
    print(f"   失败: {len(failed_files)}/{len(files)}")
    print(f"   输出目录: {output_dir}")
    print("=" * 60)

    if failed_files:
        print("\n失败的文件:")
        for f in failed_files:
            print(f"  - {f}")

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='批量去除图片背景')
    parser.add_argument('input', help='输入目录')
    parser.add_argument('output', help='输出目录')
    parser.add_argument('-r', '--recursive', action='store_true', help='递归处理子目录')
    parser.add_argument('-p', '--pattern', default='*', help='文件名模式（如 *.jpg）')
    parser.add_argument('-m', '--model', default='u2net',
                        choices=['u2net', 'u2netp', 'u2net_human_seg', 'u2net_cloth_seg', 'silueta', 'isnet-general-use', 'isnet-anime'],
                        help='使用的 AI 模型')
    parser.add_argument('-w', '--workers', type=int, default=4, help='并发处理数')

    args = parser.parse_args()

    process_directory(
        args.input,
        args.output,
        recursive=args.recursive,
        pattern=args.pattern,
        model=args.model,
        max_workers=args.workers
    )
```

### Bash 脚本模板（简化版）

```bash
#!/bin/bash
# 批量去除图片背景

INPUT_DIR="${1:-.}"
OUTPUT_DIR="${2:-./output}"
MODEL="${3:-u2net}"

# 检查 rembg 是否安装
if ! command -v rembg &> /dev/null; then
    echo "❌ rembg 未安装，请先运行："
    echo "   pip install rembg"
    exit 1
fi

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 处理图片
echo "📸 开始处理图片..."
echo "   输入目录: $INPUT_DIR"
echo "   输出目录: $OUTPUT_DIR"
echo "   使用模型: $MODEL"
echo

# 使用 rembg 批量处理
rembg p -m "$MODEL" "$INPUT_DIR" "$OUTPUT_DIR"

echo
echo "✨ 处理完成！"
```

## 可用的 AI 模型

| 模型名称 | 适用场景 | 特点 |
|---------|---------|------|
| `u2net` | 通用（推荐） | 平衡质量和速度 |
| `u2netp` | 快速处理 | 轻量级，速度快 |
| `u2net_human_seg` | 人物照片 | 专门优化人物分割 |
| `u2net_cloth_seg` | 服装商品 | 专门优化服装分割 |
| `silueta` | 人像艺术照 | 艺术化人像处理 |
| `isnet-general-use` | 高质量通用 | 质量最好，速度较慢 |
| `isnet-anime` | 动漫/插画 | 专门优化动漫风格 |

## 常见使用场景

### 场景 1：电商产品图
```bash
# 批量处理产品图，去除背景
python remove_bg.py ./products ./products_nobg -m u2net -w 8

# 或使用 rembg 命令
rembg p -m u2net ./products ./products_nobg
```

### 场景 2：人物证件照
```bash
# 使用人物分割模型
python remove_bg.py ./portraits ./portraits_nobg -m u2net_human_seg

# 添加纯色背景（如白色证件照）
for f in ./portraits_nobg/*.png; do
    convert "$f" -background white -alpha remove "${f%.png}_white.jpg"
done
```

### 场景 3：Logo 和图标
```bash
# 处理 logo 图标
python remove_bg.py ./logos ./logos_transparent -m u2net -w 4
```

### 场景 4：动漫/插画
```bash
# 使用动漫专用模型
python remove_bg.py ./anime ./anime_nobg -m isnet-anime
```

## 高级功能

### 1. 批处理优化

```python
# 使用 GPU 加速（需要 CUDA）
os.environ['U2NET_DEVICE'] = 'cuda'

# 调整批处理大小
batch_size = 10  # 根据显存调整
```

### 2. 边缘优化

```python
# Alpha Matting 参数调整
output_data = remove(
    input_data,
    model_name='u2net',
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,  # 前景阈值
    alpha_matting_background_threshold=10,   # 背景阈值
    alpha_matting_erode_size=10,            # 侵蚀尺寸
)
```

### 3. 后处理

```python
from PIL import Image, ImageFilter

# 羽化边缘
img = Image.open('output.png')
img = img.filter(ImageFilter.GaussianBlur(radius=1))
img.save('output_smooth.png')
```

### 4. 添加新背景

```python
from PIL import Image

def add_background(foreground_path, background_path, output_path):
    """添加新背景"""
    fg = Image.open(foreground_path).convert('RGBA')
    bg = Image.open(background_path).convert('RGBA')

    # 调整背景大小匹配前景
    bg = bg.resize(fg.size)

    # 合成
    result = Image.alpha_composite(bg, fg)
    result.save(output_path)
```

## 注意事项

### 环境要求
- Python 3.8+
- 建议使用虚拟环境
- GPU 版本需要 CUDA 支持

### 最佳实践
1. **首次使用**：模型会自动下载（约 170 MB），耐心等待
2. **大批量处理**：建议使用 GPU 加速，CPU 处理会较慢
3. **内存管理**：大图片处理时注意内存占用
4. **文件命名**：输出文件自动转换为 PNG 格式
5. **备份原文件**：处理前备份重要图片

### 常见问题

| 问题 | 解决方案 |
|-----|---------|
| rembg 安装失败 | 尝试 `pip install --upgrade pip` 后重试 |
| 模型下载慢 | 使用代理或手动下载模型文件 |
| 处理速度慢 | 使用 `u2netp` 模型或启用 GPU |
| 边缘有锯齿 | 启用 `alpha_matting=True` |
| 前景被误删 | 调整模型阈值或更换模型 |
| 内存不足 | 减少并发数或分批处理 |

### 质量检查

处理完成后建议检查：
1. ✅ 前景主体完整保留
2. ✅ 边缘平滑无锯齿
3. ✅ 透明通道正确
4. ✅ 无明显的颜色偏差
5. ✅ 文件大小合理

## 使用示例

### 快速开始

```bash
# 1. 安装 rembg
pip install rembg

# 2. 处理单个文件
rembg i input.jpg output.png

# 3. 批量处理目录
rembg p ./input_dir ./output_dir

# 4. 使用特定模型
rembg i -m u2net_human_seg portrait.jpg portrait_nobg.png
```

### 完整工作流

```bash
# 创建处理脚本
cat > process_images.py << 'EOF'
# [上面的 Python 脚本内容]
EOF

# 运行批量处理
python process_images.py \
  ./products \
  ./products_transparent \
  --recursive \
  --pattern "*.jpg" \
  --model u2net \
  --workers 8

# 验证结果
ls -lh ./products_transparent/
```

## 协作 Skill
- **ui-designer**：图片设计风格建议
- **frontend-architect**：图片在前端项目中的使用方案
- **devops-engineer**：自动化图片处理流程

## 参考资源
- [rembg GitHub](https://github.com/danielgatis/rembg)
- [remove.bg API 文档](https://www.remove.bg/api)
- [U2-Net 论文](https://arxiv.org/abs/2005.09007)
