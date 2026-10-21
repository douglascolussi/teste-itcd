// cypress/support/elements/guia/bens/numerariosElements.ts

export const numerariosElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns de Numerários/Aplicações/Títulos
  inputInstituicaoFinanceira: 'input[formControlName="instituicaoFinanceira"]',
  inputAgencia: 'input[formControlName="agencia"]',
  inputConta: 'input[formControlName="conta"]',
  selectTipo: 'select[formControlName="tipo"]',
  selectTipoDePrevidenciaPrivada: 'select[formControlName="tipoDePrevidenciaPrivada"]',
  radiosHaSeguroVinculado: 'input[formControlName="haSeguroVinculadoAoPlanoDePrevidencia"]',
  labelRadioHaSeguroSim: 'label.radio-inline:contains("Sim")',
  labelRadioHaSeguroNao: 'label.radio-inline:contains("Não")',
  inputRadioHaSeguroSim: 'label.radio-inline:contains("Sim") input',
  inputRadioHaSeguroNao: 'label.radio-inline:contains("Não") input',
  inputValorDoPeculioContratado: 'input[formControlName="valorDoPeculioContratado"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',

  // Campos Exclusivos de Causa Mortis
  inputExtratoDaInstituicaoFinanceiraAnexo: '#extratoDaInstituicaoFinanceiraAnexo',
  checkboxBemParticularDoDeCujus: '#bemParticularDoDeCujus',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
