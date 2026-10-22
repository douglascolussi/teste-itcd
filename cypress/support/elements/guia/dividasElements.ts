// cypress/support/elements/guia/dividasElements.ts

/**
 * Seletores da Aba e Formulário de Anexo de Arquivos de Dívidas da Guia
 * Módulo: Guia > Dívidas
 */
export const dividasElements = {
  // Navegação do Stepper / Wizard
  abaDividas: 'a.step:contains("Dívidas")',
  conteudoAbaDividas: '#tab22, app-dividas-form',
  abaBens: 'a.step:contains("Bens")',

  // Tabelas de Pré-requisito (Bens e Arquivos)
  linhasTabelaBens: '.table-scrollable table.table tbody tr',
  linhasTabelaBensValidos: '.table-scrollable table.table tbody tr:not(:contains("Nenhum bem"))',
  linhasTabelaArquivos: 'table#sample_1 tbody tr.text-center-row',

  // Botão de abertura do formulário de dívida
  btnAdicionarDivida: '#divAddDivida button:contains("Adicionar Dívida"), button:contains("Adicionar Dívida")',
  formDivida: 'form#dividaForm',

  // Tabela de Arquivos/Anexos de Dívida
  tabelaAnexosDivida: 'app-adicionar-ou-editar-divida-table table',
  linhaTabelaVazia: 'app-adicionar-ou-editar-divida-table tbody td:contains("Nenhuma dívida foi inserido até agora")',
  linhasAnexos: 'app-adicionar-ou-editar-divida-table tbody tr.text-center-row',
  btnAdicionarAnexoDivida: 'app-adicionar-ou-editar-divida-table thead a, app-adicionar-ou-editar-divida-table a:has(.fa-plus)',

  // Formulário de Inclusão/Edição de Anexo na Linha da Tabela
  linhaFormularioAnexo: 'app-adicionar-ou-editar-divida-table tbody tr[formgroup]',
  selectDescricaoAnexo: 'app-adicionar-ou-editar-divida-table select[formcontrolname="descricao"]',
  inputArquivoAnexo: 'app-adicionar-ou-editar-divida-table input#inputDivida[type="file"], app-adicionar-ou-editar-divida-table input[type="file"]',
  btnSalvarAnexo: 'app-adicionar-ou-editar-divida-table tbody a:has(.fa-check)',
  btnCancelarAnexo: 'app-adicionar-ou-editar-divida-table tbody a:has(.fa-xmark)',

  // Ações na Linha de Anexo Cadastrado
  btnEditarAnexo: 'app-adicionar-ou-editar-divida-table tbody a:has(.fa-pen-to-square)',
  btnExcluirAnexo: 'app-adicionar-ou-editar-divida-table tbody a:has(.fa-trash-can)',
  btnDownloadAnexo: 'app-adicionar-ou-editar-divida-table button[title="Fazer download"], app-adicionar-ou-editar-divida-table a[title="Fazer download"]',

  // Modal de Confirmação de Exclusão de Anexo
  modalExcluirAnexo: '#excluir-inscricao-municipal-confirmacao-modal',
  btnConfirmarExclusaoModal: '#excluir-inscricao-municipal-confirmacao-modal button:contains("Excluir")',
  btnCancelarExclusaoModal: '#excluir-inscricao-municipal-confirmacao-modal button[data-dismiss="modal"]',

  // Vínculo da Dívida com Bens
  selectEstaVinculadaABem: 'select[formControlName="estaVinculadaABem"]',
  selectBemVinculado: 'select[formControlName="bemVinculadoId"]',
  opcoesBemVinculado: 'select[formControlName="bemVinculadoId"] option',
  msgErroBemVinculado: 'select[formControlName="bemVinculadoId"] ~ div .help-block, .has-error:has(select[formControlName="bemVinculadoId"]) .help-block',
  selectNaturezaDivida: 'select[formControlName="natureza"]',
  checkboxSeguroPrestamista: 'input[formControlName="cobertaPorSeguroPrestamista"]',
  btnSalvarDivida: '#divAcoes button:contains("Salvar")',
  btnCancelarDivida: '#divAcoes button:contains("Cancelar")',

  // Campos Comuns de Bens Auxiliares (Causa Mortis, Doação e Separação)
  inputDataAquisicaoBem: 'input[formControlName="dataDeAquisicao"]:enabled',
  inputPercentualPropriedadeDeCujus: 'input[formControlName="percentualDePropriedadeDoDeCujusEventualMeeiro"]:enabled',
  checkboxBemParticularDeCujus: '#bemParticularDoDeCujus:enabled',
  inputPercentualPropriedadeCasal: 'input[formControlName="percentualDePropriedadeDoCasal"]:enabled',
  selectBemIraPertencerAQuem: 'select[formControlName="oBemIraPertencerAQuem"]',
  inputPercentualPropriedadeSeparando: 'input[formControlName="percentualDePropriedadeParaOSeparando"]:enabled',
  inputPercentualPropriedadeDoada: 'input[formControlName="percentualDePropriedadeTotalQueSeraDoado"]:enabled',

  // Mensagens e Alertas
  alertaGlobal: '.app-alert, .app-alerts, ngx-alerts, div.alert',
} as const;
