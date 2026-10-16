# M1.7 主线任务动态样板

使用 Motion 对主线任务地标执行悬停的弹性位移与横幅反馈，PixiJS v8 按需加载透明 Canvas 渲染金色粒子。其余六个地标暂不改动。点击仍由 React Router Link 负责，Canvas 不接受指针事件。

## 性能与无障碍

- 浏览器本地存储动效开关 `workhub.effects`。系统 `prefers-reduced-motion` 优先于此开关。
- 窗口不可见或地标离开视口时暂停 Pixi Ticker，React 卸载时销毁 Canvas/GL 资源；手机减少粒子数量。
- 动态导入 Pixi，不让页面其它功能依赖 WebGL。初始化失败时显示静态柔光。
- 保持七个地图节点、十个导航和全部 Mock/真实数据隔离约束。

## 后续验收

确认金色徽章的粒子密度、流速、触发反馈与原始美术一致后，才将特效推广到其他地标。Pixi 粒子只是运行样板，正式七地标 Sprite 仍应由独立美术素材制作。
