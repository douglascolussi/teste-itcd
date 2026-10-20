// cypress/support/steps/guia/pessoas/conjugeSteps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { conjugePage } from '../../../pageobjects/guia/pessoas/conjugePage';
import { falecidoPage } from '../../../pageobjects/guia/pessoas/falecidoPage';

Given('que o falecido está cadastrado como casado', () => {
  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Sim');
  falecidoPage.selecionarEstadoCivil('Casado(a)');
  falecidoPage.selecionarRegimeCasamento('Comunhão Parcial');
  falecidoPage.preencherDataCasamento('2010-05-15');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  falecidoPage.validarCardFalecido('ANTONIO SILVA FALECIDO', '012.345.678-90');
});

When('clico para cadastrar o Cônjuge', () => {
  conjugePage.clicarCadastrarConjuge();
});

When('preencho o CPF do cônjuge {string}', (cpf: string) => {
  conjugePage.interceptarBuscarPessoa(cpf, null);
  conjugePage.preencherCpf(cpf);
});

When('preencho o Nome do cônjuge {string}', (nome: string) => {
  conjugePage.preencherNome(nome);
});

When('respondo {string} para cônjuge já falecido', (resposta: 'Sim' | 'Não') => {
  conjugePage.responderJaFaleceu(resposta);
});

When('preencho a Data de Óbito do cônjuge {string}', (data: string) => {
  conjugePage.preencherDataObito(data);
});

When('ao preencher uma data futura no campo Data de Óbito do cônjuge o sistema deve exibir erro {string}', (msg: string) => {
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const dia = String(amanha.getDate()).padStart(2, '0');
  const mes = String(amanha.getMonth() + 1).padStart(2, '0');
  const ano = amanha.getFullYear();
  const dataStr = `${ano}-${mes}-${dia}`;
  conjugePage.preencherDataObito(dataStr);
  conjugePage.validarMensagemErroCampo('Data de Óbito', msg);
});

When('seleciono o momento de falecimento do cônjuge {string}', (momento: 'Antes ou Simultaneamente' | 'Depois') => {
  conjugePage.selecionarMomentoFalecimento(momento);
});

When('preencho o E-Mail do cônjuge {string}', (email: string) => {
  conjugePage.preencherEmail(email);
});

When('preencho o Telefone do cônjuge {string}', (telefone: string) => {
  conjugePage.preencherTelefone(telefone);
});

When('respondo {string} para renúncia de quinhão do cônjuge', (resposta: 'Sim' | 'Não') => {
  conjugePage.responderRenuncia(resposta);
});

When('seleciono o tipo de renúncia do cônjuge {string}', (tipo: 'Abdicativa' | 'Translativa') => {
  conjugePage.selecionarTipoRenuncia(tipo);
});

When('respondo {string} para cônjuge inventariante', (resposta: 'Sim' | 'Não') => {
  conjugePage.responderEhInventariante(resposta);
});

When('preencho o CEP do cônjuge {string}', (cep: string) => {
  conjugePage.preencherCep(cep);
});

When('preencho o endereço do cônjuge {string}', (endereco: string) => {
  conjugePage.preencherEndereco(endereco);
});

When('preencho o bairro do cônjuge {string}', (bairro: string) => {
  conjugePage.preencherBairro(bairro);
});

When('preencho o número do cônjuge {string}', (numero: string) => {
  conjugePage.preencherNumero(numero);
});

When('preencho o complemento do cônjuge {string}', (complemento: string) => {
  conjugePage.preencherComplemento(complemento);
});

When('seleciono a UF do cônjuge {string}', (uf: string) => {
  conjugePage.selecionarUf(uf);
});

When('seleciono o município do cônjuge {string}', (municipio: string) => {
  conjugePage.selecionarMunicipio(municipio);
});

When('clico em salvar cônjuge', () => {
  conjugePage.salvar();
});

When('clico em voltar no formulário do cônjuge', () => {
  conjugePage.voltar();
});

When('confirmo o modal de validação do cônjuge', () => {
  conjugePage.confirmarModalOk();
});

When('confirmo o modal informativo do cônjuge', () => {
  conjugePage.confirmarModalInformativo();
});

Then('devo visualizar a mensagem {string} para o campo {string} do cônjuge', (msg: string, label: string) => {
  conjugePage.validarMensagemErroCampo(label, msg);
});

Then('o campo {string} do cônjuge deve estar {string}', (label: string, visibilidade: string) => {
  conjugePage.validarCampoVisivel(label, visibilidade === 'visível');
});

Then('devo visualizar o modal de alerta com o texto {string}', (msg: string) => {
  conjugePage.validarModalObitoVisivel(msg);
});

Then('o card do cônjuge {string} com CPF {string} deve ser exibido', (nome: string, cpfFormatado: string) => {
  conjugePage.validarCardConjuge(nome, cpfFormatado);
});
