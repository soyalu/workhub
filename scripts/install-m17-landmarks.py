#!/usr/bin/env python3
"""Install seven reviewed M1.7 painted landmarks (21 transparent WebPs).

Usage:
    python3 scripts/install-m17-landmarks.py ~/Downloads/workhub-m17-seven-landmarks-art.zip

Requires only Python stdlib. All expected paths and hashes are checked before
writing anything. Never deletes files outside frontend/public/art/landmarks.
"""
import hashlib
import json
import sys
from pathlib import Path
from zipfile import ZipFile, BadZipFile

THEMES = {"quest","project","message","capture","side","calendar","growth"}
PARTS = {"emblems","banners","combined"}
EXPECTED = {f"{part}/{theme}.webp" for part in PARTS for theme in THEMES}
DEST = Path(__file__).resolve().parents[1] / "frontend/public/art/landmarks"

def install(bundle:Path):
    with ZipFile(bundle) as archive:
        data=json.loads(archive.read("manifest.json"))
        records={item["file"]:item for item in data["items"]}
        if data.get("count") != 21 or set(records) != EXPECTED:
            raise ValueError("manifest 应恰好包含 21 张指定素材")
        prepared={}
        for name in sorted(EXPECTED):
            payload=archive.read(name)
            if not payload.startswith(b"RIFF") or payload[8:12] != b"WEBP":
                raise ValueError(f"无效 WebP: {name}")
            if hashlib.sha256(payload).hexdigest()!=records[name]["sha256"]:
                raise ValueError(f"SHA-256 校验失败: {name}")
            prepared[name]=payload
    # Write only after all 21 files have been validated.
    for name,payload in prepared.items():
        output=DEST/name
        output.parent.mkdir(parents=True,exist_ok=True)
        output.write_bytes(payload)
        print("installed:",output.relative_to(DEST))
    (DEST/"manifest.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n")
    print(f"已安装 {len(prepared)} 张正式地标素材 + manifest.json")

if __name__=="__main__":
    if len(sys.argv)!=2:
        raise SystemExit("Usage: python3 scripts/install-m17-landmarks.py <asset-zip>")
    try:
        install(Path(sys.argv[1]).expanduser().resolve())
    except (OSError,ValueError,KeyError,BadZipFile) as error:
        raise SystemExit(f"安装失败: {error}") from error
