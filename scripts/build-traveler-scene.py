#!/usr/bin/env python3
"""Produce one opaque, self-contained character-scene bitmap for WorkHub.

Uses art already in the repository. The browser must never assemble an alpha
cutout over a CSS background; it loads the resulting RGB WebP as one scene.
Replace this provisional composition with the approved full-background artwork
when available, keeping the same output path and validation contract.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "frontend" / "public" / "art"
OUTPUT = ART / "backgrounds" / "traveler-scene.webp"
SIZE = (720, 480)

def main() -> None:
    with Image.open(ART / "home-map.webp") as scene:
        scene = scene.convert("RGB")
        w, h = scene.size
        # Sky and a portion of the distant floating castle.
        crop = scene.crop((int(w * .29), int(h * .0), int(w * .82), int(h * .70)))
        backdrop = ImageOps.fit(crop, SIZE, method=Image.Resampling.LANCZOS)
        backdrop = ImageEnhance.Color(backdrop).enhance(.92)
        backdrop = backdrop.filter(ImageFilter.GaussianBlur(1.1)).convert("RGBA")

    with Image.open(ART / "traveler.webp") as file:
        traveler = file.convert("RGBA")
        alpha = traveler.getchannel("A")
        extrema = alpha.getextrema()
        if extrema == (255, 255):
            raise SystemExit("Expected an alpha-enabled legacy source; got opaque image.")
        bbox = alpha.getbbox()
        if not bbox:
            raise SystemExit("Empty traveler alpha mask.")
        traveler = traveler.crop(bbox)
        target_h = int(SIZE[1] * 1.12)
        target_w = int(traveler.width * target_h / traveler.height)
        traveler = traveler.resize((target_w, target_h), Image.Resampling.LANCZOS)
        blurred_alpha = traveler.getchannel("A").filter(ImageFilter.GaussianBlur(.65))
        traveler.putalpha(blurred_alpha)

    # Keep the person's profile on the left while showing the illustrated
    # background city / sky in the right third.
    x = -int(target_w * .06)
    y = SIZE[1] - target_h + 8
    backdrop.alpha_composite(traveler, (x, y))

    vignette = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    mask = Image.new("L", SIZE)
    draw = ImageDraw.Draw(mask)
    for row in range(SIZE[1]):
        strength = int(170 * (max(0, row / SIZE[1] - .70) / .30) ** 1.5)
        draw.line((0, row, SIZE[0], row), fill=max(0, min(155, strength)))
    vignette.paste((12, 26, 47, 1), (0, 0, SIZE[0], SIZE[1]), mask)
    backdrop = Image.alpha_composite(backdrop, vignette).convert("RGB")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    backdrop.save(OUTPUT, format="WEBP", quality=88, method=6)

    with Image.open(OUTPUT) as result:
        assert result.mode == "RGB" and result.size == SIZE
    print(f"{OUTPUT}: {OUTPUT.stat().st_size} bytes / RGB / {SIZE[0]}x{SIZE[1]}")

if __name__ == "__main__":
    main()
