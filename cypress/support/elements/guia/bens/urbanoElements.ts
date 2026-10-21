// cypress/support/elements/guia/bens/urbanoElements.ts

export const urbanoElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns de Imóvel Urbano
  selectUf: 'select[formControlName="uf"]',
  selectMunicipio: 'select[formControlName="municipio"]',
  inputMatricula: 'input[formControlName="matricula"]',
  inputCep: 'input[formControlName="cep"]',
  selectTipoLogradouro: 'select[formControlName="tipoDoLogradouro"]',
  inputLogradouro: 'input[formControlName="logradouro"]',
  checkboxNaoTemNumero: '#naoTemNumero',
  inputNumero: 'input[formControlName="numero"]',
  inputBairro: 'input[formControlName="bairro"]',
  textareaDescricaoComplemento: 'textarea[formControlName="descricaoOuComplemento"]',
  inputLote: 'input[formControlName="lote"]',
  inputQuadra: 'input[formControlName="quadra"]',
  selectTipoImovel: 'select[formControlName="tipoDoImovel"]',
  inputAreaTerreno: 'input[formControlName="areaDoTerreno"]',
  inputAreaConstruida: 'input[formControlName="areaConstruida"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',

  // Tabela Inscrição Municipal
  tabelaInscricoesMunicipais: 'app-adicionar-ou-editar-inscricao-municipal-table',
  btnAbrirAdicionarInscricaoMunicipal: 'app-adicionar-ou-editar-inscricao-municipal-table thead a[title="Adicionar Inscrição Municipal"]',
  inputInscricaoMunicipal: 'app-adicionar-ou-editar-inscricao-municipal-table input[formControlName="inscricaoMunicipal"]',
  inputFichaImobiliariaAnexo: '#inputImovel, #fichaImobiliariaDaPrefeituraAnexo',
  btnSalvarInscricaoMunicipal: 'app-adicionar-ou-editar-inscricao-municipal-table tbody a[title="Adicionar Inscrição Municipal"], app-adicionar-ou-editar-inscricao-municipal-table a:has(i.fa-check)',
  btnCancelarInscricaoMunicipal: 'app-adicionar-ou-editar-inscricao-municipal-table a[title="Cancelar adição"]',
  alertaMinimoInscricaoMunicipal: 'app-adicionar-ou-editar-inscricao-municipal-table .help-block:contains("Deve possuir pelo menos 1 item")',

  // Campos Exclusivos de Doação
  inputPercentualDoado: 'input[formControlName="percentualDePropriedadeTotalQueSeraDoado"]',

  // Campos Exclusivos de Causa Mortis
  inputCertidaoMatriculaAnexo: '#certidaoDeMatriculaAnexo',
  inputDataAquisicao: 'input[formControlName="dataDeAquisicao"]',
  checkboxAquisicaoNaoRegistrada: '#aquisicaoAindaNaoRegistrada',
  inputRegistroAquisicaoMatricula: 'input[formControlName="registroDeAquisicaoNaMatricula"]',
  inputPercentualPropriedadeDeCujus: 'input[formControlName="percentualDePropriedadeDoDeCujusEventualMeeiro"]',
  checkboxBemParticularDeCujus: '#bemParticularDoDeCujus',
  checkboxSolicitarIsencao: '#solicitarIsencaoParaEsteImovel',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
