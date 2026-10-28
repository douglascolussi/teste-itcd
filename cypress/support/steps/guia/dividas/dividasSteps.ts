// cypress/support/steps/guia/dividas/dividasSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { dividasPage } from '../../../pageobjects/guia/dividas/dividasPage';

// Navegação
When('acesso a aba "Dívidas"', () => {
  dividasPage.acessarAbaDividas();
});

When('abro o formulário de inclusão de dívida', () => {
  dividasPage.abrirFormularioDivida();
});

// Ações de Adição de Anexo
When('clico para adicionar um arquivo de dívida', () => {
  dividasPage.clicarAdicionarAnexo();
});

When('seleciono a descrição do anexo de dívida {string}', (descricao: string) => {
  dividasPage.selecionarDescricaoAnexo(descricao);
});

When('anexo o arquivo de dívida {string}', (nomeArquivo: string) => {
  dividasPage.anexarArquivo(nomeArquivo);
});

When('anexo um arquivo de dívida com extensão inválida {string}', (nomeArquivo: string) => {
  dividasPage.anexarArquivoInvalido(nomeArquivo);
});

When('anexo um arquivo de dívida que ultrapassa 4MB {string}', (nomeArquivo: string) => {
  dividasPage.anexarArquivoPesado(nomeArquivo);
});

When('clico em salvar anexo de dívida', () => {
  dividasPage.salvarAnexo();
});

When('clico em cancelar anexo de dívida', () => {
  dividasPage.cancelarAnexo();
});

// Ações de Edição
When('clico para editar o primeiro arquivo de dívida da lista', () => {
  dividasPage.clicarEditarPrimeiroAnexo();
});

When('seleciono a descrição do anexo de dívida na edição {string}', (descricao: string) => {
  dividasPage.selecionarDescricaoAnexo(descricao);
});

When('clico em salvar edição do anexo de dívida', () => {
  dividasPage.salvarEdicaoAnexo();
});

// Ações de Exclusão
When('clico para excluir o primeiro arquivo de dívida da lista', () => {
  dividasPage.clicarExcluirPrimeiroAnexo();
});

When('confirmo a exclusão do anexo de dívida no modal', () => {
  dividasPage.confirmarExclusaoModal();
});

// Validações e Asserções
Then('devo visualizar a mensagem {string} para o campo {string} do anexo de dívida', (mensagem: string, campo: string) => {
  if (campo === 'Descrição') {
    dividasPage.validarMensagemErroDescricao(mensagem);
  } else if (campo === 'Arquivo') {
    dividasPage.validarMensagemErroArquivo(mensagem);
  }
});

Then('devo visualizar a mensagem de erro {string} para o arquivo do anexo de dívida', (mensagem: string) => {
  dividasPage.validarMensagemErroArquivo(mensagem);
});

Then('devo visualizar o alerta de dívida {string}', (mensagem: string) => {
  dividasPage.validarAlertaGlobal(mensagem);
});

Then('o arquivo de dívida deve estar cadastrado na tabela com descrição {string} e nome {string}', (descricao: string, nomeArquivo: string) => {
  dividasPage.validarAnexoNaTabela(descricao, nomeArquivo);
});

Then('devo visualizar a mensagem de tabela vazia de anexo de dívida {string}', (mensagem: string) => {
  dividasPage.validarTabelaVazia(mensagem);
});

Then('o formulário de anexo de dívida não deve estar visível', () => {
  dividasPage.validarFormularioAnexoFechado();
});

Then('devo permanecer na aba "Dívidas"', () => {
  dividasPage.validarPermanenciaNaAbaDividas();
});

When(/(?:informo|informar) que a dívida está vinculada a um bem do espólio "(Sim|Não)"/, (opcao: 'Sim' | 'Não') => {
  dividasPage.informarVinculoComBem(opcao);
});

When('seleciono o bem vinculado contendo {string}', (descricao: string) => {
  dividasPage.selecionarBemVinculado(descricao);
});

When('clico em salvar a dívida', () => {
  dividasPage.clicarSalvarDivida();
});

When('possuo todos os tipos de bens cadastrados na guia', () => {
  dividasPage.cadastrarTodosOsTiposDeBensNaGuia();
});

When('cadastro um bem da espécie {string} na guia', (especie: string) => {
  dividasPage.cadastrarBemPorEspecie(especie);
});

Then('o campo de seleção de bem vinculado deve estar visível', () => {
  dividasPage.validarCampoBemVinculadoVisivel(true);
});

Then('o campo de seleção de bem vinculado não deve estar visível', () => {
  dividasPage.validarCampoBemVinculadoVisivel(false);
});

Then('devo visualizar a mensagem {string} para o campo {string} da dívida', (mensagem: string, campo: string) => {
  if (campo === 'Bem vinculado') {
    dividasPage.validarMensagemErroBemVinculado(mensagem);
  }
});

Then('a opção do bem vinculado contendo {string} deve estar disponível para seleção', (descricao: string) => {
  dividasPage.validarOpcaoBemVinculadoDisponivel(descricao);
});

Then('a opção do bem vinculado contendo {string} não deve estar disponível para seleção', (descricao: string) => {
  dividasPage.validarOpcaoBemVinculadoNaoDisponivel(descricao);
});

