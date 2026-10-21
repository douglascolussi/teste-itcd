// cypress/support/steps/guia/pessoas/herdeiroSteps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { herdeiroPage } from '../../../pageobjects/guia/pessoas/herdeiroPage';
import { falecidoPage } from '../../../pageobjects/guia/pessoas/falecidoPage';

Given('que o falecido está cadastrado com descendentes vivos', () => {
  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Sim');
  falecidoPage.selecionarEstadoCivil('Solteiro(a)');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  falecidoPage.validarCardFalecido('ANTONIO SILVA FALECIDO', '012.345.678-90');
});

Given('que o falecido está cadastrado com ascendentes vivos', () => {
  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Não');
  falecidoPage.responderAscendenteVivo('Sim');
  falecidoPage.selecionarEstadoCivil('Solteiro(a)');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  falecidoPage.validarCardFalecido('ANTONIO SILVA FALECIDO', '012.345.678-90');
});

Given('que cadastro um filho pré-morto com descendentes vivos', () => {
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.interceptarBuscarPessoa('58838180563', null);
  herdeiroPage.preencherCpf('58838180563');
  herdeiroPage.preencherNome('GILSON DOS SANTOS FILHO');
  herdeiroPage.responderJaFaleceu('Sim');
  herdeiroPage.preencherDataObito('2019-05-10');
  herdeiroPage.responderTinhaDescendenteVivo('Sim');
  herdeiroPage.responderEhFilhoComum('Sim');
  herdeiroPage.salvar();
  herdeiroPage.validarCardHerdeiro('GILSON DOS SANTOS FILHO', '588.381.805-63');
});

When('clico para cadastrar o Herdeiro', () => {
  herdeiroPage.clicarCadastrarHerdeiro();
});

When('clico para cadastrar o herdeiro Neto', () => {
  herdeiroPage.clicarCadastrarNeto();
});

When('clico para cadastrar o herdeiro Bisneto', () => {
  herdeiroPage.clicarCadastrarBisneto();
});

When('clico para cadastrar o Herdeiro Ascendente', () => {
  herdeiroPage.clicarCadastrarHerdeiroAscendente();
});

When('seleciono o Tipo de Herdeiro {string}', (tipo: string) => {
  herdeiroPage.selecionarTipoHerdeiro(tipo);
});

When('preencho o CPF do herdeiro {string}', (cpf: string) => {
  herdeiroPage.interceptarBuscarPessoa(cpf, null);
  herdeiroPage.preencherCpf(cpf);
});

When('preencho o Nome do herdeiro {string}', (nome: string) => {
  herdeiroPage.preencherNome(nome);
});

When('respondo {string} para herdeiro já falecido', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderJaFaleceu(resposta);
});

When('preencho a Data de Óbito do herdeiro {string}', (data: string) => {
  herdeiroPage.preencherDataObito(data);
});

When('ao preencher uma data futura no campo Data de Óbito do herdeiro o sistema deve exibir erro {string}', (msg: string) => {
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const dia = String(amanha.getDate()).padStart(2, '0');
  const mes = String(amanha.getMonth() + 1).padStart(2, '0');
  const ano = amanha.getFullYear();
  const dataStr = `${ano}-${mes}-${dia}`;
  herdeiroPage.preencherDataObito(dataStr);
  herdeiroPage.validarMensagemErroCampo('Data de Óbito', msg);
});

When('seleciono o momento de falecimento do herdeiro {string}', (momento: 'Antes ou Simultaneamente' | 'Depois') => {
  herdeiroPage.selecionarMomentoFalecimento(momento);
});

When('respondo {string} para descendente vivo na data do óbito do autor da herança', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderTinhaDescendenteVivo(resposta);
});

When('preencho o E-Mail do herdeiro {string}', (email: string) => {
  herdeiroPage.preencherEmail(email);
});

When('preencho o Telefone do herdeiro {string}', (telefone: string) => {
  herdeiroPage.preencherTelefone(telefone);
});

When('respondo {string} para filho comum com o cônjuge', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderEhFilhoComum(resposta);
});

When('respondo {string} para renúncia de quinhão do herdeiro', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderRenuncia(resposta);
});

When('seleciono o tipo de renúncia do herdeiro {string}', (tipo: 'Abdicativa' | 'Translativa') => {
  herdeiroPage.selecionarTipoRenuncia(tipo);
});

When('respondo {string} para outro herdeiro do mesmo grau', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderOutroHerdeiroMesmoGrau(resposta);
});

