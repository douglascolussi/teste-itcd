// cypress/support/pageobjects/guia/dividas/dividasPage.ts
import { dividasElements as el } from '../../../elements/guia/dividas/dividasElements';
import { equipamentoAgricolaElements as elEquip } from '../../../elements/guia/bens/equipamentoAgricolaElements';
import { graosElements as elGraos } from '../../../elements/guia/bens/graosElements';
import { titulosElements as elTitulos } from '../../../elements/guia/bens/titulosElements';
import { numerariosElements as elNumerarios } from '../../../elements/guia/bens/numerariosElements';
import { empresaElements as elEmpresa } from '../../../elements/guia/bens/empresaElements';
import { semoventesElements as elSemoventes } from '../../../elements/guia/bens/semoventesElements';
import { urbanoElements as elUrbano } from '../../../elements/guia/bens/urbanoElements';
import { ruralElements as elRural } from '../../../elements/guia/bens/ruralElements';
import { arquivosPage } from '../arquivosPage';
import { outrosPage } from '../bens/outrosPage';
import { veiculoPage } from '../bens/veiculoPage';
import { equipamentoAgricolaPage } from '../bens/equipamentoAgricolaPage';
import { graosPage } from '../bens/graosPage';
import { titulosPage } from '../bens/titulosPage';
import { numerariosPage } from '../bens/numerariosPage';
import { empresaPage } from '../bens/empresaPage';
import { semoventesPage } from '../bens/semoventesPage';
import { urbanoPage } from '../bens/urbanoPage';
import { ruralPage } from '../bens/ruralPage';

/**
 * PageObject da Aba e Tabela de Anexos de Dívidas da Guia
 * Responsável pelas ações e validações no módulo de anexo de arquivos e vínculo de dívidas com bens.
 */
export class DividasPage {
  // Pré-requisito: cadastro de bem básico caso nenhum exista
  private cadastrarBemPreRequisito(): void {
    outrosPage.acessarAbaBens();
    outrosPage.clicarAdicionarBem();
    outrosPage.selecionarEspecieOutros();
    outrosPage.preencherDescricao('Bem de referencia para teste de dividas');
    outrosPage.preencherValorTotalDeclarado('100000');

    cy.get('body').then(($body) => {
      // Causa Mortis
      if ($body.find(el.inputDataAquisicaoBem).is(':visible')) {
        outrosPage.preencherDataDeAquisicao('2020-05-15');
        outrosPage.preencherPercentualPropriedadeDeCujus('10000');
        outrosPage.marcarBemParticularDeCujus(true);
      }
      // Doação Separação
      if ($body.find(el.inputPercentualPropriedadeCasal).is(':visible')) {
        cy.get(el.inputPercentualPropriedadeCasal).type('10000');
        cy.get(el.selectBemIraPertencerAQuem).select('Separando');
        cy.get(el.inputPercentualPropriedadeSeparando).type('10000');
      }
      // Doação padrão
      if ($body.find(el.inputPercentualPropriedadeDoada).is(':visible')) {
        outrosPage.preencherPercentualPropriedadeDoado('10000');
      }
    });

    outrosPage.salvarBem();
    cy.contains(el.linhasTabelaBens, 'Bem de referencia para teste de dividas', { timeout: 10000 })
      .should('be.visible');
  }

  private cadastrarArquivoPreRequisito(): void {
    arquivosPage.acessarAbaArquivos();
    cy.get('body').then(($b) => {
      if ($b.find(el.linhasTabelaArquivos).length === 0) {
        arquivosPage.clicarAdicionarArquivo();
        arquivosPage.selecionarDescricao('Outros');
        arquivosPage.anexarArquivo('doc_requisito.pdf');
        arquivosPage.salvarArquivo();
        cy.contains(el.alertaGlobal, 'O arquivo foi adicionado a lista.', { timeout: 10000 })
          .should('be.visible');
      }
    });
  }

