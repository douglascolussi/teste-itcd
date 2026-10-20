// cypress/support/elements/guia/pessoas/pessoasElements.ts
export const pessoasElements = {
  // Navegação no stepper da guia
  stepPessoas: 'a.step:contains("Pessoas")',

  // Identificação comum
  inputNome: 'input[formControlName="nome"]',

  // Rádios comuns Sim / Não
  radioSim: 'label:contains("Sim") input',
  radioNao: 'label:contains("Não") input',

  // Endereço comum a todos os formulários de pessoas
  inputCep: 'input[formControlName="cep"]',
  inputEndereco: 'input[formControlName="endereco"]',
  inputBairro: 'input[formControlName="bairro"]',
  inputNumero: 'input[formControlName="numero"]',
  inputComplemento: 'input[formControlName="complemento"]',
  selectUf: 'select[formControlName="uf"]',
  selectMunicipio: 'select[formControlName="municipio"]',

  // Loader global de consulta
  loaderBlock: '.loader-block'
} as const;
