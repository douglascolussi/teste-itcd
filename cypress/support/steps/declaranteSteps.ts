// cypress/support/steps/declaranteSteps.ts
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { declarantePage } from '../pageobjects/base/declarantePage';

Given('que intercepto a busca do declarante CPF {string} com sucesso sem email', (cpf: string) => {
  const mockData = {
    cpf: cpf,
    nome: "USUARIO TESTE COM CADASTRO",
    email: "",
    telefone: "67999999999",
    cep: "79002-010",
    endereco: "RUA TESTE",
    numero: "123",
    bairro: "CENTRO",
    uf: "MS",
    municipio: "Campo Grande"
  };
  declarantePage.interceptarGetPessoa(cpf, mockData);
});

Given('que intercepto a busca do declarante CPF {string} como não cadastrado', (cpf: string) => {
  declarantePage.interceptarGetPessoa(cpf, null);
});

Given('que intercepto a busca do CEP {string} com endereço {string}', (cep: string, logradouro: string) => {
  const mockCep = {
    cep: cep,
    logradouro: logradouro,
    bairro: "BAIRRO TESTE",
    uf: "MS",
    municipio: "CAMPO GRANDE"
  };
  declarantePage.interceptarGetCep(cep, mockCep);
});

When('preencho o campo {string} com {string}', (campo: string, valor: string) => {
  const map: Record<string, (v: string) => void> = {
    'CPF': (v) => declarantePage.preencherCpf(v),
    'Nome': (v) => declarantePage.preencherNome(v),
    'E-mail': (v) => declarantePage.preencherEmail(v),
    'Telefone': (v) => declarantePage.preencherTelefone(v),
    'CEP': (v) => declarantePage.preencherCep(v),
    'Número': (v) => declarantePage.preencherNumero(v),
  };
  if (map[campo]) map[campo](valor);
});

When('aguardo o carregamento dos dados do declarante', () => {
  declarantePage.aguardarDadosCarregarem();
});

When('aguardo o carregamento do endereço pelo CEP', () => {
  declarantePage.aguardarCepCarregar();
});

When('o usuário não marca o checkbox {string}', (checkbox: string) => {
  // Por padrão ele já não vem marcado, mas garantimos aqui
  cy.get('input[type="checkbox"]').should('not.be.checked');
});

When('concordo com os termos do declarante', () => {
  declarantePage.concordarComTermos();
});

When('tento iniciar a declaração', () => {
  declarantePage.iniciarDeclaracao();
});

Then('devo visualizar os campos do declarante preenchidos exceto o email', () => {
  declarantePage.validarFormulario({ nome: "USUARIO TESTE COM CADASTRO", email: "", cep: "79002-010" });
});

Then('devo visualizar os campos do declarante vazios e editáveis', () => {
  declarantePage.validarFormulario(null);
});

Then('devo visualizar a mensagem de erro {string} para o campo declarante', (mensagem: string) => {
  declarantePage.validarMensagemErro(mensagem);
});

Then('o botão de iniciar declaração deve estar desabilitado', () => {
  declarantePage.validarBotaoIniciarDesabilitado();
});

Then('os campos de endereço devem estar preenchidos e desabilitados', () => {
  declarantePage.validarFormulario({ cep: '79.002-000' });
});
