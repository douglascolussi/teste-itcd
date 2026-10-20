// cypress/support/steps/falecidoSteps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { falecidoPage } from '../pageobjects/base/falecidoPage';

When('acesso a aba "Pessoas"', () => {
  falecidoPage.acessarAbaPessoas();
});

When('clico para cadastrar o Falecido', () => {
  falecidoPage.clicarCadastrarFalecido();
});

When('preencho o CPF do falecido {string}', (cpf: string) => {
  falecidoPage.preencherCpf(cpf);
});

When('preencho o Nome do falecido {string}', (nome: string) => {
  falecidoPage.preencherNome(nome);
});

When('preencho a Data de Óbito do falecido {string}', (data: string) => {
  falecidoPage.preencherDataObito(data);
});

When('ao preencher uma data futura no campo Data de Óbito o sistema deve exibir erro {string}', (msg: string) => {
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const dia = String(amanha.getDate()).padStart(2, '0');
  const mes = String(amanha.getMonth() + 1).padStart(2, '0');
  const ano = amanha.getFullYear();
  const dataStr = `${ano}-${mes}-${dia}`;
  falecidoPage.preencherDataObito(dataStr);
  falecidoPage.validarMensagemErroCampo('Data de Óbito', msg);
});

When('respondo {string} para descendente vivo na data do óbito', (resposta: string) => {
  falecidoPage.responderDescendenteVivo(resposta as 'Sim' | 'Não');
});

When('respondo {string} para ascendente vivo na data do óbito', (resposta: string) => {
  falecidoPage.responderAscendenteVivo(resposta as 'Sim' | 'Não');
});

When('seleciono o Estado Civil do falecido {string}', (estadoCivil: string) => {
  falecidoPage.selecionarEstadoCivil(estadoCivil);
});

When('seleciono o Regime de Casamento do falecido {string}', (regime: string) => {
  falecidoPage.selecionarRegimeCasamento(regime);
});

When('preencho a Data de Casamento do falecido {string}', (data: string) => {
  falecidoPage.preencherDataCasamento(data);
});

When('preencho o CEP do falecido {string}', (cep: string) => {
  falecidoPage.preencherCep(cep);
});

When('preencho o Endereço do falecido {string}', (endereco: string) => {
  falecidoPage.preencherEndereco(endereco);
});

When('preencho o Bairro do falecido {string}', (bairro: string) => {
  falecidoPage.preencherBairro(bairro);
});

When('preencho o Número do endereço do falecido {string}', (numero: string) => {
  falecidoPage.preencherNumero(numero);
});

When('preencho o Complemento do falecido {string}', (complemento: string) => {
  falecidoPage.preencherComplemento(complemento);
});

When('seleciono a UF do falecido {string}', (uf: string) => {
  falecidoPage.selecionarUf(uf);
});

When('seleciono o Município do falecido {string}', (municipio: string) => {
  falecidoPage.selecionarMunicipio(municipio);
});

When('clico em salvar falecido', () => {
  falecidoPage.salvar();
});

When('clico em voltar no formulário do falecido', () => {
  falecidoPage.voltar();
});

Then('o card de Falecido deve ser exibido com o nome {string} e CPF {string}', (nome: string, cpf: string) => {
  falecidoPage.validarCardFalecido(nome, cpf);
});

Then('o campo {string} do falecido deve estar {string}', (campo: string, estado: string) => {
  falecidoPage.validarCampoVisivel(campo, estado === 'visível');
});

Then('devo visualizar a mensagem {string} para o campo {string} do falecido', (msg: string, campo: string) => {
  falecidoPage.validarMensagemErroCampo(campo, msg);
});

Then('devo visualizar a mensagem {string} para os campos do falecido {string}', (msg: string, campos: string) => {
  falecidoPage.validarMensagemErroCampos(campos, msg);
});

Given('que intercepto a busca da pessoa CPF {string} com sucesso para o falecido', (cpf: string) => {
  const mockPessoa = {
    cpf: cpf,
    nome: "JOAO FALECIDO TESTE",
    telefone: "67999999999",
    email: "falecido@teste.com",
    cep: "79002-010",
    endereco: "RUA 14 DE JULHO",
    numero: "500",
    bairro: "CENTRO",
    uf: "MS",
    municipio: "Campo Grande"
  };
  falecidoPage.interceptarBuscarPessoa(cpf, mockPessoa);
});

Given('que intercepto a busca da pessoa CPF {string} como não cadastrada para o falecido', (cpf: string) => {
  falecidoPage.interceptarBuscarPessoa(cpf, null);
});

Given('que intercepto a busca do CEP {string} do falecido com sucesso', (cep: string) => {
  const mockCep = {
    cep: cep,
    logradouro: "AVENIDA AFONSO PENA",
    bairro: "CENTRO",
    uf: "MS",
    municipio: "Campo Grande"
  };
  falecidoPage.interceptarBuscarCep(cep, mockCep);
});
