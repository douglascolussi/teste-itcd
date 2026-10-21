// cypress/support/pageobjects/guia/pessoas/separandoPage.ts
import { separandoElements as el } from '../../../elements/guia/pessoas/separandoElements';
import { PessoasPage } from './pessoasPage';

export class SeparandoPage extends PessoasPage {
  clicarCadastrarSeparando() {
    cy.get(el.cardCadastrarSeparando, { timeout: 15000 }).should('be.visible').click();
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

  validarQualificacaoSeparando() {
    cy.get(el.selectQualificacao).should('be.disabled').and('have.value', 'Separando');
  }

  salvar() {
    cy.get(el.btnSalvar).scrollIntoView().should('be.visible').click();
  }

  cancelar() {
    cy.get(el.btnCancelar).scrollIntoView().should('be.visible').click();
  }

  validarCardSeparando(nome: string, documento: string) {
    cy.get(el.cardSeparandoCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', documento);
  }

  validarCardCadastrarSeparandoVisivel(visivel: boolean = true) {
    if (visivel) {
      cy.get(el.cardCadastrarSeparando, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.cardCadastrarSeparando).should('not.exist');
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

export const separandoPage = new SeparandoPage();