When('respondo {string} para outro descendente de diferente grau', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderOutroDescendenteDiferenteGrau(resposta);
});

When('respondo {string} para herdeiro ascendente existente', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderExisteAscendente(resposta);
});

When('respondo {string} para herdeiro inventariante', (resposta: 'Sim' | 'Não') => {
  herdeiroPage.responderEhInventariante(resposta);
});

When('preencho o CEP do herdeiro {string}', (cep: string) => {
  herdeiroPage.preencherCep(cep);
});

When('preencho o endereço do herdeiro {string}', (endereco: string) => {
  herdeiroPage.preencherEndereco(endereco);
});

When('preencho o bairro do herdeiro {string}', (bairro: string) => {
  herdeiroPage.preencherBairro(bairro);
});

When('preencho o número do herdeiro {string}', (numero: string) => {
  herdeiroPage.preencherNumero(numero);
});

When('preencho o complemento do herdeiro {string}', (complemento: string) => {
  herdeiroPage.preencherComplemento(complemento);
});

When('seleciono a UF do herdeiro {string}', (uf: string) => {
  herdeiroPage.selecionarUf(uf);
});

When('seleciono o município do herdeiro {string}', (municipio: string) => {
  herdeiroPage.selecionarMunicipio(municipio);
});

When('clico em salvar herdeiro', () => {
  herdeiroPage.salvar();
});

When('clico em voltar no formulário do herdeiro', () => {
  herdeiroPage.voltar();
});

When('confirmo o modal de validação do herdeiro pré-morto', () => {
  herdeiroPage.confirmarModalValidacao3();
});

When('confirmo o modal informativo do herdeiro', () => {
  herdeiroPage.confirmarModalInformativo();
});

When('confirmo o modal de validação de herdeiro pré-morto sem direito de representação', () => {
  herdeiroPage.confirmarModalValidacao4();
});

Then('devo visualizar a mensagem {string} para o campo {string} do herdeiro', (msg: string, label: string) => {
  herdeiroPage.validarMensagemErroCampo(label, msg);
});

Then('o campo {string} do herdeiro deve estar {string}', (label: string, visibilidade: string) => {
  herdeiroPage.validarCampoVisivel(label, visibilidade === 'visível');
});

Then('o campo Tipo de Herdeiro deve estar {string}', (estado: 'habilitado' | 'desabilitado') => {
  herdeiroPage.validarTipoHerdeiroHabilitado(estado === 'habilitado');
});

Then('o campo Tipo de Herdeiro deve conter a opção {string}', (opcao: string) => {
  herdeiroPage.validarOpcaoTipoHerdeiroExiste(opcao);
});

Then('a Qualificação do herdeiro deve ser {string}', (qualificacao: string) => {
  herdeiroPage.validarQualificacaoHerdeiro(qualificacao);
});

Then('devo visualizar o modal de validação com o texto {string}', (msg: string) => {
  herdeiroPage.validarModalValidacao3Visivel(msg);
});

Then('devo visualizar o modal de validação sem direito de representação com o texto {string}', (msg: string) => {
  herdeiroPage.validarModalValidacao4Visivel(msg);
});

Then('o card para cadastrar herdeiro ascendente não deve mais ser exibido', () => {
  herdeiroPage.validarCardCadastrarHerdeiroAscendenteExiste(false);
});

Then('o card do herdeiro {string} com CPF {string} deve ser exibido', (nome: string, cpfFormatado: string) => {
  herdeiroPage.validarCardHerdeiro(nome, cpfFormatado);
});

Then('o card do herdeiro ascendente {string} com CPF {string} deve ser exibido', (nome: string, cpfFormatado: string) => {
  herdeiroPage.validarCardHerdeiroAscendente(nome, cpfFormatado);
});

Then('o campo Tipo de Herdeiro deve estar selecionado como {string}', (tipo: string) => {
  herdeiroPage.validarTipoHerdeiroSelecionado(tipo);
});

Then('o card para cadastrar herdeiro bisneto deve estar visível', () => {
  herdeiroPage.validarCardCadastrarBisnetoVisivel(true);
});

Then('o card para cadastrar herdeiro bisneto não deve mais ser exibido', () => {
  herdeiroPage.validarCardCadastrarBisnetoVisivel(false);
});

Then('o card do herdeiro por representação {string} com CPF {string} deve ser exibido', (nome: string, cpfFormatado: string) => {
  herdeiroPage.validarCardHerdeiroPorRepresentacao(nome, cpfFormatado);
});
