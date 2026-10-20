// cypress/support/elements/falecidoElements.ts
export const falecidoElements = {
  // Acesso a Pessoas e Cards
  stepPessoas: 'a.step:contains("Pessoas")',
  cardCadastrarFalecido: 'app-card-pessoa-cadastrar:contains("Cadastre aqui o Falecido") button',
  cardFalecidoCadastrado: 'app-view-edit-del-pessoa-card:contains("Falecido")',

  // Form Container
  tituloForm: 'h3:contains("Falecido")',
  form: 'app-adicionar-ou-editar-falecido-form form',

  // Identificação
  inputCpf: 'input[formControlName="cpf"]',
  inputNome: 'input[formControlName="nome"]',
  inputDataDeObito: 'input[formControlName="dataDeObito"]',

  // Sucessão (Rádios)
  containerDescendentes: '.form-group:contains("descendente vivo")',
  containerAscendentes: '.form-group:contains("ascendente vivo")',
  radioSim: 'label:contains("Sim") input',
  radioNao: 'label:contains("Não") input',

  // Estado Civil e Casamento
  selectEstadoCivil: 'select[formControlName="estadoCivil"]',
  selectRegimeDeCasamento: 'select[formControlName="regimeDeCasamento"]',
  inputDataDeCasamento: 'input[formControlName="dataDeCasamento"]',

  // Endereço
  inputCep: 'input[formControlName="cep"]',
  inputEndereco: 'input[formControlName="endereco"]',
  inputBairro: 'input[formControlName="bairro"]',
  inputNumero: 'input[formControlName="numero"]',
  inputComplemento: 'input[formControlName="complemento"]',
  selectUf: 'select[formControlName="uf"]',
  selectMunicipio: 'select[formControlName="municipio"]',

  // Botões de Ação
  btnSalvar: 'button:contains("Salvar")',
  btnVoltar: 'button:contains("Voltar")',

  // Alerta de sucesso
  alertSuccess: '.ngx-alerts, .alert-success'
} as const;
