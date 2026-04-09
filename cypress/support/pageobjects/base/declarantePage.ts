// cypress/support/pageobjects/base/declarantePage.ts
import { declaranteElements as el } from '../../elements/declaranteElements';

export class DeclarantePage {
  /**
   * Intercepta a chamada de busca de dados da pessoa pelo CPF
   */
  interceptarGetPessoa(cpf: string, data: any) {
    // Se data for null, enviamos um objeto de resposta vazio para evitar erro no cy.intercept
    const response = data ? data : { body: null };
    cy.intercept('GET', `**/calculo/obter-dados-pessoa?cpf=${cpf.replace(/\D/g, '')}`, response).as('getPessoa');
  }

  /**
   * Intercepta a chamada de busca de CEP
   */
  interceptarGetCep(cep: string, response: any) {
    cy.intercept('GET', `**/endereco/Get_Endereco?cep=${cep.replace(/\D/g, '')}*`, response).as('getCep');
  }

  aguardarDadosCarregarem() {
    cy.wait('@getPessoa', { timeout: 15000 });
    cy.wait(500);
  }

  aguardarCepCarregar() {
    cy.wait('@getCep', { timeout: 10000 });
    cy.wait(500);
  }

  preencherCpf(cpf: string) {
    cy.get(el.inputCpf).then(($input) => {
      if (!$input.prop('disabled')) {
        cy.wrap($input).clear().type(cpf).blur();
      }
    });
  }

  preencherNome(nome: string) {
    cy.get(el.inputNome).then(($input) => {
      if (!$input.prop('disabled')) {
        cy.wrap($input).clear().type(nome);
      }
    });
  }

  preencherEmail(email: string) {
    cy.get(el.inputEmail).then(($input) => {
      if (!$input.prop('disabled')) {
        cy.wrap($input).clear().type(email);
      }
    });
  }

  preencherTelefone(telefone: string) {
    cy.get(el.inputTelefone).then(($input) => {
      if (!$input.prop('disabled')) {
        cy.wrap($input).clear().type(telefone);
      }
    });
  }

  preencherCep(cep: string) {
    cy.get(el.inputCep).then(($input) => {
      if (!$input.prop('disabled')) {
        cy.wrap($input).clear().type(cep).trigger('change').trigger('input').blur();
      }
    });
  }

  preencherNumero(numero: string) {
    cy.get(el.inputNumero).then(($input) => {
      if (!$input.prop('disabled')) {
        cy.wrap($input).clear().type(numero);
      }
    });
  }

  selecionarUf(uf: string) {
    cy.get(el.selectUf).should('be.visible').select(uf);
  }

  selecionarMunicipio(municipio: string) {
    cy.get(el.selectMunicipio).should('be.visible').select(municipio);
  }

  validarFormulario(dados: any) {
    if (dados === null) {
      cy.get(el.inputNome).should('have.value', '').and('be.enabled');
      cy.get(el.inputEmail).should('have.value', '').and('be.enabled');
      cy.get(el.inputTelefone).should('have.value', '').and('be.enabled');
      cy.get(el.inputCep).should('have.value', '').and('be.enabled');
    } else {
      if (dados.nome) cy.get(el.inputNome).should('have.value', dados.nome).and('be.disabled');
      if (dados.email) {
        cy.get(el.inputEmail).should('have.value', dados.email);
      }
      if (dados.cep) {
        cy.get(el.inputCep).should('have.value', dados.cep);
        cy.get(el.inputEndereco).should('be.disabled');
        cy.get(el.selectUf).should('be.disabled');
      }
    }
  }

  validarMensagemErro(mensagem: string) {
    // Busca a mensagem de erro de forma mais flexível dentro do formulário
    cy.get('form').contains(mensagem, { timeout: 10000 }).should('be.visible');
  }

  verificarCampo(seletor: keyof typeof el, valorEsperado: string) {
    cy.get(el[seletor]).should('have.value', valorEsperado);
  }

  concordarComTermos() {
    cy.get(el.checkTermos).click({ force: true });
    cy.get(el.checkTermos).should('be.checked');
  }

  iniciarDeclaracao() {
    cy.get(el.btnIniciar, { timeout: 10000 }).should('not.be.disabled').click({ force: true });
  }

  validarBotaoIniciarDesabilitado() {
    cy.get(el.btnIniciar).should('be.disabled');
  }
}

export const declarantePage = new DeclarantePage();
