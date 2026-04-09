// cypress/support/pageobjects/base/guiaPage.ts
import { guiaElements as EGuia } from '../../elements/guiaElements';

export class GuiaPage {
  /**
   * Aguarda o carregamento inicial e valida a presença da tabela
   */
  validarListagemExibida(): this {
    // Aumentamos o timeout pois o sistema pode demorar a carregar os dados
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
}

export const guiaPage = new GuiaPage();
