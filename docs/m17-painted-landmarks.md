# WorkHub M1.7 七地标独立美术装配

## 素材来源

使用用户已提供的透明图集 \`奇幻金蓝风格空白徽章标签图集.png\`，没有重新生成图像；有意保留原有魔法光晕。切分并校准了相邻地标之间的横幅尖角污染。

资源 ZIP 包包含：
- \`combined/{theme}.webp\`：7 张完整无文字地标，当前 React 使用，避免重组接缝；
- \`emblems/{theme}.webp\`：7 张独立魔法徽章，可用于单独动画或更换横幅；
- \`banners/{theme}.webp\`：7 张无文字蓝金横幅，可用于后续不同状态布局；
- \`manifest.json\`：21 张 WebP 的 SHA-256 校验记录。

主题名称为 \`quest, project, message, capture, side, calendar, growth\`。

## 安装

从本次 ChatGPT 会话下载 \`workhub-m17-seven-landmarks-art.zip\` 后，在仓库根目录：

\`\`\`bash
git switch feature/m1-7-landmark-art
python3 scripts/install-m17-landmarks.py ~/Downloads/workhub-m17-seven-landmarks-art.zip
git add frontend/public/art/landmarks/
git commit -m "art(m17): add seven painted interactive landmarks"
git push
\`\`\`

当前新分支在 ZIP 尚未安装时，会显示旧版 CSS 地标，不影响任何功能。图片安装完成后 React 自动切换正式美术，而名称、进度、跳转链接均为可编辑 DOM 文本。

## 技术与视觉验收

- 既有 PixiJS 持久化单 Canvas、七地标 Motion 交互均不调整；
- 桌面和 390px 移动端回归；
- 检查 7 张图片成功加载与 React 文案可见；
- 图片仅承载无文字的美术层，业务数据仍归 React；
- 可视化最终效果在用户安装二进制包并触发 CI 后人工确认；
- \`combined\` 是默认拼接无缝的资源，独立 \`emblems\` 与 \`banners\` 不被浪费，供后续互动图层更新。

注意：不因悬停或图像载入而虚构任务完成、成长等级或奖章领取。
