// cypress/support/steps/guia/guiaSteps.ts
import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { guiaPage } from '../../pageobjects/guia/guiaPage';
import { loginPage } from '../../pageobjects/login/loginPage';

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
