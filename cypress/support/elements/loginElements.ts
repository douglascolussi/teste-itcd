// cypress/support/elements/loginElements.ts
export const loginElements = {
  // URLs de login direto fornecidas pelo usuário
  // Bases das URLs de login (o CPF será concatenado dinamicamente)
  urlContribuinteBase: '/#/login?id=contribuinte1',
  urlGerencialBase: '/#/login?id=gerencial1',

  // Elementos reais visíveis na screenshot
  dashboardHome: '.sidebar-menu, .page-sidebar', // Container do menu
  menuDeclaracoes: 'span:contains("Declarações")',
  menuDaems: 'span:contains("DAEMS")',
  
  // Botões grandes centrais (Cards)
  cardDeclaracoes: '.blue-sharp:contains("DECLARAÇÕES")',
  cardDaems: '.pink:contains("DAEMS")',
  
  // Feedback
  msgSucesso: '.alert-success, .toast-success',
} as const;
