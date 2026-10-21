// cypress/support/pageobjects/guia/pessoas/doadorPage.ts
import { doadorElements as el } from '../../../elements/guia/pessoas/doadorElements';
import { PessoasPage } from './pessoasPage';

export class DoadorPage extends PessoasPage {
  clicarCadastrarDoador() {
    cy.get(el.cardCadastrarDoador, { timeout: 15000 }).should('be.visible').click();
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

  validarQualificacaoDoador() {
    cy.get(el.inputQualificacao).should('be.disabled').and('have.value', 'Doador');
  }

  salvar() {
    cy.get(el.btnSalvar).scrollIntoView().should('be.visible').click();
  }

  cancelar() {
    cy.get(el.btnCancelar).scrollIntoView().should('be.visible').click();
  }

  validarCardDoador(nome: string, documento: string) {
    cy.get(el.cardDoadorCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', documento);
  }

  validarCardCadastrarDoadorVisivel(visivel: boolean = true) {
    if (visivel) {
      cy.get(el.cardCadastrarDoador, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.cardCadastrarDoador).should('not.exist');
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

export const doadorPage = new DoadorPage();
