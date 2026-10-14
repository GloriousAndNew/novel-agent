# 叙事 · Novel Agent

把经历、梗概和零散想法整理成故事方案，再写成可编辑的中文短篇小说。

在线工作台：https://storyloom-novel-20261014.nicefrost32.chatgpt.site （私有访问）。

## 功能

- 素材输入、风格与篇幅选择、虚构边界设置。
- DeepSeek 生成故事方案，确认人物与情节后生成正文。
- 按要求修改正文、阅读预览、浏览器自动保存与版本恢复。
- TXT 小说导出、创作与修改指令导出。
- 密钥仅保存在服务端，生成失败保留原稿。

完整示例为预写内容。生成请求会将素材和方案发送给 DeepSeek；浏览器草稿不跨设备同步。

## 本地运行

需要 Node.js 22.13 或更新版本。

无依赖预览：在当前进程设置 DEEPSEEK_API_KEY 后运行：

```sh
node preview.mjs
```

打开 http://127.0.0.1:4173。没有配置密钥时仍可体验编辑和示例流程。

Windows 已有系统变量 deepseek 时，可在 PowerShell 中映射后运行：

```powershell
$env:DEEPSEEK_API_KEY = [Environment]::GetEnvironmentVariable('deepseek', 'Machine')
node preview.mjs
```

框架构建与检查：

```sh
npm ci
node scripts/run-framework.mjs build
node node_modules/typescript/bin/tsc --noEmit
node --test tests/story.test.mjs
```

## 项目结构

| 路径 | 用途 |
| --- | --- |
| public/workspace.html | 工作台页面 |
| public/style.css | 响应式样式 |
| public/app.js | 编辑、保存、历史与导出 |
| public/model.js | 模型连接、生成与修改交互 |
| lib/story-api.mjs | 服务端 DeepSeek 调用、校验与错误处理 |
| build/sites-worker.ts | Sites / Cloudflare Worker 请求入口 |
| app/route.ts | 首页响应 |
| tests/story.test.mjs | API 边界与失败处理测试 |

部署使用 Vinext、Vite 和 Sites / Cloudflare Workers。服务端秘密变量为 DEEPSEEK_API_KEY，模型为 deepseek-flash。.openai/hosting.json 包含当前 Sites 项目身份；复用此项目时保留，创建独立站点时应绑定新的身份。

不要提交 API 密钥、环境变量文件、依赖目录、构建产物或本地运行状态。
