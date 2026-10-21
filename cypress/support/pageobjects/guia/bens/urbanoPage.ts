// cypress/support/pageobjects/guia/bens/urbanoPage.ts
import { urbanoElements as el } from '../../../elements/guia/bens/urbanoElements';

export class UrbanoPage {
  configurarIntercepts() {
    cy.intercept('GET', '**/endereco/Get_Endereco?cep=*', {
      statusCode: 200,
      body: null,
    }).as('getEnderecoCep');
  }

  // Navegação
  acessarAbaBens() {
    this.configurarIntercepts();
    cy.get(el.abaBens, { timeout: 15000 }).should('be.visible').click();
    cy.wait(500);
  }

  clicarAdicionarBem() {
    cy.get(el.btnAdicionarBem, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectEspecieDoBem, { timeout: 10000 }).should('be.visible');
  }

  selecionarEspecieUrbano() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Imóvel Urbano');
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
    cy.get(el.selectUf).then(($el) => {
      if (!$el.is(':disabled')) {
        cy.wrap($el).select(uf);
      }
    });
  }

  selecionarMunicipio(municipio: string) {
    cy.get(el.selectMunicipio).then(($el) => {
      if (!$el.is(':disabled')) {
        cy.wrap($el).select(municipio);
      }
    });
    cy.wait(300);
  }

  preencherMatricula(matricula: string) {
    cy.get(el.inputMatricula).should('be.visible').clear().type(matricula).blur();
  }

  preencherCep(cep: string) {
    cy.get(el.inputCep).should('be.visible').clear().type(cep).blur();
    cy.wait(500);
  }

  selecionarTipoLogradouro(tipo: string) {
    cy.get(el.selectTipoLogradouro).then(($el) => {
      if (!$el.is(':disabled')) {
        cy.wrap($el).select(tipo);
      }
    });
  }

  preencherLogradouro(logradouro: string) {
    cy.get(el.inputLogradouro).then(($el) => {
      if (!$el.is(':disabled')) {
        cy.wrap($el).clear().type(logradouro).blur();
      }
    });
  }

  marcarNaoTemNumero(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxNaoTemNumero).check({ force: true });
    } else {
      cy.get(el.checkboxNaoTemNumero).uncheck({ force: true });
    }
    cy.wait(200);
  }

  preencherNumero(numero: string) {
    cy.get(el.inputNumero).should('be.visible').clear().type(numero).blur();
  }

  preencherBairro(bairro: string) {
    cy.get(el.inputBairro).then(($el) => {
      if (!$el.is(':disabled')) {
        cy.wrap($el).clear().type(bairro).blur();
      }
    });
  }

  preencherDescricaoComplemento(descricao: string) {
    cy.get(el.textareaDescricaoComplemento).should('be.visible').clear().type(descricao).blur();
  }

  preencherLote(lote: string) {
    cy.get(el.inputLote).should('be.visible').clear().type(lote).blur();
  }

  preencherQuadra(quadra: string) {
    cy.get(el.inputQuadra).should('be.visible').clear().type(quadra).blur();
  }

  selecionarTipoImovel(tipo: string) {
    cy.get(el.selectTipoImovel).should('be.visible').select(tipo);
    cy.wait(300);
  }

  preencherAreaTerreno(area: string) {
    cy.get(el.inputAreaTerreno).should('be.visible').clear().type(area).blur();
  }

  preencherAreaConstruida(area: string) {
    cy.get(el.inputAreaConstruida).should('be.visible').clear().type(area).blur();
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Inscrição Municipal
  adicionarInscricaoMunicipal(numero: string, comFicha = false, nomeArquivo = 'ficha_prefeitura.pdf') {
    cy.get(el.btnAbrirAdicionarInscricaoMunicipal).scrollIntoView().should('be.visible').click({ force: true });
    cy.get(el.inputInscricaoMunicipal).should('be.visible').clear().type(numero);

    if (comFicha) {
      cy.get(el.inputFichaImobiliariaAnexo).selectFile(
        {
          contents: Cypress.Buffer.from('Simulação da ficha imobiliária da prefeitura para teste.'),
          fileName: nomeArquivo,
          mimeType: 'application/pdf',
        },
        { force: true }
      );
      cy.wait(200);
    }

    cy.get(el.btnSalvarInscricaoMunicipal).filter(':visible').first().click({ force: true });
    cy.wait(300);
  }

  // Preenchimento Exclusivo Doação
  preencherPercentualDoado(percentual: string) {
    cy.get(el.inputPercentualDoado).should('be.visible').clear().type(percentual).blur();
  }

  // Preenchimento Exclusivo Causa Mortis
  anexarCertidaoMatricula(nomeArquivo = 'certidao_matricula.pdf') {
    cy.get(el.inputCertidaoMatriculaAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação da certidão de matrícula para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  preencherDataAquisicao(data: string) {
    cy.get(el.inputDataAquisicao).should('be.visible').clear().type(data).blur();
  }

  marcarAquisicaoNaoRegistrada(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxAquisicaoNaoRegistrada).check({ force: true });
    } else {
      cy.get(el.checkboxAquisicaoNaoRegistrada).uncheck({ force: true });
    }
    cy.wait(200);
  }

  preencherRegistroAquisicaoMatricula(registro: string) {
    cy.get(el.inputRegistroAquisicaoMatricula).should('be.visible').clear().type(registro).blur();
  }

  preencherPercentualPropriedadeDeCujus(percentual: string) {
    cy.get(el.inputPercentualPropriedadeDeCujus).should('be.visible').clear().type(percentual).blur();
  }

  marcarBemParticularDeCujus(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxBemParticularDeCujus).check({ force: true });
    } else {
      cy.get(el.checkboxBemParticularDeCujus).uncheck({ force: true });
    }
  }

  marcarSolicitarIsencao(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxSolicitarIsencao).check({ force: true });
    } else {
      cy.get(el.checkboxSolicitarIsencao).uncheck({ force: true });
    }
  }

  // Asserções
  validarMensagemErroCampo(campo: string, mensagem: string) {
    if (campo === 'Inscrições municipais') {
      cy.get(el.alertaMinimoInscricaoMunicipal).should('be.visible').and('contain', mensagem);
      return;
    }

    const mapaCampos: { [key: string]: string } = {
      'UF': el.selectUf,
      'Município': el.selectMunicipio,
      'Matrícula': el.inputMatricula,
      'Certidão de Matrícula': el.inputCertidaoMatriculaAnexo,
      'Data de aquisição': el.inputDataAquisicao,
      'Registro de aquisição na matrícula': el.inputRegistroAquisicaoMatricula,
      'CEP': el.inputCep,
      'Tipo do Logradouro': el.selectTipoLogradouro,
      'Logradouro': el.inputLogradouro,
      'Número': el.inputNumero,
      'Bairro': el.inputBairro,
      'Descrição do Imóvel / Complemento': el.textareaDescricaoComplemento,
      'Lote': el.inputLote,
      'Quadra': el.inputQuadra,
      'Tipo do Imóvel': el.selectTipoImovel,
      'Área do Terreno': el.inputAreaTerreno,
      'Área Construída': el.inputAreaConstruida,
      'Valor total declarado': el.inputValorTotalDeclarado,
      'Percentual da propriedade total que será doado': el.inputPercentualDoado,
      'Percentual de propriedade do de cujus + eventual meeiro(a)': el.inputPercentualPropriedadeDeCujus,
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

  validarCampoHabilitado(seletorKey: string, habilitado: boolean) {
    const mapaCampos: { [key: string]: string } = {
      'Número': el.inputNumero,
      'Registro de aquisição na matrícula': el.inputRegistroAquisicaoMatricula,
      'Área do Terreno': el.inputAreaTerreno,
      'Área Construída': el.inputAreaConstruida,
    };

    const seletor = mapaCampos[seletorKey];
    if (habilitado) {
      cy.get(seletor).should('be.enabled');
    } else {
      cy.get(seletor).should('be.disabled');
    }
  }

  validarAlertaGlobal(mensagem: string) {
    cy.get(el.alertaGlobal, { timeout: 10000 }).should('be.visible').and('contain', mensagem);
  }

  validarBemNaTabela(especie: string, municipio: string, valorDeclarado: string) {
    cy.get(el.tabelaBens, { timeout: 15000 })
      .filter(':visible')
      .first()
      .within(() => {
        cy.contains('td', especie).should('be.visible');
        cy.contains('td', municipio).should('be.visible');
        cy.contains('td', valorDeclarado).should('be.visible');
      });
  }
}

export const urbanoPage = new UrbanoPage();
