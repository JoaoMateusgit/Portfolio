// Criação da bolinha personalizada
const cursor = document.createElement('div');
cursor.classList.add('cursor-bolinha');
document.body.appendChild(cursor);

const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.getElementById('cursor-glow-container').appendChild(glow);

// Variáveis de controle
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let travado = false;
let esperandoDestravar = false;
let centroBotaoX = 0;
let centroBotaoY = 0;
let botaoTravado = null;

// Animação principal da bolinha
function animateCursor() {
    if (travado) {
        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.2;
    } else {
        currentX += (targetX - currentX) * 0.5;
        currentY += (targetY - currentY) * 0.5;
    }

    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';

    if (botaoTravado && travado) {
        const rect = botaoTravado.getBoundingClientRect();

        const dentroDoBotao =
            currentX >= rect.left &&
            currentX <= rect.right &&
            currentY >= rect.top &&
            currentY <= rect.bottom;

        if (dentroDoBotao) {
            botaoTravado.classList.add('botao-hover-forcado');
        } else {
            botaoTravado.classList.remove('botao-hover-forcado');
        }
    } else if (botaoTravado) {
        botaoTravado.classList.remove('botao-hover-forcado');
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Checa o elemento abaixo do mouse
    const elementoEmbaixo = document.elementFromPoint(mouseX, mouseY);

    // Verifica se o mouse está dentro do botão travado
    if (botaoTravado && botaoTravado.contains(elementoEmbaixo)) {
        // Mouse ainda dentro do botão — mantém travado e atualiza posição alvo para centro do botão
        travado = true;
        esperandoDestravar = false;
        targetX += (centroBotaoX - targetX) * 0.15;
        targetY += (centroBotaoY - targetY) * 0.15;
    } else {
        // Mouse está fora do botão travado, destrava
        if (travado || esperandoDestravar) {
            travado = false;
            esperandoDestravar = false;
            cursor.classList.remove('cursor-travado');
            botaoTravado = null;
        }
        targetX = mouseX;
        targetY = mouseY;
    }
});


// Aplica eventos de travamento a um botão
function aplicarEventos(botao) {
    botao.addEventListener('mouseenter', () => {
        const rect = botao.getBoundingClientRect();
        centroBotaoX = rect.left + rect.width / 2;
        centroBotaoY = rect.top + rect.height / 2;
        targetX = centroBotaoX;
        targetY = centroBotaoY;
        travado = true;
        esperandoDestravar = false;
        cursor.classList.add('cursor-travado');
        botaoTravado = botao;
    });

    botao.addEventListener('mouseleave', () => {
        esperandoDestravar = true;
    });

    botao.dataset.cursorSet = "true";
}

// Inicialmente aplica a todos os botões
const botoes = document.querySelectorAll('button, a.BotoesNav, .BotaoAcessar');
botoes.forEach(botao => {
    if (!botao.dataset.cursorSet) aplicarEventos(botao);
});

// Observer para carregar dinamicamente
const observer = new MutationObserver(() => {
    const botoesAtualizados = document.querySelectorAll('button, a.BotoesNav, .BotaoAcessar');
    botoesAtualizados.forEach(botao => {
        if (!botao.dataset.cursorSet) aplicarEventos(botao);
    });
});
observer.observe(document.body, { childList: true, subtree: true });
