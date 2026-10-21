// cypress/support/pageobjects/guia/bens/veiculoPage.ts
import { veiculoElements as el } from '../../../elements/guia/bens/veiculoElements';

export class VeiculoPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieVeiculo() {
    this.configurarMockIntegracao();
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Veículo');
    cy.wait(300);
  }

  configurarMockIntegracao(dados?: {
    placa?: string;
    renavam?: string;
    marca?: string;
    valorVenal?: number;
    anoFrabricacao?: number;
    anoModelo?: number;
    dataDeAquisicao?: string;
  }) {
    cy.intercept('POST', '**/integracao/ipva/porPlacaRenavam', (req) => {
      const placa = dados?.placa || req.body?.placa || 'ABC1D23';
      const renavam = dados?.renavam || req.body?.renavam || '12345678901';
      req.reply({
        statusCode: 200,
        body: {
          status: { code: 200 },
          data: {
            veiculo_Retorno: [
              {
                placa: placa,
                renavam: renavam,
                marca: dados?.marca || 'FIAT/PALIO ATTRACTIV 1.0',
                valorVenal: dados?.valorVenal ?? 25000,
                anoFrabricacao: dados?.anoFrabricacao ?? 2015,
                anoModelo: dados?.anoModelo ?? 2016,
                dataDeAquisicao: dados?.dataDeAquisicao || '2018-05-10T00:00:00',
              },
            ],
          },
        },
      });
    }).as('buscaVeiculo');
  }

  salvarBem() {
    cy.get(el.btnSalvarBem, { timeout: 10000 })
      .filter(':visible')
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(500);
  }

  cancelar() {
    cy.get(el.btnCancelarBem).scrollIntoView().should('be.visible').click({ force: true });
  }

  // Preenchimento de Campos
  preencherPlaca(placa: string) {
    cy.get(el.inputPlaca).should('be.visible').clear().type(placa).trigger('keyup').blur();
  }

  preencherRenavam(renavam: string) {
    cy.get(el.inputRenavam).should('be.visible').clear().type(renavam).trigger('keyup').blur();
    if (renavam.length === 11) {
      cy.wait('@buscaVeiculo', { timeout: 10000 });
      cy.wait(500);
    }
  }

  preencherPercentualPropriedadeDoado(percentual: string) {
    cy.get(el.inputPercentualPropriedadeDoado).should('be.visible').clear().type(percentual).blur();
  }

  preencherDataDeAquisicao(data: string) {
    cy.get(el.inputDataDeAquisicao).should('be.visible').clear().type(data).blur();
  }

  preencherPercentualPropriedadeDeCujus(percentual: string) {
    cy.get(el.inputPercentualPropriedadeDeCujus).should('be.visible').clear().type(percentual).blur();
  }

  marcarBemParticularDeCujus(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxBemParticularDoDeCujus).check({ force: true });
    } else {
      cy.get(el.checkboxBemParticularDoDeCujus).uncheck({ force: true });
    }
  }

  // Asserções
  validarMensagemErroCampo(campo: string, mensagem: string) {
    const mapaCampos: { [key: string]: string } = {
      'Placa': el.inputPlaca,
      'Renavam': el.inputRenavam,
      'Data de Aquisição': el.inputDataDeAquisicao,
      'Marca': el.inputMarca,
      'Modelo': el.inputModelo,
      'Ano Fabricação': el.inputAnoFabricacao,
      'Ano Modelo': el.inputAnoModelo,
      'Valor Total Declarado': el.inputValorTotalDeclarado,
      'Percentual de propriedade total que será doado': el.inputPercentualPropriedadeDoado,
      'Percentual de Propriedade do de Cujus + Eventual Meeiro(a)': el.inputPercentualPropriedadeDeCujus,
    };

    const seletor = mapaCampos[campo];
    if (seletor) {
      cy.get(seletor)
        .closest('.form-group')
        .find('.help-block')
        .should('be.visible')
        .and('contain', mensagem);
    } else {
      cy.contains('.form-group', campo)
        .find('.help-block')
        .should('be.visible')
        .and('contain', mensagem);
    }
  }

  validarDadosPreenchidosAutomaticamente(
    marca: string,
    modelo: string,
    anoFabricacao: string,
    anoModelo: string,
    valorDeclarado: string
  ) {
    cy.get(el.inputMarca).should('have.value', marca);
    cy.get(el.inputModelo).should('have.value', modelo);
    cy.get(el.inputAnoFabricacao).should('have.value', anoFabricacao);
    cy.get(el.inputAnoModelo).should('have.value', anoModelo);
    cy.get(el.inputValorTotalDeclarado).should('contain.value', valorDeclarado);
  }

  validarAlertaGlobal(mensagem: string) {
    cy.get(el.alertaGlobal, { timeout: 10000 }).should('be.visible').and('contain', mensagem);
  }

  validarBemNaTabela(especie: string, resumo: string, valorDeclarado: string) {
    cy.get(el.tabelaBens, { timeout: 15000 })
      .filter(':visible')
      .first()
      .within(() => {
        cy.contains('td', especie).should('be.visible');
        cy.contains('td', resumo).should('be.visible');
        cy.contains('td', valorDeclarado).should('be.visible');
      });
  }
}

export const veiculoPage = new VeiculoPage();
