// cypress/support/elements/guia/guiaElements.ts
export const guiaElements = {
  tituloPagina: 'span:contains("Listagem de Declarações")',
  tabelaGuias: '#sample_1',
  linhasTabela: '.rowGuias',
  loadingSpinner: 'app-loading, .page-spinner-bar, .loading-message',
  
  // Ações na linha
  btnVisualizar: '.fa-eye',
  btnEditar: '.fa-pen-to-square',
  btnNovaGuia: 'a[routerLink="/nova-guia-declarante"]',

  // Ações do Wizard de Nova Guia
  btnSalvarRascunho: 'button[data-target="#confirma-rascunho"]',
  btnSalvarEncaminharAnalise: 'button[data-target="#confirma-encaminhar"]',
  modalConfirmaRascunho: '#confirma-rascunho',
  modalConfirmaEncaminhar: '#confirma-encaminhar',
  btnConfirmarRascunhoSim: '#confirma-rascunho button.btn-success-itcd:contains("Sim")',
  btnConfirmarEncaminharSim: '#confirma-encaminhar button.btn-success-itcd:contains("Sim")',
  alertaSucesso: '.app-alert, .app-alerts, ngx-alerts, div.alert',
} as const;
