// cypress/support/steps/guia/pessoas/doadorSteps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { doadorPage } from '../../../pageobjects/guia/pessoas/doadorPage';

Given('que o doador está cadastrado com CPF {string} e nome {string}', (cpf: string, nome: string) => {
  doadorPage.interceptarBuscarPessoa(cpf, null);
  doadorPage.clicarCadastrarDoador();
  doadorPage.preencherCpfCnpj(cpf);
  doadorPage.preencherNome(nome);
  doadorPage.preencherEmail('doador@teste.com');
  doadorPage.preencherTelefone('67999998888');
  doadorPage.preencherCep('79002070');
  doadorPage.preencherNumero('100');
  doadorPage.salvar();
  doadorPage.validarCardDoador(nome, '012.345.678-90');
});

When('clico para cadastrar o Doador', () => {
  doadorPage.clicarCadastrarDoador();
});

When('preencho o CPF do doador {string}', (cpf: string) => {
  doadorPage.interceptarBuscarPessoa(cpf, null);
  doadorPage.preencherCpfCnpj(cpf);
});

When('preencho o Nome do doador {string}', (nome: string) => {
  doadorPage.preencherNome(nome);
});

When('preencho o E-Mail do doador {string}', (email: string) => {
  doadorPage.preencherEmail(email);
});

When('preencho o Telefone do doador {string}', (telefone: string) => {
  doadorPage.preencherTelefone(telefone);
});

When('clico em salvar doador', () => {
  doadorPage.salvar();
});

When('clico em cancelar no formulário do doador', () => {
  doadorPage.cancelar();
});

Then('a qualificação do doador deve ser {string}', (qualificacao: string) => {
  doadorPage.validarQualificacaoDoador();
});

Then('devo visualizar a mensagem {string} para o campo {string} do doador', (msg: string, label: string) => {
  doadorPage.validarMensagemErroCampo(label, msg);
});

Then('o card do doador {string} com documento {string} deve ser exibido', (nome: string, documento: string) => {
  doadorPage.validarCardDoador(nome, documento);
});

Then('o card para cadastrar Doador deve ser exibido', () => {
  doadorPage.validarCardCadastrarDoadorVisivel(true);
});

Then('o card para cadastrar Doador não deve ser exibido', () => {
  doadorPage.validarCardCadastrarDoadorVisivel(false);
});

Then('o formulário do doador não deve ser exibido', () => {
  doadorPage.validarFormularioVisivel(false);
});

