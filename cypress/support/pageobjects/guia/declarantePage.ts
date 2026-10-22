// cypress/support/pageobjects/guia/declarantePage.ts
import { declaranteElements as el } from '../../elements/guia/declaranteElements';

export class DeclarantePage {
  /**
   * Intercepta a chamada de busca de dados da pessoa pelo CPF
   */
  interceptarGetPessoa(cpf: string, data: any) {
    const response = data ? data : { body: null };
    cy.intercept('GET', `**/pessoa/get_pessoa?cpfcnpj=${cpf.replace(/\D/g, '')}`, response).as('getPessoa');
  }

  /**
   * Intercepta a chamada de busca de CEP
   */
  interceptarGetCep(cep: string, response: any) {
    cy.intercept('GET', `**/endereco/Get_Endereco?cep=${cep.replace(/\D/g, '')}*`, response).as('getCep');
  }

  /**
   * Intercepta a chamada de busca de CEP
   */
  interceptarGetMunicipio() {
    cy.intercept('GET', `**/localidades/estados**`, [
      { id: 5002704, nome: 'Campo Grande' },
      { id: 5003702, nome: 'Dourados' },
      { id: 5008305, nome: 'Três Lagoas' },
      { id: 5003207, nome: 'Corumbá' }
    ]).as('getMunicipio');
  }

  acessarFormularioDeclarante() {
    cy.visit('/#/nova-guia-declarante');
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
    cy.get('form').contains(mensagem, { timeout: 10000 }).should('be.visible');
  }

  verificarCampo(seletor: keyof typeof el, valorEsperado: string) {
    cy.get(el[seletor]).should('have.value', valorEsperado);
  }

  concordarComTermos() {
    cy.get(el.checkTermos).click({ force: true });
    cy.get(el.checkTermos).should('be.checked');
  }

  clicarBotaoIniciarDeclaracao() {
    cy.get(el.btnIniciar).click({ force: true });
  }

  iniciarDeclaracao() {
    cy.get(el.inputNome, { timeout: 10000 }).should('not.have.value', '');
    cy.get(el.inputTelefone).should('not.have.value', '');
    cy.get(el.inputEmail).should('not.have.value', '');

    cy.get(el.btnIniciar).click({ force: true });
  }

  validarBotaoIniciarDesabilitado() {
    cy.get(el.btnIniciar).should('be.disabled');
  }

  preencherTodosOsDados() {
    this.interceptarGetMunicipio();

    this.interceptarGetPessoa('74555611560', {
      body: {
        cpf: "74555611560",
        nome: "TESTE AUTOMATIZADO",
        telefone: "67999999111",
        email: "teste@teste.com",
        bairro: "Centro",
        cep: "79002010",
        codmunicipio: "9051",
        complemento: " ",
        endereco: "Rua 14 de Julho",
        municipio: "Campo Grande",
        numero: "123",
        tipoLogradouro: "RUA",
        uf: "MS"
      }
    });

    this.acessarFormularioDeclarante();
    this.aguardarDadosCarregarem();
    this.preencherNumero('123');
  }

  avancarParaDadosGerais() {
    this.interceptarGetMunicipio();

    this.interceptarGetPessoa('74555611560', {
      body: {
        cpf: "74555611560",
        nome: "TESTE AUTOMATIZADO",
        telefone: "67999999111",
        email: "teste@teste.com",
        bairro: "Centro",
        cep: "79002010",
        codmunicipio: "9051",
        complemento: " ",
        endereco: "Rua 14 de Julho",
        municipio: "Campo Grande",
        numero: "123",
        tipoLogradouro: "RUA",
        uf: "MS"
      }
    });

    this.acessarFormularioDeclarante();
    this.aguardarDadosCarregarem();
    this.preencherNumero('123');

    this.concordarComTermos();
    this.iniciarDeclaracao();

    cy.url({ timeout: 15000 }).should('include', '/nova-guia');
  }
}

export const declarantePage = new DeclarantePage();
