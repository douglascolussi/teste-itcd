// cypress/support/pageobjects/guia/bens/semoventesPage.ts
import { semoventesElements as el } from '../../../elements/guia/bens/semoventesElements';

export class SemoventesPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieSemoventes() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Semoventes');
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
  selecionarUf(uf: string) {
    cy.get(el.selectUf)
      .should('be.visible')
      .find('option')
      .filter((_, opt) => opt.innerText.trim().startsWith(uf))
      .first()
      .then(($opt) => {
        cy.get(el.selectUf).select($opt.text().trim()).trigger('change');
      });
    cy.wait(500);
  }

  selecionarMunicipio(municipio: string) {
    cy.get(`${el.selectMunicipio} option`, { timeout: 10000 }).should('have.length.gt', 1);
    cy.get(el.selectMunicipio)
      .should('be.visible')
      .find('option')
      .filter((_, opt) => opt.innerText.trim() === municipio)
      .first()
      .then(($opt) => {
        cy.get(el.selectMunicipio).select($opt.text().trim()).trigger('change');
      });
    cy.wait(300);
  }

  preencherInscricaoEstadual(ie: string) {
    cy.get(el.inputInscricaoEstadual).should('be.visible').clear().type(ie).blur();
  }

  selecionarGrupoDoSemovente(grupo: string) {
    cy.get(el.selectGrupoDoSemovente)
      .should('be.visible')
      .find('option')
      .filter((_, opt) => opt.innerText.trim().includes(grupo))
      .first()
      .then(($opt) => {
        cy.get(el.selectGrupoDoSemovente).select($opt.text().trim()).trigger('change');
      });
    cy.wait(300);
  }

  preencherFaixa0a12M(valor: string) {
    cy.get(el.inputFaixa0a12M).should('be.visible').clear().type(valor).trigger('keyup').blur();
  }

  preencherFaixa13a24M(valor: string) {
    cy.get(el.inputFaixa13a24M).should('be.visible').clear().type(valor).trigger('keyup').blur();
  }

  preencherFaixa25a36M(valor: string) {
    cy.get(el.inputFaixa25a36M).should('be.visible').clear().type(valor).trigger('keyup').blur();
  }

  preencherFaixaAcima36M(valor: string) {
    cy.get(el.inputFaixaAcima36M).should('be.visible').clear().type(valor).trigger('keyup').blur();
  }

  preencherQuantidadeTotalDoada(qtd: string) {
    cy.get(el.inputQuantidadeTotalDoada).should('be.visible').clear().type(qtd).blur();
  }

  preencherQuantidadeTotalInventariada(qtd: string) {
    cy.get(el.inputQuantidadeTotalInventariada).should('be.visible').clear().type(qtd).blur();
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
  }

  anexarFichaSaldoIagro(nomeArquivo = 'ficha_iagro.pdf') {
    cy.get(el.inputFichaSaldoIagroAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação da ficha de saldo do IAGRO para teste.'),
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
      'UF': el.selectUf,
      'Município': el.selectMunicipio,
      'Inscrição Estadual': el.inputInscricaoEstadual,
      'Grupo do semovente': el.selectGrupoDoSemovente,
      'Quantidade total doada': el.inputQuantidadeTotalDoada,
      'Quantidade total inventariada': el.inputQuantidadeTotalInventariada,
      'Valor Total Declarado': el.inputValorTotalDeclarado,
      'Ficha de saldo do IAGRO': el.inputFichaSaldoIagroAnexo,
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

  validarInscricaoEstadualObrigatoria(obrigatorio: boolean) {
    if (obrigatorio) {
      cy.get(el.labelInscricaoEstadual).find('span.required').should('exist');
    } else {
      cy.get(el.labelInscricaoEstadual).find('span.required').should('not.exist');
    }
  }

  validarCamposErasVisiveis(visivel: boolean) {
    if (visivel) {
      cy.get(el.containerEras).should('be.visible');
    } else {
      cy.get(el.containerEras).should('not.exist');
    }
  }

  validarQuantidadeCalculada(qtd: string, isDoacao = true) {
    const seletor = isDoacao ? el.inputQuantidadeTotalDoada : el.inputQuantidadeTotalInventariada;
    cy.get(seletor)
      .invoke('val')
      .then((val) => {
        expect(String(val).trim()).to.eq(qtd);
      });
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

export const semoventesPage = new SemoventesPage();
