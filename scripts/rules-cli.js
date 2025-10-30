#!/usr/bin/env node
// Minimal, dependency-free CLI to scaffold frontend rules selections
// Usage: node scripts/rules-cli.js [--project solo|team] [--quality high|medium|low]
//        [--variants i18n,less,responsive] [--preset <name>] [--dest <path>] [--yes]
//        [--list] [--help]

const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const readline = require('readline')

const REPO_ROOT = path.resolve(__dirname, '..')
const FRONTEND_RULES_DIR = path.join(REPO_ROOT, 'frontend', 'rules')
const PRESETS_DIR = path.join(FRONTEND_RULES_DIR, 'presets')
const PRESETS_INDEX = path.join(PRESETS_DIR, 'index.json')

function parseArgs(argv) {
  const args = {}
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help' || a === '-h') args.help = true
    else if (a === '--list') args.list = true
    else if (a === '--yes' || a === '-y') args.yes = true
    else if (a === '--project') args.project = argv[++i]
    else if (a === '--quality') args.quality = argv[++i]
    else if (a === '--variants') args.variants = argv[++i]
    else if (a === '--preset') args.preset = argv[++i]
    else if (a === '--dest') args.dest = argv[++i]
    else {
      // ignore unknown positional for simplicity
    }
  }
  if (typeof args.variants === 'string') {
    args.variants = args.variants
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  } else if (!args.variants) {
    args.variants = []
  }
  return args
}

function printHelp() {
  console.log(`Rules CLI\n\n` +
    `Usage:\n  node scripts/rules-cli.js [options]\n\n` +
    `Options:\n` +
    `  --project solo|team\n` +
    `  --quality high|medium|low\n` +
    `  --variants i18n,less,responsive\n` +
    `  --preset <name>            # override by preset name (from presets/index.json)\n` +
    `  --dest <path>              # destination folder (default ./ai-rules or timestamped)\n` +
    `  --yes                      # overwrite without prompt when applicable\n` +
    `  --list                     # list available presets\n` +
    `  --help                     # show help\n`)
}

async function readJSON(file) {
  const buf = await fsp.readFile(file, 'utf-8')
  return JSON.parse(buf)
}

async function listAvailablePresets() {
  const index = await readJSON(PRESETS_INDEX)
  // index.json expected to map or list; normalize to array of names
  const names = Array.isArray(index) ? index : Object.keys(index || {})
  const files = await fsp.readdir(PRESETS_DIR)
  const md = files.filter(f => f.endsWith('.md'))
  return { names, files: md }
}

function normalizeVariantSuffix(variants) {
  const vset = new Set(variants.map(v => v.toLowerCase()))
  const order = ['less', 'i18n', 'responsive']
  const present = order.filter(v => vset.has(v))
  return present.length ? '-' + present.join('-') : ''
}

function buildPresetCandidates(project, quality, variants) {
  const base = `${project}-${quality}`
  const suffix = normalizeVariantSuffix(variants)
  const candidates = []
  if (suffix) candidates.push(`${base}${suffix}.md`)
  // try individual variants if combined not found
  const v = variants.map(v => v.toLowerCase())
  for (const one of v) candidates.push(`${base}-${one}.md`)
  // fallback to plain
  candidates.push(`${base}.md`)
  return candidates
}

async function matchPreset({ preset, project, quality, variants }) {
  const { files } = await listAvailablePresets()
  if (preset) {
    const direct = preset.endsWith('.md') ? preset : `${preset}.md`
    if (files.includes(direct)) return path.join(PRESETS_DIR, direct)
    throw new Error(`指定的预设不存在: ${preset}`)
  }
  const candidates = buildPresetCandidates(project, quality, variants)
  for (const c of candidates) {
    if (files.includes(c)) return path.join(PRESETS_DIR, c)
  }
  throw new Error(`未找到匹配的预设（尝试: ${candidates.join(', ')}）`)
}

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true })
}

function timestamp() {
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) + '-' +
    pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds())
  )
}

async function resolveDest(destOpt, yesFlag) {
  const cwd = process.cwd()
  if (destOpt) {
    const dest = path.resolve(cwd, destOpt)
    const exists = fs.existsSync(dest)
    if (exists && !yesFlag) {
      const ok = await confirm(`目标目录已存在，继续可能覆盖文件：${dest}\n是否继续? [y/N] `)
      if (!ok) process.exit(1)
    }
    await ensureDir(dest)
    return dest
  }
  const base = path.resolve(cwd, 'ai-rules')
  if (!fs.existsSync(base)) {
    await ensureDir(base)
    return base
  }
  const withTs = path.resolve(cwd, `ai-rules-${timestamp()}`)
  await ensureDir(withTs)
  return withTs
}

async function confirm(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const answer = await new Promise(resolve => rl.question(message, ans => { rl.close(); resolve(ans) }))
  return /^y(es)?$/i.test(String(answer).trim())
}

