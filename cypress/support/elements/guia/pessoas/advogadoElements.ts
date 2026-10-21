// cypress/support/elements/guia/pessoas/advogadoElements.ts
export const advogadoElements = {
  // Acesso e Card específico do Advogado
  cardCadastrarAdvogado: 'app-card-pessoa-cadastrar:contains("Cadastre aqui o Advogado") button',
  cardAdvogadoCadastrado: 'app-view-edit-del-pessoa-card:contains("Advogado")',

  // Form Container do Advogado
  tituloForm: 'h3:contains("Advogado")',
  form: 'app-adicionar-ou-editar-advogado-form form',

  // Campos específicos
  inputNome: 'app-adicionar-ou-editar-advogado-form input[formControlName="nome"]',
  inputNumeroOAB: 'app-adicionar-ou-editar-advogado-form input[formControlName="numeroDaOAB"]',
  selectUfOAB: 'app-adicionar-ou-editar-advogado-form select[formControlName="ufDaOAB"]',
  inputEmail: 'app-adicionar-ou-editar-advogado-form input[formControlName="email"]',
  inputTelefone: 'app-adicionar-ou-editar-advogado-form input[formControlName="telefone"]',

  // Ações específicas do form de Advogado
  btnSalvar: 'app-adicionar-ou-editar-advogado-form button.btn-success-itcd:contains("Salvar")',
  btnVoltar: 'app-adicionar-ou-editar-advogado-form button.btn-success-itcd-outline:contains("Voltar")'
} as const;
