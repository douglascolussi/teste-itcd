// cypress/support/pageobjects/guia/bens/empresaPage.ts
import { empresaElements as el } from '../../../elements/guia/bens/empresaElements';

export class EmpresaPage {
  // Navegação
  acessarAbaBens() {
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieEmpresa() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Empresa');
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
  preencherCnpj(cnpj: string) {
    cy.get(el.inputCnpj).should('be.visible').clear().type(cnpj).blur();
  }

  preencherNomeRazaoSocial(nome: string) {
    cy.get(el.inputNomeRazaoSocial).should('be.visible').clear().type(nome).blur();
  }

  selecionarPossuiInscricaoEstadual(sim: boolean) {
    const radioIndex = sim ? 0 : 1;
    cy.get(el.radiosPossuiInscricaoEstadual)
      .eq(radioIndex)
      .should('exist')
      .check({ force: true })
      .trigger('change');
    cy.wait(300);
  }

  preencherInscricaoEstadual(ie: string) {
    cy.get(el.inputInscricaoEstadual).should('be.visible').clear().type(ie).blur();
  }

  selecionarUfDaSede(uf: string) {
    cy.get(el.selectUfDaSede).should('be.visible').select(uf);
    cy.wait(500);
  }

  selecionarMunicipioDaSede(municipio: string) {
    cy.get(el.selectMunicipioDaSede).should('be.visible').select(municipio);
    cy.wait(300);
  }

  preencherCapitalSocial(valor: string) {
    cy.get(el.inputCapitalSocial).should('be.visible').clear().type(valor).blur();
  }

  preencherPatrimonioLiquido(valor: string) {
    cy.get(el.inputPatrimonioLiquido).should('be.visible').clear().type(valor).blur();
  }

  selecionarEmpresaDesobrigadaBalanco(sim: boolean) {
    const radioIndex = sim ? 0 : 1;
    cy.get(el.radiosEmpresaDesobrigadaBalanco)
      .eq(radioIndex)
      .should('exist')
      .check({ force: true })
      .trigger('change');
    cy.wait(300);
  }

  preencherQtdCotasTotal(qtd: string) {
    cy.get(el.inputQtdCotasTotal).should('be.visible').clear().type(qtd).blur();
  }

  selecionarPossuiBensImoveis(sim: boolean) {
    const radioIndex = sim ? 0 : 1;
    cy.get(el.radiosPossuiBensImoveis)
      .eq(radioIndex)
      .should('exist')
      .check({ force: true })
      .trigger('change');
    cy.wait(300);
  }

  preencherValorPorCotaDeclarado(valor: string) {
    cy.get(el.inputValorPorCotaDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Campos Exclusivos Doação
  preencherQtdCotasDoadas(qtd: string) {
    cy.get(el.inputQtdCotasDoadas).should('be.visible').clear().type(qtd).blur();
  }

  preencherValorDasCotasDoadasDeclarado(valor: string) {
    cy.get(el.inputValorDasCotasDoadasDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Campos Exclusivos Causa Mortis
  anexarContratoSocial(nomeArquivo = 'contrato_social.pdf') {
    cy.get(el.inputContratoSocialAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação do contrato social para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  anexarBalancoPatrimonial(nomeArquivo = 'balanco_patrimonial.pdf') {
    cy.get(el.inputBalancoPatrimonialAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação do balanço patrimonial para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  anexarDeclaracaoContabilista(nomeArquivo = 'declaracao_contabilista.pdf') {
    cy.get(el.inputDeclaracaoContabilistaAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação da declaração do contabilista para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  preencherQtdCotasInventariadas(qtd: string) {
    cy.get(el.inputQtdCotasInventariadas).should('be.visible').clear().type(qtd).blur();
  }

  preencherValorTotalCotasInventariadas(valor: string) {
    cy.get(el.inputValorTotalCotasInventariadas).should('be.visible').clear().type(valor).blur();
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
      'CNPJ': el.inputCnpj,
      'Nome/Razão Social': el.inputNomeRazaoSocial,
      'Inscrição Estadual': el.inputInscricaoEstadual,
      'UF da sede': el.selectUfDaSede,
      'Município da sede': el.selectMunicipioDaSede,
      'Capital Social': el.inputCapitalSocial,
      'Patrimônio Líquido': el.inputPatrimonioLiquido,
      'Quantidade de cotas/ações total': el.inputQtdCotasTotal,
      'Quantidade de cotas/ações doadas': el.inputQtdCotasDoadas,
      'Quantidade de cotas/ações inventariadas': el.inputQtdCotasInventariadas,
      'Valor por cota declarado': el.inputValorPorCotaDeclarado,
      'Valor das cotas doadas declarado': el.inputValorDasCotasDoadasDeclarado,
      'Valor total das cotas inventariadas declarado': el.inputValorTotalCotasInventariadas,
      'Contrato Social': el.inputContratoSocialAnexo,
      'Balanço Patrimonial': el.inputBalancoPatrimonialAnexo,
      'Declaração do profissional contabilista responsável': el.inputDeclaracaoContabilistaAnexo,
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
      'Inscrição Estadual': el.inputInscricaoEstadual,
      'Declaração do profissional contabilista responsável': el.inputDeclaracaoContabilistaAnexo,
    };

    const seletor = mapaCampos[campo];
    if (seletor) {
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

export const empresaPage = new EmpresaPage();
