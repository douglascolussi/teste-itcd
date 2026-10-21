// cypress/support/steps/guia/pessoas/inventarianteSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { inventariantePage } from '../../../pageobjects/guia/pessoas/inventariantePage';

When('clico para cadastrar o Inventariante', () => {
  inventariantePage.clicarCadastrarInventariante();
});

When('preencho o CPF do inventariante {string}', (cpf: string) => {
  inventariantePage.interceptarBuscarPessoa(cpf, null);
  inventariantePage.preencherCpf(cpf);
});

When('preencho o Nome do inventariante {string}', (nome: string) => {
  inventariantePage.preencherNome(nome);
});

When('preencho o E-Mail do inventariante {string}', (email: string) => {
  inventariantePage.preencherEmail(email);
});

When('preencho o Telefone do inventariante {string}', (telefone: string) => {
  inventariantePage.preencherTelefone(telefone);
});

When('anexo o termo de nomeação do inventariante', () => {
  inventariantePage.anexarTermoInventariante();
});

When('preencho o CEP do inventariante {string}', (cep: string) => {
  inventariantePage.preencherCep(cep);
});

When('preencho o número do inventariante {string}', (numero: string) => {
  inventariantePage.preencherNumero(numero);
});

When('clico em salvar inventariante', () => {
  inventariantePage.salvar();
});

When('clico em voltar no formulário do inventariante', () => {
  inventariantePage.voltar();
});

Then('devo visualizar a mensagem {string} para o campo {string} do inventariante', (msg: string, label: string) => {
  inventariantePage.validarMensagemErroCampo(label, msg);
});

Then('o card do inventariante {string} com CPF {string} deve ser exibido', (nome: string, cpfFormatado: string) => {
  inventariantePage.validarCardInventariante(nome, cpfFormatado);
});
