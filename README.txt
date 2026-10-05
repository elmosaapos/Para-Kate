============================================================
CARTA DE AMOR DIGITAL PARA KATE — TOMÁS GARRIDO
============================================================

¡Tu experiencia web artesanal está lista para abrirse y desplegarse!

ESTRUCTURA DE ARCHIVOS:
├── index.html        (Estructura y textos íntegros exactos de la carta)
├── style.css         (Estética artesanal de libro físico, tipografías y paleta)
├── script.js         (Navegación de páginas, morphing SVG, swipe y atajos)
├── README.txt        (Este manual)
├── img/              (Carpeta para imágenes opcionales, fotos del gato o texturas)
└── audio/            (Carpeta para futuras pistas de audio o música de fondo)

------------------------------------------------------------
CÓMO ABRIRLO LOCALMENTE EN GOOGLE CHROME:
------------------------------------------------------------
1. Descomprime este archivo .zip en una carpeta de tu preferencia.
2. Haz doble clic en el archivo "index.html" (o haz clic derecho > "Abrir con" > "Google Chrome").
3. ¡Listo! Verás el libro artesanal en su formato interactivo.

------------------------------------------------------------
CÓMO PUBLICARLO GRATIS EN GITHUB PAGES:
------------------------------------------------------------
1. Ve a https://github.com e inicia sesión en tu cuenta.
2. Crea un nuevo repositorio (por ejemplo: "carta-para-kate" o el nombre que elijas) y márcalo como "Public".
3. Sube los archivos (index.html, style.css, script.js, carpetas img y audio) directamente a la raíz de la rama principal (main o master).
4. En tu repositorio de GitHub, entra a:
   Settings > Pages (en el menú lateral izquierdo).
5. En la sección "Build and deployment" > "Branch", selecciona "main" (o "master") y carpeta "/ (root)". Haz clic en "Save".
6. Espera 1 minuto y GitHub te dará una URL pública gratuita (por ejemplo: https://tuusuario.github.io/carta-para-kate/).
7. ¡Ya puedes enviarle ese enlace a Kate desde cualquier teléfono o computador!

------------------------------------------------------------
CONTROLES Y NAVEGACIÓN:
------------------------------------------------------------
- En Celular: Desliza con el dedo (swipe) hacia la izquierda o derecha, o usa las flechas inferiores.
- En PC / Laptop:
  * Botón "ABRIR" en la portada.
  * Teclas de flecha: [ ← ] y [ → ]
  * Barra espaciadora: Avanza de página.
  * Tecla [ Escape ]: Vuelve inmediatamente a la portada.
  * Flechas en la esquina inferior derecha del libro.

------------------------------------------------------------
REEMPLAZAR LA FOTO DEL GATO EN LA CONTRAPORTADA (OPCIONAL):
------------------------------------------------------------
Actualmente la contraportada incluye una ilustración SVG minimalista y tierna del gato watón como autor célebre.
Si deseas poner una foto real de tu gato:
1. Guarda la foto de tu gato dentro de la carpeta `img/` (por ejemplo: `img/gato.jpg`).
2. Abre `index.html` con un editor de texto (Bloc de notas o VS Code).
3. Busca la línea:
   <!-- Ilustración SVG del gato watón como placeholder elegante -->
   <svg class="cat-svg" ... > ... </svg>
4. Reemplaza ese bloque `<svg>...</svg>` por:
   <img src="img/gato.jpg" alt="Foto del autor" style="width: 140px; height: 140px; object-fit: cover; border-radius: 2px;">
============================================================
