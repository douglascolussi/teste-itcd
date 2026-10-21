// cypress/support/steps/guia/bens/numerariosSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { numerariosPage } from '../../../pageobjects/guia/bens/numerariosPage';

// Navegação
When('seleciono a espécie do bem "Numerários\\/Aplicações\\/Títulos"', () => {
  numerariosPage.selecionarEspecieNumerarios();
});

// Preenchimento de Campos Comuns
When('preencho a Instituição financeira do bem numerários {string}', (instituicao: string) => {
  numerariosPage.preencherInstituicaoFinanceira(instituicao);
});

When('preencho a Agência do bem numerários {string}', (agencia: string) => {
  numerariosPage.preencherAgencia(agencia);
});

When('preencho a Conta do bem numerários {string}', (conta: string) => {
  numerariosPage.preencherConta(conta);
});

When('seleciono o Tipo do bem numerários {string}', (tipo: string) => {
  numerariosPage.selecionarTipo(tipo);
});

When('seleciono o Tipo de previdência privada do bem numerários {string}', (tipo: string) => {
  numerariosPage.selecionarTipoPrevidenciaPrivada(tipo);
});

When('seleciono {string} para Há seguro vinculado ao plano de previdência do bem numerários', (opcao: string) => {
  numerariosPage.selecionarSeguroVinculado(opcao.toLowerCase() === 'sim');
});

When('preencho o Valor do pecúlio contratado do bem numerários {string}', (valor: string) => {
  numerariosPage.preencherValorPeculio(valor);
});

When('preencho o Valor Total Declarado do bem numerários {string}', (valor: string) => {
  numerariosPage.preencherValorTotalDeclarado(valor);
});

// Campos Exclusivos Causa Mortis
When('anexo o extrato da instituição financeira do bem numerários', () => {
  numerariosPage.anexarExtratoInstituicaoFinanceira();
});

When('marco bem particular do de cujus do bem numerários', () => {
  numerariosPage.marcarBemParticularDeCujus(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do bem numerários', (mensagem: string, campo: string) => {
  numerariosPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o campo {string} do bem numerários deve estar {string}', (campo: string, estado: string) => {
  const habilitado = estado === 'habilitado' || estado === 'visível';
  numerariosPage.validarCampoHabilitado(campo, habilitado);
});

Then('o bem numerários deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}', (especie: string, resumo: string, valor: string) => {
  numerariosPage.validarBemNaTabela(especie, resumo, valor);
});
