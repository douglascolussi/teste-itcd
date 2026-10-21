// cypress/support/pageobjects/guia/bens/ruralPage.ts
import { ruralElements as el } from '../../../elements/guia/bens/ruralElements';

export class RuralPage {
  configurarIntercepts() {
    cy.intercept('GET', '**/fipe/distancias*', {
      statusCode: 200,
      body: {
        data: [
          'Até 20km',
          'De 20km a 30km',
          'De 30km a 40km',
          'De 40km a 50km',
          'De 50km a 100km',
          'De 100km a 150km',
          'De 150km a 200km',
          'Acima de 200km',
        ],
      },
    }).as('getFipeDistancias');

    cy.intercept('GET', '**/fipe/pavimentos*', {
      statusCode: 200,
      body: {
        data: [
          'Acesso por Asfalto',
          'Acesso por estrada de chão',
          'Acesso somente por Barco/Avião',
        ],
      },
    }).as('getFipePavimentos');

    cy.intercept('GET', '**/fipe/acessos*', {
      statusCode: 200,
      body: {
        data: ['Até 10km', 'De 10km a 20km', 'Acima de 20km'],
      },
    }).as('getFipeAcessos');
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

  selecionarEspecieRural() {
    cy.get(el.selectEspecieDoBem).should('be.visible').select('Imóvel Rural');
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

  // Preenchimento Comum
  selecionarUf(uf: string) {
    cy.get(el.selectUf).should('be.visible').select(uf);
  }

  selecionarMunicipio(municipio: string) {
    cy.get(el.selectMunicipio).should('be.visible').select(municipio);
    cy.wait(300);
  }

  preencherMatricula(matricula: string) {
    cy.get(el.inputMatricula).should('be.visible').clear().type(matricula).blur();
  }

  responderPossuiCib(resposta: 'Sim' | 'Não') {
    cy.get(el.containerPossuiCib)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(200);
  }

  preencherNumeroCib(cib: string) {
    cy.get(el.inputNumeroCib).should('be.visible').clear().type(cib).blur();
  }

  responderPossuiIe(resposta: 'Sim' | 'Não') {
    cy.get(el.containerPossuiIe)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(200);
  }

  preencherInscricaoEstadual(ie: string) {
    cy.get(el.inputInscricaoEstadual).should('be.visible').clear().type(ie).blur();
  }

  responderCadastradoCar(resposta: 'Sim' | 'Não') {
    cy.get(el.containerEhCadastradoCar)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(200);
  }

  preencherNumeroCar(car: string) {
    cy.get(el.inputNumeroCar).should('be.visible').clear().type(car).blur();
  }

  responderPossuiCoordenadas(resposta: 'Sim' | 'Não') {
    cy.get(el.containerCoordenadas)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(200);
  }

  preencherCoordenadas(lat: string, long: string) {
    cy.get(el.inputLatitude).should('be.visible').clear().type(lat);
    cy.get(el.inputLongitude).should('be.visible').clear().type(long).blur();
  }

  selecionarDistanciaMunicipio(distancia: string) {
    cy.get(el.selectDistanciaMunicipio, { timeout: 10000 })
      .should('be.visible')
      .find('option')
      .should('have.length.gt', 1);
    cy.get(el.selectDistanciaMunicipio).select(distancia);
  }

  selecionarQualidadeAcesso(qualidade: string) {
    cy.get(el.selectQualidadeAcesso, { timeout: 10000 })
      .should('be.visible')
      .find('option')
      .should('have.length.gt', 1);
    cy.get(el.selectQualidadeAcesso).select(qualidade);
    cy.wait(300);
  }

  selecionarDistanciaAsfalto(distancia: string) {
    cy.get(el.selectDistanciaAsfalto).should('be.visible').select(distancia);
  }

  selecionarTipoImovel(tipo: string) {
    cy.get(el.selectTipoImovel).should('be.visible').select(tipo);
  }

  preencherNomeImovel(nome: string) {
    cy.get(el.inputNomeImovel).should('be.visible').clear().type(nome).blur();
  }

  preencherAreaTotalMatricula(area: string) {
    cy.get(el.inputAreaTotalMatricula).should('be.visible').clear().type(area).blur();
  }

  responderHaDeclaracaoItr(resposta: 'Sim' | 'Não') {
    cy.get(el.containerHaDeclaracaoItr)
      .find(resposta === 'Sim' ? 'label:contains("Sim") input' : 'label:contains("Não") input')
      .click({ force: true });
    cy.wait(200);
  }

  preencherJustificativaItr(justificativa: string) {
    cy.get(el.textareaJustificativaItr).should('be.visible').clear().type(justificativa).blur();
  }

  preencherAreaProdutosVegetais(area: string) {
    cy.get(el.inputAreaProdutosVegetais).should('be.visible').clear().type(area).blur();
  }

  preencherAreaPastagem(area: string) {
    cy.get(el.inputAreaPastagem).should('be.visible').clear().type(area).blur();
  }

  preencherAreaReflorestamento(area: string) {
    cy.get(el.inputAreaReflorestamento).should('be.visible').clear().type(area).blur();
  }

  preencherValorTotalDeclarado(valor: string) {
    cy.get(el.inputValorTotalDeclarado).should('be.visible').clear().type(valor).blur();
  }

  // Preenchimento Exclusivo Doação
  preencherAreaDoada(area: string) {
    cy.get(el.inputAreaDoada).should('be.visible').clear().type(area).blur();
  }

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

  anexarCertidaoCar(nomeArquivo = 'certidao_car.pdf') {
    cy.get(el.inputCertidaoCarAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação da certidão do CAR para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  anexarDeclaracaoItr(nomeArquivo = 'declaracao_itr.pdf') {
    cy.get(el.inputDeclaracaoItrAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('Simulação da declaração de ITR para teste.'),
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
  }

  preencherPercentualPropriedadeDeCujus(percentual: string) {
    cy.get(el.inputPercentualPropriedadeDeCujus).should('be.visible').clear().type(percentual).blur();
  }

  preencherAreaInventariada(area: string) {
    cy.get(el.inputAreaInventariada).should('be.visible').clear().type(area).blur();
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
    const mapaCampos: { [key: string]: string } = {
      'UF': el.selectUf,
      'Município': el.selectMunicipio,
      'Matrícula': el.inputMatricula,
      'O imóvel possui número no cadastro imobiliário brasileiro (antigo NIRF)?': el.containerPossuiCib,
      'Número no Cadastro Imobiliário Brasileiro (CIB)': el.inputNumeroCib,
      'O imóvel possui Inscrição estadual (IE)?': el.containerPossuiIe,
      'Inscrição Estadual': el.inputInscricaoEstadual,
      'O imóvel é cadastrado no CAR (Cadastro Ambiental Rural)?': el.containerEhCadastradoCar,
      'Número no Cadastro Ambiental Rural (CAR)': el.inputNumeroCar,
      'Certidão de CAR': el.inputCertidaoCarAnexo,
      'Tenho as coordenadas do imóvel?': el.containerCoordenadas,
      'Latitude do imóvel': el.inputLatitude,
      'Longitude do imóvel': el.inputLongitude,
      'Distância ao município mais próximo': el.selectDistanciaMunicipio,
      'Qualidade do acesso ao imóvel': el.selectQualidadeAcesso,
      'Distância até a estrada de asfalto': el.selectDistanciaAsfalto,
      'Tipo do Imóvel': el.selectTipoImovel,
      'Nome/Descrição do Imóvel': el.inputNomeImovel,
      'Área Total na Matrícula': el.inputAreaTotalMatricula,
      'Área Doada': el.inputAreaDoada,
      'Percentual que será doado': el.inputPercentualDoado,
      'Certidão de Matrícula': el.inputCertidaoMatriculaAnexo,
      'Data de aquisição': el.inputDataAquisicao,
      'Registro de aquisição na matrícula': el.inputRegistroAquisicaoMatricula,
      'Percentual de propriedade do de cujus + eventual meeiro(a)': el.inputPercentualPropriedadeDeCujus,
      'Área Inventariada': el.inputAreaInventariada,
      'Há Declaração de ITR?': el.containerHaDeclaracaoItr,
      'Declaração de ITR': el.inputDeclaracaoItrAnexo,
      'Justificativa': el.textareaJustificativaItr,
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

  validarCampoHabilitado(seletorKey: string, habilitado: boolean) {
    const mapaCampos: { [key: string]: string } = {
      'Número no Cadastro Imobiliário Brasileiro (CIB)': el.inputNumeroCib,
      'Inscrição Estadual': el.inputInscricaoEstadual,
      'Número no Cadastro Ambiental Rural (CAR)': el.inputNumeroCar,
      'Certidão de CAR': el.inputCertidaoCarAnexo,
      'Latitude do imóvel': el.inputLatitude,
      'Longitude do imóvel': el.inputLongitude,
      'Distância até a estrada de asfalto': el.selectDistanciaAsfalto,
      'Justificativa': el.textareaJustificativaItr,
      'Declaração de ITR': el.inputDeclaracaoItrAnexo,
      'Registro de aquisição na matrícula': el.inputRegistroAquisicaoMatricula,
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

  validarAlertaSomaAreas(mensagem: string) {
    cy.contains('.help-block', mensagem).should('be.visible');
  }

  validarAlertaIsencaoNaoDevida() {
    cy.get(el.alertaIsencaoNaoDevida).should('be.visible');
  }
}

export const ruralPage = new RuralPage();
