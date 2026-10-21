// cypress/support/steps/guia/bens/semoventesSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { semoventesPage } from '../../../pageobjects/guia/bens/semoventesPage';

// Navegação
When('seleciono a espécie do bem "Semoventes"', () => {
  semoventesPage.selecionarEspecieSemoventes();
});

// Preenchimento de Campos Comuns
When('seleciono a UF do bem semoventes {string}', (uf: string) => {
  semoventesPage.selecionarUf(uf);
});

When('seleciono o Município do bem semoventes {string}', (municipio: string) => {
  semoventesPage.selecionarMunicipio(municipio);
});

When('preencho a Inscrição Estadual do bem semoventes {string}', (ie: string) => {
  semoventesPage.preencherInscricaoEstadual(ie);
});

When('seleciono o Grupo do semovente do bem semoventes {string}', (grupo: string) => {
  semoventesPage.selecionarGrupoDoSemovente(grupo);
});

When('preencho o Valor Total Declarado do bem semoventes {string}', (valor: string) => {
  semoventesPage.preencherValorTotalDeclarado(valor);
});

// Eras / Faixas Etárias
When('preencho a faixa etária 00-12M do bem semoventes {string}', (valor: string) => {
  semoventesPage.preencherFaixa0a12M(valor);
});

When('preencho a faixa etária 13-24M do bem semoventes {string}', (valor: string) => {
  semoventesPage.preencherFaixa13a24M(valor);
});

When('preencho a faixa etária 25-36M do bem semoventes {string}', (valor: string) => {
  semoventesPage.preencherFaixa25a36M(valor);
});

When('preencho a faixa etária +36M do bem semoventes {string}', (valor: string) => {
  semoventesPage.preencherFaixaAcima36M(valor);
});

// Campos Exclusivos Doação
When('preencho a Quantidade total doada do bem semoventes {string}', (qtd: string) => {
  semoventesPage.preencherQuantidadeTotalDoada(qtd);
});

// Campos Exclusivos Causa Mortis
When('preencho a Quantidade total inventariada do bem semoventes {string}', (qtd: string) => {
  semoventesPage.preencherQuantidadeTotalInventariada(qtd);
});

When('anexo a Ficha de saldo do IAGRO do bem semoventes', () => {
  semoventesPage.anexarFichaSaldoIagro();
});

When('marco bem particular do de cujus do bem semoventes', () => {
  semoventesPage.marcarBemParticularDeCujus(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do bem semoventes', (mensagem: string, campo: string) => {
  semoventesPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o campo Inscrição Estadual do bem semoventes deve ser obrigatório', () => {
  semoventesPage.validarInscricaoEstadualObrigatoria(true);
});

Then('o campo Inscrição Estadual do bem semoventes não deve ser obrigatório', () => {
  semoventesPage.validarInscricaoEstadualObrigatoria(false);
});

Then('os campos de Eras\\/Faixa etária do bem semoventes devem estar visíveis', () => {
  semoventesPage.validarCamposErasVisiveis(true);
});

Then('os campos de Eras\\/Faixa etária do bem semoventes não devem estar visíveis', () => {
  semoventesPage.validarCamposErasVisiveis(false);
});

Then('a quantidade total doada do bem semoventes calculada deve ser {string}', (qtd: string) => {
  semoventesPage.validarQuantidadeCalculada(qtd, true);
});

Then('a quantidade total inventariada do bem semoventes calculada deve ser {string}', (qtd: string) => {
  semoventesPage.validarQuantidadeCalculada(qtd, false);
});

Then('o bem semoventes deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}', (especie: string, resumo: string, valor: string) => {
  semoventesPage.validarBemNaTabela(especie, resumo, valor);
});
