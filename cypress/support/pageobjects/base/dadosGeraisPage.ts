// cypress/support/pageobjects/base/dadosGeraisPage.ts
import { dadosGeraisElements as el } from '../../elements/dadosGeraisElements';

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
    // Usando .select() que funciona melhor com tags <select> padrão do HTML
    cy.get(el.selectTipoOperacao).should('be.visible').select(tipo);
  }

  preencherProcesso(processo: string) {
    cy.get(el.inputProcesso).should('be.visible').clear().type(processo);
  }

  preencherDataProtocolo(data: string) {
    cy.get(el.inputDataProtocolo).should('be.visible').clear().type(data);
  }

  preencherCartorio(cartorio: string) {
    cy.get(el.inputCartorio).should('be.visible').clear().type(cartorio);
  }

  selecionarUfTramitacao(uf: string) {
    cy.get(el.selectUfTramitacao).should('be.visible').select(uf);
  }

  responderSimOuNao(pergunta: string, resposta: 'Sim' | 'Não') {
    // Busca o rádio pelo texto da label ou container
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
}

export const dadosGeraisPage = new DadosGeraisPage();
