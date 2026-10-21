// cypress/support/steps/guia/bens/ruralSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ruralPage } from '../../../pageobjects/guia/bens/ruralPage';

// Navegação
When('acesso a aba "Bens"', () => {
  ruralPage.acessarAbaBens();
});

When('clico para adicionar um Bem', () => {
  ruralPage.clicarAdicionarBem();
});

When('seleciono a espécie do bem "Imóvel Rural"', () => {
  ruralPage.selecionarEspecieRural();
});

When('clico em salvar bem', () => {
  ruralPage.salvarBem();
});

When('clico em cancelar no formulário de bem', () => {
  ruralPage.cancelar();
});

// Preenchimento de Campos Comuns
When('seleciono a UF do imóvel rural {string}', (uf: string) => {
  ruralPage.selecionarUf(uf);
});

When('seleciono o Município do imóvel rural {string}', (municipio: string) => {
  ruralPage.selecionarMunicipio(municipio);
});

When('preencho a Matrícula do imóvel rural {string}', (matricula: string) => {
  ruralPage.preencherMatricula(matricula);
});

When('respondo {string} para possui número no cadastro imobiliário brasileiro do imóvel rural', (resposta: 'Sim' | 'Não') => {
  ruralPage.responderPossuiCib(resposta);
});

When('preencho o Número no CIB do imóvel rural {string}', (cib: string) => {
  ruralPage.preencherNumeroCib(cib);
});

When('respondo {string} para possui inscrição estadual do imóvel rural', (resposta: 'Sim' | 'Não') => {
  ruralPage.responderPossuiIe(resposta);
});

When('preencho a Inscrição Estadual do imóvel rural {string}', (ie: string) => {
  ruralPage.preencherInscricaoEstadual(ie);
});

When('respondo {string} para cadastrado no CAR do imóvel rural', (resposta: 'Sim' | 'Não') => {
  ruralPage.responderCadastradoCar(resposta);
});

When('preencho o Número no CAR do imóvel rural {string}', (car: string) => {
  ruralPage.preencherNumeroCar(car);
});

When('respondo {string} para tenho as coordenadas do imóvel rural', (resposta: 'Sim' | 'Não') => {
  ruralPage.responderPossuiCoordenadas(resposta);
});

When('preencho as coordenadas do imóvel rural latitude {string} e longitude {string}', (lat: string, long: string) => {
  ruralPage.preencherCoordenadas(lat, long);
});

When('seleciono a Distância ao município mais próximo do imóvel rural {string}', (distancia: string) => {
  ruralPage.selecionarDistanciaMunicipio(distancia);
});

When('seleciono a Qualidade do acesso ao imóvel rural {string}', (qualidade: string) => {
  ruralPage.selecionarQualidadeAcesso(qualidade);
});

When('seleciono a Distância até a estrada de asfalto do imóvel rural {string}', (distancia: string) => {
  ruralPage.selecionarDistanciaAsfalto(distancia);
});

When('seleciono o Tipo do Imóvel rural {string}', (tipo: string) => {
  ruralPage.selecionarTipoImovel(tipo);
});

When('preencho o Nome do Imóvel rural {string}', (nome: string) => {
  ruralPage.preencherNomeImovel(nome);
});

When('preencho a Área Total na Matrícula do imóvel rural {string}', (area: string) => {
  ruralPage.preencherAreaTotalMatricula(area);
});

When('respondo {string} para há declaração de ITR do imóvel rural', (resposta: 'Sim' | 'Não') => {
  ruralPage.responderHaDeclaracaoItr(resposta);
});

When('preencho a Justificativa de ausência de ITR do imóvel rural {string}', (justificativa: string) => {
  ruralPage.preencherJustificativaItr(justificativa);
});

When('preencho a Área de produtos vegetais do imóvel rural {string}', (area: string) => {
  ruralPage.preencherAreaProdutosVegetais(area);
});

When('preencho a Área de pastagem do imóvel rural {string}', (area: string) => {
  ruralPage.preencherAreaPastagem(area);
});

When('preencho a Área de reflorestamento do imóvel rural {string}', (area: string) => {
  ruralPage.preencherAreaReflorestamento(area);
});

When('preencho o Valor Total Declarado do imóvel rural {string}', (valor: string) => {
  ruralPage.preencherValorTotalDeclarado(valor);
});

// Campos Exclusivos Doação
When('preencho a Área Doada do imóvel rural {string}', (area: string) => {
  ruralPage.preencherAreaDoada(area);
});

When('preencho o Percentual que será doado do imóvel rural {string}', (percentual: string) => {
  ruralPage.preencherPercentualDoado(percentual);
});

// Campos Exclusivos Causa Mortis
When('anexo a certidão de matrícula do imóvel rural', () => {
  ruralPage.anexarCertidaoMatricula();
});

When('preencho a Data de aquisição do imóvel rural {string}', (data: string) => {
  ruralPage.preencherDataAquisicao(data);
});

When('marco aquisição ainda não registrada do imóvel rural', () => {
  ruralPage.marcarAquisicaoNaoRegistrada(true);
});

When('desmarco aquisição ainda não registrada do imóvel rural', () => {
  ruralPage.marcarAquisicaoNaoRegistrada(false);
});

When('preencho o Registro de aquisição na matrícula do imóvel rural {string}', (registro: string) => {
  ruralPage.preencherRegistroAquisicaoMatricula(registro);
});

When('anexo a certidão do CAR do imóvel rural', () => {
  ruralPage.anexarCertidaoCar();
});

When('anexo a declaração de ITR do imóvel rural', () => {
  ruralPage.anexarDeclaracaoItr();
});

When('preencho o Percentual de propriedade do de cujus do imóvel rural {string}', (percentual: string) => {
  ruralPage.preencherPercentualPropriedadeDeCujus(percentual);
});

When('preencho a Área Inventariada do imóvel rural {string}', (area: string) => {
  ruralPage.preencherAreaInventariada(area);
});

When('marco bem particular do de cujus do imóvel rural', () => {
  ruralPage.marcarBemParticularDeCujus(true);
});

When('marco solicitar isenção para este imóvel rural', () => {
  ruralPage.marcarSolicitarIsencao(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do imóvel rural', (mensagem: string, campo: string) => {
  ruralPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o campo {string} do imóvel rural deve estar {string}', (campo: string, estado: string) => {
  const habilitado = estado === 'habilitado' || estado === 'visível';
  ruralPage.validarCampoHabilitado(campo, habilitado);
});

Then('devo visualizar o alerta global {string} nos bens', (mensagem: string) => {
  ruralPage.validarAlertaGlobal(mensagem);
});

Then('o bem rural deve estar cadastrado na tabela com espécie {string}, município {string} e valor {string}', (especie: string, municipio: string, valor: string) => {
  ruralPage.validarBemNaTabela(especie, municipio, valor);
});

Then('devo visualizar o alerta de soma de áreas {string} do imóvel rural', (mensagem: string) => {
  ruralPage.validarAlertaSomaAreas(mensagem);
});

Then('devo visualizar o alerta de que a isenção não é devida para o imóvel rural', () => {
  ruralPage.validarAlertaIsencaoNaoDevida();
});
