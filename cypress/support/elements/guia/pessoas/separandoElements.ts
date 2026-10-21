// cypress/support/elements/guia/pessoas/separandoElements.ts
export const separandoElements = {
  // Acesso e Card do Separando
  cardCadastrarSeparando: 'app-card-pessoa-cadastrar:contains("Cadastre aqui o Separando") button',
  cardSeparandoCadastrado: 'app-view-edit-del-pessoa-card:contains("Separando")',

  // Form Container do Separando
  tituloForm: 'app-separando-form h3:contains("Separando")',
  form: 'app-separando-form form',

  // Campos específicos do Separando
  selectQualificacao: 'app-separando-form select[formControlName="qualificacao"]',
  inputCpf: 'app-separando-form input[formControlName="cpf"]',
  inputEmail: 'app-separando-form input[formControlName="email"]',
  inputTelefone: 'app-separando-form input[formControlName="telefone"]',

  // Ações específicas
  btnSalvar: 'app-separando-form button.btn-success-itcd:contains("Salvar")',
  btnCancelar: 'app-separando-form button.blue:contains("Cancelar")',
  btnVoltar: 'app-separando-form button.btn-success-itcd-outline:contains("Voltar")'
} as const;
