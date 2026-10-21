// cypress/support/pageobjects/guia/pessoas/advogadoPage.ts
import { advogadoElements as el } from '../../../elements/guia/pessoas/advogadoElements';
import { PessoasPage } from './pessoasPage';

export class AdvogadoPage extends PessoasPage {
  clicarCadastrarAdvogado() {
    cy.get(el.cardCadastrarAdvogado, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  preencherNumeroOAB(numero: string) {
    cy.get(el.inputNumeroOAB).should('be.visible').clear().type(numero).blur();
  }

  selecionarUfOAB(uf: string) {
    cy.get(el.selectUfOAB)
      .should('be.visible')
      .find('option')
      .filter((_, optionEl) => (optionEl.textContent || '').includes(uf))
      .first()
      .then($opt => {
        cy.get(el.selectUfOAB).select($opt.val() as string);
      });
  }

  preencherEmail(email: string) {
    cy.get(el.inputEmail).should('be.visible').clear().type(email).blur();
  }

  preencherTelefone(telefone: string) {
    cy.get(el.inputTelefone).should('be.visible').clear().type(telefone).blur();
  }

  salvar() {
    cy.get(el.btnSalvar).scrollIntoView().should('be.visible').click();
  }

  voltar() {
    cy.get(el.btnVoltar).should('be.visible').click();
  }

  validarCardAdvogado(nome: string, oabCompleta: string) {
    cy.get(el.cardAdvogadoCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', oabCompleta);
  }
}

export const advogadoPage = new AdvogadoPage();
