// cypress/support/pageobjects/base/falecidoPage.ts
import { falecidoElements as el } from '../../elements/falecidoElements';

export class FalecidoPage {
  acessarAbaPessoas() {
    cy.get(el.stepPessoas, { timeout: 15000 }).should('be.visible').click();
  }

  clicarCadastrarFalecido() {
    cy.get(el.cardCadastrarFalecido, { timeout: 15000 }).should('be.visible').click();
    cy.get(el.tituloForm).should('be.visible');
  }

  preencherCpf(cpf: string) {
    cy.get(el.inputCpf).should('be.visible').clear().type(cpf).blur();
  }

  preencherNome(nome: string) {
    cy.get(el.inputNome).then($input => {
      if (!$input.is(':disabled')) {
        cy.wrap($input).clear().type(nome).blur();
      }
    });
  }

  preencherDataObito(data: string) {
    cy.get(el.inputDataDeObito).should('be.visible').clear().type(data).blur();
  }

  responderDescendenteVivo(resposta: 'Sim' | 'Não') {
    cy.get(el.containerDescendentes)
      .find(resposta === 'Sim' ? el.radioSim : el.radioNao)
      .click({ force: true });
    cy.wait(300);
  }

  responderAscendenteVivo(resposta: 'Sim' | 'Não') {
    cy.get(el.containerAscendentes)
      .find(resposta === 'Sim' ? el.radioSim : el.radioNao)
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

  preencherCep(cep: string) {
    cy.get(el.inputCep).should('be.visible').clear().type(cep).blur();
    cy.wait(1000);
  }

  preencherEndereco(endereco: string) {
    cy.get(el.inputEndereco).then($input => {
      if (!$input.is(':disabled')) {
        cy.wrap($input).clear().type(endereco).blur();
      }
    });
  }

  preencherBairro(bairro: string) {
    cy.get(el.inputBairro).then($input => {
      if (!$input.is(':disabled')) {
        cy.wrap($input).clear().type(bairro).blur();
      }
    });
  }

  preencherNumero(numero: string) {
    cy.get(el.inputNumero).should('be.visible').clear().type(numero).blur();
  }

  preencherComplemento(complemento: string) {
    cy.get(el.inputComplemento).should('be.visible').clear().type(complemento).blur();
  }

  selecionarUf(uf: string) {
    cy.get(el.selectUf).then($select => {
      if (!$select.is(':disabled')) {
        cy.wrap($select).select(uf);
      }
    });
  }

  selecionarMunicipio(municipio: string) {
    cy.get(el.selectMunicipio).then($select => {
      if (!$select.is(':disabled')) {
        cy.wrap($select).select(municipio);
      }
    });
  }

  salvar() {
    cy.get(el.btnSalvar).should('be.visible').click();
  }

  voltar() {
    cy.get(el.btnVoltar).should('be.visible').click();
  }

  validarMensagemErroCampo(label: string, msg: string) {
    cy.contains('label', label, { timeout: 10000 })
      .parent()
      .find('.help-block')
      .should('contain', msg);
  }

  validarMensagemErroCampos(camposLista: string, msg: string) {
    const campos = camposLista.split(/, | e /);
    campos.forEach(campo => {
      cy.contains('label', campo.trim(), { timeout: 10000 })
        .parent()
        .find('.help-block')
        .should('contain', msg);
    });
  }

  validarCampoVisivel(label: string, visivel: boolean) {
    if (visivel) {
      cy.contains('label', label).should('be.visible');
    } else {
      cy.contains('label', label).should('not.exist');
    }
  }

  validarCardFalecido(nome: string, cpfFormatado: string) {
    cy.get(el.cardFalecidoCadastrado, { timeout: 15000 })
      .should('be.visible')
      .and('contain', nome)
      .and('contain', cpfFormatado);
  }

  interceptarBuscarPessoa(cpf: string, data: any) {
    const response = data ? data : { body: null };
    cy.intercept('GET', `**/pessoa/get_pessoa?cpfcnpj=${cpf.replace(/\D/g, '')}`, response).as('getPessoaFalecido');
  }

  interceptarBuscarCep(cep: string, data: any) {
    cy.intercept('GET', `**/endereco/Get_Endereco?cep=${cep.replace(/\D/g, '')}*`, data).as('getCepFalecido');
  }
}

export const falecidoPage = new FalecidoPage();
