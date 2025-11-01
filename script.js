/* =========================================================
   UI BÁSICA DO PAINEL (pt-BR) — sem Relatório / sem Chatbox
   Páginas: Home, Solicitações, Minha Conta
   ========================================================= */

/* ---------------------------
   DROPDOWN DO SIDEBAR (opcional)
   Só funciona se houver .side-dropdown na página
---------------------------- */
const sidebar = document.getElementById('sidebar');
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');

allDropdown.forEach(drop => {
  const trigger = drop.parentElement.querySelector('a:first-child');
  if (!trigger) return;
  trigger.addEventListener('click', (e) => {
    e.preventDefault();

    // fecha outros dropdowns abertos
    if (!trigger.classList.contains('active')) {
      allDropdown.forEach(d => {
        const t = d.parentElement.querySelector('a:first-child');
        t?.classList.remove('active');
        d.classList.remove('show');
      });
    }

    // alterna o atual
    trigger.classList.toggle('active');
    drop.classList.toggle('show');
  });
});


/* ---------------------------
   COLAPSAR / EXPANDIR SIDEBAR
---------------------------- */
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

// função para atualizar texto dos divisores
function atualizarDivisores(colapsado) {
  allSideDivider.forEach(div => {
    if (colapsado) {
      div.textContent = '-';
    } else {
      div.textContent = div.dataset.text || '';
    }
  });
}

// estado inicial
if (sidebar?.classList.contains('hide')) {
  atualizarDivisores(true);
  allDropdown.forEach(d => {
    d.parentElement.querySelector('a:first-child')?.classList.remove('active');
    d.classList.remove('show');
  });
} else {
  atualizarDivisores(false);
}

toggleSidebar?.addEventListener('click', () => {
  sidebar?.classList.toggle('hide');
  const colapsado = sidebar?.classList.contains('hide');
  atualizarDivisores(colapsado);

  // fechando dropdowns quando colapsa
  if (colapsado) {
    allDropdown.forEach(d => {
      d.parentElement.querySelector('a:first-child')?.classList.remove('active');
      d.classList.remove('show');
    });
  }
});

// quando mouse sai/entra do sidebar colapsado
sidebar?.addEventListener('mouseleave', function () {
  if (this.classList.contains('hide')) {
    allDropdown.forEach(d => {
      d.parentElement.querySelector('a:first-child')?.classList.remove('active');
      d.classList.remove('show');
    });
    atualizarDivisores(true);
  }
});

sidebar?.addEventListener('mouseenter', function () {
  if (this.classList.contains('hide')) {
    allDropdown.forEach(d => {
      d.parentElement.querySelector('a:first-child')?.classList.remove('active');
      d.classList.remove('show');
    });
    atualizarDivisores(false);
  }
});


/* ---------------------------
   DROPDOWN DO PERFIL (foto → menu)
---------------------------- */
const profile = document.querySelector('nav .profile');
const imgProfile = profile?.querySelector('img');
const dropdownProfile = profile?.querySelector('.profile-link');

imgProfile?.addEventListener('click', () => {
  dropdownProfile?.classList.toggle('show');
});


/* ---------------------------
   MENUS CONTEXTUAIS (três pontinhos)
   Mantido genérico caso você use em “Solicitações”/“Minha Conta”
---------------------------- */
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(box => {
  const icon = box.querySelector('.icon');
  const menuLink = box.querySelector('.menu-link');
  icon?.addEventListener('click', () => {
    menuLink?.classList.toggle('show');
  });
});

// clicar fora fecha menus e dropdown do perfil
window.addEventListener('click', (e) => {
  if (dropdownProfile && e.target !== imgProfile && !dropdownProfile.contains(e.target)) {
    dropdownProfile.classList.remove('show');
  }
  allMenu.forEach(box => {
    const icon = box.querySelector('.icon');
    const menuLink = box.querySelector('.menu-link');
    if (menuLink && e.target !== icon && !menuLink.contains(e.target)) {
      menuLink.classList.remove('show');
    }
  });
});


/* ---------------------------
   PROGRESS BAR (opcional)
   Só aplica se houver .card .progress com data-value
---------------------------- */
const allProgress = document.querySelectorAll('main .card .progress');
allProgress.forEach(p => {
  if (p.dataset.value) p.style.setProperty('--value', p.dataset.value);
});


/* ---------------------------
   LINK ATIVO (sidebar / topbar)
   Marca ativo com base no arquivo atual
---------------------------- */
(function destacarLinkAtivo() {
  const atual = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('a[href]');
  links.forEach(a => {
    try {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      const same = href.endsWith(atual);
      a.classList.toggle('active', same);
    } catch { /* ignora erros de URL */ }
  });
})();

/* ---------------------------------------------------------
   Removidos: código de APEXCHARTS / Relatório de Vendas
              e qualquer lógica de Chatbox
   --------------------------------------------------------- */
