// cypress/support/pageobjects/guia/pessoas/herdeiroPage.ts
import { herdeiroElements as el } from '../../../elements/guia/pessoas/herdeiroElements';
import { PessoasPage } from './pessoasPage';

export class HerdeiroPage extends PessoasPage {
  clicarCadastrarHerdeiro() {
    cy.get(el.cardCadastrarHerdeiro, { timeout: 15000 }).first().should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  clicarCadastrarNeto() {
    cy.get(el.cardCadastrarNeto, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  clicarCadastrarBisneto() {
    cy.get(el.cardCadastrarBisneto, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  preencherCpf(cpf: string) {
    cy.get(el.inputCpfCnpj).should('be.visible').clear().type(cpf).trigger('change');
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
    cy.get(el.inputDataDeObito).should('be.visible').clear().type(data).trigger('change');
  }

  selecionarMomentoFalecimento(momento: 'Antes ou Simultaneamente' | 'Depois') {
    cy.get('body').then(($body) => {
      if ($body.find(el.containerMomentoFalecimento).length > 0 && $body.find(el.containerMomentoFalecimento).is(':visible')) {
        cy.get(el.containerMomentoFalecimento)
          .find(momento === 'Antes ou Simultaneamente' ? el.radioMomentoAntes : el.radioMomentoDepois)
          .check({ force: true });
        cy.wait(300);
      } else {
        cy.log('Campo momento do falecimento não exibido (data diferente da do falecido).');
      }
    });
  }

  responderTinhaDescendenteVivo(resposta: 'Sim' | 'Não') {
    cy.get(el.containerTinhaDescendenteVivo)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  preencherEmail(email: string) {
    cy.get(el.inputEmail).should('be.visible').clear().type(email).trigger('change');
  }

  preencherTelefone(telefone: string) {
    cy.get(el.inputTelefone).should('be.visible').clear().type(telefone).trigger('change');
  }

  responderEhFilhoComum(resposta: 'Sim' | 'Não') {
    cy.get(el.containerEhFilhoComum)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
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

  responderOutroHerdeiroMesmoGrau(resposta: 'Sim' | 'Não') {
    cy.get(el.containerOutroHerdeiroMesmoGrau)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  responderOutroDescendenteDiferenteGrau(resposta: 'Sim' | 'Não') {
    cy.get(el.containerOutroDescendenteDiferenteGrau)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(300);
  }

  responderExisteAscendente(resposta: 'Sim' | 'Não') {
    cy.get(el.containerExisteAscendente)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
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
    cy.get(el.btnSalvar).scrollIntoView().should('be.visible').click({ force: true });
  }

  voltar() {
    cy.get(el.btnVoltar).scrollIntoView().should('be.visible').click({ force: true });
  }

  clicarCadastrarHerdeiroAscendente() {
    cy.get(el.cardCadastrarHerdeiroAscendente, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm, { timeout: 10000 }).should('be.visible');
  }

  selecionarTipoHerdeiro(tipo: string) {
    cy.get(el.selectTipoHerdeiro).then(($s) => {
      if (!$s.is(':disabled')) {
        cy.wrap($s).select(tipo);
        cy.wait(300);
      }
    });
  }

  validarTipoHerdeiroHabilitado(habilitado: boolean) {
    if (habilitado) {
      cy.get(el.selectTipoHerdeiro).should('not.be.disabled');
    } else {
      cy.get(el.selectTipoHerdeiro).should('be.disabled');
    }
  }

  validarOpcaoTipoHerdeiroExiste(opcao: string) {
    cy.get(el.selectTipoHerdeiro).find('option').should('contain', opcao);
  }

  validarQualificacaoHerdeiro(qualificacao: string) {
    cy.get(el.inputQualificacao).should('be.visible').and('have.value', qualificacao);
  }

  confirmarModalValidacao3() {
    cy.get(el.btnModalValidacao3Ok, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.modalValidacao3).should('not.be.visible');
  }

  confirmarModalValidacao4() {
    cy.get(el.btnModalValidacao4Ok, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.modalValidacao4).should('not.be.visible');
  }

  confirmarModalInformativo() {
    cy.get(el.btnModalInformativoOk, { timeout: 10000 }).should('be.visible').click({ force: true });
  }

  validarModalValidacao3Visivel(textoEsperado: string) {
    cy.get(el.modalValidacao3, { timeout: 10000 })
      .should('be.visible')
      .and('contain', textoEsperado);
  }

  validarModalValidacao4Visivel(textoEsperado: string) {
    cy.get(el.modalValidacao4, { timeout: 10000 })
      .should('be.visible')
      .and('contain', textoEsperado);
  }

  validarCardCadastrarHerdeiroAscendenteExiste(existe: boolean) {
    if (existe) {
      cy.get(el.cardCadastrarHerdeiroAscendente, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.cardCadastrarHerdeiroAscendente).should('not.exist');
    }
  }

  validarCardHerdeiro(nome: string, cpfFormatado: string) {
    cy.get(el.cardHerdeiroCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', cpfFormatado);
  }

  validarCardHerdeiroAscendente(nome: string, cpfFormatado: string) {
    cy.get(el.cardHerdeiroCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', 'Herdeiro Ascendente')
      .and('contain', nome)
      .and('contain', cpfFormatado);
  }

  validarCardHerdeiroPorRepresentacao(nome: string, cpfFormatado: string) {
    cy.get(el.cardHerdeiroPorRepresentacao, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', cpfFormatado);
  }

  validarCardCadastrarBisnetoVisivel(visivel: boolean) {
    if (visivel) {
      cy.get(el.cardCadastrarBisneto, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.cardCadastrarBisneto).should('not.exist');
    }
  }

  validarTipoHerdeiroSelecionado(tipo: string) {
    cy.get(el.selectTipoHerdeiro).find('option:selected').should('contain', tipo);
  }
}

export const herdeiroPage = new HerdeiroPage();
