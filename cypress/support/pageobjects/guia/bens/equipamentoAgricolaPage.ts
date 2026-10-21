// cypress/support/pageobjects/guia/bens/equipamentoAgricolaPage.ts
import { equipamentoAgricolaElements as el } from '../../../elements/guia/bens/equipamentoAgricolaElements';

export class EquipamentoAgricolaPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieEquipamentoAgricola() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Equipamento agrícola');
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
  preencherMarca(marca: string) {
    cy.get(el.inputMarca).should('be.visible').clear().type(marca).blur();
  }

  preencherModelo(modelo: string) {
    cy.get(el.inputModelo).should('be.visible').clear().type(modelo).blur();
  }

  preencherAno(ano: string) {
    cy.get(el.inputAno).should('be.visible').clear().type(ano).blur();
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Campos Exclusivos Doação
  preencherTipo(tipo: string) {
    cy.get(el.inputTipo).should('be.visible').clear().type(tipo).blur();
  }

  preencherPercentualDoado(percentual: string) {
    cy.get(el.inputPercentualDoado).should('be.visible').clear().type(percentual).blur();
  }

  // Campos Exclusivos Causa Mortis
  preencherEspecificacao(especificacao: string) {
    cy.get(el.inputEspecificacao).should('be.visible').clear().type(especificacao).blur();
  }

  preencherDataAquisicao(data: string) {
    cy.get(el.inputDataAquisicao).should('be.visible').clear().type(data).blur();
  }

  preencherPercentualDeCujusMeeiro(percentual: string) {
    cy.get(el.inputPercentualDeCujusMeeiro).should('be.visible').clear().type(percentual).blur();
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
      'Tipo': el.inputTipo,
      'Especificação': el.inputEspecificacao,
      'Data de Aquisição': el.inputDataAquisicao,
      'Marca': el.inputMarca,
      'Modelo': el.inputModelo,
      'Ano': el.inputAno,
      'Valor Total Declarado': el.inputValorTotalDeclarado,
      'Percentual de propriedade total que será doado': el.inputPercentualDoado,
      'Percentual de Propriedade do de Cujus + Eventual Meeiro(a) %': el.inputPercentualDeCujusMeeiro,
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
}

export const equipamentoAgricolaPage = new EquipamentoAgricolaPage();
