// cypress/support/elements/guiaElements.ts
export const guiaElements = {
  tituloPagina: 'span:contains("Listagem de Declarações")',
  tabelaGuias: '#sample_1',
  linhasTabela: '.rowGuias',
  loadingSpinner: 'app-loading, .page-spinner-bar, .loading-message',
  
  // Ações na linha
  btnVisualizar: '.fa-eye',
  btnEditar: '.fa-pen-to-square',
  btnNovaGuia: 'a[routerLink="/nova-guia-declarante"]',
} as const;
