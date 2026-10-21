// cypress/support/elements/guia/pessoas/inventarianteElements.ts
export const inventarianteElements = {
  // Acesso e Card específico do Inventariante
  cardCadastrarInventariante: 'app-card-pessoa-cadastrar:contains("Cadastre aqui o Inventariante") button',
  cardInventarianteCadastrado: 'app-view-edit-del-pessoa-card:contains("Inventariante")',

  // Form Container do Inventariante
  tituloForm: 'h3:contains("Inventariante")',
  form: 'app-adicionar-ou-editar-inventariante-form form',

  // Identificação e Contato específicos
  inputCpf: 'app-adicionar-ou-editar-inventariante-form input[formControlName="cpfCnpj"]',
  inputEmail: 'app-adicionar-ou-editar-inventariante-form input[formControlName="email"]',
  inputTelefone: 'app-adicionar-ou-editar-inventariante-form input[formControlName="telefone"]',

  // Documento / Termo de Nomeação
  inputTermoInventariante: '#termoDeNomeacaoDeInventariante',

  // Ações específicas do form de Inventariante
  btnSalvar: 'app-adicionar-ou-editar-inventariante-form button.btn-success-itcd:contains("Salvar")',
  btnVoltar: 'app-adicionar-ou-editar-inventariante-form button.btn-success-itcd-outline:contains("Voltar")'
} as const;
