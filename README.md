# WorkHub · 个人冒险工作台

> 把每天的工作组织成一段值得回顾的冒险。一次记录，多处复用；自动整理，人工确认。

WorkHub 是面向个人市场咨询与日常办公的工作台。以**项目机会和存量项目**为主线，串联客户咨询、会议交流、材料编写、招投标、任务、日历、打卡与工时；逐步形成每日工作日志、月度咨询记录和个人工作分析。

## 设计原则

- **低摩擦录入**：一句话或一份文件即可开始，不先要求填满表单。
- **事实完整性**：从可验证的上下文补全，缺少关键事实时精准追问，不编造时间、项目或工作成果。
- **待补充生命周期**：原始输入先暂存，逾期信息分级提醒和可恢复清理；未核实的信息不进入正式统计。
- **计划与实际分离**：会议计划不等于实际参加，打卡跨度不等于有效项目工时。
- **可追溯、可修改**：工作事件用于生成可校订的每日日志和月度咨询记录。
- **游戏化但实用**：首页采用奇幻冒险地图风格；内页延续视觉语言，但依据业务用途独立布局。

## M1 技术基线

| 部分 | 技术 | 作用 |
| --- | --- | --- |
| `frontend/` | React + TypeScript + Vite | Web 页面、交互和后续 Tauri 桌面壳 |
| `backend/` | Go 1.23+（标准库 net/http） | API、业务规则、后台任务和未来 SQLite 持久化 |
| 工程管理 | npm（仅管理前端）、Go Modules（管理后端） | 两端依赖独立管理、根脚本统一启动 |

**目前只实现工程基础**：前端仍是占位页面，后端提供 `GET /api/health`。SQLite、业务 API、智能录入、真实 AI、奇幻视觉素材迁移和 Tauri 封装尚未完成。

## 本地启动

要求：Node.js 22+、npm 10+、Go 1.23+。

```bash
git clone https://github.com/soyalu/workhub.git
cd workhub
npm install
npm run dev
```

- 前端：<http://127.0.0.1:5173>
- 后端：<http://127.0.0.1:3001>
- 健康检查：<http://127.0.0.1:3001/api/health>
- Vite 将前端的 `/api` 请求代理到 Go 服务，开发阶段无需跨域调用。

也可分别启动：

```bash
npm run dev:frontend
npm run dev:backend
```

后端默认监听本机地址。配置示例见 `backend/.env.example`；**Go 服务不会自动加载 .env 文件**，如需修改端口，请通过终端或部署环境设置，例如 `WORKHUB_PORT=3002 npm run dev:backend`，并同步调整 Vite 代理地址。

## 校验

```bash
npm run typecheck  # 前端 TS 检查、Go vet
npm run build      # 前端构建、Go 编译
npm test           # Go 后端测试
```

也可以执行 `go -C backend test ./...`、`go -C backend build ./...`。

## 目录

```text
workhub/
├── frontend/
│   └── src/                 # React 前端入口
├── backend/
│   ├── cmd/server/          # Go 服务启动入口
│   ├── internal/config/     # 环境变量和端口配置
│   ├── internal/httpapi/    # HTTP 路由与接口测试
│   ├── go.mod
│   └── .env.example
├── docs/
│   ├── architecture.md
│   └── roadmap.md
├── .editorconfig
├── .gitignore
└── package.json             # 前端工作区及项目脚本
```

## 后续里程碑

1. **M1**：工程初始化、基础检查和已确认的奇幻冒险 UI 迁移。
2. **M2**：Go 业务模型、SQLite、工作信息采集、上下文关联和待补全记录生命周期。
3. **M3**：日历、历史日志时间轴、日志确认、月度咨询工作记录。
4. **M4**：打卡工时、提醒、材料成果及工作分析。
5. **M5**：Tauri Mac 客户端、全局快捷录入、多端访问与可选 AI 增强。

详见 [架构设计](docs/architecture.md) 和 [开发路线](docs/roadmap.md)。

## 隐私与安全

仓库目前是**公开仓库**，禁止提交真实客户信息、公司内部材料、投标文件、个人工作日志、数据库、口令及密钥。正式接入 NAS / 多端访问前，需要单独实现鉴权、权限隔离、加密传输和备份策略。

## License

目前未授予开源许可证；公开访问不等同于允许他人使用和分发代码。
