#!/usr/bin/env python3
"""Builds _includes/impact-map.html: Peru and Bolivia as SVG, and one dot per place sized by how many
updates mention it up to each year. Rerun after adding updates:  python3 tools/impact_map.py
Needs geopandas<1.0 (it ships the Natural Earth outlines)."""
import re, glob, json, math, warnings
from collections import defaultdict
warnings.filterwarnings('ignore')
import geopandas as gpd
# name, lat, lon, words that mean this place in the texts
PLACES = [
 ('Cusco', -13.53, -71.97, ['Cusco', 'Cuzco', 'Ven-Id', 'VED']), ('Calca', -13.32, -71.95, ['Calca', 'Lamay', 'Arín', 'Valle Sagrado', 'Urubamba']),
 ('Ccatcca', -13.61, -71.56, ['Ccatcca', 'Catcca', 'Ccatccapampa', 'Chichina', 'Quispicanchi']), ('Curahuasi', -13.54, -72.69, ['Curahuasi', 'Pisonaypata', 'Totoray', 'Mollepata']),
 ('Chumbivilcas', -14.45, -72.08, ['Chumbivilcas', 'Santo Tomás', 'Santo Tomas', 'Huaracco', 'Chiluyo']), ('Sicuani', -14.27, -71.23, ['Sicuani', 'Sangarará', 'Sangarara']),
 ('La Convención', -12.75, -72.65, ['Quellouno', 'Quillabamba', 'Cirialo', 'La Convención']), ('Manu', -12.83, -71.37, ['Salvación', 'Kosñipata', 'Kcosñipata', 'Manu']),
 ('Desaguadero', -16.57, -69.04, ['Desaguadero', 'aymara', 'Aymara', 'Totoroma']), ('Juliaca', -15.50, -70.13, ['Juliaca', 'Yunguyo']),
 ('Tarija', -21.53, -64.73, ['Tarija']), ('Nazca', -14.83, -74.94, ['Nazca']), ('Lima', -12.05, -77.04, ['Lima', 'Chancay', 'Aucallama', 'Chaclacayo', 'Santa Anita']),
 ('Trujillo', -8.11, -79.03, ['Trujillo']), ('Chiclayo', -6.77, -79.84, ['Chiclayo']), ('Sullana', -4.90, -80.69, ['Sullana', 'Piura']),
]
LABELS = {'Cusco': (-16, -14, 'end'), 'Chumbivilcas': (14, 22, 'start'), 'Desaguadero': (16, 6, 'start'), 'Lima': (-16, 6, 'end'),
          'Trujillo': (-16, 6, 'end'), 'Tarija': (16, 6, 'start'), 'Nazca': (-16, 6, 'end'), 'Sullana': (-16, 6, 'end'), 'Chiclayo': (-16, 6, 'end')}
W, N = -83.4, -3.4  # top-left corner of the frame; the land outside it fades out
K = 41.3; C = math.cos(math.radians(11))
xy = lambda lat, lon: ((lon - W) * K * C, (N - lat) * K)
VW, VH = xy(-23.0, -62.2)
count = defaultdict(lambda: defaultdict(int)); link = {}
for f in sorted(glob.glob('_posts/*.md')):
    year = int(f.split('/')[-1][:4]); text = open(f).read()
    for name, _, _, words in PLACES:
        if any(re.search(r'(?<![\w])' + re.escape(w) + r'(?![\w])', text) for w in words):
            count[name][year] += 1
            link.setdefault(name, '/updates/' + f.split('/')[-1][11:-3] + '/')  # the letter where the place first appears
first = {n: min(c) for n, c in count.items()}
total = {n: sum(c.values()) for n, c in count.items()}
ERAS = [(2011, 2013, 'era1', 'The beginnings'), (2014, 2018, 'era2', 'The training years'), (2019, 2099, 'era3', 'Today')]  # colours live in layout.css
era = lambda y: next(e for a, b, e, _ in ERAS if a <= y <= b)
world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
def path(geom):
    polys = geom.geoms if geom.geom_type == 'MultiPolygon' else [geom]
    return ' '.join('M' + ' L'.join('%.0f,%.0f' % xy(lat, lon) for lon, lat in p.exterior.coords) + 'Z' for p in polys)
