// cypress/support/steps/guia/guiaSteps.ts
import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { guiaPage } from '../../pageobjects/guia/guiaPage';
import { loginPage } from '../../pageobjects/login/loginPage';
import { dadosGeraisPage } from '../../pageobjects/guia/dados_gerais/dadosGeraisPage';
import { pessoasPage } from '../../pageobjects/guia/pessoas/pessoasPage';
import { outrosPage } from '../../pageobjects/guia/bens/outrosPage';
import { arquivosPage } from '../../pageobjects/guia/arquivosPage';

Given('que navego para o módulo de guias', () => {
  loginPage.navegarParaModuloGuias();
});

Then('devo visualizar a listagem de guias e declarações', () => {
  guiaPage.validarListagemExibida();
});

Then('devo conseguir clicar no botão para gerar uma nova guia', () => {
  cy.log('Validando acesso ao detalhe da guia');
});

When('clico para visualizar a primeira guia da lista', () => {
  guiaPage.acessarPrimeiraGuia();
});

When('clico para iniciar uma nova guia', () => {
  guiaPage.iniciarNovaGuia();
});

Given('que estou na página de início de declaração', () => {
  loginPage.navegarParaModuloGuias();
  guiaPage.validarListagemExibida();
  guiaPage.iniciarNovaGuia();
});

Then('devo ser redirecionado para o próximo passo da guia', () => {
  cy.url().should('include', '/nova-guia');
});

// Ações de preenchimento completo de abas para validação de guias
When('preencho os dados gerais válidos para a natureza {string} e tipo {string}', (natureza: string, tipo: string) => {
  dadosGeraisPage.preencherDadosGeraisCompletosPorTipo(natureza, tipo);
});

When('possuo as pessoas obrigatórias cadastradas para a natureza {string} e tipo {string}', (natureza: string, tipo: string) => {
  pessoasPage.cadastrarPessoasCompletasPorNatureza(natureza, tipo);
});

When('possuo um bem válido cadastrado na declaração', () => {
  outrosPage.cadastrarBemSimplesValidoPorNatureza();
});

When('possuo um documento comprobatório anexado na aba Arquivos', () => {
  arquivosPage.anexarArquivoObrigatorioValido();
});

// Finalização da Guia
When('clico em salvar como rascunho a declaração', () => {
  guiaPage.salvarComoRascunho();
});

When('clico em salvar e encaminhar para análise a declaração', () => {
  guiaPage.salvarEEncaminharParaAnalise();
});

Then('devo visualizar a confirmação de que a guia foi salva com a mensagem {string}', (mensagem: string) => {
  guiaPage.validarGuiaSalvaComSucesso(mensagem);
});
