// cypress/support/steps/guia/pessoas/donatarioSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { donatarioPage } from '../../../pageobjects/guia/pessoas/donatarioPage';

When('clico para cadastrar o Donatário', () => {
  donatarioPage.clicarCadastrarDonatario();
});

When('preencho o CPF do donatário {string}', (cpf: string) => {
  donatarioPage.interceptarBuscarPessoa(cpf, null);
  donatarioPage.preencherCpfCnpj(cpf);
});

When('preencho o Nome do donatário {string}', (nome: string) => {
  donatarioPage.preencherNome(nome);
});

When('preencho o E-Mail do donatário {string}', (email: string) => {
  donatarioPage.preencherEmail(email);
});

When('preencho o Telefone do donatário {string}', (telefone: string) => {
  donatarioPage.preencherTelefone(telefone);
});

When('clico em salvar donatário', () => {
  donatarioPage.salvar();
});

When('clico em cancelar no formulário do donatário', () => {
  donatarioPage.cancelar();
});

Then('a qualificação do donatário deve ser {string}', (qualificacao: string) => {
  donatarioPage.validarQualificacaoDonatario();
});

Then('devo visualizar a mensagem {string} para o campo {string} do donatário', (msg: string, label: string) => {
  donatarioPage.validarMensagemErroCampo(label, msg);
});

Then('o card do donatário {string} com documento {string} deve ser exibido', (nome: string, documento: string) => {
  donatarioPage.validarCardDonatario(nome, documento);
});

Then('o card para cadastrar Donatário deve ser exibido', () => {
  donatarioPage.validarCardCadastrarDonatarioVisivel(true);
});

Then('o card para cadastrar Donatário não deve ser exibido', () => {
  donatarioPage.validarCardCadastrarDonatarioVisivel(false);
});

Then('o formulário do donatário não deve ser exibido', () => {
  donatarioPage.validarFormularioVisivel(false);
});

