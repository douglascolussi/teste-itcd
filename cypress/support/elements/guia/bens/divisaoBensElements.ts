// cypress/support/elements/guia/bens/divisaoBensElements.ts

export const divisaoBensElements = {
  // Container e Tabela de Beneficiários / Partilha do Bem
  containerBeneficiarios: 'app-adicionar-ou-editar-beneficiario-table',
  tabelaBeneficiarios: 'app-adicionar-ou-editar-beneficiario-table table#sample_1',
  linhasBeneficiarios: 'app-adicionar-ou-editar-beneficiario-table table#sample_1 tbody tr.text-center-row',
  linhaBeneficiario: (identificador: string) =>
    `app-adicionar-ou-editar-beneficiario-table table#sample_1 tbody tr.text-center-row:contains("${identificador}")`,
  colunaPercentualIdeal: (identificador: string) =>
    `app-adicionar-ou-editar-beneficiario-table table#sample_1 tbody tr.text-center-row:contains("${identificador}") td:nth-child(2)`,
  colunaPercentualDeclarado: (identificador: string) =>
    `app-adicionar-ou-editar-beneficiario-table table#sample_1 tbody tr.text-center-row:contains("${identificador}") td:nth-child(3)`,
  inputPercentualDeclarado: (identificador: string) =>
    `app-adicionar-ou-editar-beneficiario-table table#sample_1 tbody tr.text-center-row:contains("${identificador}") td:nth-child(3) input`,

  // Checkbox de Bem Particular do de cujus
  checkboxBemParticular: '#bemParticularDoDeCujus',
  inputPercentualPropriedadeDeCujus: 'input[formControlName="percentualDePropriedadeDoDeCujusEventualMeeiro"]',
  inputValorTotalDeclarado: 'input[formControlName="valorTotalDeclarado"]',

  // Ações da Tabela de Partilha
  btnLimparCampos: 'app-adicionar-ou-editar-beneficiario-table button:contains("Limpar Campos")',
  msgErroDistribuicao: 'app-adicionar-ou-editar-beneficiario-table .help-block'
} as const;
