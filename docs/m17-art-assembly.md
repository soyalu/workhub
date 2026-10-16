# M1.7 图片与动态层集成

本轮拆分的 15 张透明 WebP 已作为独立下载的 ZIP 交付。由于二进制资源尚未提交到此 Git 分支，当前应用会回退到原有 Lucide/CSS 资源，确保业务功能可用。

## 一次性安装

1. 下载会话附件 \`workhub-m17-art-assets.zip\` 到本地。
2. 在本仓库根目录执行：

\`\`\`bash
python3 scripts/install-m17-assets.py ~/Downloads/workhub-m17-art-assets.zip
git add frontend/public/art
git commit -m "art(m17): add reviewed effect, badge and chest assets"
\`\`\`

脚本验证 15 个 WebP 的 RIFF 文件头及 manifest SHA-256。应用随后自动加载 \`/art/badges/*\` 和 \`/art/rewards/*\`。七色特效目前由 Pixi 程序绘制，已拆分的贴图可用于后续粒子贴图动画的进一步制作。

## 交互原则

- PIXI 始终只为冒险地图实例化一个 Canvas；悬停七地标只更新目标坐标和色调。
- 成长数值未接入真实业务数据，均展示 \`—\`，奖励只能展示 locked 状态。
- 后续通过后端已确认工作事件驱动 \`RewardChest\` 的 \`charging / available / claimed\` 状态，不能由鼠标悬停伪造解锁。
- 素材缺失时回退 Lucide 图标，角色与地图两个关键场景仍维持原有显式失败机制。
