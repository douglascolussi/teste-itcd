// cypress/support/steps/guia/bens/titulosSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { titulosPage } from '../../../pageobjects/guia/bens/titulosPage';

// Navegação
When('seleciono a espécie do bem "Títulos negociados em bolsa de valores"', () => {
  titulosPage.selecionarEspecieTitulos();
});

// Preenchimento de Campos Comuns
When('preencho a Instituição de custódia do bem títulos {string}', (instituicao: string) => {
  titulosPage.preencherInstituicaoCustodia(instituicao);
});

When('seleciono o Tipo do bem títulos {string}', (tipo: string) => {
  titulosPage.selecionarTipo(tipo);
});

When('preencho a Identificação ou Ticker do bem títulos {string}', (ticker: string) => {
  titulosPage.preencherIdentificacaoTicker(ticker);
});

When('preencho a Quantidade de criptomoeda doada do bem títulos {string}', (quantidade: string) => {
  titulosPage.preencherQuantidadeCriptoMoeda(quantidade);
});

When('preencho a Quantidade de criptomoeda inventariada do bem títulos {string}', (quantidade: string) => {
  titulosPage.preencherQuantidadeCriptoMoeda(quantidade);
});

When('preencho o Valor Total Declarado do bem títulos {string}', (valor: string) => {
  titulosPage.preencherValorTotalDeclarado(valor);
});

// Campos Exclusivos Doação
When('preencho a Quantidade doada do bem títulos {string}', (quantidade: string) => {
  titulosPage.preencherQuantidadeDoada(quantidade);
});

// Campos Exclusivos Causa Mortis
When('anexo o extrato da instituição de custódia do bem títulos', () => {
  titulosPage.anexarExtratoCustodia();
});

When('preencho a Quantidade inventariada do bem títulos {string}', (quantidade: string) => {
  titulosPage.preencherQuantidadeInventariada(quantidade);
});

When('marco bem particular do de cujus do bem títulos', () => {
  titulosPage.marcarBemParticularDeCujus(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do bem títulos', (mensagem: string, campo: string) => {
  titulosPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o campo {string} do bem títulos deve estar {string}', (campo: string, estado: string) => {
  const visivel = estado === 'visível' || estado === 'habilitado';
  titulosPage.validarCampoVisivel(campo, visivel);
});

Then('o bem títulos deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}', (especie: string, resumo: string, valor: string) => {
  titulosPage.validarBemNaTabela(especie, resumo, valor);
});
