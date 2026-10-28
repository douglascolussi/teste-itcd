// Import commands.ts using ES2015 syntax:
import './commands';

// Ignorar exceções não tratadas da aplicação (ex: erros de bibliotecas de terceiros como CKEditor)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false impede que o Cypress falhe o teste
  if (err.message.includes('unselectable') || err.message.includes('ckeditor')) {
    return false;
  }
  return true;
});

// Intercepta chamadas externas ao IBGE para garantir disponibilidade dos municípios em ambiente de teste
beforeEach(() => {
  cy.intercept('GET', '**/localidades/estados/**', [
    { id: 5002704, nome: 'Campo Grande' },
    { id: 5003702, nome: 'Dourados' },
    { id: 5008305, nome: 'Três Lagoas' },
    { id: 5003207, nome: 'Corumbá' }
  ]).as('ibgeMunicipios');

  // Intercepta todas as consultas de endereço por CEP para retornar dados mockados e evitar lentidão/falso erro
  cy.intercept('GET', /\/endereco\/[Gg]et_[Ee]ndereco.*/, (req) => {
    const match = req.url.match(/cep=([^&]*)/i);
    const cepParam = match ? decodeURIComponent(match[1]) : '79002070';
    const cepLimpo = cepParam.replace(/\D/g, '') || '79002070';

    req.reply({
      statusCode: 200,
      body: {
        cep: cepLimpo,
        tipoLogradouro: 'Rua',
        logradouro: 'Rua 14 de Julho',
        numero: '',
        bairro: 'Centro',
        complemento: '',
        municipio: 'Campo Grande',
        localidade: 'Campo Grande',
        uf: 'MS',
        estado: 'Mato Grosso do Sul',
        codMun: 5002704,
        ibge: '5002704'
      }
    });
  }).as('getCep');
});


// Hide XHR/Fetch logs from UI & Persistent Collapse Button for Cucumber
try {
  const rootTop = window.top as any;
  if (rootTop) {
    const doc = rootTop.document;

    // Injeta os estilos globais se ainda não existirem
    if (!doc.getElementById('cypress-helper-styles')) {
      const style = doc.createElement('style');
      style.id = 'cypress-helper-styles';
      style.innerHTML = `
        .command-name-request, .command-name-xhr { display: none !important; }
        
        #btn-recolher-passos {
          background: #231f20 !important;
          color: #00ffcc !important;
          border: 1px solid #00ffcc !important;
          padding: 3px 8px !important;
          border-radius: 4px !important;
          font-size: 11px !important;
          font-weight: bold !important;
          cursor: pointer !important;
          margin-left: 10px !important;
          vertical-align: middle !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
          z-index: 999999 !important;
        }
        #btn-recolher-passos:hover {
          background: #00ffcc !important;
          color: #231f20 !important;
        }
      `;
      doc.head.appendChild(style);
    }

    // Função persistente compilada no contexto de window.top (imune ao ciclo de vida e destruição de iframes/specs)
    rootTop.__recolherPassosCucumber = new rootTop.Function(`
      var totalFechados = 0;
      var recolherNoDoc = function(targetDoc) {
        if (!targetDoc) return;
        var expanders = targetDoc.querySelectorAll('svg.command-expander-is-open, .command-expander-is-open, .command-expander_isOpen');
        var clicked = [];
        expanders.forEach(function(el) {
          var column = el.closest('.command-expander-column-group, .command-expander-column') || el.parentElement;
          if (!column || !column.isConnected || clicked.indexOf(column) !== -1) {
            return;
          }
          clicked.push(column);
          if (typeof column.click === 'function') {
            column.click();
            totalFechados++;
          }
        });
      };

      recolherNoDoc(window.document);
      window.document.querySelectorAll('iframe').forEach(function(frame) {
        try {
          var frameDoc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
          if (frameDoc) recolherNoDoc(frameDoc);
        } catch (err) {}
      });

      console.log('[Cypress Helper] Passos recolhidos com sucesso: ' + totalFechados);
    `);

    // Função para garantir a presença e o vínculo atualizado do botão no header de window.top
    rootTop.__ensureCypressCucumberButton = new rootTop.Function(`
      var doc = window.document;
      if (!doc) return;
      var header = doc.querySelector('div[data-cy="runnable-header"], header');
      if (header) {
        var btn = doc.getElementById('btn-recolher-passos');
        if (!btn) {
          btn = doc.createElement('button');
          btn.id = 'btn-recolher-passos';
          btn.innerHTML = '📂 Recolher Passos';
          btn.title = 'Fecha todos os passos expandidos do Cucumber';
          header.appendChild(btn);
        }
        btn.onclick = window.__recolherPassosCucumber;
      }
    `);

    // Atualiza imediatamente o botão existente ou o cria
    rootTop.__ensureCypressCucumberButton();

    // Garante um único intervalo rodando no window.top
    if (!rootTop.__cypressCucumberInterval) {
      rootTop.__cypressCucumberInterval = rootTop.setInterval(rootTop.__ensureCypressCucumberButton, 800);
    }
  }
} catch (e) {
  console.error('Erro ao gerenciar o botão persistente:', e);
}