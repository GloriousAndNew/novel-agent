# 叙事 · 文字转小说

当前版本：Vinext 服务端 + 简约创作工作台。页面源文件为 public/workspace.html、public/app.js、public/model.js 和 public/style.css。

支持素材、风格、篇幅、虚构边界、事实档案、可编辑人物与大纲、正文编辑、阅读预览、版本恢复、浏览器自动保存、TXT 导出与模型指令导出。

完整示例为预写内容。DeepSeek 通过 /api/story 提供方案构思、正文生成与按要求修改；/api/model 仅返回配置状态和模型名称。失败时保留原稿，成功替换前保存版本。

部署密钥：DEEPSEEK_API_KEY，由 Sites 环境变量秘密保存。本机 Windows 的 deepseek 环境变量为配置来源。模型默认 deepseek-flash。密钥不进入前端、源码或 hosting.json。保留平台私有访问策略，并拒绝跨站生成请求。

草稿保存在当前浏览器，版本最多保留 10 个，不跨设备同步。生成时将创作数据发送至 DeepSeek。
