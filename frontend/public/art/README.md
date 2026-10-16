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
