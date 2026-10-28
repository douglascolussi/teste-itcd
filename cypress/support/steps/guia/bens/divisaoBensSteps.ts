// cypress/support/steps/guia/bens/divisaoBensSteps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { divisaoBensPage } from '../../../pageobjects/guia/bens/divisaoBensPage';
import { falecidoPage } from '../../../pageobjects/guia/pessoas/falecidoPage';
import { conjugePage } from '../../../pageobjects/guia/pessoas/conjugePage';
import { herdeiroPage } from '../../../pageobjects/guia/pessoas/herdeiroPage';
import { outrosPage } from '../../../pageobjects/guia/bens/outrosPage';

// Contexto e Pré-requisitos de Pessoas
Given('que o falecido era casado no regime de comunhão universal de bens', () => {
  // 1. Falecido (Casado em Comunhão Universal)
  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Sim');
  falecidoPage.selecionarEstadoCivil('Casado(a)');
  falecidoPage.selecionarRegimeCasamento('Comunhão Universal');
  falecidoPage.preencherDataCasamento('2010-05-15');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  // 2. Cônjuge (Sobrevivente / Meeiro)
  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria.silva@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  // 3. Herdeiro (Descendente)
  herdeiroPage.interceptarBuscarPessoa('58838180563', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('58838180563');
  herdeiroPage.preencherNome('GILSON SILVA FILHO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('gilson.filho@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  cy.get('body').then(($b) => {
    if ($b.find('input[formControlName="ehFilhoComumComConjuge"]').length > 0) {
      cy.get('input[formControlName="ehFilhoComumComConjuge"]').first().click({ force: true });
    }
  });
  herdeiroPage.responderEhInventariante('Não');
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
});

When('o declarante seleciona comunhão universal de bens', () => {
  falecidoPage.selecionarRegimeCasamento('Comunhão Universal');
});

// Ações no Formulário de Bens
When('adiciono um bem comum do casal na declaração com data de aquisição {string}', (dataAquisicao: string) => {
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Apartamento Residencial Familiar');
  outrosPage.preencherDataDeAquisicao(dataAquisicao);
  outrosPage.preencherValorTotalDeclarado('10000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.garantirBemComum();
});

When('adiciono um bem com a opção bem particular não selecionada', () => {
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Veículo Sedan Luxo Familiar');
  outrosPage.preencherDataDeAquisicao('2018-03-20');
  outrosPage.preencherValorTotalDeclarado('8000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.garantirBemComum();
});

When('adiciono um bem adquirido antes do casamento com a opção bem particular não selecionada', () => {
  // Casamento em 2010-05-15, bem adquirido em 2005-01-10
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Imóvel Adquirido Antes do Casamento');
  outrosPage.preencherDataDeAquisicao('2005-01-10');
  outrosPage.preencherValorTotalDeclarado('15000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.garantirBemComum();
});

// Asserções de Meação e Partilha
Then('o sistema deve gravar que o percentual de {string} do total dos bens comuns pertence ao conjuge sobrevivente', (percentual: string) => {
  divisaoBensPage.validarDireitoMeacaoConjuge(percentual);
});

Then('o percentual de {string} deve ser registrado como direito do meeiro sobre todos bens comuns', (percentual: string) => {
  divisaoBensPage.validarDireitoMeacaoConjuge(percentual);
});

Then('o percentual de meação de {string} deve pertencer ao cônjuge independentemente da data de aquisição dos bens', (percentual: string) => {
  divisaoBensPage.validarDireitoMeacaoConjuge(percentual);
});

Then('os {string} restantes devem ser distribuídos para os herdeiros', (percentual: string) => {
  divisaoBensPage.validarQuinhaoHerdeiro('Filho(a)', percentual);
});

Then('ao salvar o bem comum os percentuais de partilha devem ser gravados com sucesso', () => {
  outrosPage.salvarBem();
  outrosPage.validarBemNaTabela('Outros', 'Apartamento Residencial Familiar', '100.000,00');
});

// ==========================================
// REGRA: COMUNHÃO PARCIAL DE BENS
// ==========================================

Given('que o falecido era casado com regime de comunhão parcial de bens', () => {
  // 1. Falecido (Casado em Comunhão Parcial com casamento em 2010-05-15)
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
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  // 2. Cônjuge (Sobrevivente / Meeiro)
  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria.silva@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  // 3. Herdeiro (Descendente)
  herdeiroPage.interceptarBuscarPessoa('58838180563', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('58838180563');
  herdeiroPage.preencherNome('GILSON SILVA FILHO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('gilson.filho@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  cy.get('body').then(($b) => {
    if ($b.find('input[formControlName="ehFilhoComumComConjuge"]').length > 0) {
      cy.get('input[formControlName="ehFilhoComumComConjuge"]').first().click({ force: true });
    }
  });
  herdeiroPage.responderEhInventariante('Não');
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
});

When('o declarante não classificar como bem particular ou a data da aquisição for após a data do casamento', () => {
  // Casamento: 2010-05-15. Aquisição: 2015-08-20 (após o casamento) e bem comum (não particular)
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Imóvel Comum Adquirido na Constância do Casamento');
  outrosPage.preencherDataDeAquisicao('2015-08-20');
  outrosPage.preencherValorTotalDeclarado('10000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.garantirBemComum();
});

When('o declarante adiciona um bem comum com data de aquisição após o casamento', () => {
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Veículo Comum Adquirido Após Casamento');
  outrosPage.preencherDataDeAquisicao('2018-09-10');
  outrosPage.preencherValorTotalDeclarado('6000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.garantirBemComum();
});

When('o declarante adiciona um bem selecionado como comum', () => {
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Bens Móveis Comuns do Casal');
  outrosPage.preencherValorTotalDeclarado('4000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.garantirBemComum();
});

Then('o sistema deve gravar o percentual de {string} referente à meação', (percentual: string) => {
  divisaoBensPage.validarDireitoMeacaoConjuge(percentual);
});

Then('deve aplicar meação de {string} para o cônjuge sobre o bem comum adquirido após a data do casamento', (percentual: string) => {
  divisaoBensPage.validarDireitoMeacaoConjuge(percentual);
});

Then('ao salvar o bem comum em comunhão parcial os percentuais de partilha devem ser gravados com sucesso', () => {
  outrosPage.salvarBem();
  outrosPage.validarBemNaTabela('Outros', 'Imóvel Comum Adquirido na Constância do Casamento', '100.000,00');
});

// ====================================================================
// REGRA 3: UNIÃO ESTÁVEL E PARTICIPAÇÃO FINAL NOS AQUESTOS
// ====================================================================

function cadastrarFamiliaParaMeacao(estadoCivil: string, regime: string, nomeConjuge: string = 'MARIA SILVA') {
  // 1. Falecido
  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Sim');
  falecidoPage.selecionarEstadoCivil(estadoCivil);
  falecidoPage.selecionarRegimeCasamento(regime);
  falecidoPage.preencherDataCasamento('2010-05-15');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  // 2. Cônjuge / Companheiro(a)
  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome(nomeConjuge);
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  // 3. Herdeiro (Descendente)
  herdeiroPage.interceptarBuscarPessoa('58838180563', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('58838180563');
  herdeiroPage.preencherNome('GILSON SILVA FILHO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('gilson.filho@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  cy.get('body').then(($b) => {
    if ($b.find('input[formControlName="ehFilhoComumComConjuge"]').length > 0) {
      cy.get('input[formControlName="ehFilhoComumComConjuge"]').first().click({ force: true });
    }
  });
  herdeiroPage.responderEhInventariante('Não');
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
}

Given('que o falecido vivia em união estável ou regime de participação final nos aquestos', () => {
  cadastrarFamiliaParaMeacao('Convivente em União Estável', 'União Estável', 'MARIA SILVA COMPANHEIRA');
});

Given('que o falecido vivia em união estável', () => {
  cadastrarFamiliaParaMeacao('Convivente em União Estável', 'União Estável', 'MARIA SILVA COMPANHEIRA');
});

Given('que o falecido era casado no regime de participação final nos aquestos', () => {
  cadastrarFamiliaParaMeacao('Casado(a)', 'Participação Final nos Aquestos', 'MARIA SILVA CONJUGE');
});

When('o declarante seleciona o regime correspondente', () => {
  cy.get('body').then(($body) => {
    if ($body.find('app-bens-form').length === 0) {
      outrosPage.acessarAbaBens();
      outrosPage.clicarAdicionarBem();
      outrosPage.selecionarEspecieOutros();
      outrosPage.preencherDescricao('Imóvel Comum do Casal');
      outrosPage.preencherDataDeAquisicao('2015-08-20');
      outrosPage.preencherValorTotalDeclarado('10000000');
      outrosPage.preencherPercentualPropriedadeDeCujus('10000');
      divisaoBensPage.garantirBemComum();
    }
  });
});

Then('o sistema deve aplicar as mesmas regras de meação da comunhão parcial de bens, considerando 50% sobre os bens classificados como comuns', () => {
  divisaoBensPage.validarDireitoMeacaoConjuge('50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('Filho(a)', '50,00 %');
});

Then('o sistema deve aplicar as mesmas regras de meação da comunhão parcial de bens considerando {string} sobre os bens classificados como comuns', (percentual: string) => {
  divisaoBensPage.validarDireitoMeacaoConjuge(percentual);
  divisaoBensPage.validarQuinhaoHerdeiro('Filho(a)', percentual);
});

// ====================================================================
// REGRA 4: APURAÇÃO DO MONTE PARTILHÁVEL E VALOR PARA CÁLCULO (VPC)
// ====================================================================

function cadastrarFalecidoSolteiroComHerdeiro() {
  // 1. Falecido Solteiro
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
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  // 2. Herdeiro (Descendente)
  herdeiroPage.interceptarBuscarPessoa('58838180563', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('58838180563');
  herdeiroPage.preencherNome('GILSON SILVA FILHO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('gilson.filho@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');

  // Responde "Não" em qualquer pergunta de rádio desmarcada
  cy.get('app-adicionar-ou-editar-herdeiro-form .form-group').each(($group) => {
    const $naoRadio = $group.find('label:contains("Não") input[type="radio"]');
    if ($naoRadio.length > 0 && !$group.find('input[type="radio"]:checked').length) {
      cy.wrap($naoRadio).first().click({ force: true });
    }
  });

  herdeiroPage.responderEhInventariante('Não');
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');

  // Segunda passada para garantir qualquer rádio que tenha sido exibido dinamicamente
  cy.get('app-adicionar-ou-editar-herdeiro-form .form-group').each(($group) => {
    const $naoRadio = $group.find('label:contains("Não") input[type="radio"]');
    if ($naoRadio.length > 0 && !$group.find('input[type="radio"]:checked').length) {
      cy.wrap($naoRadio).first().click({ force: true });
    }
  });

  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
}

// CA01 - Com existência de meação
Given('que existem bens comuns sujeitos à meação e que os bens foram previamente apurados e classificados', () => {
  cadastrarFamiliaParaMeacao('Casado(a)', 'Comunhão Parcial', 'MARIA SILVA CONJUGE');

  // Adiciona Bem 1 (Comum)
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Bem Comum Adquirido no Casamento');
  outrosPage.preencherDataDeAquisicao('2015-08-20');
  outrosPage.preencherValorTotalDeclarado('10000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.garantirBemComum();
  outrosPage.salvarBem();

  // Garante que o primeiro bem foi salvo e a tabela atualizada antes de abrir o próximo
  cy.get('table.table-striped tbody tr.text-center-row', { timeout: 15000 }).should('have.length', 1);

  // Adiciona Bem 2 (Particular)
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Bem Particular Exclusivo do Falecido');
  outrosPage.preencherDataDeAquisicao('2005-01-10');
  outrosPage.preencherValorTotalDeclarado('10000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.marcarBemParticular(true);
  outrosPage.salvarBem();

  cy.get('table.table-striped tbody tr.text-center-row', { timeout: 15000 }).should('have.length', 2);
});

When('o sistema calcular o monte partilhável', () => {
  cy.log('Apurando o monte partilhável e a partilha dos bens');
});

Then('deve considerar 50% dos bens comuns excluindo a meação do cônjuge sobrevivente e 100% dos bens particulares', () => {
  // 1. Valida o Bem Comum: meação de 50% excluída do monte partilhável, herança de 50% para descendentes
  divisaoBensPage.editarBemNaLista(0);
  divisaoBensPage.validarDireitoMeacaoConjuge('50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('Filho(a)', '50,00 %');
  outrosPage.cancelar();

  // 2. Valida o Bem Particular: 100% integra o monte partilhável (excluída qualquer meação, dividida entre herdeiros)
  divisaoBensPage.editarBemNaLista(1);
  divisaoBensPage.validarPartilhaIntegralBensParticulares();
  outrosPage.cancelar();
});

// CA02 - Sem existência de meação
Given('que não existem bens sujeitos à meação', () => {
  cadastrarFamiliaParaMeacao('Casado(a)', 'Comunhão Parcial', 'MARIA SILVA CONJUGE');

  // Adiciona apenas bem particular (sem meação)
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Imóvel Particular Antes do Casamento');
  outrosPage.preencherDataDeAquisicao('2000-01-10');
  outrosPage.preencherValorTotalDeclarado('10000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  divisaoBensPage.marcarBemParticular(true);
});

Then('deve considerar 100% dos bens apurados', () => {
  divisaoBensPage.validarPartilhaIntegralBensParticulares();
});

// CA03 - Com copropriedade (VPC)
Given('que o falecido era titular de apenas parte de um bem em copropriedade com terceiros', () => {
  cadastrarFamiliaParaMeacao('Casado(a)', 'Comunhão Parcial', 'MARIA SILVA CONJUGE');

  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Fazenda em Copropriedade com Terceiros');
  outrosPage.preencherDataDeAquisicao('2015-08-20');
  outrosPage.preencherValorTotalDeclarado('20000000'); // R$ 200.000,00
  outrosPage.preencherPercentualPropriedadeDeCujus('5000'); // 50,00% de titularidade
  divisaoBensPage.garantirBemComum();
});

When('o sistema apurar o valor do bem para composição do monte partilhável', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
});

Then('deve considerar apenas o percentual de titularidade do falecido sobre o valor total do bem antes de aplicar qualquer classificação de meação', () => {
  divisaoBensPage.validarAjusteTitularidadeVpc('50,00 %');
  divisaoBensPage.validarDireitoMeacaoConjuge('50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('Filho(a)', '50,00 %');
});

// CA04 - Sem meação por ausência de cônjuge
Given('que o falecido não possuía cônjuge ou companheiro sobrevivente', () => {
  cadastrarFalecidoSolteiroComHerdeiro();

  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Veículo do Falecido Solteiro');
  outrosPage.preencherDataDeAquisicao('2018-05-10');
  outrosPage.preencherValorTotalDeclarado('8000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
});

Then('deve considerar 100% do valor para cálculo de todos os bens cadastrados em nome do falecido independentemente de sua natureza', () => {
  divisaoBensPage.validarAusenciaDeMeeiro();
  divisaoBensPage.validarQuinhaoExclusivoHerdeiro('100,00 %');
});




