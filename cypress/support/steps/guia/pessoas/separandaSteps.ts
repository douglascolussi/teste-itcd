// cypress/support/steps/guia/pessoas/separandaSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { separandaPage } from '../../../pageobjects/guia/pessoas/separandaPage';

When('clico para cadastrar a Separanda', () => {
  separandaPage.clicarCadastrarSeparanda();
});

When('preencho o CPF da separanda {string}', (cpf: string) => {
  separandaPage.interceptarBuscarPessoa(cpf, null);
  separandaPage.preencherCpf(cpf);
});

When('preencho o Nome da separanda {string}', (nome: string) => {
  separandaPage.preencherNome(nome);
});

When('preencho o E-Mail da separanda {string}', (email: string) => {
  separandaPage.preencherEmail(email);
});

When('preencho o Telefone da separanda {string}', (telefone: string) => {
  separandaPage.preencherTelefone(telefone);
});

When('clico em salvar separanda', () => {
  separandaPage.salvar();
});

When('clico em cancelar no formulário da separanda', () => {
  separandaPage.cancelar();
});

Then('a qualificação da separanda deve ser {string}', (qualificacao: string) => {
  separandaPage.validarQualificacaoSeparanda();
});

Then('devo visualizar a mensagem {string} para o campo {string} da separanda', (msg: string, label: string) => {
  separandaPage.validarMensagemErroCampo(label, msg);
});

Then('o card da separanda {string} com documento {string} deve ser exibido', (nome: string, documento: string) => {
  separandaPage.validarCardSeparanda(nome, documento);
});

Then('o card para cadastrar Separanda deve ser exibido', () => {
  separandaPage.validarCardCadastrarSeparandaVisivel(true);
});

Then('o card para cadastrar Separanda não deve ser exibido', () => {
  separandaPage.validarCardCadastrarSeparandaVisivel(false);
});

Then('o formulário da separanda não deve ser exibido', () => {
  separandaPage.validarFormularioVisivel(false);
});
