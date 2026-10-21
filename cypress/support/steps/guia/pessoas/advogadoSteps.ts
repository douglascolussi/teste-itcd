// cypress/support/steps/guia/pessoas/advogadoSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { advogadoPage } from '../../../pageobjects/guia/pessoas/advogadoPage';

When('clico para cadastrar o Advogado', () => {
  advogadoPage.clicarCadastrarAdvogado();
});

When('preencho o Nome do advogado {string}', (nome: string) => {
  advogadoPage.preencherNome(nome);
});

When('preencho o Número da OAB do advogado {string}', (numero: string) => {
  advogadoPage.preencherNumeroOAB(numero);
});

When('seleciono a UF da OAB do advogado {string}', (uf: string) => {
  advogadoPage.selecionarUfOAB(uf);
});

When('preencho o E-Mail do advogado {string}', (email: string) => {
  advogadoPage.preencherEmail(email);
});

When('preencho o Telefone do advogado {string}', (telefone: string) => {
  advogadoPage.preencherTelefone(telefone);
});

When('clico em salvar advogado', () => {
  advogadoPage.salvar();
});

When('clico em voltar no formulário do advogado', () => {
  advogadoPage.voltar();
});

Then('devo visualizar a mensagem {string} para o campo {string} do advogado', (msg: string, label: string) => {
  advogadoPage.validarMensagemErroCampo(label, msg);
});

Then('o card do advogado {string} com OAB {string} deve ser exibido', (nome: string, oabCompleta: string) => {
  advogadoPage.validarCardAdvogado(nome, oabCompleta);
});
