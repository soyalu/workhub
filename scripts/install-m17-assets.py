#!/usr/bin/env python3
"""Install reviewed M1.7 transparent art assets from the conversation ZIP.

Usage: python3 scripts/install-m17-assets.py /path/to/workhub-m17-art-assets.zip
No Pillow dependency needed: reads RIFF headers and checks bundled SHA-256.
"""
from __future__ import annotations
import hashlib
import json
from pathlib import Path
import sys
from zipfile import ZipFile, BadZipFile

EXPECTED = {
    "effects/main-quest-gold.webp", "effects/project-blue.webp",
    "effects/inbox-red.webp", "effects/calendar-orange.webp",
    "effects/capture-purple.webp", "effects/side-quest-amber.webp",
    "effects/growth-cyan.webp", "badges/energy.webp",
    "badges/streak.webp", "badges/progress.webp",
    "badges/achievements.webp", "rewards/chest-closed.webp",
    "rewards/chest-charged.webp", "rewards/chest-opened.webp",
    "rewards/chest-large.webp",
}
ROOT = Path(__file__).resolve().parents[1] / "frontend" / "public" / "art"

def install(path: Path) -> None:
    with ZipFile(path) as z:
        if "manifest.json" not in z.namelist():
            raise ValueError("缺少 manifest.json")
        manifest = json.loads(z.read("manifest.json"))
        records = {it["file"]: it for it in manifest["items"]}
        if set(records) != EXPECTED:
            raise ValueError("素材清单不等于预期的 15 个文件")
        verified = []
        for name in sorted(EXPECTED):
            payload = z.read(name)
            if payload[:4] != b"RIFF" or payload[8:12] != b"WEBP":
                raise ValueError(f"文件格式不符合 WebP: {name}")
            if hashlib.sha256(payload).hexdigest() != records[name]["sha256"]:
                raise ValueError(f"素材哈希校验失败: {name}")
            verified.append((name,payload))
    for name,payload in verified:
        target=ROOT/name
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_bytes(payload)
        print("installed:",target.relative_to(ROOT))
    print(f"完成：{len(verified)} 张资源已安装。请 git add frontend/public/art/ 后提交。")

if __name__=="__main__":
    if len(sys.argv)!=2:
        print("Usage: python3 scripts/install-m17-assets.py <assets.zip>")
        sys.exit(2)
    try:
        install(Path(sys.argv[1]).expanduser().resolve())
    except (ValueError,OSError,KeyError,BadZipFile) as exc:
        print(f"安装失败：{exc}",file=sys.stderr)
        sys.exit(1)
