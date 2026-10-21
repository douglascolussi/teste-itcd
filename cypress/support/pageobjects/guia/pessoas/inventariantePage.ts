// cypress/support/pageobjects/guia/pessoas/inventariantePage.ts
import { inventarianteElements as el } from '../../../elements/guia/pessoas/inventarianteElements';
import { PessoasPage } from './pessoasPage';

export class InventariantePage extends PessoasPage {
  clicarCadastrarInventariante() {
    cy.get(el.cardCadastrarInventariante, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  preencherCpf(cpf: string) {
    cy.get(el.inputCpf).should('be.visible').clear().type(cpf).blur();
    cy.wait(500);
    cy.get('.loader-block', { timeout: 10000 }).should('not.exist');
  }

  preencherEmail(email: string) {
    cy.get(el.inputEmail).should('be.visible').clear().type(email).blur();
  }

  preencherTelefone(telefone: string) {
    cy.get(el.inputTelefone).should('be.visible').clear().type(telefone).blur();
  }

  anexarTermoInventariante(nomeArquivo = 'termo_inventariante.pdf') {
    cy.get(el.inputTermoInventariante).selectFile(
      {
        contents: Cypress.Buffer.from('Conteúdo simulado do termo de inventariante para testes automatizados.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  salvar() {
    cy.get(el.btnSalvar).scrollIntoView().should('be.visible').click();
  }

  voltar() {
    cy.get(el.btnVoltar).should('be.visible').click();
  }

  validarCardInventariante(nome: string, cpfFormatado: string) {
    cy.get(el.cardInventarianteCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', cpfFormatado);
  }
}

export const inventariantePage = new InventariantePage();
