// cypress/support/elements/guia/pessoas/falecidoElements.ts
export const falecidoElements = {
  // Acesso e Card específico do Falecido
  cardCadastrarFalecido: 'app-card-pessoa-cadastrar:contains("Cadastre aqui o Falecido") button',
  cardFalecidoCadastrado: 'app-view-edit-del-pessoa-card:contains("Falecido")',

  // Form Container do Falecido
  tituloForm: 'h3:contains("Falecido")',
  form: 'app-adicionar-ou-editar-falecido-form form',

  // Identificação e Dados de Óbito específicos do Falecido
  inputCpf: 'input[formControlName="cpf"]',
  inputDataDeObito: 'input[formControlName="dataDeObito"]',

  // Sucessão (Rádios específicos do Falecido)
  containerDescendentes: '.form-group:contains("descendente vivo")',
  containerAscendentes: '.form-group:contains("ascendente vivo")',

  // Estado Civil e Casamento (específicos do Falecido)
  selectEstadoCivil: 'select[formControlName="estadoCivil"]',
  selectRegimeDeCasamento: 'select[formControlName="regimeDeCasamento"]',
  inputDataDeCasamento: 'input[formControlName="dataDeCasamento"]',

  // Ações específicas do form de Falecido
  btnSalvar: 'app-adicionar-ou-editar-falecido-form .form-actions button.btn-success-itcd:contains("Salvar")',
  btnVoltar: 'app-adicionar-ou-editar-falecido-form .form-actions button.btn-success-itcd-outline:contains("Voltar")'
} as const;
