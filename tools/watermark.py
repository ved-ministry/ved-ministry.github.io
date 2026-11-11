#!/usr/bin/env python3
"""Prepare photos for the site: clean metadata, add copyright tags, stamp a small VED mark.

    python3 tools/watermark.py ORIGINALS... -o assets/img/posts/2026-11-desaguadero \\
        --name epyl-desaguadero-2026 --label "Desaguadero, Puno 2026"

Writes <name>-01.jpg, <name>-02.jpg... in the order given. Originals stay in the private repo.
"""
import argparse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

LOGO = Path(__file__).parent.parent / "assets/img/logos/logo-ved-crema.png"
OWNER = "VED Church & EPYL Ministry, Cusco, Peru"
MAX_SIDE = 2560  # sharp on any screen; the full-size originals are never published


def stamp(src: Path, dst: Path, label: str = ""):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGBA")
    im.thumbnail((MAX_SIDE, MAX_SIDE))
    w, h = im.size
    unit = max(min(w, h) // 40, 12)  # everything scales with the photo
    layer = Image.new("RGBA", im.size)

    seal = Image.open(LOGO).convert("RGBA").resize((unit * 4, unit * 4))
    seal.putalpha(seal.getchannel("A").point(lambda a: a * 0.8))
    layer.paste(seal, (w - unit * 5, h - unit * 5))

    text = "© VED · EPYL" + (f" · {label}" if label else "")
    ImageDraw.Draw(layer).text(
        (w - unit * 5.5, h - unit * 1.6), text, font=ImageFont.load_default(size=unit), anchor="rs",
        fill=(248, 245, 240, 230), stroke_width=max(unit // 12, 1), stroke_fill=(10, 10, 10, 150),
    )

    # the saved file carries only these three tags: no GPS, device or date
    exif = Image.Exif()
    exif[0x010E] = f"{OWNER}" + (f" — {label}" if label else "")  # ImageDescription
    exif[0x013B] = OWNER  # Artist
    exif[0x8298] = f"© {OWNER}. All rights reserved."  # Copyright
    Image.alpha_composite(im, layer).convert("RGB").save(dst, quality=88, progressive=True, exif=exif)
    assert set(Image.open(dst).getexif()) == {0x010E, 0x013B, 0x8298}, f"unexpected metadata in {dst}"


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("photos", nargs="+", type=Path)
    ap.add_argument("-o", "--out", required=True, type=Path)
    ap.add_argument("--name", default="photo", help="file name prefix, e.g. epyl-desaguadero-2026")
    ap.add_argument("--label", default="", help="place/date shown next to the credit")
    args = ap.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    for i, src in enumerate(args.photos, 1):
        dst = args.out / f"{args.name}-{i:02d}.jpg"
        stamp(src, dst, args.label)
        print(dst)
