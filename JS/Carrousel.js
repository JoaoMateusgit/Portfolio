let slideIndex = 0;
let slideIndexMap = new Map();

function moverCarrossel(direcao) {
  const carousel = document.getElementById('carousel');
  const totalSlides = carousel.children.length;
  const container = document.querySelector('.carousel-container');

  slideIndex += direcao;

  if (slideIndex < 0) slideIndex = totalSlides - 1;
  if (slideIndex >= totalSlides) slideIndex = 0;

  // ✅ Captura a largura visível do carrossel
  const slideWidth = container.offsetWidth;

  const offset = -slideIndex * slideWidth;
  carousel.style.transform = `translateX(${offset}px)`;
}

function moverCarrosselFormacao(button, direcao) {
  const container = button.closest('.carousel-container-formacao') || button.closest('.carousel-container');
  const carousel = container.querySelector('.carousel-formacao') || container.querySelector('.carousel');

  if (!carousel || !container) {
    console.warn('⛔ Carrossel não encontrado.');
    return;
  }

  const totalSlides = carousel.children.length;

  // Use um identificador único para cada carrossel com base no container
  const carrouselId = carousel.dataset.id || carousel.id || container.className;

  // Inicialize índice se não existir ainda
  if (!slideIndexMap.has(carrouselId)) {
    slideIndexMap.set(carrouselId, 0);
  }

  // Atualiza índice do slide
  let slideIndex = slideIndexMap.get(carrouselId);
  slideIndex += direcao;

  if (slideIndex < 0) slideIndex = totalSlides - 1;
  if (slideIndex >= totalSlides) slideIndex = 0;
  slideIndexMap.set(carrouselId, slideIndex);

  const slideWidth = container.offsetWidth;
  const offset = -slideIndex * slideWidth;

  carousel.style.transform = `translateX(${offset}px)`;
}

window.moverCarrossel = moverCarrossel;c