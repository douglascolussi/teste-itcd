// cypress/support/elements/guia/bens/ruralElements.ts

export const ruralElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns de Imóvel Rural
  selectUf: 'select[formControlName="uf"]',
  selectMunicipio: 'select[formControlName="municipio"]',
  inputMatricula: 'input[formControlName="matricula"]',

  containerPossuiCib: '.form-group:contains("cadastro imobiliário brasileiro")',
  inputNumeroCib: 'input[formControlName="numeroNoCadastroImobiliarioBrasileiro"]',

  containerPossuiIe: '.form-group:contains("Inscrição estadual")',
  inputInscricaoEstadual: 'input[formControlName="inscricaoEstadual"]',

  containerEhCadastradoCar: '.form-group:contains("cadastrado no CAR")',
  inputNumeroCar: 'input[formControlName="numeroNoCAR"]',

  containerCoordenadas: '.form-group:contains("coordenadas do imóvel")',
  inputLatitude: 'input[formControlName="latitudeDoImovel"]',
  inputLongitude: 'input[formControlName="longitudeDoImovel"]',

  selectDistanciaMunicipio: 'select[formControlName="distanciaAoMunicipioMaisProximo"]',
  selectQualidadeAcesso: 'select[formControlName="qualidadeDoAcessoAoImovel"]',
  selectDistanciaAsfalto: 'select[formControlName="distanciaAteAEstradaDeAsfalto"]',

  selectTipoImovel: 'select[formControlName="tipoDoImovel"]',
  inputNomeImovel: 'input[formControlName="nomeOuDescricaoDoImovel"]',
  inputAreaTotalMatricula: 'input[formControlName="areaTotalNaMatricula"]',

  containerHaDeclaracaoItr: '.form-group:contains("Declaração de ITR")',
  textareaJustificativaItr: 'textarea[formControlName="naoHaDeclaracaoDeITRJustificativa"]',

  inputAreaProdutosVegetais: 'input[formControlName="areaDeProdutosVegetais"]',
  inputAreaPastagem: 'input[formControlName="areaDePastagem"]',
  inputAreaReflorestamento: 'input[formControlName="areaDeReflorestamento"]',
  inputAreaRemanescente: 'input[formControlName="areaRemanescente"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',

  // Campos Exclusivos de Doação
  inputAreaDoada: 'input[formControlName="areaDoada"]',
  inputPercentualDoado: 'input[formControlName="percentualQueSeraDoado"]',

  // Campos Exclusivos de Causa Mortis
  inputCertidaoMatriculaAnexo: '#certidaoDeMatriculaAnexo',
  inputDataAquisicao: 'input[formControlName="dataDeAquisicao"]',
  checkboxAquisicaoNaoRegistrada: '#aquisicaoAindaNaoRegistrada',
  inputRegistroAquisicaoMatricula: 'input[formControlName="registroDeAquisicaoNaMatricula"]',
  inputCertidaoCarAnexo: '#certidaoDoCARAnexo',
  inputModuloRegiao: 'input[formControlName="moduloDaRegiao"]',
  inputPercentualPropriedadeDeCujus: 'input[formControlName="percentualDePropriedadeDoDeCujusEventualMeeiro"]',
  inputAreaInventariada: 'input[formControlName="areaInventariada"]',
  inputDeclaracaoItrAnexo: '#declaracaoDeITRAnexo',
  checkboxBemParticularDeCujus: '#bemParticularDoDeCujus',
  checkboxSolicitarIsencao: '#solicitarIsencaoParaEsteImovel',
  alertaIsencaoNaoDevida: '.help-block:contains("A área do imóvel na matrícula é superior ao módulo da região")',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
