// cypress/support/elements/declaranteElements.ts
export const declaranteElements = {
  inputCpf: 'input[formControlName="cpf"]',
  inputNome: 'input[formControlName="nome"]',
  inputEmail: 'input[formControlName="email"]',
  inputTelefone: 'input[formControlName="telefone"]',
  inputCep: 'input[formControlName="cep"]',
  inputEndereco: 'input[formControlName="endereco"]',
  inputNumero: 'input[formControlName="numero"]',
  inputBairro: 'input[formControlName="bairro"]',
  inputComplemento: 'input[formControlName="complemento"]',
  selectUf: 'select[formControlName="uf"]',
  selectMunicipio: 'select[formControlName="municipio"]',
  
  checkTermos: 'label:contains("Declaro que li e concordo") input',
  btnIniciar: '#btnIniciarDeclaracao',
  msgErro: '.help-block',
  loadingSpinner: '.page-spinner-bar, app-loading, .loading-message'
} as const;
