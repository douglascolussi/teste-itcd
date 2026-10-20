// cypress/support/pageobjects/guia/pessoas/pessoasPage.ts
import { pessoasElements as el } from '../../../elements/guia/pessoas/pessoasElements';

export class PessoasPage {
  acessarAbaPessoas() {
    cy.get(el.stepPessoas, { timeout: 15000 }).should('be.visible').click();
  }

  preencherNome(nome: string) {
    cy.get(el.inputNome).then($input => {
      if (!$input.is(':disabled')) {
        cy.wrap($input).clear().type(nome).blur();
      }
    });
  }

  preencherCep(cep: string) {
    cy.get(el.inputCep).should('be.visible').clear().type(cep).blur();
    cy.wait(1000);
    cy.get(el.loaderBlock, { timeout: 10000 }).should('not.exist');
    cy.get(el.selectMunicipio, { timeout: 10000 }).should('be.disabled');
  }

  preencherEndereco(endereco: string) {
    cy.get(el.inputEndereco).then($input => {
      if (!$input.is(':disabled') && !$input.val()) {
        cy.wrap($input).clear({ force: true }).type(endereco, { force: true }).blur();
      }
    });
  }

  preencherBairro(bairro: string) {
    cy.get(el.inputBairro).then($input => {
      if (!$input.is(':disabled') && !$input.val()) {
        cy.wrap($input).clear({ force: true }).type(bairro, { force: true }).blur();
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
      if (!$select.is(':disabled') && !$select.val()) {
        cy.wrap($select).select(uf, { force: true });
      }
    });
  }

  selecionarMunicipio(municipio: string) {
    cy.get(el.selectMunicipio).then($select => {
      if (!$select.is(':disabled') && !$select.val()) {
        cy.wrap($select).select(municipio, { force: true });
      }
    });
  }

  validarMensagemErroCampo(label: string, msg: string) {
    cy.contains('label', label, { timeout: 10000 })
      .parents('.form-group')
      .first()
      .find('.help-block')
      .should('contain', msg);
  }

  validarMensagemErroCampos(camposLista: string, msg: string) {
    const campos = camposLista.split(/, | e /);
    campos.forEach(campo => {
      this.validarMensagemErroCampo(campo.trim(), msg);
    });
  }

  validarCampoVisivel(label: string, visivel: boolean) {
    if (visivel) {
      cy.contains('label', label, { timeout: 10000 }).should('be.visible');
    } else {
      cy.contains('label', label).should('not.exist');
    }
  }

  interceptarBuscarPessoa(cpf: string, data: any = null) {
    const response = data ? data : { body: null };
    cy.intercept('GET', `**/pessoa/get_pessoa?cpfcnpj=${cpf.replace(/\D/g, '')}`, response).as('getPessoa');
  }

  interceptarBuscarCep(cep: string, data: any = null) {
    const response = data ? data : { body: null };
    cy.intercept('GET', `**/endereco/Get_Endereco?cep=${cep.replace(/\D/g, '')}*`, response).as('getCep');
  }
}

export const pessoasPage = new PessoasPage();
