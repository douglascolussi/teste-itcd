// cypress/support/steps/guia/pessoas/separandoSteps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { separandoPage } from '../../../pageobjects/guia/pessoas/separandoPage';

Given('que o separando está cadastrado com CPF {string} e nome {string}', (cpf: string, nome: string) => {
  separandoPage.interceptarBuscarPessoa(cpf, null);
  separandoPage.clicarCadastrarSeparando();
  separandoPage.preencherCpf(cpf);
  separandoPage.preencherNome(nome);
  separandoPage.preencherEmail('separando@teste.com');
  separandoPage.preencherTelefone('67999998888');
  separandoPage.preencherCep('79002070');
  separandoPage.preencherNumero('100');
  separandoPage.salvar();
  separandoPage.validarCardSeparando(nome, '012.345.678-90');
});

When('clico para cadastrar o Separando', () => {
  separandoPage.clicarCadastrarSeparando();
});

When('preencho o CPF do separando {string}', (cpf: string) => {
  separandoPage.interceptarBuscarPessoa(cpf, null);
  separandoPage.preencherCpf(cpf);
});

When('preencho o Nome do separando {string}', (nome: string) => {
  separandoPage.preencherNome(nome);
});

When('preencho o E-Mail do separando {string}', (email: string) => {
  separandoPage.preencherEmail(email);
});

When('preencho o Telefone do separando {string}', (telefone: string) => {
  separandoPage.preencherTelefone(telefone);
});

When('clico em salvar separando', () => {
  separandoPage.salvar();
});

When('clico em cancelar no formulário do separando', () => {
  separandoPage.cancelar();
});

Then('a qualificação do separando deve ser {string}', (qualificacao: string) => {
  separandoPage.validarQualificacaoSeparando();
});

Then('devo visualizar a mensagem {string} para o campo {string} do separando', (msg: string, label: string) => {
  separandoPage.validarMensagemErroCampo(label, msg);
});

Then('o card do separando {string} com documento {string} deve ser exibido', (nome: string, documento: string) => {
  separandoPage.validarCardSeparando(nome, documento);
});

Then('o card para cadastrar Separando deve ser exibido', () => {
  separandoPage.validarCardCadastrarSeparandoVisivel(true);
});

Then('o card para cadastrar Separando não deve ser exibido', () => {
  separandoPage.validarCardCadastrarSeparandoVisivel(false);
});

Then('o formulário do separando não deve ser exibido', () => {
  separandoPage.validarFormularioVisivel(false);
});
