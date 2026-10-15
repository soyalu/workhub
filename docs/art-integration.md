# M1.3.1 · Bitmap Artwork Integration

The earlier M1.3 homepage had an **SVG-engineered illustration**, which did not meet the approved rich fantasy concept. This iteration changes the page to prefer standalone bitmap art:

- \`frontend/public/art/home-map.webp\`: scenic floating-island illustration;
- \`frontend/public/art/traveler.webp\`: traveler portrait;
- \`frontend/public/art/adventure-world.svg\`: fallback **only if the bitmap is absent**.

React still renders all interactive text, navigation, buttons and data as accessible HTML. Art and UI must remain separate.

## Current asset delivery

The ChatGPT preview bundle \`workhub-fantasy-art-preview.zip\` contains \`assets/home-map.webp\`, \`assets/traveler.webp\`, \`index.html\` and \`install-art.sh\`. The binary files were created in the assistant workspace but **could not be directly committed by the text-only GitHub file operation**. Consequently, until they are copied into the repository checkout, the browser will still show the fallback SVG.

### Install into a local clone

\`\`\`bash
unzip workhub-fantasy-art-preview.zip -d workhub-art-preview
bash workhub-art-preview/install-art.sh /absolute/path/to/workhub
cd /absolute/path/to/workhub
npm ci
npm run dev
git add frontend/public/art/home-map.webp frontend/public/art/traveler.webp
git commit -m "assets(ui): add bitmap fantasy artwork"
git push origin feature/m1-ui-foundation
\`\`\`

Verify the actual runtime screenshot (desktop and mobile) before merging PR #1.

## Important quality caveat

The first-generation concept images contain baked-in labels and panels. The extracted scenic illustration is therefore a **review asset**, not final production artwork. HTML overlays can partially obscure baked-in artwork but cannot make it a clean source. A dedicated text-free, controls-free fantasy landscape should replace this review image. Character portrait should also be delivered as an independent high-resolution asset. Do not declare M1.3 visually accepted before that replacement and a side-by-side screenshot review.
