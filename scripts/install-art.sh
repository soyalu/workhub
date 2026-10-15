#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ZIP="$1"
if [[ ! -f "$ZIP" ]]; then echo "Specify workhub-artwork-m14.zip" >&2; exit 2; fi
TARGET="$ROOT/frontend/public/art"
mkdir -p "$TARGET"
for name in home-map.webp traveler.webp sidebar-night.webp; do
  unzip -p "$ZIP" "$name" > "$TARGET/$name" || exit 1
done
(cd "$ROOT" && npm run art:verify)
echo "Artwork installed. Commit the WebP files into GitHub from your checkout."
