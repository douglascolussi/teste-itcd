// cypress/support/steps/guia/bens/outrosSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { outrosPage } from '../../../pageobjects/guia/bens/outrosPage';

// Navegação
When('seleciono a espécie do bem "Outros"', () => {
  outrosPage.selecionarEspecieOutros();
});

// Preenchimento de Campos Comuns
When('preencho a Descrição do bem outros {string}', (descricao: string) => {
  outrosPage.preencherDescricao(descricao);
});

When('preencho o Valor Total Declarado do bem outros {string}', (valor: string) => {
  outrosPage.preencherValorTotalDeclarado(valor);
});

// Campos Exclusivos Doação
When('preencho o Percentual de propriedade total que será doado do bem outros {string}', (percentual: string) => {
  outrosPage.preencherPercentualPropriedadeDoado(percentual);
});

// Campos Exclusivos Causa Mortis
When('preencho a Data de aquisição do bem outros {string}', (data: string) => {
  outrosPage.preencherDataDeAquisicao(data);
});

When('preencho o Percentual de propriedade do de cujus do bem outros {string}', (percentual: string) => {
  outrosPage.preencherPercentualPropriedadeDeCujus(percentual);
});

When('marco bem particular do de cujus do bem outros', () => {
  outrosPage.marcarBemParticularDeCujus(true);
});

When('desmarco bem particular do de cujus do bem outros', () => {
  outrosPage.marcarBemParticularDeCujus(false);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do bem outros', (mensagem: string, campo: string) => {
  outrosPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o bem outros deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}', (especie: string, resumo: string, valor: string) => {
  outrosPage.validarBemNaTabela(especie, resumo, valor);
});
