// cypress/support/pageobjects/guia/pessoas/conjugePage.ts
import { conjugeElements as el } from '../../../elements/guia/pessoas/conjugeElements';
import { PessoasPage } from './pessoasPage';

export class ConjugePage extends PessoasPage {
  clicarCadastrarConjuge() {
    cy.get(el.cardCadastrarConjuge, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  preencherCpf(cpf: string) {
    cy.get(el.inputCpfCnpj).should('be.visible').clear().type(cpf).blur();
    cy.wait(500);
    cy.get('.loader-block', { timeout: 10000 }).should('not.exist');
  }

  responderJaFaleceu(resposta: 'Sim' | 'Não') {
    cy.get(el.containerJaFaleceu)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  preencherDataObito(data: string) {
    cy.get(el.inputDataDeObito).should('be.visible').clear().type(data).blur();
  }

  selecionarMomentoFalecimento(momento: 'Antes ou Simultaneamente' | 'Depois') {
    cy.get(el.containerMomentoFalecimento)
      .find(momento === 'Antes ou Simultaneamente' ? el.radioMomentoAntes : el.radioMomentoDepois)
      .click({ force: true });
    cy.wait(300);
  }

  preencherEmail(email: string) {
    cy.get(el.inputEmail).should('be.visible').clear().type(email).blur();
  }

  preencherTelefone(telefone: string) {
    cy.get(el.inputTelefone).should('be.visible').clear().type(telefone).blur();
  }

  responderRenuncia(resposta: 'Sim' | 'Não') {
    cy.get(el.containerRenuncia)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  selecionarTipoRenuncia(tipo: 'Abdicativa' | 'Translativa') {
    cy.get(el.containerTipoRenuncia)
      .find(tipo === 'Abdicativa' ? el.radioAbdicativa : el.radioTranslativa)
      .click({ force: true });
    cy.wait(300);
  }

  responderEhInventariante(resposta: 'Sim' | 'Não') {
    cy.get(el.containerEhInventariante)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  salvar() {
    cy.get(el.btnSalvar).should('be.visible').click();
  }

  voltar() {
    cy.get(el.btnVoltar).should('be.visible').click();
  }

  confirmarModalOk() {
    cy.get(el.btnModalOk).should('be.visible').click();
  }

  confirmarModalInformativo() {
    cy.get(el.btnModalInformativoOk).should('be.visible').click();
  }

  validarModalObitoVisivel(textoEsperado: string) {
    cy.get(el.modalObito, { timeout: 10000 })
      .should('be.visible')
      .and('contain', textoEsperado);
  }

  validarCardConjuge(nome: string, cpfFormatado: string) {
    cy.get(el.cardConjugeCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', cpfFormatado);
  }
}

export const conjugePage = new ConjugePage();
