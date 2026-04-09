// cypress/support/steps/loginSteps.ts
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage } from '../pageobjects/base/loginPage';

Given('que acesso o sistema ITCD com o perfil {string}', (perfil: string) => {
  loginPage.acessarSistemaPorPerfil(perfil as 'Contribuinte' | 'Gerencial');
});

Given('que acesso o sistema ITCD com o perfil {string} e CPF {string}', (perfil: string, cpf: string) => {
  loginPage.acessarSistemaPorPerfil(perfil as 'Contribuinte' | 'Gerencial', cpf);
  loginPage.validarAcessoConcluido();
});

Then('devo visualizar a página inicial com sucesso', () => {
  loginPage.validarAcessoConcluido();
});

When('navego para o módulo de guias', () => {
  loginPage.navegarParaModuloGuias();
});

Given('que estou autenticado no sistema', () => {
  loginPage.acessarSistemaPorPerfil('Contribuinte', '74555611560');
  loginPage.validarAcessoConcluido();
});
