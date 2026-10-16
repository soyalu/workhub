# Three standalone WorkHub assets (M1.3)

These illustrations are based on the user's three approved fantasy pictures, and they contain no UI labels.

| File | Placement |
|---|---|
| home-map.webp | Main floating-islands backdrop |
| traveler.webp | Traveler character portrait with preliminary alpha mask |
| sidebar-night.webp | Night-time left navigation illustration |

Install via: bash scripts/install-art.sh /path/to/workhub-artwork-m14.zip
Then: npm run art:verify

React owns all interactive labels, links and data. Do not use a complete dashboard screenshot as the artwork.
All three WebP binaries are now committed on feature/m1-ui-foundation. `npm run art:verify` checks SHA-256. The SVG map is kept as an explicit offline/failure fallback only.

## M1.6 人物场景

人物面板现在加载 `backgrounds/traveler-scene.webp` 单张不透明 RGB WebP。该图是**临时离线拼合**，并非用户认可的完整背景人物原画，禁止将其标记为“最终美术完成”。旧的 `traveler.webp` 为历史抠图源，不再由 React 人物区直接加载。

正式素材目录与检查标准详见 [素材盘点](../../../docs/m16-art-audit.md)。