land = ''.join(f'<path class="map__land{" map__land--bo" if n == "Bolivia" else ""}" d="{path(world[world.name == n].geometry.iloc[0])}"/>' for n in ('Peru', 'Bolivia'))
cx, cy = xy(-13.53, -71.97)
order = sorted((p for p in PLACES if p[0] in first and p[0] != 'Cusco'), key=lambda p: (first[p[0]], -total[p[0]]))
arcs, dots, labels = [], [], []
for i, (name, lat, lon, _) in enumerate(order):
    x, y = xy(lat, lon); y0 = first[name]
    mx, my = (cx + x) / 2, (cy + y) / 2 - abs(x - cx) * .35 - 20  # bow every arc upwards
    arcs.append(f'<path class="map__arc {era(y0)}" data-p="{name}" style="--i:{i}" pathLength="1" d="M{cx:.0f},{cy:.0f} Q{mx:.0f},{my:.0f} {x:.0f},{y:.0f}"/>')
    dots.append(f'<a href="{link[name]}" data-p="{name}"><circle class="map__dot {era(y0)}" style="--i:{i}" cx="{x:.0f}" cy="{y:.0f}" r="{4 + math.sqrt(total[name]) * 1.7:.1f}"><title>{name} · {y0}</title></circle></a>')
    dx, dy, anchor = LABELS.get(name, (14, 6, 'start'))  # places without a fixed label only show theirs when pointed at
    labels.append(f'<text class="map__label{"" if name in LABELS else " map__label--quiet"}" data-p="{name}" style="--i:{i}" x="{x + dx:.0f}" y="{y + dy:.0f}" text-anchor="{anchor}">{name}</text>')
by_year = defaultdict(list)
for n, y in first.items(): by_year[y].append(n)
row = lambda y: f'<li><b>{y}</b><span>' + ', '.join(f'<a href="{link[n]}" data-p="{n}">{n}</a>' for n in sorted(by_year[y], key=lambda n: -total[n])) + '</span></li>'
timeline = ''.join(f'<div class="map__era {e}"><h3 data-i18n="map.{e}">{title}</h3><ol>' + ''.join(row(y) for y in sorted(by_year) if a <= y <= b) + '</ol></div>'
                   for a, b, e, title in ERAS if any(a <= y <= b for y in by_year))
hover = ''.join(f'.map:has([data-p="{n}"]:is(:hover,:focus-visible)) svg [data-p]:not([data-p="{n}"],.map__label--quiet){{opacity:.1}}.map:has([data-p="{n}"]:is(:hover,:focus-visible)) text[data-p="{n}"]{{opacity:1}}' for n in first if n != 'Cusco')
html = f"""<!-- generated by tools/impact_map.py -->
<div class="map" id="impactMap">
  <style>{hover}</style>
  <svg viewBox="0 0 {VW:.0f} {VH:.0f}" role="img" aria-label="Map of the places in Peru and Bolivia where the ministry has served, by year first reached">
    <defs><radialGradient id="mapFade"><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <mask id="mapMask"><rect width="{VW:.0f}" height="{VH:.0f}" fill="url(#mapFade)"/></mask></defs>
    <g mask="url(#mapMask)">{land}
    <text class="map__country" x="{xy(-9.3, -76.3)[0]:.0f}" y="{xy(-9.3, -76.3)[1]:.0f}">PERÚ</text>
    <text class="map__country" x="{xy(-17.6, -66.6)[0]:.0f}" y="{xy(-17.6, -66.6)[1]:.0f}">BOLIVIA</text></g>
    {''.join(arcs)}{''.join(dots)}
    <a href="{link['Cusco']}"><circle class="map__home" cx="{cx:.0f}" cy="{cy:.0f}" r="9"><title>Cusco · {first.get('Cusco', '')}</title></circle></a>
    <text class="map__label map__label--home" x="{cx - 14:.0f}" y="{cy - 12:.0f}" text-anchor="end">Cusco</text>
    {''.join(labels)}
  </svg>
  <div class="map__time">{timeline}</div>
</div>
"""
assert all(n in link for n in first)
open('_includes/impact-map.html', 'w').write(html)
print(sorted(first.items(), key=lambda x: x[1]))
