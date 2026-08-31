# VED · EPYL — sitio web

Landing en inglés (idioma principal) / alemán / francés para la familia Churata,
la iglesia VED y el ministerio EPYL en Cusco. Estático, sin backend — pensado
para GitHub Pages.

## Ver el sitio localmente

No sirve abrir `index.html` con doble clic (algunos navegadores bloquean
módulos/fetch bajo `file://`). Levanta un servidor simple:

```bash
cd ved-epyl-site
python3 -m http.server 8000
```

Y abre `http://localhost:8000` en el navegador.

## Estructura

```
index.html              todo el contenido y estructura del sitio (una sola página)
assets/css/tokens.css    paleta, tipografía, tokens (skill lujo-editorial-web)
assets/css/layout.css    layout de cada sección + menú móvil
assets/js/i18n.js        diccionario EN/DE/FR + selector de idioma
assets/js/blog.js        posts del boletín semanal (array editable)
assets/js/gallery.js     galería de fotos de la sección VED
assets/js/main.js        parallax del rebaño, scroll-reveal, menú móvil, formulario
assets/img/fotos/        20 fotos de la comunidad, optimizadas
assets/img/logos/        logo EPYL + logo VED (3 variantes de color)
```

## Cómo agregar una entrada al boletín semanal

Abre `assets/js/blog.js` y copia un objeto nuevo al **inicio** del array
`POSTS` (las instrucciones exactas están comentadas arriba del array):

```js
{
  date: "2027-01-10",
  label: "Cusco",
  title: "Título corto",
  excerpt: "Una o dos frases.",
  image: "assets/img/fotos/foto-05.jpg", // o null
}
```

Solo aparece en inglés, alemán y francés por defecto usa el mismo texto — si
quieres traducir los posts también, dímelo y agrego esa capa.

## Pendiente antes de publicar

- **Donaciones**: ya están los datos reales (Wise CHF/SWIFT a nombre de Caleb,
  y BCP Soles a nombre de Celia) en `index.html`, sección `#support` → tarjeta
  "Give". Revisa que los números estén exactamente correctos antes de publicar
  — son datos financieros reales y no los he verificado por otra vía.
- **GitHub Pages**: el sitio está listo pero no lo he subido a ningún
  repositorio (quedó así a propósito). Cuando quieras publicarlo, dime el
  nombre del repo (o si prefieres que cree uno) y lo dejo andando.
- **Ovejas del rebaño**: hoy el sitio usa dos siluetas (dominio público /
  CC0, vectorizadas). Si me pasas imágenes propias de oveja, las proceso con
  el mismo método (recorte + vectorizado a silueta plana) para tener más
  variedad de la que ya hay.

## Nota sobre el nombre de la iglesia

El sitio menciona que "Ven-Id" fue la primera iglesia que Cristóbal plantó, y
que hoy ese trabajo se llama VED ("Vida en Dios"). Los tres logos de VED están
en `assets/img/logos/` (negro, crema, verde) por si quieres usar otra versión
en algún lugar.
