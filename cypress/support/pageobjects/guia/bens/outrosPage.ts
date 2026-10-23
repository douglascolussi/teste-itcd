// cypress/support/pageobjects/guia/bens/outrosPage.ts
import { outrosElements as el } from '../../../elements/guia/bens/outrosElements';

export class OutrosPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieOutros() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Outros');
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

  // Preenchimento de Campos
  preencherDescricao(descricao: string) {
    cy.get(el.textareaDescricao).should('be.visible').clear().type(descricao).blur();
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
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
      'Descrição': el.textareaDescricao,
      'Data de aquisição': el.inputDataDeAquisicao,
      'Valor Total Declarado': el.inputValorTotalDeclarado,
      'Percentual de propriedade total que será doado': el.inputPercentualPropriedadeDoado,
      'Percentual de propriedade do de cujus': el.inputPercentualPropriedadeDeCujus,
      'Percentual de propriedade do de cujus + eventual meeiro(a) %': el.inputPercentualPropriedadeDeCujus,
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

  /**
   * Cadastra um bem simples (espécie Outros) válido para qualquer natureza/tipo
   */
  cadastrarBemSimplesValidoPorNatureza(): this {
    this.acessarAbaBens();
    this.clicarAdicionarBem();
    this.selecionarEspecieOutros();
    this.preencherDescricao('Joias e objetos valiosos');
    this.preencherValorTotalDeclarado('100000');

    cy.get('body').then(($body) => {
      // Causa Mortis
      if ($body.find(el.inputDataDeAquisicao).is(':visible')) {
        this.preencherDataDeAquisicao('2020-05-15');
        this.preencherPercentualPropriedadeDeCujus('10000');
        this.marcarBemParticularDeCujus(true);
      }
      // Separação (Judicial / Extrajudicial)
      if ($body.find('input[formControlName="percentualDePropriedadeDoCasal"]').is(':visible')) {
        cy.get('input[formControlName="percentualDePropriedadeDoCasal"]').clear().type('10000').blur();
        cy.get('select[formControlName="oBemIraPertencerAQuem"]').select('Separando');
      }
      // Doação Simples / Padrão
      if ($body.find(el.inputPercentualPropriedadeDoado).is(':visible')) {
        this.preencherPercentualPropriedadeDoado('10000');
      }
    });

    this.salvarBem();
    cy.get(el.tabelaBens, { timeout: 15000 }).should('be.visible');
    return this;
  }
}

export const outrosPage = new OutrosPage();
