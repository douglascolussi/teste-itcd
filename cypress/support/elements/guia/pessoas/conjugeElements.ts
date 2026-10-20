// cypress/support/elements/guia/pessoas/conjugeElements.ts
export const conjugeElements = {
  // Acesso e Card específico do Cônjuge
  cardCadastrarConjuge: 'app-card-pessoa-cadastrar:contains("Cadastre aqui o Cônjuge") button',
  cardConjugeCadastrado: 'app-view-edit-del-pessoa-card:contains("Cônjuge")',

  // Form Container do Cônjuge
  tituloForm: 'h3:contains("Cônjuge")',
  form: 'app-adicionar-ou-editar-herdeiro-form form',

  // Identificação e Falecimento do Cônjuge
  inputCpfCnpj: 'input[formControlName="cpfCnpj"]',
  containerJaFaleceu: '.form-group:contains("Esta pessoa já é falecida?")',
  inputDataDeObito: 'input[formControlName="dataDeObito"]',
  containerMomentoFalecimento: '.form-group:contains("Momento do falecimento")',
  radioMomentoAntes: 'label:contains("Antes ou Simultaneamente") input',
  radioMomentoDepois: 'label:contains("Depois do autor da herança") input',

  // Contato específicos do Cônjuge
  inputEmail: 'input[formControlName="email"]',
  inputTelefone: 'input[formControlName="telefone"]',

  // Renúncia específicos do Cônjuge
  containerRenuncia: '.form-group:contains("Esta pessoa renuncia ao seu quinhão?")',
  containerTipoRenuncia: '.form-group:contains("Tipo de renúncia")',
  radioAbdicativa: 'label:contains("Abdicativa") input',
  radioTranslativa: 'label:contains("Translativa") input',

  // Inventariante específicos do Cônjuge
  containerEhInventariante: '.form-group:contains("Essa pessoa é a Inventariante?")',
  inputTermoInventariante: '#termoDeNomeacaoDeInventariante',

  // Ações específicas do form de Cônjuge
  btnSalvar: 'app-adicionar-ou-editar-herdeiro-form button.btn-success-itcd:contains("Salvar")',
  btnVoltar: 'app-adicionar-ou-editar-herdeiro-form button.btn-success-itcd-outline:contains("Voltar")',

  // Modais de validação específicos do Cônjuge
  modalObito: '#basic',
  btnModalOk: '#basic button:contains("Ok")',
  modalInformativoPosMorto: '#informativo1',
  btnModalInformativoOk: '#informativo1 button:contains("Ok")'
} as const;