  // Navegação
  acessarAbaDividas(): this {
    cy.get('body').then(($body) => {
      if (!$body.find(el.conteudoAbaDividas).is(':visible')) {
        cy.get('body').then(($b) => {
          if ($b.find(el.linhasTabelaBensValidos).length === 0) {
            this.cadastrarBemPreRequisito();
          }
        });
        this.cadastrarArquivoPreRequisito();

        cy.get(el.abaDividas, { timeout: 15000 }).first().should('be.visible').click();
        cy.wait(500);
      }
    });

    cy.get(el.conteudoAbaDividas, { timeout: 15000 }).should('be.visible');
    return this;
  }

  validarPermanenciaNaAbaDividas(): this {
    cy.get(el.conteudoAbaDividas, { timeout: 10000 }).should('be.visible');
    return this;
  }

  // Abertura do Formulário de Dívida
  abrirFormularioDivida(): this {
    cy.get('body').then(($body) => {
      if (!$body.find(el.formDivida).is(':visible')) {
        cy.get(el.btnAdicionarDivida, { timeout: 10000 }).should('be.visible').click();
      }
    });
    cy.get(el.formDivida, { timeout: 10000 }).should('be.visible');
    return this;
  }

  // Ações de Inclusão de Anexo
  clicarAdicionarAnexo(): this {
    cy.get(el.btnAdicionarAnexoDivida, { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.get(el.selectDescricaoAnexo, { timeout: 10000 }).should('be.visible');
    return this;
  }

  selecionarDescricaoAnexo(descricao: string): this {
    cy.get(el.selectDescricaoAnexo, { timeout: 10000 })
      .should('be.visible')
      .then(($select) => {
        const option = $select.find('option').filter((_, opt) => {
          return ((opt as HTMLOptionElement).text || '').trim().toLowerCase() === descricao.trim().toLowerCase();
        });
        if (option.length > 0) {
          cy.wrap($select).select((option[0] as HTMLOptionElement).text.trim());
        } else {
          cy.wrap($select).select(descricao);
        }
      });
    return this;
  }

  anexarArquivo(nomeArquivo = 'comprovante_divida.pdf', tamanhoMb = 1, tipoMime = 'application/pdf'): this {
    const tamanhoBytes = tamanhoMb * 1024 * 1024;
    const conteudo = Cypress.Buffer.alloc(tamanhoBytes, 'a');

    cy.get(el.inputArquivoAnexo).selectFile(
      {
        contents: conteudo,
        fileName: nomeArquivo,
        mimeType: tipoMime,
      },
      { force: true }
    );
    cy.wait(300);
    return this;
  }

  anexarArquivoInvalido(nomeArquivo = 'executavel_divida.exe'): this {
    cy.get(el.inputArquivoAnexo).selectFile(
      {
        contents: Cypress.Buffer.from('conteudo binario executavel'),
        fileName: nomeArquivo,
        mimeType: 'application/x-msdownload',
      },
      { force: true }
    );
    cy.wait(300);
    return this;
  }

  anexarArquivoPesado(nomeArquivo = 'divida_pesada.pdf'): this {
    const tamanhoBytes = 5 * 1024 * 1024; // 5MB (ultrapassa limite de 4MB)
    const conteudo = Cypress.Buffer.alloc(tamanhoBytes, '0');

    cy.get(el.inputArquivoAnexo).selectFile(
      {
        contents: conteudo,
        fileName: nomeArquivo,
        mimeType: 'application/pdf',
      },
      { force: true }
    );
    cy.wait(300);
    return this;
  }

  salvarAnexo(): this {
    cy.get(el.btnSalvarAnexo).first().click({ force: true });
    cy.wait(300);
    return this;
  }

  cancelarAnexo(): this {
    cy.get(el.btnCancelarAnexo).first().click({ force: true });
    cy.wait(300);
    return this;
  }

  // Ações de Edição
  clicarEditarPrimeiroAnexo(): this {
    cy.get(el.btnEditarAnexo).first().click({ force: true });
    cy.get(el.selectDescricaoAnexo, { timeout: 10000 }).should('be.visible');
    return this;
  }

  salvarEdicaoAnexo(): this {
    cy.get(el.btnSalvarAnexo).first().click({ force: true });
    cy.wait(300);
    return this;
  }

  // Ações de Exclusão
  clicarExcluirPrimeiroAnexo(): this {
    cy.get(el.btnExcluirAnexo).first().click({ force: true });
    cy.get(el.modalExcluirAnexo, { timeout: 10000 }).should('be.visible');
    return this;
  }

  confirmarExclusaoModal(): this {
    cy.get(el.btnConfirmarExclusaoModal).click({ force: true });
    cy.wait(300);
    return this;
  }

  // Asserções
  validarMensagemErroDescricao(mensagem: string): this {
    cy.get(el.selectDescricaoAnexo)
      .closest('.form-group')
      .find('.help-block')
      .should('be.visible')
      .and('contain', mensagem);
    return this;
  }

  validarMensagemErroArquivo(mensagem: string): this {
    cy.get(el.inputArquivoAnexo)
      .closest('.form-group')
      .find('.help-block')
      .should('be.visible')
      .and('contain', mensagem);
    return this;
  }

  validarAlertaGlobal(mensagem: string): this {
    cy.contains(el.alertaGlobal, mensagem, { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  validarAnexoNaTabela(descricao: string, nomeArquivo: string): this {
    cy.get(el.tabelaAnexosDivida, { timeout: 15000 })
      .filter(':visible')
      .within(() => {
        cy.contains('td', descricao).should('be.visible');
        cy.contains('td', nomeArquivo).should('be.visible');
      });
    return this;
  }

  validarTabelaVazia(mensagem = 'Nenhuma dívida foi inserido até agora'): this {
    cy.get(el.tabelaAnexosDivida, { timeout: 10000 })
      .filter(':visible')
      .within(() => {
        cy.contains('td', mensagem).should('be.visible');
      });
    return this;
  }

  validarFormularioAnexoFechado(): this {
    cy.get(el.linhaFormularioAnexo).should('not.exist');
    return this;
  }

  // Vínculo de Dívida com Bens
  informarVinculoComBem(vinculada: 'Sim' | 'Não'): this {
    cy.get(el.selectEstaVinculadaABem, { timeout: 10000 })
      .should('be.visible')
      .select(vinculada);
    cy.wait(300);
    return this;
  }

  validarCampoBemVinculadoVisivel(visivel: boolean): this {
    if (visivel) {
      cy.get(el.selectBemVinculado, { timeout: 10000 }).should('be.visible');
    } else {
      cy.get(el.selectBemVinculado).should('not.exist');
    }
    return this;
  }

  validarMensagemErroBemVinculado(mensagem = 'Campo obrigatório.'): this {
    cy.get(el.selectBemVinculado)
      .closest('.form-group')
      .find('.help-block')
      .should('be.visible')
      .and('contain', mensagem);
    return this;
  }

  validarOpcaoBemVinculadoDisponivel(descricaoOuEspecie: string): this {
    cy.get(el.selectBemVinculado, { timeout: 10000 })
      .should('be.visible')
      .find('option')
      .should('contain', descricaoOuEspecie);
    return this;
  }

  validarOpcaoBemVinculadoNaoDisponivel(descricaoOuEspecie: string): this {
    cy.get(el.selectBemVinculado, { timeout: 10000 })
      .should('be.visible')
      .find('option')
      .should('not.contain', descricaoOuEspecie);
    return this;
  }

  selecionarBemVinculado(descricaoOuEspecie: string): this {
    cy.get(el.selectBemVinculado, { timeout: 10000 })
      .should('be.visible')
      .find('option')
      .filter((_, opt) => opt.innerText.includes(descricaoOuEspecie))
      .first()
      .then(($opt) => {
        cy.get(el.selectBemVinculado).select($opt.text().trim(), { force: true });
      });
    cy.wait(300);
    return this;
  }

  validarBemVinculadoSelecionado(descricaoOuEspecie: string): this {
    cy.get(el.selectBemVinculado)
      .find('option:selected')
      .should('contain', descricaoOuEspecie);
    return this;
  }

  validarNaturezaSugerida(natureza: string): this {
    cy.get(el.selectNaturezaDivida)
      .find('option:selected')
      .should('contain', natureza);
    return this;
  }

  clicarSalvarDivida(): this {
    cy.get(el.btnSalvarDivida).first().click({ force: true });
    cy.wait(300);
    return this;
  }

  /**
   * Cadastra qualquer tipo de bem via formulário da UI
   */
  cadastrarBemPorEspecie(especie: string): this {
    cy.get(el.abaBens, { timeout: 15000 }).first().should('be.visible').click();
    cy.wait(400);

    const preencherCamposComunsCausaMortis = () => {
      cy.get('body').then(($body) => {
        if ($body.find(el.inputDataAquisicaoBem).is(':visible')) {
          cy.get(el.inputDataAquisicaoBem).clear().type('2022-05-15');
        }
        if ($body.find(el.inputPercentualPropriedadeDeCujus).is(':visible')) {
          cy.get(el.inputPercentualPropriedadeDeCujus).clear().type('10000');
        }
        if ($body.find(el.checkboxBemParticularDeCujus).length > 0) {
          cy.get(el.checkboxBemParticularDeCujus).check({ force: true });
        }
        if ($body.find(el.inputPercentualPropriedadeCasal).is(':visible')) {
          cy.get(el.inputPercentualPropriedadeCasal).clear().type('10000');
          cy.get(el.selectBemIraPertencerAQuem).select('Separando');
          cy.get(el.inputPercentualPropriedadeSeparando).clear().type('10000');
        }
        if ($body.find(el.inputPercentualPropriedadeDoada).is(':visible')) {
          cy.get(el.inputPercentualPropriedadeDoada).clear().type('10000');
        }
      });
    };

    switch (especie) {
      case 'Outros':
      case 'Outro Bem':
        outrosPage.clicarAdicionarBem();
        outrosPage.selecionarEspecieOutros();
        outrosPage.preencherDescricao('Jóias e quadros raros');
        outrosPage.preencherValorTotalDeclarado('50000');
        preencherCamposComunsCausaMortis();
        outrosPage.salvarBem();
        break;

      case 'Veículo':
        veiculoPage.clicarAdicionarBem();
        veiculoPage.selecionarEspecieVeiculo();
        veiculoPage.preencherPlaca('ABC1D23');
        veiculoPage.preencherRenavam('12345678901');
        preencherCamposComunsCausaMortis();
        veiculoPage.salvarBem();
        break;

      case 'Equipamento Agrícola':
        equipamentoAgricolaPage.clicarAdicionarBem();
        equipamentoAgricolaPage.selecionarEspecieEquipamentoAgricola();
        cy.get('body').then(($b) => {
          if ($b.find(elEquip.inputEspecificacao).is(':visible')) {
            equipamentoAgricolaPage.preencherEspecificacao('Trator');
          } else if ($b.find(elEquip.inputTipo).is(':visible')) {
            equipamentoAgricolaPage.preencherTipo('Trator');
          }
          if ($b.find(elEquip.inputDataAquisicao).is(':visible')) {
            equipamentoAgricolaPage.preencherDataAquisicao('2021-08-15');
          }
        });
        equipamentoAgricolaPage.preencherMarca('John Deere');
        equipamentoAgricolaPage.preencherModelo('6110J');
        equipamentoAgricolaPage.preencherAno('2021');
        equipamentoAgricolaPage.preencherValorTotalDeclarado('250000');
        preencherCamposComunsCausaMortis();
        equipamentoAgricolaPage.salvarBem();
        break;

      case 'Grãos':
      case 'Grãos / Prod. Agrícolas':
        graosPage.clicarAdicionarBem();
        graosPage.selecionarEspecieGraos();
        graosPage.selecionarProduto('Soja');
        graosPage.selecionarUnidade('Sacas');
        graosPage.preencherValorTotalDeclarado('120000');
        cy.get('body').then(($b) => {
          if ($b.find(elGraos.inputQuantidadeInventariada).is(':visible')) {
            graosPage.preencherQuantidadeInventariada('1000');
          }
          if ($b.find(elGraos.inputQuantidadeDoada).is(':visible')) {
            graosPage.preencherQuantidadeDoada('1000');
          }
        });
        preencherCamposComunsCausaMortis();
        graosPage.salvarBem();
        break;

      case 'Títulos':
      case 'Títulos em Bolsa':
        titulosPage.clicarAdicionarBem();
        titulosPage.selecionarEspecieTitulos();
        titulosPage.preencherInstituicaoCustodia('XP Investimentos');
        titulosPage.selecionarTipo('Ação');
        titulosPage.preencherIdentificacaoTicker('PETR4');
        cy.get('body').then(($b) => {
          if ($b.find(elTitulos.inputExtratoCustodiaAnexo).length > 0) {
            titulosPage.anexarExtratoCustodia();
          }
          if ($b.find(elTitulos.inputQuantidadeInventariada).is(':visible')) {
            titulosPage.preencherQuantidadeInventariada('100');
          }
          if ($b.find(elTitulos.inputQuantidadeDoada).is(':visible')) {
            titulosPage.preencherQuantidadeDoada('100');
          }
        });
        titulosPage.preencherValorTotalDeclarado('80000');
        preencherCamposComunsCausaMortis();
        titulosPage.salvarBem();
        break;

      case 'Numerários':
      case 'Numerários/Aplicações/Títulos':
        numerariosPage.clicarAdicionarBem();
        numerariosPage.selecionarEspecieNumerarios();
        numerariosPage.preencherInstituicaoFinanceira('Banco do Brasil');
        numerariosPage.preencherAgencia('1234');
        numerariosPage.preencherConta('56789-0');
        numerariosPage.selecionarTipo('Saldo em conta corrente');
        numerariosPage.preencherValorTotalDeclarado('50000');
        cy.get('body').then(($b) => {
          if ($b.find(elNumerarios.inputExtratoDaInstituicaoFinanceiraAnexo).length > 0) {
            numerariosPage.anexarExtratoInstituicaoFinanceira();
          }
        });
        preencherCamposComunsCausaMortis();
        numerariosPage.salvarBem();
        break;

      case 'Empresa':
        empresaPage.clicarAdicionarBem();
        empresaPage.selecionarEspecieEmpresa();
        empresaPage.preencherCnpj('11222333000181');
        empresaPage.preencherNomeRazaoSocial('Empresa Modelo Ltda');
        empresaPage.selecionarUfDaSede('MS');
        empresaPage.selecionarMunicipioDaSede('Campo Grande');
        empresaPage.preencherCapitalSocial('10000000');
        empresaPage.preencherPatrimonioLiquido('10000000');
        empresaPage.preencherQtdCotasTotal('100000');
        cy.get('body').then(($b) => {
          if ($b.find(elEmpresa.inputContratoSocialAnexo).length > 0) {
            empresaPage.anexarContratoSocial();
          }
          if ($b.find(elEmpresa.inputBalancoPatrimonialAnexo).length > 0) {
            empresaPage.anexarBalancoPatrimonial();
          }
          if ($b.find(elEmpresa.inputQtdCotasInventariadas).is(':visible')) {
            empresaPage.preencherQtdCotasInventariadas('20000');
          }
          if ($b.find(elEmpresa.inputQtdCotasDoadas).is(':visible')) {
            empresaPage.preencherQtdCotasDoadas('20000');
          }
        });
        empresaPage.preencherValorPorCotaDeclarado('10000');
        preencherCamposComunsCausaMortis();
        empresaPage.salvarBem();
        break;

      case 'Semoventes':
      case 'Semoventes Bovinos':
        semoventesPage.clicarAdicionarBem();
        semoventesPage.selecionarEspecieSemoventes();
        semoventesPage.selecionarUf('MS');
        semoventesPage.selecionarMunicipio('Campo Grande');
        semoventesPage.preencherInscricaoEstadual('281234567');
        cy.get('body').then(($b) => {
          if ($b.find(elSemoventes.inputFichaSaldoIagroAnexo).length > 0) {
            semoventesPage.anexarFichaSaldoIagro();
          }
        });
        semoventesPage.selecionarGrupoDoSemovente('Bovino - Fêmeas (Vacas)');
        semoventesPage.preencherFaixa0a12M('50');
        semoventesPage.preencherValorTotalDeclarado('150000');
        preencherCamposComunsCausaMortis();
        semoventesPage.salvarBem();
        break;

      case 'Semoventes Não Bovinos':
        semoventesPage.clicarAdicionarBem();
        semoventesPage.selecionarEspecieSemoventes();
        semoventesPage.selecionarUf('MS');
        semoventesPage.selecionarMunicipio('Campo Grande');
        semoventesPage.preencherInscricaoEstadual('281234567');
        cy.get('body').then(($b) => {
          if ($b.find(elSemoventes.inputFichaSaldoIagroAnexo).length > 0) {
            semoventesPage.anexarFichaSaldoIagro();
          }
        });
        semoventesPage.selecionarGrupoDoSemovente('Equinos');
        cy.get('body').then(($b) => {
          if ($b.find(elSemoventes.inputQuantidadeTotalInventariada).is(':visible')) {
            semoventesPage.preencherQuantidadeTotalInventariada('50');
          }
          if ($b.find(elSemoventes.inputQuantidadeTotalDoada).is(':visible')) {
            semoventesPage.preencherQuantidadeTotalDoada('50');
          }
        });
        semoventesPage.preencherValorTotalDeclarado('150000');
        preencherCamposComunsCausaMortis();
        semoventesPage.salvarBem();
        break;

      case 'Imóvel Urbano':
        urbanoPage.clicarAdicionarBem();
        urbanoPage.selecionarEspecieUrbano();
        urbanoPage.selecionarMunicipio('Campo Grande');
        urbanoPage.preencherMatricula('33445');
        cy.get('body').then(($b) => {
          if ($b.find(elUrbano.inputCertidaoMatriculaAnexo).length > 0) {
            urbanoPage.anexarCertidaoMatricula();
            urbanoPage.preencherDataAquisicao('2019-05-15');
            urbanoPage.marcarAquisicaoNaoRegistrada(true);
          }
        });
        urbanoPage.preencherCep('79002000');
        urbanoPage.selecionarMunicipio('Campo Grande');
        urbanoPage.selecionarTipoLogradouro('Rua');
        urbanoPage.preencherLogradouro('Dom Aquino');
        urbanoPage.preencherNumero('250');
        urbanoPage.preencherBairro('Centro');
        urbanoPage.preencherDescricaoComplemento('Casa urbana para teste');
        urbanoPage.preencherLote('12');
        urbanoPage.preencherQuadra('08');
        urbanoPage.selecionarTipoImovel('Casa');
        urbanoPage.preencherAreaTerreno('250');
        urbanoPage.preencherAreaConstruida('120');
        urbanoPage.preencherValorTotalDeclarado('450000');
        urbanoPage.adicionarInscricaoMunicipal('123456789', true);
        preencherCamposComunsCausaMortis();
        urbanoPage.salvarBem();
        break;

      case 'Imóvel Rural':
        ruralPage.configurarIntercepts();
        ruralPage.clicarAdicionarBem();
        ruralPage.selecionarEspecieRural();
        ruralPage.selecionarMunicipio('Campo Grande');
        ruralPage.preencherMatricula('54321');
        cy.get('body').then(($b) => {
          if ($b.find(elRural.inputCertidaoMatriculaAnexo).length > 0) {
            ruralPage.anexarCertidaoMatricula();
            ruralPage.preencherDataAquisicao('2018-03-20');
            ruralPage.marcarAquisicaoNaoRegistrada(true);
          }
        });
        ruralPage.responderPossuiCib('Não');
        ruralPage.responderPossuiIe('Não');
        ruralPage.responderCadastradoCar('Não');
        ruralPage.responderPossuiCoordenadas('Não');
        ruralPage.selecionarDistanciaMunicipio('Até 20km');
        ruralPage.selecionarQualidadeAcesso('Acesso por Asfalto');
        ruralPage.selecionarTipoImovel('Fazenda');
        ruralPage.preencherNomeImovel('Fazenda Primavera');
        ruralPage.preencherAreaTotalMatricula('150');
        ruralPage.responderHaDeclaracaoItr('Não');
        ruralPage.preencherJustificativaItr('Imóvel rural sem ITR para teste');
        ruralPage.preencherValorTotalDeclarado('750000');
        preencherCamposComunsCausaMortis();
        ruralPage.salvarBem();
        break;

      default:
        outrosPage.clicarAdicionarBem();
        outrosPage.selecionarEspecieOutros();
        outrosPage.preencherDescricao('Bem diverso');
        outrosPage.preencherValorTotalDeclarado('50000');
        preencherCamposComunsCausaMortis();
        outrosPage.salvarBem();
        break;
    }

    cy.wait(500);
    return this;
  }

  cadastrarTodosOsTiposDeBensNaGuia(): this {
    const tipos = [
      'Imóvel Rural',
      'Imóvel Urbano',
      'Veículo',
      'Empresa',
      'Semoventes Bovinos',
      'Equipamento Agrícola',
      'Grãos',
      'Títulos em Bolsa',
      'Outro Bem',
      'Numerários',
    ];
    tipos.forEach((tipo) => {
      this.cadastrarBemPorEspecie(tipo);
    });
    return this;
  }

  // Método auxiliar para seleção garantida em selects do Angular com [ngValue]
  private selecionarOpcaoAngular(seletor: string, textoOpcao: string): this {
    cy.get(seletor, { timeout: 10000 })
      .should('be.visible')
      .then(($select) => {
        const selectEl = $select[0] as HTMLSelectElement;
        const options = Array.from(selectEl.options);
        const targetOption = options.find((opt) => {
          const txt = opt.text.trim().toLowerCase();
          const target = textoOpcao.trim().toLowerCase();
          return txt === target || txt.includes(target);
        });

        if (targetOption) {
          selectEl.selectedIndex = targetOption.index;
          options.forEach((opt, idx) => {
            opt.selected = (idx === targetOption.index);
          });
          selectEl.value = targetOption.value;
          selectEl.dispatchEvent(new Event('change', { bubbles: true }));
          selectEl.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });

    cy.get(seletor).then(($select) => {
      const selectEl = $select[0] as HTMLSelectElement;
      const options = Array.from(selectEl.options);
      const targetOption = options.find((opt) => {
        const txt = opt.text.trim().toLowerCase();
        const target = textoOpcao.trim().toLowerCase();
        return txt === target || txt.includes(target);
      });
      if (targetOption) {
        cy.wrap($select).select(targetOption.value, { force: true });
      }
    });

    // Garante que o texto selecionado na visualização não seja "Selecione"
    cy.get(seletor).should(($select) => {
      const selectEl = $select[0] as HTMLSelectElement;
      const textoAtual = selectEl.options[selectEl.selectedIndex]?.text?.trim() || '';
      expect(textoAtual.toLowerCase(), `O campo selecionado deve exibir "${textoOpcao}"`).to.include(textoOpcao.trim().toLowerCase());
    });

    return this;
  }

  // Métodos de Separação / Percentuais de Dívida
  selecionarTipoDivida(tipo: string): this {
    return this.selecionarOpcaoAngular(el.selectTipoDivida, tipo);
  }

  selecionarADividaIraPertencerAQuem(opcao: string): this {
    return this.selecionarOpcaoAngular(el.selectADividaIraPertencerAQuem, opcao);
  }

  preencherPercentualSeparando(percentual: string): this {
    const valorLimpo = percentual.replace(/[^\d]/g, '');
    cy.get(el.inputPercentualParaOSeparando, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(valorLimpo)
      .trigger('keyup')
      .trigger('change');
    return this;
  }

  preencherPercentualSeparanda(percentual: string): this {
    const valorLimpo = percentual.replace(/[^\d]/g, '');
    cy.get(el.inputPercentualParaASeparanda, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(valorLimpo)
      .trigger('keyup')
      .trigger('change');
    return this;
  }

  validarPercentualSeparando(esperado: string): this {
    const valorEsperado = esperado.replace('%', '').trim();
    cy.get(el.inputPercentualParaOSeparando, { timeout: 10000 })
      .should('be.visible')
      .invoke('val')
      .then((val: any) => {
        const texto = String(val).replace(/\s+/g, ' ').replace('%', '').trim();
        expect(texto).to.include(valorEsperado);
      });
    return this;
  }

  validarPercentualSeparanda(esperado: string): this {
    const valorEsperado = esperado.replace('%', '').trim();
    cy.get(el.inputPercentualParaASeparanda, { timeout: 10000 })
      .should('be.visible')
      .invoke('val')
      .then((val: any) => {
        const texto = String(val).replace(/\s+/g, ' ').replace('%', '').trim();
        expect(texto).to.include(valorEsperado);
      });
    return this;
  }

  validarCamposPercentuaisEditaveis(editaveis: boolean): this {
    if (editaveis) {
      cy.get(el.inputPercentualParaOSeparando)
        .should('be.visible')
        .should('not.have.attr', 'readonly');
      cy.get(el.inputPercentualParaOSeparando)
        .should('be.enabled');
      cy.get(el.inputPercentualParaASeparanda)
        .should('be.visible')
        .should('not.have.attr', 'readonly');
      cy.get(el.inputPercentualParaASeparanda)
        .should('be.enabled');
    } else {
      cy.get('body').then(($body) => {
        const separando = $body.find(el.inputPercentualParaOSeparando);
        const separanda = $body.find(el.inputPercentualParaASeparanda);
        const separandoBloqueado = separando.is(':disabled') || separando.attr('readonly') !== undefined;
        const separandaBloqueada = separanda.is(':disabled') || separanda.attr('readonly') !== undefined;
        expect(separandoBloqueado, 'Separando deve estar bloqueado').to.be.true;
        expect(separandaBloqueada, 'Separanda deve estar bloqueada').to.be.true;
      });
    }
    return this;
  }

  preencherCamposObrigatoriosDivida(descricao: string = 'Dívida de teste', valor: string = '1000000'): this {
    cy.get(el.textareaDescricaoDivida).clear().type(descricao);
    cy.get(el.inputDataConstituicao).clear().type('2023-01-15');
    const valorLimpo = valor.replace(/[^\d]/g, '');
    cy.get(el.inputValorDivida).clear().type(valorLimpo);
    cy.get(el.selectNaturezaDivida).should('be.visible').find('option').filter((_, opt) => {
      return ((opt as HTMLOptionElement).text || '').trim().toLowerCase() === 'comum';
    }).then(($opt) => {
      cy.get(el.selectNaturezaDivida).select($opt.val() as string, { force: true }).trigger('change');
    });
    cy.get(el.selectSituacaoProcessual).should('be.visible').find('option').filter((_, opt) => {
      return ((opt as HTMLOptionElement).text || '').trim().toLowerCase().includes('não está em cobrança');
    }).then(($opt) => {
      cy.get(el.selectSituacaoProcessual).select($opt.val() as string, { force: true }).trigger('change');
    });
    return this;
  }

  abrirEdicaoPrimeiraDivida(): this {
    cy.get(el.btnEditarPrimeiraDivida, { timeout: 10000 })
      .first()
      .should('be.visible')
      .click();
    return this;
  }

  validarMensagemBloqueio(mensagem: string): this {
    cy.get('body').then(($body) => {
      const temToast = $body.find(`${el.alertaGlobal}:contains("${mensagem}")`).length > 0;
      const temTexto = $body.text().includes(mensagem);
      if (!temToast && !temTexto) {
        // Também pode ser captura de window:alert disparado no Angular
        cy.wrap(true).then(() => {
          expect(temToast || temTexto, `Mensagem "${mensagem}" deve ser exibida ao usuário`).to.be.true;
        });
      } else {
        expect(temToast || temTexto).to.be.true;
      }
    });
    return this;
  }
}

export const dividasPage = new DividasPage();
