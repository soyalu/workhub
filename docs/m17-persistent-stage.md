# M1.7 持久化动效舞台 · 开发说明

- 一个冒险地图只装配一个 PixiJS Application、一个透明 Canvas；在七地标之间切换只更新粒子色调及中心坐标，不销毁渲染器。
- 该 Canvas 与 DOM 导航互相隔离，pointer-events:none。React Router 保留完整键盘与鼠标导航。
- 系统减少动态效果或用户主动关闭时，不挂载 Pixi；WebGL 不支持则显示 CSS 静态柔光。
- ResizeObserver 处理地图尺寸，IntersectionObserver、document.visibilityState 控制暂停，卸载时清理。
- 成就、宝箱的业务事件尚无权威后端来源，因此当前只能显示未计算、未解锁状态；真实工作事件接入后再触发奖励动画。

## 本轮提供的 15 张真实美术资源

图集已作为独立透明 WebP 打包，在交付 ZIP 的 effects/ badges/ rewards/ 下。由于这些二进制图像尚未上传至 Git 仓库，前端必须有无资源时的 SVG/CSS 降级机制。安装时把 ZIP 中对应目录复制到 frontend/public/art/ 下，文件名与 README 一致，随后进行视觉验收。

静态粒子贴图不是动画帧；其移动/闪烁由 PixiJS/Motion 完成。未将未解锁宝箱绘成“已领取”。
