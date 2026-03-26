# md2pic CLI 渲染工具实现方案

## 方案：Playwright + 系统 Chrome

---

## 一、方案原理

```
CLI (Node.js)
  │
  ├─ 读取 --md 文件、--config 文件
  │
  └─ playwright.launch({ channel: 'chrome' })   ← 复用系统已装的 Chrome，无需下载
       │
       └─ page.goto('file:///...markdown-to-images-v4.2.html')
            │
            ├─ waitForFunction: marked + html2canvas 就绪
            │
            ├─ page.evaluate(config, markdown)
            │     ├─ currentConfig = { ...DEFAULT, ...config }
            │     ├─ markdownInput.value = markdown
            │     ├─ applyConfig()        ← 同步控件值
            │     └─ updatePreview()      ← 触发分割 + 渲染所有卡片
            │
            ├─ 等待 applyStyles 内的 setTimeout(0) 完成（内容自动缩放）
            │
            └─ for i in previewCards:
                 page.locator('#canvas-{i}').screenshot({ path: 'image-01.png' })
                 ← 浏览器内核直接截元素，跳过 html2canvas，质量更高
```

**与 Puppeteer 方案的核心差异**：

| | Puppeteer | Playwright + 系统 Chrome |
|---|---|---|
| Chrome 来源 | 下载专属 Chromium (~200MB) | 复用系统已安装的 Chrome |
| arm64 Mac | Rosetta 转译，性能差 | 原生 arm64 Chrome，流畅 |
| 截图方式 | 页内执行 `html2canvas` 再传 base64 | `locator.screenshot()` 原生截元素 |
| 截图质量 | html2canvas 对复杂 CSS 有已知缺陷 | 浏览器内核直接渲染，无缺陷 |
| 依赖体积 | `playwright` + Chromium | `playwright` 仅库本身 |

---

## 二、目录结构

```
md2pic/
├── markdown-to-images-v4.2.html   # 原 HTML 工具（不修改）
├── render.js                       # CLI 入口
├── package.json
├── node_modules/
└── RENDER_PLAN.md                  # 本文档
```

---

## 三、环境要求

| 项目 | 要求 |
|---|---|
| Node.js | ≥ 18（推荐 v22，Playwright 要求） |
| Chrome | 系统已安装 Google Chrome 或 Chromium |
| 网络 | 首次运行需联网加载 Google Fonts（之后浏览器缓存生效） |
| OS | macOS / Linux / Windows 均支持 |

---

## 四、依赖安装

```bash
npm init -y
npm install playwright
```

> **不需要** `npx playwright install`——使用 `channel: 'chrome'` 时直接调用系统 Chrome，
> 无需 Playwright 下载自己的浏览器。

---

## 五、`render.js` 实现详解

### 5.1 命令行接口

```bash
node render.js --md <md文件路径> [--config <配置文件.json>] [--output <输出目录>] [--prefix <文件名前缀>] [--scale <缩放倍数>]
```

| 参数 | 默认值 | 说明 |
|---|---|---|
| `--md` | 必填 | Markdown 文件路径 |
| `--config` | 无（使用内置默认值） | 由 HTML 工具"导出配置"生成的 JSON |
| `--output` | `./output` | 图片输出目录（自动创建） |
| `--prefix` | `image` | 输出文件名前缀，如 `slide-01.png` |
| `--scale` | `2` | 截图缩放倍数，2 = 2× 高清 |

### 5.2 默认配置（对应 HTML 中 `currentConfig` 初始值）

```js
const DEFAULT_CONFIG = {
    aspectRatio:    '3:4',           // 小红书竖版
    fontFamily:     "'Noto Sans SC'",
    mdTheme:        'default',
    bgColor:        '#FFFFFF',
    borderColor:    '#C9A88C',
    frameTheme:     'rounded-shadow',
    borderWidth:    4,
    maxChars:       500,
    splitMethod:    'auto',          // auto | manual | heading
    baseFontSize:   14,
    lineHeight:     1.8,
    textureOverlay: 'none',
    firstPageCover: false,
    watermarkText:  ''
};
```

