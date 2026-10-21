// cypress/support/pageobjects/guia/pessoas/separandaPage.ts
import { separandaElements as el } from '../../../elements/guia/pessoas/separandaElements';
import { PessoasPage } from './pessoasPage';

export class SeparandaPage extends PessoasPage {
  clicarCadastrarSeparanda() {
    cy.get(el.cardCadastrarSeparanda, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  preencherCpf(cpf: string) {
    cy.get(el.inputCpf).should('be.visible').clear().type(cpf).blur();
  }

  preencherEmail(email: string) {
    cy.get(el.inputEmail).should('be.visible').clear().type(email).blur();
  }

  preencherTelefone(telefone: string) {
    cy.get(el.inputTelefone).should('be.visible').clear().type(telefone).blur();
  }

  validarQualificacaoSeparanda() {
    cy.get(el.selectQualificacao).should('be.disabled').and('have.value', 'Separanda');
  }

  salvar() {
    cy.get(el.btnSalvar).scrollIntoView().should('be.visible').click();
  }

  cancelar() {
    cy.get(el.btnCancelar).scrollIntoView().should('be.visible').click();
  }

  validarCardSeparanda(nome: string, documento: string) {
    cy.get(el.cardSeparandaCadastrada, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', documento);
  }

  validarCardCadastrarSeparandaVisivel(visivel: boolean = true) {
    if (visivel) {
      cy.get(el.cardCadastrarSeparanda, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.cardCadastrarSeparanda).should('not.exist');
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

export const separandaPage = new SeparandaPage();
