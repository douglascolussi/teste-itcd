// cypress/support/elements/guia/pessoas/donatarioElements.ts
export const donatarioElements = {
  // Acesso e Card do Donatário
  cardCadastrarDonatario: 'app-card-pessoa-cadastrar:contains("Cadastre aqui um Donatário") button',
  cardDonatarioCadastrado: 'app-card-pessoa-add:contains("Donatário (Beneficiário)")',

  // Form Container do Donatário
  tituloForm: 'app-form-pessoa-doacao h3:contains("Donatário")',
  form: 'app-form-pessoa-doacao form',

  // Campos específicos do Donatário
  inputQualificacao: 'app-form-pessoa-doacao input[formControlName="qualificacao"]',
  inputCpfCnpj: 'app-form-pessoa-doacao input[formControlName="cpf"]',
  inputEmail: 'app-form-pessoa-doacao input[formControlName="email"]',
  inputTelefone: 'app-form-pessoa-doacao input[formControlName="telefone"]',

  // Ações específicas
  btnSalvar: 'app-form-pessoa-doacao button.btn-success-itcd:contains("Salvar")',
  btnCancelar: 'app-form-pessoa-doacao button.blue:contains("Cancelar")',
  btnVoltar: 'app-form-pessoa-doacao button.btn-success-itcd-outline:contains("Voltar")'
} as const;
