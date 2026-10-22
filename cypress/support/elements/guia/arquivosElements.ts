// cypress/support/elements/guia/arquivosElements.ts

/**
 * Seletores da Aba e Formulário de Arquivos da Guia
 * Módulo: Guia > Arquivos
 */
export const arquivosElements = {
  // Navegação do Stepper / Wizard
  abaArquivos: 'a.step:contains("Arquivos")',
  conteudoAbaArquivos: '#tab21, app-arquivos-form',
  btnAvancar: 'button.btn-success-itcd:contains("Avançar"), button:contains("Avançar")',

  // Tabela de Arquivos
  tabelaArquivos: 'table#sample_1',
  linhaTabelaVazia: 'table#sample_1 tbody tr:contains("Nenhum arquivo foi incluído.")',
  linhasArquivos: 'table#sample_1 tbody tr.text-center-row',
  btnAdicionarArquivo: 'table#sample_1 thead a[title="Adicionar Arquivo"], a[title="Adicionar Arquivo"]:has(.fa-plus)',

  // Formulário de Inclusão/Edição de Arquivo na Linha
  linhaFormularioArquivo: 'table#sample_1 tbody tr[formgroup]',
  selectDescricao: 'select[formControlName="descricao"]',
  inputAnexo: 'input#anexoInput, input#anexo',
  btnSalvarArquivo: 'a[title="Adicionar Arquivo"]:has(.fa-check), a[title="Salvar Arquivo"]:has(.fa-check)',
  btnCancelarArquivo: 'a[title="Cancelar Adição"], a[title="Cancelar edição"]',

  // Ações na Linha de Arquivo Cadastrado
  btnEditarArquivo: 'a[title="Editar Arquivo"]',
  btnExcluirArquivo: 'a[title="Excluir Arquivo"]',
  btnDownloadArquivo: 'button[title="Fazer download"], a[title="Fazer download"]',

  // Modal de Confirmação de Exclusão
  modalExcluirArquivo: '#excluir-arquivo-confirmacao-modal',
  btnConfirmarExclusaoModal: '#excluir-arquivo-confirmacao-modal button:contains("Excluir")',
  btnCancelarExclusaoModal: '#excluir-arquivo-confirmacao-modal button[data-dismiss="modal"]',

  // Mensagens e Alertas
  alertaGlobal: '.app-alert, .app-alerts, ngx-alerts, div.alert',
} as const;
