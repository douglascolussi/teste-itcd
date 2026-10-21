// cypress/support/steps/guia/bens/equipamentoAgricolaSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { equipamentoAgricolaPage } from '../../../pageobjects/guia/bens/equipamentoAgricolaPage';

// Navegação
When('seleciono a espécie do bem "Equipamento agrícola"', () => {
  equipamentoAgricolaPage.selecionarEspecieEquipamentoAgricola();
});

// Preenchimento de Campos Comuns
When('preencho a Marca do equipamento agrícola {string}', (marca: string) => {
  equipamentoAgricolaPage.preencherMarca(marca);
});

When('preencho o Modelo do equipamento agrícola {string}', (modelo: string) => {
  equipamentoAgricolaPage.preencherModelo(modelo);
});

When('preencho o Ano do equipamento agrícola {string}', (ano: string) => {
  equipamentoAgricolaPage.preencherAno(ano);
});

When('preencho o Valor Total Declarado do equipamento agrícola {string}', (valor: string) => {
  equipamentoAgricolaPage.preencherValorTotalDeclarado(valor);
});

// Campos Exclusivos Doação
When('preencho o Tipo do equipamento agrícola {string}', (tipo: string) => {
  equipamentoAgricolaPage.preencherTipo(tipo);
});

When('preencho o Percentual doado do equipamento agrícola {string}', (percentual: string) => {
  equipamentoAgricolaPage.preencherPercentualDoado(percentual);
});

// Campos Exclusivos Causa Mortis
When('preencho a Especificação do equipamento agrícola {string}', (especificacao: string) => {
  equipamentoAgricolaPage.preencherEspecificacao(especificacao);
});

When('preencho a Data de aquisição do equipamento agrícola {string}', (data: string) => {
  equipamentoAgricolaPage.preencherDataAquisicao(data);
});

When('preencho o Percentual do de cujus meeiro do equipamento agrícola {string}', (percentual: string) => {
  equipamentoAgricolaPage.preencherPercentualDeCujusMeeiro(percentual);
});

When('marco bem particular do de cujus do equipamento agrícola', () => {
  equipamentoAgricolaPage.marcarBemParticularDeCujus(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do equipamento agrícola', (mensagem: string, campo: string) => {
  equipamentoAgricolaPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o equipamento agrícola deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}', (especie: string, resumo: string, valor: string) => {
  equipamentoAgricolaPage.validarBemNaTabela(especie, resumo, valor);
});
