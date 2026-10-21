// cypress/support/pageobjects/guia/bens/graosPage.ts
import { graosElements as el } from '../../../elements/guia/bens/graosElements';

export class GraosPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieGraos() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Grãos/Produtos agrícolas');
    cy.wait(300);
  }

  salvarBem() {
    cy.get(el.btnSalvarBem, { timeout: 10000 })
      .filter(':visible')
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(500);
  }

  cancelar() {
    cy.get(el.btnCancelarBem).scrollIntoView().should('be.visible').click({ force: true });
  }

  // Preenchimento de Campos Comuns
  selecionarProduto(produto: string) {
    cy.get(el.selectProduto).should('be.visible').select(produto);
    cy.wait(200);
  }

  selecionarUnidade(unidade: string) {
    cy.get(el.selectUnidade).should('be.visible').select(unidade);
    cy.wait(200);
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Campos Exclusivos Doação
  preencherQuantidadeDoada(quantidade: string) {
    cy.get(el.inputQuantidadeDoada).should('be.visible').clear().type(quantidade).blur();
  }

  // Campos Exclusivos Causa Mortis
  preencherQuantidadeInventariada(quantidade: string) {
    cy.get(el.inputQuantidadeInventariada).should('be.visible').clear().type(quantidade).blur();
  }

  marcarBemParticularDeCujus(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxBemParticularDoDeCujus).check({ force: true });
    } else {
      cy.get(el.checkboxBemParticularDoDeCujus).uncheck({ force: true });
    }
  }

  // Asserções
  validarMensagemErroCampo(campo: string, mensagem: string) {
    const mapaCampos: { [key: string]: string } = {
      'Produto': el.selectProduto,
      'Quantidade doada': el.inputQuantidadeDoada,
      'Quantidade inventariada': el.inputQuantidadeInventariada,
      'Unidade': el.selectUnidade,
      'Valor Total Declarado': el.inputValorTotalDeclarado,
    };

    const seletor = mapaCampos[campo];
    if (seletor) {
      cy.get(seletor)
        .closest('.form-group')
        .find('.help-block')
        .should('be.visible')
        .and('contain', mensagem);
    } else {
      cy.contains('.form-group', campo)
        .find('.help-block')
        .should('be.visible')
        .and('contain', mensagem);
    }
  }

  validarAlertaGlobal(mensagem: string) {
    cy.get(el.alertaGlobal, { timeout: 10000 }).should('be.visible').and('contain', mensagem);
  }

  validarBemNaTabela(especie: string, resumo: string, valorDeclarado: string) {
    cy.get(el.tabelaBens, { timeout: 15000 })
      .filter(':visible')
      .first()
      .within(() => {
        cy.contains('td', especie).should('be.visible');
        cy.contains('td', resumo).should('be.visible');
        cy.contains('td', valorDeclarado).should('be.visible');
      });
  }
}

export const graosPage = new GraosPage();
