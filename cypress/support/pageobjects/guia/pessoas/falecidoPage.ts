// cypress/support/pageobjects/guia/pessoas/falecidoPage.ts
import { falecidoElements as el } from '../../../elements/guia/pessoas/falecidoElements';
import { PessoasPage } from './pessoasPage';

export class FalecidoPage extends PessoasPage {
  clicarCadastrarFalecido() {
    cy.get(el.cardCadastrarFalecido, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  preencherCpf(cpf: string) {
    cy.get(el.inputCpf).should('be.visible').clear().type(cpf).blur();
    cy.wait(500);
    cy.get('.loader-block', { timeout: 10000 }).should('not.exist');
  }

  preencherDataObito(data: string) {
    cy.get(el.inputDataDeObito).should('be.visible').clear().type(data).blur();
  }

  responderDescendenteVivo(resposta: 'Sim' | 'Não') {
    cy.get(el.containerDescendentes)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  responderAscendenteVivo(resposta: 'Sim' | 'Não') {
    cy.get(el.containerAscendentes)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  selecionarEstadoCivil(estadoCivil: string) {
    cy.get(el.selectEstadoCivil).should('be.visible').select(estadoCivil);
    cy.wait(300);
  }

  selecionarRegimeCasamento(regime: string) {
    cy.get(el.selectRegimeDeCasamento).should('be.visible').select(regime);
  }

  preencherDataCasamento(data: string) {
    cy.get(el.inputDataDeCasamento).should('be.visible').clear().type(data).blur();
  }

  salvar() {
    cy.get(el.btnSalvar).should('be.visible').click();
  }

  voltar() {
    cy.get(el.btnVoltar).should('be.visible').click();
  }

  validarCardFalecido(nome: string, cpfFormatado: string) {
    cy.get(el.cardFalecidoCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', cpfFormatado);
  }
}

export const falecidoPage = new FalecidoPage();
