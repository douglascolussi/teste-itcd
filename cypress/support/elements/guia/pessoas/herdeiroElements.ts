// cypress/support/elements/guia/pessoas/herdeiroElements.ts
export const herdeiroElements = {
  // Acesso e Card específico do Herdeiro
  cardCadastrarHerdeiro: 'app-card-pessoa-cadastrar:contains("Cadastre aqui um Herdeiro") button',
  cardCadastrarHerdeiroAscendente: 'app-card-pessoa-cadastrar:contains("Cadastre aqui um Herdeiro Ascendente") button',
  cardCadastrarNeto: 'app-card-pessoa-cadastrar:contains("Cadastre aqui um Herdeiro descendente - Neto") button',
  cardCadastrarBisneto: 'app-card-pessoa-cadastrar:contains("Cadastre aqui um Herdeiro descendente - Bisneto") button',
  cardHerdeiroCadastrado: 'app-view-edit-del-pessoa-card:contains("Herdeiro")',
  cardHerdeiroPorRepresentacao: 'app-view-edit-del-pessoa-card:contains("Herdeiro por Representação")',

  // Form Container do Herdeiro
  tituloForm: 'h3:contains("Herdeiro")',
  form: 'app-adicionar-ou-editar-herdeiro-form form',

  // Qualificação e Tipo de Herdeiro
  inputQualificacao: 'input[title="Informe o tipo do herdeiro"]',
  selectTipoHerdeiro: 'select[formControlName="tipoHerdeiro"]',

  // Identificação e Falecimento do Herdeiro
  inputCpfCnpj: 'input[formControlName="cpfCnpj"]',
  containerJaFaleceu: '.form-group:contains("Esta pessoa já é falecida?")',
  inputDataDeObito: 'input[formControlName="dataDeObito"]',
  containerMomentoFalecimento: '.form-group:contains("Momento do falecimento")',
  radioMomentoAntes: 'label:contains("Antes") input',
  radioMomentoDepois: 'label:contains("Depois") input',

  // Pré-morto
  containerTinhaDescendenteVivo: '.form-group:contains("tinha descendente vivo na data do óbito")',

  // Contato específicos do Herdeiro
  inputEmail: 'input[formControlName="email"]',
  inputTelefone: 'input[formControlName="telefone"]',

  // Filho comum com cônjuge
  containerEhFilhoComum: '.form-group:contains("É filho(a) comum com o cônjuge")',

  // Renúncia específicos do Herdeiro
  containerRenuncia: '.form-group:contains("Esta pessoa renuncia ao seu quinhão?")',
  containerTipoRenuncia: '.form-group:contains("Tipo de renúncia")',
  radioAbdicativa: 'label:contains("Abdicativa") input',
  radioTranslativa: 'label:contains("Translativa") input',
  containerOutroHerdeiroMesmoGrau: '.form-group:contains("Existe outro herdeiro do mesmo grau")',
  containerOutroDescendenteDiferenteGrau: '.form-group:contains("Existe outro descendente de diferente grau")',
  containerExisteAscendente: '.form-group:contains("Existe herdeiro ascendente")',

  // Inventariante específicos do Herdeiro
  containerEhInventariante: '.form-group:contains("Essa pessoa é a Inventariante?")',
  inputTermoInventariante: '#termoDeNomeacaoDeInventariante',

  // Ações específicas do form de Herdeiro
  btnSalvar: 'app-adicionar-ou-editar-herdeiro-form button.btn-success-itcd:contains("Salvar")',
  btnVoltar: 'app-adicionar-ou-editar-herdeiro-form button.btn-success-itcd-outline:contains("Voltar")',

  // Modais de validação específicos do Herdeiro
  modalValidacao3: '#validacao3',
  btnModalValidacao3Ok: '#validacao3 button:contains("Ok")',
  modalValidacao4: '#validacao4',
  btnModalValidacao4Ok: '#validacao4 button:contains("Ok")',
  modalInformativoPosMorto: '#informativo1',
  btnModalInformativoOk: '#informativo1 button:contains("Ok")'
} as const;
