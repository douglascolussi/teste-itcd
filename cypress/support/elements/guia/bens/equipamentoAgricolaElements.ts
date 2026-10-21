// cypress/support/elements/guia/bens/equipamentoAgricolaElements.ts

export const equipamentoAgricolaElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns
  inputMarca: 'input[formControlName="marca"]',
  inputModelo: 'input[formControlName="modelo"]',
  inputAno: 'input[formControlName="ano"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',

  // Campos Exclusivos de Doação
  inputTipo: 'input[formControlName="tipo"]',
  inputPercentualDoado: 'input[formControlName="percentualDePropriedadeTotalQueSeraDoado"]',

  // Campos Exclusivos de Causa Mortis
  inputEspecificacao: 'input[formControlName="especificacao"]',
  inputDataAquisicao: 'input[formControlName="dataDeAquisicao"]',
  inputPercentualDeCujusMeeiro: 'input[formControlName="percentualDePropriedadeDoDeCujusEventualMeeiro"]',
  checkboxBemParticularDoDeCujus: '#bemParticularDoDeCujus',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