### 5.3 关键时序

```
page.goto(html)
  └─ waitForFunction(() => typeof marked !== 'undefined'
                        && typeof html2canvas !== 'undefined')
       │
       └─ page.evaluate(inject)           // 注入配置 + 内容
            │
            ├─ updatePreview() 调用链：
            │    updatePreview()
            │      → splitMarkdown()         // 按 maxChars/method 分割
            │      → renderPreviewCards()    // 生成所有 #canvas-{i} DOM
            │      → applyStyles()           // 计算宽高、相框、内容缩放
            │           └─ setTimeout(0)     // 等待 scrollHeight 稳定
            │
            └─ 返回 previewCards.length
                 │
                 └─ await page.waitForTimeout(600)   // 等待所有 setTimeout(0) 完成
                      │
                      └─ for i in [0, pageCount):
                           locator = page.locator(`#canvas-${i}`)
                           await locator.waitFor({ state: 'visible' })
                           await locator.screenshot({
                               path: `output/image-01.png`,
                               scale: 'device',         // 使用设备像素比
                               animations: 'disabled'   // 禁用动画避免截图抖动
                           })
```

### 5.4 `locator.screenshot()` vs `html2canvas`

原 HTML 工具用 `html2canvas` 的原因是：它需要把 DOM 渲染成可以被 JS 操作的 Canvas 对象（用于打包 ZIP）。

CLI 工具不需要这个限制——可以让 Playwright 直接对元素截图：

```js
// Playwright 原生截图（推荐）
await page.locator(`#canvas-${i}`).screenshot({
    path: outputPath,
    scale: 'device',        // 等价于 html2canvas scale:2（取决于设备像素比）
    animations: 'disabled',
});

// 或等价的 html2canvas 方式（备选，与 UI 工具完全一致）
const base64 = await page.evaluate(async (i) => {
    const el = document.getElementById(`canvas-${i}`);
    const c = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
    return c.toDataURL('image/png').split(',')[1];
}, i);
fs.writeFileSync(outputPath, Buffer.from(base64, 'base64'));
```

**推荐用 `locator.screenshot()`**，原因：
- `html2canvas` 对 `mix-blend-mode`、`backdrop-filter`、CSS 渐变等有已知渲染缺陷
- Playwright 截图直接调用 Chrome DevTools Protocol 的 `Page.captureScreenshot`，与用户在浏览器中看到的完全一致

---

## 六、完整 `render.js` 代码

```js
#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');
const fs   = require('fs');

// ── 参数解析 ──────────────────────────────────────────────────────────────────
function parseArgs() {
    const args = process.argv.slice(2);
    const opts = { md: null, config: null, output: './output', prefix: 'image', scale: 2 };
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--md':     opts.md     = args[++i]; break;
            case '--config': opts.config = args[++i]; break;
            case '--output': opts.output = args[++i]; break;
            case '--prefix': opts.prefix = args[++i]; break;
            case '--scale':  opts.scale  = Number(args[++i]); break;
            case '--help': case '-h':
                console.log(`
用法: node render.js --md <file.md> [--config <cfg.json>] [--output <dir>] [--prefix <name>] [--scale <n>]
`);
                process.exit(0);
        }
    }
    return opts;
}

// ── 默认配置 ──────────────────────────────────────────────────────────────────
const DEFAULT_CONFIG = {
    aspectRatio: '3:4', fontFamily: "'Noto Sans SC'", mdTheme: 'default',
    bgColor: '#FFFFFF', borderColor: '#C9A88C', frameTheme: 'rounded-shadow',
    borderWidth: 4, maxChars: 500, splitMethod: 'auto',
    baseFontSize: 14, lineHeight: 1.8, textureOverlay: 'none',
    firstPageCover: false, watermarkText: ''
};

