// cypress/support/steps/guia/bens/empresaSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { empresaPage } from '../../../pageobjects/guia/bens/empresaPage';

// Navegação
When('seleciono a espécie do bem "Empresa"', () => {
  empresaPage.selecionarEspecieEmpresa();
});

// Preenchimento de Campos Comuns
When('preencho o CNPJ do bem empresa {string}', (cnpj: string) => {
  empresaPage.preencherCnpj(cnpj);
});

When('preencho o Nome ou Razão Social do bem empresa {string}', (nome: string) => {
  empresaPage.preencherNomeRazaoSocial(nome);
});

When('seleciono {string} para A empresa possui Inscrição Estadual do bem empresa', (opcao: string) => {
  empresaPage.selecionarPossuiInscricaoEstadual(opcao.toLowerCase() === 'sim');
});

When('preencho a Inscrição Estadual do bem empresa {string}', (ie: string) => {
  empresaPage.preencherInscricaoEstadual(ie);
});

When('seleciono a UF da sede do bem empresa {string}', (uf: string) => {
  empresaPage.selecionarUfDaSede(uf);
});

When('seleciono o Município da sede do bem empresa {string}', (municipio: string) => {
  empresaPage.selecionarMunicipioDaSede(municipio);
});

When('preencho o Capital Social do bem empresa {string}', (valor: string) => {
  empresaPage.preencherCapitalSocial(valor);
});

When('preencho o Patrimônio Líquido do bem empresa {string}', (valor: string) => {
  empresaPage.preencherPatrimonioLiquido(valor);
});

When('seleciono {string} para Empresa Desobrigada a Elaboração de Balanço Patrimonial do bem empresa', (opcao: string) => {
  empresaPage.selecionarEmpresaDesobrigadaBalanco(opcao.toLowerCase() === 'sim');
});

When('preencho a Quantidade de cotas total do bem empresa {string}', (qtd: string) => {
  empresaPage.preencherQtdCotasTotal(qtd);
});

When('seleciono {string} para A empresa possui bens imóveis do bem empresa', (opcao: string) => {
  empresaPage.selecionarPossuiBensImoveis(opcao.toLowerCase() === 'sim');
});

When('preencho o Valor por cota declarado do bem empresa {string}', (valor: string) => {
  empresaPage.preencherValorPorCotaDeclarado(valor);
});

// Campos Exclusivos Doação
When('preencho a Quantidade de cotas doadas do bem empresa {string}', (qtd: string) => {
  empresaPage.preencherQtdCotasDoadas(qtd);
});

When('preencho o Valor das cotas doadas declarado do bem empresa {string}', (valor: string) => {
  empresaPage.preencherValorDasCotasDoadasDeclarado(valor);
});

// Campos Exclusivos Causa Mortis
When('anexo o Contrato Social do bem empresa', () => {
  empresaPage.anexarContratoSocial();
});

When('anexo o Balanço Patrimonial do bem empresa', () => {
  empresaPage.anexarBalancoPatrimonial();
});

When('anexo a Declaração do profissional contabilista responsável do bem empresa', () => {
  empresaPage.anexarDeclaracaoContabilista();
});

When('preencho a Quantidade de cotas inventariadas do bem empresa {string}', (qtd: string) => {
  empresaPage.preencherQtdCotasInventariadas(qtd);
});

When('preencho o Valor total das cotas inventariadas declarado do bem empresa {string}', (valor: string) => {
  empresaPage.preencherValorTotalCotasInventariadas(valor);
});

When('marco bem particular do de cujus do bem empresa', () => {
  empresaPage.marcarBemParticularDeCujus(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do bem empresa', (mensagem: string, campo: string) => {
  empresaPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o campo {string} do bem empresa deve estar {string}', (campo: string, estado: string) => {
  const habilitado = estado === 'habilitado' || estado === 'visível';
  empresaPage.validarCampoHabilitado(campo, habilitado);
});

Then('o bem empresa deve estar cadastrado na tabela com espécie {string}, resumo {string} e valor {string}', (especie: string, resumo: string, valor: string) => {
  empresaPage.validarBemNaTabela(especie, resumo, valor);
});
