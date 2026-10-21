// cypress/support/elements/guia/pessoas/separandaElements.ts
export const separandaElements = {
  // Acesso e Card da Separanda
  cardCadastrarSeparanda: 'app-card-pessoa-cadastrar:contains("Cadastre aqui a Separanda") button',
  cardSeparandaCadastrada: 'app-view-edit-del-pessoa-card:contains("Separanda")',

  // Form Container da Separanda
  tituloForm: 'app-separando-form h3:contains("Separanda")',
  form: 'app-separando-form form',

  // Campos específicos da Separanda
  selectQualificacao: 'app-separando-form select[formControlName="qualificacao"]',
  inputCpf: 'app-separando-form input[formControlName="cpf"]',
  inputEmail: 'app-separando-form input[formControlName="email"]',
  inputTelefone: 'app-separando-form input[formControlName="telefone"]',

  // Ações específicas
  btnSalvar: 'app-separando-form button.btn-success-itcd:contains("Salvar")',
  btnCancelar: 'app-separando-form button.blue:contains("Cancelar")',
  btnVoltar: 'app-separando-form button.btn-success-itcd-outline:contains("Voltar")'
} as const;
