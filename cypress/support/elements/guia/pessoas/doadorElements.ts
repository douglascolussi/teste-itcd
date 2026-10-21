// cypress/support/elements/guia/pessoas/doadorElements.ts
export const doadorElements = {
  // Acesso e Card do Doador
  cardCadastrarDoador: 'app-card-pessoa-cadastrar:contains("Cadastre aqui o Doador") button',
  cardDoadorCadastrado: 'app-card-pessoa-add:contains("Doador (Transmitente)")',

  // Form Container do Doador
  tituloForm: 'app-form-pessoa-doacao h3:contains("Doador")',
  form: 'app-form-pessoa-doacao form',

  // Campos específicos do Doador
  inputQualificacao: 'app-form-pessoa-doacao input[formControlName="qualificacao"]',
  inputCpfCnpj: 'app-form-pessoa-doacao input[formControlName="cpf"]',
  inputEmail: 'app-form-pessoa-doacao input[formControlName="email"]',
  inputTelefone: 'app-form-pessoa-doacao input[formControlName="telefone"]',

  // Ações específicas
  btnSalvar: 'app-form-pessoa-doacao button.btn-success-itcd:contains("Salvar")',
  btnCancelar: 'app-form-pessoa-doacao button.blue:contains("Cancelar")',
  btnVoltar: 'app-form-pessoa-doacao button.btn-success-itcd-outline:contains("Voltar")'
} as const;