async function promptSelect(prompt, options) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const menu = options.map((o, i) => `${i + 1}) ${o}`).join('\n')
  const answer = await new Promise(resolve => rl.question(`${prompt}\n${menu}\n> `, ans => { rl.close(); resolve(ans) }))
  const idx = parseInt(String(answer).trim(), 10)
  if (Number.isNaN(idx) || idx < 1 || idx > options.length) return options[0]
  return options[idx - 1]
}

async function promptMulti(prompt, options) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const menu = options.map((o, i) => `${i + 1}) ${o}`).join('\n')
  const answer = await new Promise(resolve => rl.question(`${prompt}（逗号分隔，可留空）\n${menu}\n> `, ans => { rl.close(); resolve(ans) }))
  const picks = String(answer).split(',').map(s => s.trim()).filter(Boolean)
  const result = []
  for (const p of picks) {
    const idx = parseInt(p, 10)
    if (!Number.isNaN(idx) && idx >= 1 && idx <= options.length) result.push(options[idx - 1])
  }
  return result
}

async function copyFileTo(src, destDir, destName) {
  await ensureDir(destDir)
  const dest = path.join(destDir, destName || path.basename(src))
  await fsp.copyFile(src, dest)
}

async function copyDirTo(srcDir, destDir) {
  await ensureDir(destDir)
  const entries = await fsp.readdir(srcDir, { withFileTypes: true })
  for (const ent of entries) {
    const s = path.join(srcDir, ent.name)
    const d = path.join(destDir, ent.name)
    if (ent.isDirectory()) {
      await copyDirTo(s, d)
    } else {
      await fsp.copyFile(s, d)
    }
  }
}

async function generateReadme(dest, summary) {
  const content = `# AI 前端规则集\n\n` +
  `选择摘要：\n- 项目类型：${summary.project}\n- 质量级别：${summary.quality}\n- 预设：${summary.presetName}\n- 变体：${summary.variants.join(', ') || '无'}\n\n` +
  `目录结构：\n\n` +
  `- base/\n- quality-level/\n- project-type.md\n- preset.md\n\n` +
  `下一步：\n- 将 ESLint/TS 配置应用到项目根目录\n- 参照 preset.md 与 base/* 在项目中落地规则\n`
  await fsp.writeFile(path.join(dest, 'README.md'), content, 'utf-8')
}

async function run() {
  const args = parseArgs(process.argv)
  if (args.help) return printHelp()

  if (args.list) {
    const { files } = await listAvailablePresets()
    console.log('可用预设:')
    files.forEach(f => console.log(' -', f.replace(/\.md$/, '')))
    return
  }

  // interactive fallbacks
  const project = (args.project || (await promptSelect('选择项目类型：', ['solo', 'team']))).toLowerCase()
  const quality = (args.quality || (await promptSelect('选择质量级别：', ['high', 'medium', 'low']))).toLowerCase()
  let variants = args.variants && args.variants.length ? args.variants : await promptMulti('选择预设变体（可多选）：', ['less', 'i18n', 'responsive'])
  variants = variants.map(v => v.toLowerCase())

  let presetPath
  try {
    presetPath = await matchPreset({ preset: args.preset, project, quality, variants })
  } catch (e) {
    console.error(String(e.message || e))
    const { files } = await listAvailablePresets()
    const picked = await promptSelect('未匹配到组合，手动选择预设：', files)
    presetPath = path.join(PRESETS_DIR, picked)
  }

  const dest = await resolveDest(args.dest, !!args.yes)

  // Copy base rules
  const baseSrc = path.join(FRONTEND_RULES_DIR, 'base')
  const baseDest = path.join(dest, 'base')
  await copyDirTo(baseSrc, baseDest)

  // Copy quality-level config files
  const qlSrc = path.join(FRONTEND_RULES_DIR, 'quality-level')
  const qlDest = path.join(dest, 'quality-level')
  await ensureDir(qlDest)
  const qlFiles = await fsp.readdir(qlSrc)
  const qlMatches = qlFiles.filter(f => f.toLowerCase().startsWith(quality))
  for (const f of qlMatches) {
    await copyFileTo(path.join(qlSrc, f), qlDest)
  }

  // Copy project-type file
  const ptSrc = path.join(FRONTEND_RULES_DIR, 'project-type', `${project}.md`)
  await copyFileTo(ptSrc, dest, 'project-type.md')

  // Copy preset as preset.md
  await copyFileTo(presetPath, dest, 'preset.md')

  // README summary
  await generateReadme(dest, {
    project,
    quality,
    presetName: path.basename(presetPath).replace(/\.md$/, ''),
    variants,
  })

  console.log('\n✅ 规则生成完成：', dest)
  console.log('包含：base/, quality-level/, project-type.md, preset.md, README.md')
}

run().catch(err => {
  console.error('❌ 执行失败：', err && err.stack ? err.stack : String(err))
  process.exit(1)
})