// ── 主流程 ────────────────────────────────────────────────────────────────────
async function main() {
    const opts = parseArgs();

    if (!opts.md) { console.error('❌ 请指定 --md 参数'); process.exit(1); }

    const mdPath = path.resolve(opts.md);
    if (!fs.existsSync(mdPath)) { console.error(`❌ 文件不存在: ${mdPath}`); process.exit(1); }

    const markdown = fs.readFileSync(mdPath, 'utf-8');

    // 加载配置
    let userConfig = {};
    if (opts.config) {
        const cfgPath = path.resolve(opts.config);
        if (!fs.existsSync(cfgPath)) { console.error(`❌ 配置文件不存在: ${cfgPath}`); process.exit(1); }
        userConfig = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
        console.log(`📄 配置文件: ${cfgPath}`);
    } else {
        console.log('⚙️  使用默认配置');
    }
    const config = { ...DEFAULT_CONFIG, ...userConfig };

    // 输出目录
    const outputDir = path.resolve(opts.output);
    fs.mkdirSync(outputDir, { recursive: true });

    // HTML 路径
    const htmlPath = path.join(__dirname, 'markdown-to-images-v4.2.html');
    if (!fs.existsSync(htmlPath)) {
        console.error('❌ 找不到 markdown-to-images-v4.2.html');
        process.exit(1);
    }

    console.log('🚀 启动 Chrome...');
    const browser = await chromium.launch({
        channel: 'chrome',          // 使用系统 Chrome
        headless: true,
    });

    try {
        const context = await browser.newContext({
            viewport: { width: 1400, height: 900 },
            deviceScaleFactor: opts.scale,   // 控制截图分辨率倍数
        });
        const page = await context.newPage();

        // 允许 file:// 访问本地文件（字体、纹理等）
        await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });

        // 等待核心库加载完成
        await page.waitForFunction(
            () => typeof window.marked !== 'undefined' && typeof window.html2canvas !== 'undefined',
            { timeout: 30_000 }
        );
        console.log('✅ HTML 工具就绪');

        // 注入配置 + Markdown，触发渲染
        const pageCount = await page.evaluate(
            ({ config, markdown }) => {
                currentConfig = { ...currentConfig, ...config };
                document.getElementById('markdownInput').value = markdown;
                applyConfig();
                updatePreview();
                return previewCards.length;
            },
            { config, markdown }
        );

        if (pageCount === 0) {
            console.warn('⚠️  无内容可渲染，请检查 Markdown 文件');
            return;
        }
        console.log(`🖼️  共 ${pageCount} 页，开始导出...`);

        // 等待 applyStyles 内 setTimeout(0) 完成（内容自适应缩放）
        await page.waitForTimeout(600);

        // 逐张截图
        for (let i = 0; i < pageCount; i++) {
            const locator = page.locator(`#canvas-${i}`);
            await locator.waitFor({ state: 'visible' });

            const paddedNum = String(i + 1).padStart(2, '0');
            const filePath  = path.join(outputDir, `${opts.prefix}-${paddedNum}.png`);

            await locator.screenshot({
                path: filePath,
                animations: 'disabled',   // 冻结动画，避免截图抖动
            });

            console.log(`  ✅ [${i + 1}/${pageCount}] ${path.basename(filePath)}`);
        }

        console.log(`\n🎉 导出完成 → ${outputDir}`);

    } finally {
        await browser.close();
    }
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
```

---

## 七、package.json

```json
{
  "name": "md2pic-render",
  "version": "1.0.0",
  "type": "commonjs",
  "scripts": {
    "render": "node render.js"
  },
  "dependencies": {
    "playwright": "^1.44.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 八、使用示例

```bash
# 1. 安装依赖
npm install

# 2. 最简使用（默认配置 + 默认输出目录 ./output）
node render.js --md article.md

# 3. 指定配置文件
node render.js --md article.md --config my_style.json

# 4. 指定输出目录和文件名前缀
node render.js --md article.md --config my_style.json --output ./pics --prefix slide

# 5. 3× 高清导出
node render.js --md article.md --scale 3 --output ./hd-pics
```

输出结果：
```
./output/
  image-01.png
  image-02.png
  image-03.png
  ...
```

---

## 九、常见问题

### Q1：`channel: 'chrome'` 找不到 Chrome

Playwright 按以下路径查找系统 Chrome：

- **macOS**：`/Applications/Google Chrome.app`
- **Linux**：`/usr/bin/google-chrome` 或 `/usr/bin/chromium-browser`
- **Windows**：`%PROGRAMFILES%\Google\Chrome\Application\chrome.exe`

若系统 Chrome 路径非标准，可改为：
```js
const browser = await chromium.launch({
    executablePath: '/path/to/chrome',   // 手动指定
    headless: true,
});
```

或安装 Playwright 自己的 Chromium（仅需一次）：
```bash
npx playwright install chromium
# 然后代码改为不传 channel，直接 chromium.launch({ headless: true })
```

### Q2：字体显示为系统默认字体（方块 / 降级）

首次运行需联网加载 Google Fonts。加载过一次后浏览器 Profile 会缓存，后续离线也可使用。

若需完全离线：
1. 下载字体文件（`.ttf` / `.woff2`）到本地
2. 修改 HTML 头部的 `<link>` 为本地 `@font-face`

### Q3：`waitUntil: 'networkidle'` 超时

网络较慢时 Google Fonts 加载可能超时。两种解法：

```js
// 方案A：改为 domcontentloaded，等字体用单独 waitForTimeout
await page.goto('file://' + htmlPath, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);   // 给字体加载留时间

// 方案B：拦截字体请求，使用系统字体替代（完全离线）
await context.route('**fonts.googleapis.com**', route => route.abort());
await context.route('**fonts.gstatic.com**', route => route.abort());
```

### Q4：截图内容被截断（文字溢出）

原 HTML 的 `applyStyles()` 会在 `setTimeout(0)` 后对超出内容自动缩放，若 `waitForTimeout(600)` 不够，可适当加大：

```js
await page.waitForTimeout(1000);
```

或改为等待所有 `.preview-content` 的 `style.transform` 属性稳定：

```js
await page.waitForFunction(() =>
    document.querySelectorAll('.preview-content').length > 0
);
```

### Q5：批量处理多个 md 文件

```js
// 复用同一个 browser / page 实例，只重复 evaluate + screenshot 部分
for (const mdFile of mdFiles) {
    const markdown = fs.readFileSync(mdFile, 'utf-8');
    const pageCount = await page.evaluate(...);
    // ... 截图 ...
}
```

---

## 十、渲染流程图（完整）

```
┌─────────────────────────────────────────────────────────┐
│  CLI 入口 render.js                                      │
│                                                          │
│  parseArgs()  →  读取 .md 文件  →  读取 config.json      │
│                       │                   │              │
│               markdown: string    config: object         │
└───────────────────────┬───────────────────┘──────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  Playwright chromium.launch({ channel: 'chrome' })       │
│                                                          │
│  page.goto('file:///markdown-to-images-v4.2.html')       │
│    └─ waitForFunction: marked + html2canvas 就绪          │
│                                                          │
│  page.evaluate(config, markdown):                        │
│    currentConfig = { ...DEFAULT, ...config }             │
│    markdownInput.value = markdown                        │
│    applyConfig()   ← 同步所有控件 DOM 值                  │
│    updatePreview()                                       │
│      ├─ splitMarkdown()    ← 按 maxChars/method 分割     │
│      ├─ renderPreviewCards()  ← 生成 #canvas-{i} 元素    │
│      └─ applyStyles()      ← 宽高/相框/内容缩放           │
│           └─ setTimeout(0) ← 等 scrollHeight 稳定        │
│                                                          │
│  waitForTimeout(600ms)                                   │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  for i = 0 .. pageCount-1:                               │
│    locator = page.locator('#canvas-{i}')                 │
│    locator.screenshot({ path, animations: 'disabled' })  │
│      └─ Chrome DevTools Protocol → PNG bytes             │
│    fs.writeFileSync(outputDir/image-{i+1}.png)           │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
              output/image-01.png
              output/image-02.png
              output/image-03.png  ...
```
