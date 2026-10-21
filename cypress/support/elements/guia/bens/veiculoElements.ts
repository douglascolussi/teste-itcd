// cypress/support/elements/guia/bens/veiculoElements.ts

export const veiculoElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns de Veículo
  inputPlaca: 'input[formControlName="placa"]',
  inputRenavam: 'input[formControlName="renavam"]',
  inputMarca: 'input[formControlName="marca"]',
  inputModelo: 'input[formControlName="modelo"]',
  inputAnoFabricacao: 'input[formControlName="anoFabricacao"]',
  inputAnoModelo: 'input[formControlName="anoModelo"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',

  // Campos Exclusivos Doação
  inputPercentualPropriedadeDoado: 'input[formControlName="percentualDePropriedadeTotalQueSeraDoado"]',

  // Campos Exclusivos Causa Mortis
  inputDataDeAquisicao: 'input[formControlName="dataDeAquisicao"]',
  inputPercentualPropriedadeDeCujus: 'input[formControlName="percentualDePropriedadeDoDeCujusEventualMeeiro"]',
  checkboxBemParticularDoDeCujus: '#bemParticularDoDeCujus',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
