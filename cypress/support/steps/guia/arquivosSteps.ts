// cypress/support/steps/guia/arquivosSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { arquivosPage } from '../../pageobjects/guia/arquivosPage';

// Navegação
When('acesso a aba "Arquivos"', () => {
  arquivosPage.acessarAbaArquivos();
});

When('clico no botão avançar no wizard', () => {
  arquivosPage.clicarAvancar();
});

// Ações de Adição de Arquivo
When('clico para adicionar um Arquivo', () => {
  arquivosPage.clicarAdicionarArquivo();
});

When('seleciono a descrição do arquivo {string}', (descricao: string) => {
  arquivosPage.selecionarDescricao(descricao);
});

When('anexo o arquivo {string}', (nomeArquivo: string) => {
  arquivosPage.anexarArquivo(nomeArquivo);
});

When('anexo um arquivo com extensão inválida {string}', (nomeArquivo: string) => {
  arquivosPage.anexarArquivoInvalido(nomeArquivo);
});

When('anexo um arquivo que ultrapassa 4MB {string}', (nomeArquivo: string) => {
  arquivosPage.anexarArquivoPesado(nomeArquivo);
});

When('clico em salvar arquivo', () => {
  arquivosPage.salvarArquivo();
});

When('clico em cancelar adição do arquivo', () => {
  arquivosPage.cancelarArquivo();
});

// Ações de Edição
When('clico para editar o primeiro arquivo da lista', () => {
  arquivosPage.clicarEditarPrimeiroArquivo();
});

When('seleciono a descrição do arquivo na edição {string}', (descricao: string) => {
  arquivosPage.selecionarDescricaoEdicao(descricao);
});

When('clico em salvar edição do arquivo', () => {
  arquivosPage.salvarEdicaoArquivo();
});

// Ações de Exclusão
When('clico para excluir o primeiro arquivo da lista', () => {
  arquivosPage.clicarExcluirPrimeiroArquivo();
});

When('confirmo a exclusão no modal', () => {
  arquivosPage.confirmarExclusaoModal();
});

// Validações e Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do arquivo', (mensagem: string, campo: string) => {
  if (campo === 'Descrição') {
    arquivosPage.validarMensagemErroDescricao(mensagem);
  }
});

Then('devo visualizar a mensagem {string} para o campo {string} do anexo', (mensagem: string, campo: string) => {
  if (campo === 'Arquivo') {
    arquivosPage.validarMensagemErroAnexo(mensagem);
  }
});

Then('devo visualizar a mensagem de erro {string} para o anexo', (mensagem: string) => {
  arquivosPage.validarMensagemErroAnexo(mensagem);
});

Then('devo visualizar o alerta {string}', (mensagem: string) => {
  arquivosPage.validarAlertaGlobal(mensagem);
});

Then('o arquivo deve estar cadastrado na tabela de arquivos com descrição {string} e nome {string}', (descricao: string, nomeArquivo: string) => {
  arquivosPage.validarArquivoNaTabela(descricao, nomeArquivo);
});

Then('devo visualizar a mensagem de tabela vazia {string}', (mensagem: string) => {
  arquivosPage.validarTabelaVazia(mensagem);
});

Then('o formulário de inclusão de arquivo não deve estar visível', () => {
  arquivosPage.validarFormularioAdicaoFechado();
});

Then('devo permanecer na aba "Arquivos"', () => {
  arquivosPage.validarPermanenciaNaAbaArquivos();
});
