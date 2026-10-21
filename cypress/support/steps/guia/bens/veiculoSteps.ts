// cypress/support/steps/guia/bens/veiculoSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { veiculoPage } from '../../../pageobjects/guia/bens/veiculoPage';

// Navegação
When('seleciono a espécie do bem "Veículo"', () => {
  veiculoPage.selecionarEspecieVeiculo();
});

// Preenchimento de Campos
When('preencho a Placa do bem veículo {string}', (placa: string) => {
  veiculoPage.preencherPlaca(placa);
});

When('preencho o Renavam do bem veículo {string}', (renavam: string) => {
  veiculoPage.preencherRenavam(renavam);
});

When('preencho o Percentual de propriedade total que será doado do bem veículo {string}', (percentual: string) => {
  veiculoPage.preencherPercentualPropriedadeDoado(percentual);
});

When('preencho o Percentual de Propriedade do de Cujus do bem veículo {string}', (percentual: string) => {
  veiculoPage.preencherPercentualPropriedadeDeCujus(percentual);
});

When('preencho a Data de Aquisição do bem veículo {string}', (data: string) => {
  veiculoPage.preencherDataDeAquisicao(data);
});

When('marco bem particular do de cujus do bem veículo', () => {
  veiculoPage.marcarBemParticularDeCujus(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do bem veículo', (mensagem: string, campo: string) => {
  veiculoPage.validarMensagemErroCampo(campo, mensagem);
});

Then(
  'os dados do bem veículo devem ser preenchidos automaticamente com marca {string}, modelo {string}, ano fabricação {string}, ano modelo {string} e valor {string}',
  (marca: string, modelo: string, anoFabricacao: string, anoModelo: string, valorDeclarado: string) => {
    veiculoPage.validarDadosPreenchidosAutomaticamente(marca, modelo, anoFabricacao, anoModelo, valorDeclarado);
  }
);

Then(
  'o bem veículo deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}',
  (especie: string, resumo: string, valor: string) => {
    veiculoPage.validarBemNaTabela(especie, resumo, valor);
  }
);
