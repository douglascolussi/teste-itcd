// cypress/support/elements/dadosGeraisElements.ts
export const dadosGeraisElements = {
  radioCausaMortis: 'label:contains("Causa Mortis") input', // Referente a Causa Mortis
  radioDoacao: 'label:contains("Doação") input',      // Referente a Doação
  selectTipoOperacao: 'select[formControlName="tipoOperacao"]',
  optionsTipoOperacao: 'option',
  inputProcesso: 'input[formControlName="numeroDoProcessoOuIdentificacaoDoCartorio"]',
  inputDataProtocolo: 'input[formControlName="dataDeProtocolo"]',
  inputCartorio: 'input[formControlName="cartorio"]',
  selectUfTramitacao: 'select[formControlName="ufTramitacao"]',

  // Radios
  radioSim: 'label:contains("Sim") input',
  radioNao: 'label:contains("Não") input',

  // Campos Condicionais
  inputDataObito: 'input[formControlName="dataObitoUsufrutuario"]',
  inputDataRegistroReserva: 'input[formControlName="dataRegistroReserva"]',
  inputDataNomeacaoInventariante: 'input[formControlName="dataNomeacaoInventariante"]',
  inputDataSentenca: 'input[formControlName="dataTransitoJulgadoJudicial"]',
  inputDataDoacao: 'input[formControlName="dataDaDoacao"]',
  inputProcessoTestamento: 'input[formControlName="processoJudicialAberturaRegistroCumprimentoTestamento"]',

  // Botões e estrutura
  btnAvancar: 'button:contains("Avançar")',
  btnVoltar: 'button:contains("Voltar")',
  containerDadosGerais: 'app-nova-guia'
} as const;
