// cypress/support/pageobjects/guia/pessoas/donatarioPage.ts
import { donatarioElements as el } from '../../../elements/guia/pessoas/donatarioElements';
import { PessoasPage } from './pessoasPage';

export class DonatarioPage extends PessoasPage {
  clicarCadastrarDonatario() {
    cy.get(el.cardCadastrarDonatario, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  preencherCpfCnpj(cpfCnpj: string) {
    cy.get(el.inputCpfCnpj).should('be.visible').clear().type(cpfCnpj).blur();
  }

  preencherEmail(email: string) {
    cy.get(el.inputEmail).should('be.visible').clear().type(email).blur();
  }

  preencherTelefone(telefone: string) {
    cy.get(el.inputTelefone).should('be.visible').clear().type(telefone).blur();
  }

  validarQualificacaoDonatario() {
    cy.get(el.inputQualificacao).should('be.disabled').and('have.value', 'Donatário');
  }

  salvar() {
    cy.get(el.btnSalvar).scrollIntoView().should('be.visible').click();
  }

  cancelar() {
    cy.get(el.btnCancelar).scrollIntoView().should('be.visible').click();
  }

  validarCardDonatario(nome: string, documento: string) {
    cy.get(el.cardDonatarioCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', documento);
  }

  validarCardCadastrarDonatarioVisivel(visivel: boolean = true) {
    if (visivel) {
      cy.get(el.cardCadastrarDonatario, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.cardCadastrarDonatario).should('not.exist');
    }
  }

  validarFormularioVisivel(visivel: boolean) {
    if (visivel) {
      cy.get(el.form, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.form).should('not.exist');
    }
  }
}

export const donatarioPage = new DonatarioPage();
