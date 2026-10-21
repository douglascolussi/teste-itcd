// cypress/support/pageobjects/guia/bens/numerariosPage.ts
import { numerariosElements as el } from '../../../elements/guia/bens/numerariosElements';

export class NumerariosPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieNumerarios() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Numerários/Aplicações/Títulos');
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
  preencherInstituicaoFinanceira(instituicao: string) {
    cy.get(el.inputInstituicaoFinanceira).should('be.visible').clear().type(instituicao).blur();
  }

  preencherAgencia(agencia: string) {
    cy.get(el.inputAgencia).should('be.visible').clear().type(agencia).blur();
  }

  preencherConta(conta: string) {
    cy.get(el.inputConta).should('be.visible').clear().type(conta).blur();
  }

  selecionarTipo(tipo: string) {
    cy.get(el.selectTipo).should('be.visible').select(tipo);
    cy.wait(300);
  }

  selecionarTipoPrevidenciaPrivada(tipoPrevidencia: string) {
    cy.get(el.selectTipoDePrevidenciaPrivada).should('be.visible').select(tipoPrevidencia);
    cy.wait(300);
  }

  selecionarSeguroVinculado(sim: boolean) {
    const radioIndex = sim ? 0 : 1;
    cy.get(el.radiosHaSeguroVinculado)
      .eq(radioIndex)
      .should('exist')
      .check({ force: true })
      .trigger('change');
    cy.wait(300);
  }

  preencherValorPeculio(valor: string) {
    cy.get(el.inputValorDoPeculioContratado).should('be.visible').clear().type(valor).blur();
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Preenchimento Exclusivo Causa Mortis
  anexarExtratoInstituicaoFinanceira(nomeArquivo = 'extrato_financeiro.pdf') {
    cy.get(el.inputExtratoDaInstituicaoFinanceiraAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação do extrato bancário/financeiro para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
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
      'Instituição financeira': el.inputInstituicaoFinanceira,
      'Extrato da instituição financeira': el.inputExtratoDaInstituicaoFinanceiraAnexo,
      'Tipo': el.selectTipo,
      'Tipo de previdência privada': el.selectTipoDePrevidenciaPrivada,
      'Há seguro vinculado ao plano de previdência?': el.radiosHaSeguroVinculado,
      'Valor do pecúlio contratado': el.inputValorDoPeculioContratado,
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

  validarCampoHabilitado(campo: string, habilitado: boolean) {
    const mapaCampos: { [key: string]: string } = {
      'Tipo de previdência privada': el.selectTipoDePrevidenciaPrivada,
      'Há seguro vinculado ao plano de previdência?': el.radiosHaSeguroVinculado,
      'Valor do pecúlio contratado': el.inputValorDoPeculioContratado,
    };

    const seletor = mapaCampos[campo];
    if (campo === 'Há seguro vinculado ao plano de previdência?') {
      if (habilitado) {
        cy.get(seletor).first().should('be.enabled');
      } else {
        cy.get(seletor).first().should('be.disabled');
      }
    } else if (seletor) {
      if (habilitado) {
        cy.get(seletor).should('be.enabled');
      } else {
        cy.get(seletor).should('be.disabled');
      }
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

export const numerariosPage = new NumerariosPage();
