const botaoNav = document.getElementById("modo-escuro-toggle");
const botaoFixo = document.getElementById("modo-escuro-toggle-fixo");
const iconeTemaNav = document.getElementById("icone-tema");
const iconeTemaFixo = document.getElementById("icone-tema-fixo");

function aplicarImagensModo(modoEscuroAtivo) {
    const iconeDev = document.getElementById("icone-dev");
    const iconeGit = document.getElementById("icone-Git");
    const iconeWhatsapp = document.getElementById("icone-Whats");
    const iconeLinkedin = document.getElementById("icone-Linkedin");

    if (!iconeDev || !iconeGit || !iconeWhatsapp || !iconeLinkedin) return;

    if (modoEscuroAtivo) {
        iconeDev.src = "/images/iconsDev-white.png";
        iconeWhatsapp.src = '/images/iconsWhatsapp-white.png';
        iconeLinkedin.src = '/images/iconLinkedin-white.png';
        iconeGit.src = '/images/iconGitHub-white.png';
    } else {
        iconeDev.src = "/images/iconDev-Black.png";
        iconeWhatsapp.src = '/images/iconsWhatsapp-black.png';
        iconeLinkedin.src = '/images/iconLinkedin-black.png';
        iconeGit.src = '/images/iconGitHub-black.png';
    }
}

function aplicarModoSalvo() {
    const modoSalvo = localStorage.getItem("modo-escuro");
    const modoAtivo = modoSalvo === "true";
    if (modoAtivo) {
        document.body.classList.add("modo-escuro");
        iconeTemaNav.src = "/images/sun.png";
        iconeTemaFixo.src = "/images/sun.png";
        iconeTemaNav.alt = "Modo claro";
        iconeTemaFixo.alt = "Modo claro";
    } else {
        document.body.classList.remove("modo-escuro");
        iconeTemaNav.src = "/images/lua.png";
        iconeTemaFixo.src = "/images/lua.png";
        iconeTemaNav.alt = "Modo escuro";
        iconeTemaFixo.alt = "Modo escuro";
    }
    aplicarImagensModo(modoAtivo);
}

function alternarModoEscuro() {
    const modoAtivo = document.body.classList.toggle("modo-escuro");
    localStorage.setItem("modo-escuro", modoAtivo.toString());
    aplicarModoSalvo();
}

if (botaoNav) botaoNav.addEventListener("click", alternarModoEscuro);
if (botaoFixo) botaoFixo.addEventListener("click", alternarModoEscuro);

document.addEventListener("DOMContentLoaded", aplicarModoSalvo);
