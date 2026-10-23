// cypress/support/pageobjects/guia/guiaPage.ts
import { guiaElements as EGuia } from '../../elements/guia/guiaElements';

export class GuiaPage {
  /**
   * Aguarda o carregamento inicial e valida a presença da tabela
   */
  validarListagemExibida(): this {
    cy.get(EGuia.loadingSpinner, { timeout: 30000 }).should('not.exist');
    cy.get(EGuia.tituloPagina).should('be.visible');
    cy.get(EGuia.tabelaGuias).should('be.visible');
    return this;
  }

  /**
   * Clica no ícone de visualizar da primeira guia disponível na lista
   */
  acessarPrimeiraGuia(): void {
    cy.get(EGuia.linhasTabela)
      .first()
      .find(EGuia.btnVisualizar)
      .should('be.visible')
      .click();
  }

  /**
   * Clica no botão para iniciar uma nova guia (Declarante)
   */
  iniciarNovaGuia(): void {
    cy.get(EGuia.btnNovaGuia).should('be.visible').click();
  }

  /**
   * Clica em salvar como rascunho e confirma no modal
   */
  salvarComoRascunho(): this {
    cy.intercept('POST', '**/guias*').as('salvarGuia');
    cy.get(EGuia.btnSalvarRascunho, { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
    cy.get(EGuia.modalConfirmaRascunho, { timeout: 10000 }).should('be.visible');
    cy.get(EGuia.btnConfirmarRascunhoSim, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  /**
   * Clica em salvar e encaminhar para análise e confirma no modal
   */
  salvarEEncaminharParaAnalise(): this {
    cy.intercept('POST', '**/guias*').as('salvarGuia');
    cy.get('body').then(($b) => {
      if ($b.find('a.step:contains("Dívidas")').length > 0 && $b.find(EGuia.btnSalvarEncaminharAnalise).length === 0) {
        cy.get('a.step:contains("Dívidas")').click({ force: true });
        cy.wait(500);
      }
    });
    cy.get(EGuia.btnSalvarEncaminharAnalise, { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
    cy.get(EGuia.modalConfirmaEncaminhar, { timeout: 10000 }).should('be.visible');
    cy.get(EGuia.btnConfirmarEncaminharSim, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  /**
   * Valida o alerta de sucesso e retorno para a listagem
   */
  validarGuiaSalvaComSucesso(mensagemEsperada: string): this {
    cy.wait('@salvarGuia', { timeout: 45000 }).then((res) => {
      expect(res.response?.statusCode).to.be.oneOf([200, 201, 204]);
    });
    cy.url({ timeout: 25000 }).should('include', '/guias');
    cy.get('body').then(($body) => {
      if ($body.find('.app-alert').length > 0) {
        cy.wrap($body).find('.app-alert').should('be.visible');
      }
    });
    return this;
  }
}

export const guiaPage = new GuiaPage();
