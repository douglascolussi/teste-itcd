// cypress/support/steps/guia/bens/urbanoSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { urbanoPage } from '../../../pageobjects/guia/bens/urbanoPage';

// Navegação
When('seleciono a espécie do bem "Imóvel Urbano"', () => {
  urbanoPage.selecionarEspecieUrbano();
});

When('clico em salvar bem urbano', () => {
  urbanoPage.salvarBem();
});

// Preenchimento de Campos Comuns
When('seleciono a UF do imóvel urbano {string}', (uf: string) => {
  urbanoPage.selecionarUf(uf);
});

When('seleciono o Município do imóvel urbano {string}', (municipio: string) => {
  urbanoPage.selecionarMunicipio(municipio);
});

When('preencho a Matrícula do imóvel urbano {string}', (matricula: string) => {
  urbanoPage.preencherMatricula(matricula);
});

When('preencho o CEP do imóvel urbano {string}', (cep: string) => {
  urbanoPage.preencherCep(cep);
});

When('seleciono o Tipo do Logradouro do imóvel urbano {string}', (tipo: string) => {
  urbanoPage.selecionarTipoLogradouro(tipo);
});

When('preencho o Logradouro do imóvel urbano {string}', (logradouro: string) => {
  urbanoPage.preencherLogradouro(logradouro);
});

When('marco que o imóvel urbano não tem número', () => {
  urbanoPage.marcarNaoTemNumero(true);
});

When('desmarco que o imóvel urbano não tem número', () => {
  urbanoPage.marcarNaoTemNumero(false);
});

When('preencho o Número do imóvel urbano {string}', (numero: string) => {
  urbanoPage.preencherNumero(numero);
});

When('preencho o Bairro do imóvel urbano {string}', (bairro: string) => {
  urbanoPage.preencherBairro(bairro);
});

When('preencho a Descrição ou Complemento do imóvel urbano {string}', (descricao: string) => {
  urbanoPage.preencherDescricaoComplemento(descricao);
});

When('preencho o Lote do imóvel urbano {string}', (lote: string) => {
  urbanoPage.preencherLote(lote);
});

When('preencho a Quadra do imóvel urbano {string}', (quadra: string) => {
  urbanoPage.preencherQuadra(quadra);
});

When('seleciono o Tipo do Imóvel urbano {string}', (tipo: string) => {
  urbanoPage.selecionarTipoImovel(tipo);
});

When('preencho a Área do Terreno do imóvel urbano {string}', (area: string) => {
  urbanoPage.preencherAreaTerreno(area);
});

When('preencho a Área Construída do imóvel urbano {string}', (area: string) => {
  urbanoPage.preencherAreaConstruida(area);
});

When('preencho o Valor Total Declarado do imóvel urbano {string}', (valor: string) => {
  urbanoPage.preencherValorTotalDeclarado(valor);
});

// Inscrição Municipal
When('adiciono uma inscrição municipal {string} no imóvel urbano', (numero: string) => {
  urbanoPage.adicionarInscricaoMunicipal(numero, false);
});

When('adiciono uma inscrição municipal {string} com ficha imobiliária no imóvel urbano', (numero: string) => {
  urbanoPage.adicionarInscricaoMunicipal(numero, true);
});

// Campos Exclusivos Doação
When('preencho o Percentual que será doado do imóvel urbano {string}', (percentual: string) => {
  urbanoPage.preencherPercentualDoado(percentual);
});

// Campos Exclusivos Causa Mortis
When('anexo a certidão de matrícula do imóvel urbano', () => {
  urbanoPage.anexarCertidaoMatricula();
});

When('preencho a Data de aquisição do imóvel urbano {string}', (data: string) => {
  urbanoPage.preencherDataAquisicao(data);
});

When('marco aquisição ainda não registrada do imóvel urbano', () => {
  urbanoPage.marcarAquisicaoNaoRegistrada(true);
});

When('desmarco aquisição ainda não registrada do imóvel urbano', () => {
  urbanoPage.marcarAquisicaoNaoRegistrada(false);
});

When('preencho o Registro de aquisição na matrícula do imóvel urbano {string}', (registro: string) => {
  urbanoPage.preencherRegistroAquisicaoMatricula(registro);
});

When('preencho o Percentual de propriedade do de cujus do imóvel urbano {string}', (percentual: string) => {
  urbanoPage.preencherPercentualPropriedadeDeCujus(percentual);
});

When('marco bem particular do de cujus do imóvel urbano', () => {
  urbanoPage.marcarBemParticularDeCujus(true);
});

When('marco solicitar isenção para este imóvel urbano', () => {
  urbanoPage.marcarSolicitarIsencao(true);
});

// Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do imóvel urbano', (mensagem: string, campo: string) => {
  urbanoPage.validarMensagemErroCampo(campo, mensagem);
});

Then('o campo {string} do imóvel urbano deve estar {string}', (campo: string, estado: string) => {
  const habilitado = estado === 'habilitado' || estado === 'visível';
  urbanoPage.validarCampoHabilitado(campo, habilitado);
});

Then('o bem urbano deve estar cadastrado na tabela com espécie {string}, município {string} e valor {string}', (especie: string, municipio: string, valor: string) => {
  urbanoPage.validarBemNaTabela(especie, municipio, valor);
});
