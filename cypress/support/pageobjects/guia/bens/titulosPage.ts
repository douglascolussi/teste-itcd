// cypress/support/pageobjects/guia/bens/titulosPage.ts
import { titulosElements as el } from '../../../elements/guia/bens/titulosElements';

export class TitulosPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieTitulos() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Títulos negociados em bolsa de valores');
    cy.wait(300);
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

  // Preenchimento de Campos Comuns
  preencherInstituicaoCustodia(instituicao: string) {
    cy.get(el.inputInstituicaoCustodia).should('be.visible').clear().type(instituicao).blur();
  }

  selecionarTipo(tipo: string) {
    cy.get(el.selectTipo).should('be.visible').select(tipo);
    cy.wait(300);
  }

  preencherIdentificacaoTicker(ticker: string) {
    cy.get(el.inputIdentificacaoTicker).should('be.visible').clear().type(ticker).blur();
  }

  preencherQuantidadeCriptoMoeda(quantidade: string) {
    cy.get(el.inputQuantidadeCriptoMoeda).should('be.visible').clear().type(quantidade).blur();
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Campos Exclusivos Doação
  preencherQuantidadeDoada(quantidade: string) {
    cy.get(el.inputQuantidadeDoada).should('be.visible').clear().type(quantidade).blur();
  }

  // Campos Exclusivos Causa Mortis
  anexarExtratoCustodia(nomeArquivo = 'extrato_custodia.pdf') {
    cy.get(el.inputExtratoCustodiaAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação do extrato de custódia para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  preencherQuantidadeInventariada(quantidade: string) {
    cy.get(el.inputQuantidadeInventariada).should('be.visible').clear().type(quantidade).blur();
  }

  marcarBemParticularDeCujus(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxBemParticularDeCujus).check({ force: true });
    } else {
      cy.get(el.checkboxBemParticularDeCujus).uncheck({ force: true });
    }
  }

  // Asserções
  validarMensagemErroCampo(campo: string, mensagem: string) {
    const mapaCampos: { [key: string]: string } = {
      'Instituição de custódia': el.inputInstituicaoCustodia,
      'Tipo': el.selectTipo,
      'Identificação/Ticker': el.inputIdentificacaoTicker,
      'Quantidade de doada': el.inputQuantidadeDoada,
      'Quantidade inventariada': el.inputQuantidadeInventariada,
      'Quantidade de criptomoeda doada': el.inputQuantidadeCriptoMoeda,
      'Quantidade criptomoeda inventariada': el.inputQuantidadeCriptoMoeda,
      'Extrato da instituição de custódia': el.inputExtratoCustodiaAnexo,
      'Valor Total Declarado': el.inputValorTotalDeclarado,
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

  validarCampoVisivel(campo: string, visivel: boolean) {
    const mapaCampos: { [key: string]: string } = {
      'Quantidade de doada': el.inputQuantidadeDoada,
      'Quantidade inventariada': el.inputQuantidadeInventariada,
      'Quantidade de criptomoeda doada': el.inputQuantidadeCriptoMoeda,
      'Quantidade criptomoeda inventariada': el.inputQuantidadeCriptoMoeda,
    };

    const seletor = mapaCampos[campo];
    if (visivel) {
      cy.get(seletor).should('be.visible');
    } else {
      cy.get(seletor).should('not.exist');
    }
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

export const titulosPage = new TitulosPage();
