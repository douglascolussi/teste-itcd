// cypress/support/pageobjects/guia/dados_gerais/dadosGeraisPage.ts
import { dadosGeraisElements as el } from '../../../elements/guia/dados_gerais/dadosGeraisElements';

export class DadosGeraisPage {
  selecionarNatureza(natureza: 'Causa Mortis' | 'Doação') {
    if (natureza === 'Causa Mortis') {
      cy.get(el.radioCausaMortis).click({ force: true });
    } else {
      cy.get(el.radioDoacao).click({ force: true });
    }
    // Aguarda o Angular carregar as opções de Tipo de Operação baseadas na natureza
    cy.get(el.selectTipoOperacao).should('be.enabled');
  }

  selecionarTipoOperacao(tipo: string) {
    cy.get(el.selectTipoOperacao).should('be.visible').select(tipo);
  }

  preencherProcesso(processo: string) {
    cy.get(el.inputProcesso).should('be.visible').clear().type(processo).blur();
  }

  preencherDataProtocolo(data: string) {
    cy.get(el.inputDataProtocolo).should('be.visible').clear().type(data);
  }

  preencherCartorio(cartorio: string) {
    cy.get(el.inputCartorio).should('be.visible').clear().type(cartorio).blur();
  }

  selecionarUfTramitacao(uf: string) {
    cy.get(el.selectUfTramitacao).should('be.visible').select(uf);
  }

  responderSimOuNao(pergunta: string, resposta: 'Sim' | 'Não') {
    cy.contains(pergunta).parent().find(resposta === 'Sim' ? el.radioSim : el.radioNao).click({ force: true });
  }

  preencherDataObito(data: string) {
    cy.get(el.inputDataObito).should('be.visible').clear().type(data);
  }

  preencherDataRegistroReserva(data: string) {
    cy.get(el.inputDataRegistroReserva).should('be.visible').clear().type(data);
  }

  preencherDataNomeacaoInventariante(data: string) {
    cy.get(el.inputDataNomeacaoInventariante).should('be.visible').clear().type(data);
  }

  preencherDataSentenca(data: string) {
    cy.get(el.inputDataSentenca).should('be.visible').clear().type(data);
  }

  preencherDataTransitoJulgado(data: string) {
    cy.get(el.inputDataTransitoJulgado).should('be.visible').clear().type(data);
  }

  preencherDataLavratura(data: string) {
    cy.get(el.inputDataLavratura).should('be.visible').clear().type(data);
  }

  preencherDataDoacao(data: string) {
    cy.get(el.inputDataDoacao).should('be.visible').clear().type(data).blur();
  }

  preencherProcessoTestamento(processo: string) {
    cy.get(el.inputProcessoTestamento).should('be.visible').clear().type(processo);
  }

  avancar() {
    cy.get(el.btnAvancar).should('not.be.disabled').click();
  }

  validarOpcoesTipo(natureza: 'Causa Mortis' | 'Doação') {
    const opcoesCausaMortis = ['Alvará Judicial', 'Arrolamento', 'Extrajudicial', 'Ordinário'];
    const opcoesDoacao = [
      'Cessão De Direitos', 'Com Reserva De Usufruto', 'Desigualdade De Partilha',
      'Extinção De Usufruto', 'Instituição De Usufruto', 'Nua Propriedade',
      'Renúncia De Herança', 'Renúncia De Usufruto', 'Separação Extrajudicial',
      'Separação Judicial', 'Simples'
    ];

    cy.get(el.selectTipoOperacao).should('be.visible');
    const listaEsperada = natureza === 'Causa Mortis' ? opcoesCausaMortis : opcoesDoacao;

    listaEsperada.forEach(opcao => {
      cy.get(el.selectTipoOperacao).find(el.optionsTipoOperacao).should('contain', opcao);
    });
  }

  validarCampoResetado() {
    cy.get(el.selectTipoOperacao).should('have.value', 'null');
  }

  /**
   * Preenche todos os campos específicos obrigatórios da aba Dados Gerais conforme a natureza e o tipo de operação
   */
  preencherDadosGeraisCompletosPorTipo(natureza: string, tipo: string) {
    if (natureza === 'Causa Mortis') {
      if (tipo === 'Extrajudicial') {
        this.preencherCartorio('1º Ofício de Notas de Campo Grande');
        this.selecionarUfTramitacao('MS');
        this.responderSimOuNao('O inventariante já foi nomeado?', 'Não');
      } else {
        // Judicial: Ordinário, Arrolamento, Alvará Judicial
        this.preencherProcesso('08001234520238120001');
        this.preencherDataProtocolo('2023-01-10');
        this.selecionarUfTramitacao('MS');
        this.responderSimOuNao('Já ocorreu sentença homologatória?', 'Não');
        this.responderSimOuNao('Existe Testamento?', 'Não');
      }
    } else if (natureza === 'Doação') {
      if (tipo === 'Separação Judicial') {
        this.preencherProcesso('08001234520238120001');
        this.preencherDataTransitoJulgado('2023-01-10');
        this.selecionarUfTramitacao('MS');
      } else if (tipo === 'Separação Extrajudicial') {
        this.preencherCartorio('1º Ofício de Notas de Campo Grande');
        this.selecionarUfTramitacao('MS');
        this.responderSimOuNao('Já ocorreu lavratura da escritura?', 'Não');
      } else if (tipo === 'Extinção De Usufruto') {
        this.preencherDataObito('2022-01-10');
        this.preencherDataRegistroReserva('2020-01-10');
      } else if (tipo === 'Renúncia De Usufruto') {
        this.preencherDataRegistroReserva('2020-01-10');
        this.responderSimOuNao('A Renúncia já ocorreu?', 'Não');
      } else {
        // Tipos de doação padrão: Simples, Cessão De Direitos, Com Reserva De Usufruto, etc.
        this.responderSimOuNao('A Doação já ocorreu?', 'Não');
      }
    }
  }
}

export const dadosGeraisPage = new DadosGeraisPage();
