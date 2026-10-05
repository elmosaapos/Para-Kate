/**
 * Carta de Tomás para Kate — Lógica interactiva
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnAbrir = document.getElementById('btnAbrir');
  const pageIndicator = document.getElementById('pageIndicator');
  const book = document.getElementById('book');

  let currentPage = 0;
  const totalPages = pages.length; // 0 a 6 (Portada, 1, 2, 3, 4, 5, Contraportada)

  // Etiquetas para el indicador artesanal
  const pageLabels = [
    'Portada',
    '1 / 5',
    '2 / 5',
    '3 / 5',
    '4 / 5',
    '5 / 5',
    'Final'
  ];

  // =========================================================================
  // Control de Páginas
  // =========================================================================
  function goToPage(targetIndex) {
    if (targetIndex < 0 || targetIndex >= totalPages || targetIndex === currentPage) {
      return;
    }

    const previousPageEl = pages[currentPage];
    const targetPageEl = pages[targetIndex];

    // Marcar dirección de salida
    if (targetIndex > currentPage) {
      previousPageEl.classList.add('prev-leave');
    } else {
      previousPageEl.classList.remove('prev-leave');
    }

    previousPageEl.classList.remove('active');
    targetPageEl.classList.add('active');
    targetPageEl.classList.remove('prev-leave');

    // Reiniciar scroll arriba en páginas de texto
    const scrollBox = targetPageEl.querySelector('.page-scrollable');
    if (scrollBox) {
      scrollBox.scrollTop = 0;
    }

    currentPage = targetIndex;
    updateNavControls();
    handlePageSpecificTriggers(currentPage);
  }

  function updateNavControls() {
    pageIndicator.textContent = pageLabels[currentPage] || `${currentPage}`;
    btnPrev.disabled = (currentPage === 0);
    btnNext.disabled = (currentPage === totalPages - 1);
  }

  // =========================================================================
  // Animación Página 1: Morfismo Corazón <-> Estrella dibujado a mano
  // =========================================================================
  const morphPath = document.getElementById('morphPath');
  
  // Trazos SVG orgánicos dibujados a mano (misma cantidad y estructura de comandos)
  // Corazón dibujado a mano
  const heartPathD = "M 80,48 C 68,26 34,36 46,62 C 58,84 80,106 80,106 C 80,106 102,84 114,62 C 126,36 92,26 80,48 Z";
  // Estrella dibujada a mano imperfecta
  const starPathD  = "M 80,24 C 84,48 98,54 118,58 C 102,70 100,84 108,104 C 90,92 74,90 56,104 C 62,84 58,68 44,58 C 64,54 76,46 80,24 Z";

  let isHeart = true;
  let morphInterval = null;

  function startP1Morph() {
    if (morphInterval) clearInterval(morphInterval);
    morphInterval = setInterval(() => {
      if (currentPage !== 1) return;
      isHeart = !isHeart;
      if (morphPath) {
        // Transición suave de trazado
        morphPath.style.transition = "d 2.8s cubic-bezier(0.4, 0, 0.2, 1)";
        morphPath.setAttribute('d', isHeart ? heartPathD : starPathD);
      }
    }, 4200);
  }

  // =========================================================================
  // Transición Cinemática Página 5
  // Tras leer la página 5, el texto se difumina y queda solo la frase final
  // =========================================================================
  let p5Timer = null;
  const p5PageEl = document.querySelector('.page[data-page="5"]');

  function handleP5Cinematic() {
    if (!p5PageEl) return;
    // Reiniciar estado
    p5PageEl.classList.remove('p5-cinematic-state');
    if (p5Timer) clearTimeout(p5Timer);

    // Esperar unos segundos para permitir lectura antes de la transición poética
    p5Timer = setTimeout(() => {
      if (currentPage === 5) {
        p5PageEl.classList.add('p5-cinematic-state');
      }
    }, 13000); // 13s tiempo sereno de lectura o trigger al llegar al final
  }

  // Permitir activar la transición inmediatamente si scrollea al fondo en P5
  const p5Scrollable = p5PageEl ? p5PageEl.querySelector('.page-scrollable') : null;
  if (p5Scrollable) {
    p5Scrollable.addEventListener('scroll', () => {
      if (currentPage === 5) {
        const threshold = p5Scrollable.scrollHeight - p5Scrollable.clientHeight - 40;
        if (p5Scrollable.scrollTop >= threshold) {
          p5PageEl.classList.add('p5-cinematic-state');
        }
      }
    });
  }

  function handlePageSpecificTriggers(pageIndex) {
    if (pageIndex === 1) {
      startP1Morph();
    } else {
      if (morphInterval) clearInterval(morphInterval);
    }

    if (pageIndex === 5) {
      handleP5Cinematic();
    } else {
      if (p5PageEl) p5PageEl.classList.remove('p5-cinematic-state');
      if (p5Timer) clearTimeout(p5Timer);
    }
  }

  // =========================================================================
  // Botones y Navegación
  // =========================================================================
  if (btnAbrir) {
    btnAbrir.addEventListener('click', () => goToPage(1));
  }
  btnNext.addEventListener('click', () => goToPage(currentPage + 1));
  btnPrev.addEventListener('click', () => goToPage(currentPage - 1));

  // Navegación por Teclado
  document.addEventListener('keydown', (e) => {
    // Si presiona Flecha Izquierda
    if (e.key === 'ArrowLeft') {
      goToPage(currentPage - 1);
    }
    // Si presiona Flecha Derecha o Barra Espaciadora
    else if (e.key === 'ArrowRight' || e.key === ' ') {
      // Evitar que espacio scrollee bruscamente
      if (e.key === ' ') e.preventDefault();
      goToPage(currentPage + 1);
    }
    // Si presiona Escape: volver a la portada
    else if (e.key === 'Escape') {
      goToPage(0);
    }
  });

  // =========================================================================
  // Gestos Táctiles (Swipe en Celulares)
  // =========================================================================
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  book.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  book.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
  }, { passive: true });

  function handleGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Solo si el deslizamiento horizontal es mayor al vertical y supera umbral
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX < 0) {
        // Swipe izquierda -> página siguiente
        goToPage(currentPage + 1);
      } else {
        // Swipe derecha -> página anterior
        goToPage(currentPage - 1);
      }
    }
  }

  // Inicialización
  updateNavControls();
  handlePageSpecificTriggers(0);
});
