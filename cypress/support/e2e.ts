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

// Hide XHR/Fetch logs from UI
const app = window.top;
if (app && !app.document.head.querySelector('[data-hide-command-log-requests]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-requests', '');
  app.document.head.appendChild(style);
}
