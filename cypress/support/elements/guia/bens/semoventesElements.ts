// cypress/support/elements/guia/bens/semoventesElements.ts

export const semoventesElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns de Semoventes
  selectUf: 'select[formControlName="uf"]',
  selectMunicipio: 'select[formControlName="municipio"]',
  inputInscricaoEstadual: 'input[formControlName="inscricaoEstadual"]',
  labelInscricaoEstadual: 'label:contains("Inscrição Estadual")',
  selectGrupoDoSemovente: 'select[formControlName="grupoDoSemovente"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',
  textareaDescricao: 'textarea[formControlName="descricao"]',

  // Faixas Etárias / Eras (Bovinos e Bubalinos)
  containerEras: 'div.horizontal-centralize:contains("Eras/Faixa etária")',
  inputFaixa0a12M: 'input[formControlName="faixaEtaria0MAte12M"]',
  inputFaixa13a24M: 'input[formControlName="faixaEtaria13MAte24M"]',
  inputFaixa25a36M: 'input[formControlName="faixaEtaria25MAte36M"]',
  inputFaixaAcima36M: 'input[formControlName="faixaEtariaAcimaDe36M"]',

  // Campos Exclusivos Doação
  inputQuantidadeTotalDoada: 'input[formControlName="quantidadeTotalDoada"]',

  // Campos Exclusivos Causa Mortis
  inputFichaSaldoIagroAnexo: '#fichaDeSaldoDoIagroAnexo',
  inputQuantidadeTotalInventariada: 'input[formControlName="quantidadeTotalInventariada"]',
  checkboxBemParticularDoDeCujus: '#bemParticularDoDeCujus',

  // Suínos (opcional)
  inputQuantidadeAdultos: 'input[formControlName="quantidadeAdultos"]',
  inputValorUnitarioAdultos: 'input[formControlName="valorUnitarioAdultos"]',
  inputSubtotalAdultos: 'input[formControlName="subtotalAdultos"]',
  inputQuantidadeLeitoes: 'input[formControlName="quantidadeLeitoes"]',
  inputValorUnitarioLeitoes: 'input[formControlName="valorUnitarioLeitoes"]',
  inputSubtotalLeitoes: 'input[formControlName="subtotalLeitoes"]',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
