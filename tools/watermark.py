#!/usr/bin/env python3
"""Prepare photos for the site: shrink, drop EXIF (GPS, device), stamp the VED mark.

    python3 tools/watermark.py ORIGINALS... -o assets/img/posts/2026-11-some-trip

Writes 01.jpg, 02.jpg... into the output folder. Never commit the originals.
"""
import argparse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

LOGO = Path(__file__).parent.parent / "assets/img/logos/logo-ved-crema.png"
MAX_SIDE = 1600  # enough for the web, too small to reprint


def stamp(src: Path, dst: Path):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGBA")
    im.thumbnail((MAX_SIDE, MAX_SIDE))
    w, h = im.size
    layer = Image.new("RGBA", im.size)

    # faint seal over the subject: cannot be cropped away like a corner mark
    side = int(min(w, h) * 0.5)
    seal = Image.open(LOGO).convert("RGBA").resize((side, side))
    seal.putalpha(seal.getchannel("A").point(lambda a: a * 0.10))
    layer.paste(seal, ((w - side) // 2, (h - side) // 2))

    # readable credit in the corner
    font = ImageFont.load_default(size=max(14, w // 60))
    ImageDraw.Draw(layer).text(
        (w - font.size, h - font.size), "© VED · EPYL · Cusco", font=font, anchor="rs",
        fill=(248, 245, 240, 190), stroke_width=1, stroke_fill=(10, 10, 10, 120),
    )

    Image.alpha_composite(im, layer).convert("RGB").save(dst, quality=82, progressive=True)
    assert not Image.open(dst).getexif(), f"EXIF leaked into {dst}"


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("photos", nargs="+", type=Path)
    ap.add_argument("-o", "--out", required=True, type=Path)
    args = ap.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    for i, src in enumerate(sorted(args.photos), 1):
        stamp(src, args.out / f"{i:02d}.jpg")
        print(args.out / f"{i:02d}.jpg")