Then('o bem vinculado contendo {string} deve estar selecionado na dívida', (descricao: string) => {
  dividasPage.validarBemVinculadoSelecionado(descricao);
});

Then('a natureza da dívida deve ser sugerida como {string}', (natureza: string) => {
  dividasPage.validarNaturezaSugerida(natureza);
});

// Steps de Separação / Percentuais de Dívida
When('que o usuário está cadastrando uma dívida', () => {
  dividasPage.acessarAbaDividas();
  dividasPage.abrirFormularioDivida();
  dividasPage.selecionarTipoDivida('Financiamento Imobiliário');
});

When('selecionar {string} em "A dívida irá pertencer a quem?"', (opcao: string) => {
  dividasPage.selecionarADividaIraPertencerAQuem(opcao);
});

When('selecionar {string}', (opcao: string) => {
  if (['Separando', 'Separanda', 'Ambos'].includes(opcao)) {
    dividasPage.selecionarADividaIraPertencerAQuem(opcao);
  }
});

When('alterar a opção para {string}', (opcao: string) => {
  dividasPage.selecionarADividaIraPertencerAQuem(opcao);
});

When('que a opção {string} está selecionada', (opcao: string) => {
  dividasPage.selecionarADividaIraPertencerAQuem(opcao);
});

When('que o usuário selecionou {string} e os percentuais estão em {string} \\/ {string}', (opcao: string, percSeparando: string, percSeparanda: string) => {
  dividasPage.selecionarADividaIraPertencerAQuem(opcao);
  dividasPage.validarPercentualSeparando(percSeparando);
  dividasPage.validarPercentualSeparanda(percSeparanda);
});

When('o usuário informar {string} no percentual do Separando', (percentual: string) => {
  dividasPage.preencherPercentualSeparando(percentual);
});

When('o usuário informar {string} no percentual da Separanda', (percentual: string) => {
  dividasPage.preencherPercentualSeparanda(percentual);
});

When('o usuário informar {string} ou {string} para uma das partes e clicar em "Salvar"', (perc1: string, _perc2: string) => {
  dividasPage.preencherCamposObrigatoriosDivida();
  dividasPage.preencherPercentualSeparando(perc1);
  dividasPage.clicarSalvarDivida();
});

When('a soma dos percentuais for diferente de 100% e o usuário clicar em "Salvar"', () => {
  dividasPage.preencherCamposObrigatoriosDivida();
  dividasPage.preencherPercentualSeparando('30,00%');
  dividasPage.preencherPercentualSeparanda('40,00%');
  dividasPage.clicarSalvarDivida();
});

Then('o sistema deve preencher {string} para o Separando e {string} para a Separanda, com os campos editáveis', (percSeparando: string, percSeparanda: string) => {
  dividasPage.validarPercentualSeparando(percSeparando);
  dividasPage.validarPercentualSeparanda(percSeparanda);
  dividasPage.validarCamposPercentuaisEditaveis(true);
});

Then('o sistema deve preencher {string} para o Separando e {string} para a Separanda, com os campos bloqueados', (percSeparando: string, percSeparanda: string) => {
  dividasPage.validarPercentualSeparando(percSeparando);
  dividasPage.validarPercentualSeparanda(percSeparanda);
  dividasPage.validarCamposPercentuaisEditaveis(false);
});

Then('o sistema deve preencher automaticamente {string} no percentual da Separanda', (percentual: string) => {
  dividasPage.validarPercentualSeparanda(percentual);
});

Then('o sistema deve recalcular os percentuais para {string} \\/ {string}', (percSeparando: string, percSeparanda: string) => {
  dividasPage.validarPercentualSeparando(percSeparando);
  dividasPage.validarPercentualSeparanda(percSeparanda);
});

Then('o sistema deve impedir o salvamento e exibir a mensagem: {string}', (mensagem: string) => {
  dividasPage.validarMensagemBloqueio(mensagem);
});

When('que existe uma dívida salva com "Ambos" e percentuais {string} \\/ {string}', (percSeparando: string, percSeparanda: string) => {
  dividasPage.acessarAbaDividas();
  dividasPage.abrirFormularioDivida();
  dividasPage.selecionarTipoDivida('Empréstimo');
  dividasPage.preencherCamposObrigatoriosDivida('Dívida Salva Ambos', '500000');
  dividasPage.selecionarADividaIraPertencerAQuem('Ambos');
  dividasPage.preencherPercentualSeparando(percSeparando);
  dividasPage.clicarAdicionarAnexo();
  dividasPage.selecionarDescricaoAnexo('Extrato do Saldo Devedor');
  dividasPage.anexarArquivo('comprovante_divida.pdf');
  dividasPage.salvarAnexo();
  dividasPage.clicarSalvarDivida();
});

When('o usuário abrir a edição do item', () => {
  dividasPage.abrirEdicaoPrimeiraDivida();
});

Then('o sistema deve exibir os percentuais salvos \\({string} \\/ {string}\\) e não sobrescrevê-los com o padrão', (percSeparando: string, percSeparanda: string) => {
  dividasPage.validarPercentualSeparando(percSeparando);
  dividasPage.validarPercentualSeparanda(percSeparanda);
});

