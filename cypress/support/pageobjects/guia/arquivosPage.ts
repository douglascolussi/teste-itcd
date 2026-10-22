// cypress/support/pageobjects/guia/arquivosPage.ts
import { arquivosElements as el } from '../../elements/guia/arquivosElements';

/**
 * PageObject da Aba e Tabela de Arquivos da Guia
 * Responsável por todas as ações e validações no módulo de anexo de arquivos.
 */
export class ArquivosPage {
  // Navegação
  acessarAbaArquivos(): this {
    cy.get(el.abaArquivos, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
    return this;
  }

  validarPermanenciaNaAbaArquivos(): this {
    cy.get(el.conteudoAbaArquivos, { timeout: 10000 }).should('be.visible');
    return this;
  }

  clicarAvancar(): this {
    cy.get(el.btnAvancar).should('be.visible').click({ force: true });
    return this;
  }

  // Ações de Inclusão de Arquivo
  clicarAdicionarArquivo(): this {
    cy.get(el.btnAdicionarArquivo, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectDescricao, { timeout: 10000 }).should('be.visible');
    return this;
  }

  selecionarDescricao(descricao: string): this {
    cy.get(el.selectDescricao).should('be.visible').select(descricao);
    return this;
  }

  anexarArquivo(nomeArquivo = 'documento_teste.pdf', tamanhoMb = 1, tipoMime = 'application/pdf'): this {
    const tamanhoBytes = tamanhoMb * 1024 * 1024;
    const conteudo = Cypress.Buffer.alloc(tamanhoBytes, 'a');

    cy.get(el.inputAnexo).selectFile(
      {
        contents: conteudo,
        fileName: nomeArquivo,
        mimeType: tipoMime,
      },
      { force: true }
    );
    cy.wait(300);
    return this;
  }

  anexarArquivoInvalido(nomeArquivo = 'executavel.exe'): this {
    cy.get(el.inputAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('conteudo binario executavel'),
        fileName: nomeArquivo,
        mimeType: 'application/x-msdownload',
      },
      { force: true }
    );
    cy.wait(300);
    return this;
  }

  anexarArquivoPesado(nomeArquivo = 'documento_pesado.pdf'): this {
    const tamanhoBytes = 5 * 1024 * 1024; // 5MB (ultrapassa limite de 4MB)
    const conteudo = Cypress.Buffer.alloc(tamanhoBytes, '0');

    cy.get(el.inputAnexo).selectFile(
      {
        contents: conteudo,
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
    return this;
  }

  salvarArquivo(): this {
    cy.get(el.btnSalvarArquivo).first().click({ force: true });
    cy.wait(300);
    return this;
  }

  cancelarArquivo(): this {
    cy.get(el.btnCancelarArquivo).first().click({ force: true });
    cy.wait(300);
    return this;
  }

  // Ações de Edição
  clicarEditarPrimeiroArquivo(): this {
    cy.get(el.btnEditarArquivo).first().click({ force: true });
    cy.get(el.selectDescricao, { timeout: 10000 }).should('be.visible');
    return this;
  }

  selecionarDescricaoEdicao(descricao: string): this {
    cy.get(el.selectDescricao).should('be.visible').select(descricao);
    return this;
  }

  salvarEdicaoArquivo(): this {
    cy.get(el.btnSalvarArquivo).first().click({ force: true });
    cy.wait(300);
    return this;
  }

  // Ações de Exclusão
  clicarExcluirPrimeiroArquivo(): this {
    cy.get(el.btnExcluirArquivo).first().click({ force: true });
    cy.get(el.modalExcluirArquivo, { timeout: 10000 }).should('be.visible');
    return this;
  }

  confirmarExclusaoModal(): this {
    cy.get(el.btnConfirmarExclusaoModal).click({ force: true });
    cy.wait(300);
    return this;
  }

  // Asserções
  validarMensagemErroDescricao(mensagem: string): this {
    cy.get(el.selectDescricao)
      .closest('.form-group')
      .find('.help-block')
      .should('be.visible')
      .and('contain', mensagem);
    return this;
  }

  validarMensagemErroAnexo(mensagem: string): this {
    cy.get(el.inputAnexo)
      .closest('.form-group')
      .find('.help-block')
      .should('be.visible')
      .and('contain', mensagem);
    return this;
  }

  validarAlertaGlobal(mensagem: string): this {
    cy.contains(el.alertaGlobal, mensagem, { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  validarArquivoNaTabela(descricao: string, nomeArquivo: string): this {
    cy.get(el.tabelaArquivos, { timeout: 15000 })
      .filter(':visible')
      .within(() => {
        cy.contains('td', descricao).should('be.visible');
        cy.contains('td', nomeArquivo).should('be.visible');
      });
    return this;
  }

  validarTabelaVazia(mensagem = 'Nenhum arquivo foi incluído.'): this {
    cy.get(el.tabelaArquivos)
      .filter(':visible')
      .within(() => {
        cy.contains('td', mensagem).should('be.visible');
      });
    return this;
  }

  validarFormularioAdicaoFechado(): this {
    cy.get(el.selectDescricao).should('not.exist');
    return this;
  }
}

export const arquivosPage = new ArquivosPage();
