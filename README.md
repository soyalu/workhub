# WorkHub · 个人冒险工作台

> 把每天的工作组织成一段值得回顾的冒险。个人使用优先：一次记录，多处复用；自动整理，人工确认。

WorkHub 是面向个人市场咨询与日常办公的工作台。以**项目机会和存量项目**为业务主线，串联咨询交流、材料编写、招投标、会议、日程、打卡与工时；基于真实的工作记录形成每日工作日志、月度咨询记录和个人工作分析。

## 产品设计原则

- **低摩擦录入**：随手一句话，不要求先选择模块或填写整张表单。
- **信息有效性**：上下文可验证时自动关联；缺少关键事实时精准追问，不编造会议主题、发生时间或工作成果。
- **待补充生命周期**：保留原始输入，待补充信息限期提醒与可恢复清理；未核实的信息不进入正式日志或统计。
- **计划与事实分离**：日历安排不等于实际参与；上下班打卡跨度不等于有效项目工时。
- **可追溯与可修改**：每日日志自动生成草稿，用户可校订确认；月度咨询记录基于有效工作事件归集。
- **游戏化而不增加负担**：以奇幻冒险作为视觉与成长反馈语言，内页根据业务功能分别设计，不复制首页大地图版式。

## 技术栈（M1 工程基础）

| 部分 | 技术 | 职责 |
| --- | --- | --- |
| `frontend/` | React + TypeScript + Vite | 浏览器界面、日历、日志、智能录入交互 |
| `backend/` | Node.js + TypeScript + Fastify | API、业务规则、持久化与未来自动化 |
| Monorepo | npm Workspaces | 前后端独立开发、统一脚本 |

**当前仅为工程骨架**：前端页面是功能入口占位，后端提供 `GET /api/health`。SQLite 数据持久化、真实 AI 处理、业务 API、正式视觉资产和 Tauri 桌面封装尚未实现。

## 快速启动

要求：Node.js 22+、npm 10+。

```bash
git clone https://github.com/soyalu/workhub.git
cd workhub
npm install
cp backend/.env.example backend/.env
npm run dev
```

- Web：<http://localhost:5173>
- API 健康检查：<http://127.0.0.1:3001/api/health>
- 前端通过 Vite 的 `/api` 开发代理访问后端。

```bash
npm run typecheck
npm run build
npm test
```

也可以分别执行 `npm run dev:frontend`、`npm run dev:backend`。

## 仓库结构

```text
workhub/
├── frontend/            # React 前端
│   └── src/
│       └── lib/          # API 访问与未来通用工具
├── backend/             # Fastify 后端
│   ├── src/
│   │   └── routes/       # HTTP API
│   └── test/             # 后端测试
├── docs/
│   ├── architecture.md   # 边界、关键数据对象和约束
│   └── roadmap.md        # 分阶段交付计划
├── .editorconfig
├── .gitignore
└── package.json          # npm workspaces
```

## 后续阶段

1. **M1**：工程初始化、最小可运行前后端、研发规范和基础视觉体系。
2. **M2**：项目、任务、工作事件、原始输入与待补充信息生命周期；SQLite 持久化。
3. **M3**：日历与历史日志时间轴、快速跳转、日志生成/编辑/确认及月度咨询记录。
4. **M4**：打卡工时、日程提醒、分析和成果沉淀。
5. **M5**：Tauri Mac 桌面端、系统快捷录入、移动端及可选 AI 增强。

详见 [架构设计](docs/architecture.md) 与 [实施路线](docs/roadmap.md)。

## 隐私与安全

本仓库为公开仓库。**不要提交真实客户信息、公司内部材料、投标文件、个人工作日志、数据库文件、密钥或访问令牌。** `.env`、本地数据库、数据文件和构建输出均应排除版本控制。后续接入 NAS 或外部平台时，须独立设计身份认证、访问控制与备份。

## License

暂未选择开源许可证。仓库公开不代表授予他人使用、复制或分发代码的开源许可。
