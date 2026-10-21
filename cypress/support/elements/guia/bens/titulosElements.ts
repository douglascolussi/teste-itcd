// cypress/support/elements/guia/bens/titulosElements.ts

export const titulosElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns de Títulos Negociados em Bolsa
  inputInstituicaoCustodia: 'input[formControlName="instituicaoDeCustodia"]',
  selectTipo: 'select[formControlName="tipo"]',
  inputIdentificacaoTicker: 'input[formControlName="identificacaoOuTicker"]',
  inputQuantidadeCriptoMoeda: 'input[formControlName="quantidadeCriptoMoeda"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',

  // Campos Exclusivos de Doação
  inputQuantidadeDoada: 'input[formControlName="quantidadeDoada"]',

  // Campos Exclusivos de Causa Mortis
  inputExtratoCustodiaAnexo: '#extratoDaInstituicaoDeCustodiaAnexo',
  inputQuantidadeInventariada: 'input[formControlName="quantidadeInventariada"]',
  checkboxBemParticularDeCujus: '#bemParticularDoDeCujus',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
