// cypress/support/steps/guia/bens/graosSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { graosPage } from '../../../pageobjects/guia/bens/graosPage';

// Navegação
When('seleciono a espécie do bem "Grãos\\/Produtos agrícolas"', () => {
  graosPage.selecionarEspecieGraos();
});

// Preenchimento de Campos Comuns
When('seleciono o Produto do bem grãos {string}', (produto: string) => {
  graosPage.selecionarProduto(produto);
});

When('seleciono a Unidade do bem grãos {string}', (unidade: string) => {
  graosPage.selecionarUnidade(unidade);
});

When('preencho o Valor Total Declarado do bem grãos {string}', (valor: string) => {
  graosPage.preencherValorTotalDeclarado(valor);
});

// Campos Exclusivos Doação
When('preencho a Quantidade doada do bem grãos {string}', (quantidade: string) => {
  graosPage.preencherQuantidadeDoada(quantidade);
});

// Campos Exclusivos Causa Mortis
When('preencho a Quantidade inventariada do bem grãos {string}', (quantidade: string) => {
  graosPage.preencherQuantidadeInventariada(quantidade);
});

When('marco bem particular do de cujus do bem grãos', () => {
  graosPage.marcarBemParticularDeCujus(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do bem grãos', (mensagem: string, campo: string) => {
  graosPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o bem grãos deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}', (especie: string, resumo: string, valor: string) => {
  graosPage.validarBemNaTabela(especie, resumo, valor);
});
