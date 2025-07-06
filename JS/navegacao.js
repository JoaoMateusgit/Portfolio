function carregarPagina(pagina) {
  console.log("Tentando carregar:", pagina);

  localStorage.setItem('paginaAtual', pagina);

  fetch(pagina)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar a página.");
      return response.text();
    })
    .then(html => {
      const conteudo = document.getElementById("conteudo");
      conteudo.innerHTML = html;

      // Reexecuta scripts da nova página
      const scripts = conteudo.querySelectorAll("script");
      scripts.forEach(script => {
        const novoScript = document.createElement("script");
        if (script.src) {
          novoScript.src = script.src;
          novoScript.async = false;
        } else {
          novoScript.textContent = script.textContent;
        }
        document.body.appendChild(novoScript);
      });

      // 👇 reaplica modo escuro se estava ativado
      if (typeof aplicarModoSalvo === "function") {
        aplicarModoSalvo();
      }

    })
    .catch(err => {
      console.error(err);
    });

  // Atualiza botão ativo no menu
  const navLinks = document.querySelectorAll('.BotoesNav');
  navLinks.forEach(link => {
    link.classList.remove('ativo');
    if (link.getAttribute('onclick').includes(pagina)) {
      link.classList.add('ativo');
    }
  });
}

window.onload = () => {
  // Verifica se tem página salva no localStorage
  const paginaSalva = localStorage.getItem('paginaAtual');
  if (paginaSalva) {
    carregarPagina(paginaSalva);
  } else {
    carregarPagina('index.html'); // página padrão
  }
};
