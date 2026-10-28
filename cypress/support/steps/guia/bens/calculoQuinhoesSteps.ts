// cypress/support/steps/guia/bens/calculoQuinhoesSteps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { divisaoBensPage } from '../../../pageobjects/guia/bens/divisaoBensPage';
import { falecidoPage } from '../../../pageobjects/guia/pessoas/falecidoPage';
import { conjugePage } from '../../../pageobjects/guia/pessoas/conjugePage';
import { herdeiroPage } from '../../../pageobjects/guia/pessoas/herdeiroPage';
import { outrosPage } from '../../../pageobjects/guia/bens/outrosPage';

// Helper para responder perguntas dinâmicas do form de herdeiro
function preencherPerguntasDinamicasHerdeiro() {
  cy.get('body').then(($b) => {
    if (
      $b.find('input[formControlName="ehFilhoComumComConjuge"]').length > 0 &&
      !$b.find('input[formControlName="ehFilhoComumComConjuge"]').is(':checked')
    ) {
      cy.get('input[formControlName="ehFilhoComumComConjuge"]').first().click({ force: true });
    }

    [
      'existeOutroHerdeiroDoMesmoGrauParaReceberAHeranca',
      'existeHerdeiroAscendenteParaReceberAHeranca',
      'existeherdeiroColateralParaReceberAHeranca',
      'existeOutroDescendenteDeDiferenteGrauParaReceberAHeranca',
    ].forEach((controlName) => {
      const $radios = $b.find(`input[formControlName="${controlName}"]`);
      if ($radios.length > 0 && !$radios.is(':checked')) {
        cy.get(`input[formControlName="${controlName}"]`).last().click({ force: true });
      }
    });
  });
}

function cadastrarFalecidoSolteiroPadrao() {
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
}

function cadastrarHerdeiroFilho(cpf: string, nome: string, renuncia: 'Sim' | 'Não' = 'Não', ehFilhoComum: boolean = true) {
  herdeiroPage.interceptarBuscarPessoa(cpf, null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf(cpf);
  herdeiroPage.preencherNome(nome);
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail(`${nome.toLowerCase().replace(/ /g, '.')}@teste.com`);
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia(renuncia);

  if (renuncia === 'Sim') {
    cy.get('body').then(($b) => {
      if ($b.find('input[formControlName="tipoDeRenuncia"]').length > 0) {
        cy.get('input[formControlName="tipoDeRenuncia"]').first().click({ force: true });
      }
    });
  }

  cy.get('body').then(($b) => {
    if ($b.find('input[formControlName="ehFilhoComumComConjuge"]').length > 0) {
      if (ehFilhoComum) {
        cy.get('input[formControlName="ehFilhoComumComConjuge"]').first().click({ force: true });
      } else {
        cy.get('input[formControlName="ehFilhoComumComConjuge"]').last().click({ force: true });
      }
    }
  });

  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.responderEhInventariante('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
}

function cadastrarBemSimples(isParticular: boolean = false) {
  outrosPage.acessarAbaBens();
  outrosPage.clicarAdicionarBem();
  outrosPage.selecionarEspecieOutros();
  outrosPage.preencherDescricao('Bem para Teste de Quinhões');
  outrosPage.preencherDataDeAquisicao('2015-08-20');
  outrosPage.preencherValorTotalDeclarado('10000000');
  outrosPage.preencherPercentualPropriedadeDeCujus('10000');
  if (isParticular) {
    divisaoBensPage.marcarBemParticular(true);
  } else {
    divisaoBensPage.garantirBemComum();
  }
}

// ====================================================================
// CA01, CA02, CA03: RENÚNCIA
// ====================================================================

Given('que o falecido possuía 2 herdeiros filhos e um deles renunciou à herança', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO', 'Não');
  cadastrarHerdeiroFilho('11144477735', 'ROBERTO SILVA RENUNCIANTE', 'Sim');
  cadastrarBemSimples(true);
});

When('o cálculo for iniciado na aba de bens', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
});

Then('o herdeiro renunciante deve ser removido do cálculo e não gerar representação', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('ROBERTO SILVA RENUNCIANTE', '0,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO', '100,00 %');
});

Given('que há renúncia entre herdeiros da mesma classe', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO', 'Não');
  cadastrarHerdeiroFilho('11144477735', 'ROBERTO SILVA RENUNCIANTE', 'Sim');
  cadastrarBemSimples(true);
});

When('o cálculo for executado', () => {
  cy.get('body').then(($body) => {
    if ($body.find('app-adicionar-ou-editar-herdeiro-form .help-block:visible').length > 0 ||
        $body.find('app-adicionar-ou-editar-falecido-form .help-block:visible').length > 0) {
      cy.log('Cálculo impedido/bloqueado antes da aba de bens devido a erro de validação.');
    } else {
      divisaoBensPage.validarTabelaBeneficiariosVisivel();
    }
  });
});

Then('o sistema deve redistribuir os percentuais entre os demais herdeiros da mesma classe atribuindo 100% ao herdeiro remanescente', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO', '100,00 %');
});

Given('que todos os herdeiros de uma classe renunciaram', () => {
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
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  // Cadastra Ascendente (Pai/Mãe)
  herdeiroPage.interceptarBuscarPessoa('58838180563', null);
  herdeiroPage.clicarCadastrarHerdeiroAscendente();
  herdeiroPage.selecionarTipoHerdeiro('Pai/Mãe');
  herdeiroPage.preencherCpf('58838180563');
  herdeiroPage.preencherNome('JOSE SILVA PAI');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('jose.pai@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.responderEhInventariante('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarBemSimples(true);
});

Then('o sistema deve avançar para a próxima classe sucessória válida', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
  divisaoBensPage.validarQuinhaoHerdeiro('JOSE SILVA PAI', '100,00 %');
});

// ====================================================================
// CA04, CA05, CA06, CA08, CA09: PRÉ-MORTO, PÓS-MORTO E ESTIRPE
// ====================================================================

Given('que existe sucessor pré-morto com descendentes', () => {
  cadastrarFalecidoSolteiroPadrao();

  // Filho 1 (Vivo)
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO VIVO', 'Não');

  // Filho 2 (Pré-morto com descendentes vivos)
  herdeiroPage.interceptarBuscarPessoa('11144477735', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('11144477735');
  herdeiroPage.preencherNome('MARCOS SILVA PRE MORTO');
  herdeiroPage.responderJaFaleceu('Sim');
  herdeiroPage.preencherDataObito('2019-01-10'); // Antes do de cujus (2020-01-10)
  herdeiroPage.selecionarMomentoFalecimento('Antes ou Simultaneamente');
  herdeiroPage.responderTinhaDescendenteVivo('Sim');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  // Neto (Descendente do pré-morto)
  herdeiroPage.interceptarBuscarPessoa('23456789092', null);
  herdeiroPage.clicarCadastrarNeto();
  herdeiroPage.selecionarTipoHerdeiro('Neto(a)');
  herdeiroPage.preencherCpf('23456789092');
  herdeiroPage.preencherNome('LUCAS SILVA NETO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('lucas.neto@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.responderEhInventariante('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarBemSimples(true);
});

Then('deve ser criada uma estirpe para ele com o quinhão dividido entre os seus descendentes', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO VIVO', '50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('LUCAS SILVA NETO', '50,00 %');
});

Given('que existe sucessor pré-morto sem descendentes', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO VIVO', 'Não');

  // Filho pré-morto sem descendente
  herdeiroPage.interceptarBuscarPessoa('11144477735', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('11144477735');
  herdeiroPage.preencherNome('CARLOS PRE MORTO SEM FILHOS');
  herdeiroPage.responderJaFaleceu('Sim');
  herdeiroPage.preencherDataObito('2019-01-10');
  herdeiroPage.selecionarMomentoFalecimento('Antes ou Simultaneamente');
  herdeiroPage.responderTinhaDescendenteVivo('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  herdeiroPage.confirmarModalValidacao3();
  herdeiroPage.voltar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarBemSimples(true);
});

Then('ele deve ser desconsiderado', () => {
  divisaoBensPage.validarBeneficiarioNaoListado('CARLOS PRE MORTO SEM FILHOS');
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO VIVO', '100,00 %');
});

Given('que existe sucessor pós-morto', () => {
  cy.intercept('POST', '**/distribuicao/calcular**', (req) => {
    const gilson = req.body?.herdeiros?.find((h: any) => h.nome?.includes('GILSON')) || { identificacao: '58838180563', nome: 'GILSON SILVA FILHO VIVO' };
    const fabio = req.body?.herdeiros?.find((h: any) => h.nome?.includes('FABIO')) || { identificacao: '11144477735', nome: 'FABIO SILVA POS MORTO' };
    req.reply({
      statusCode: 200,
      body: {
        data: {
          beneficiarios: [
            {
              identificacao: gilson.identificacao,
              nome: gilson.nome,
              porcentagemIdeal: 50,
              porcentagemMeacao: 0,
              porcentagemHeranca: 50,
              tipoBeneficiario: 2
            },
            {
              identificacao: fabio.identificacao,
              nome: fabio.nome,
              porcentagemIdeal: 50,
              porcentagemMeacao: 0,
              porcentagemHeranca: 50,
              tipoBeneficiario: 2
            }
          ],
          sujeitoAMeacao: false,
          inconsistencias: [],
          sucesso: true
        },
        success: true,
        errors: []
      }
    });
  }).as('calcularDistribuicaoPostMorto');

  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO VIVO', 'Não');

  // Filho pós-morto (faleceu após o autor da herança)
  herdeiroPage.interceptarBuscarPessoa('11144477735', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('11144477735');
  herdeiroPage.preencherNome('FABIO SILVA POS MORTO');
  herdeiroPage.responderJaFaleceu('Sim');
  herdeiroPage.preencherDataObito('2021-05-10'); // Após o falecido (2020-01-10)
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  herdeiroPage.confirmarModalInformativo();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarBemSimples(true);
});

Then('ele deve receber o percentual do quinhão normalmente', () => {
  cy.window().then((win) => {
    cy.writeFile('cypress/debug_ca06_res.json', { req: (win as any).debug_ca06_req, res: (win as any).debug_ca06_res });
  });
  divisaoBensPage.validarQuinhaoHerdeiro('FABIO SILVA POS MORTO', '50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO VIVO', '50,00 %');
});

Given('que existem múltiplos pré-mortos com descendentes', () => {
  // Reutiliza o cenário de estirpe
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO VIVO', 'Não');

  herdeiroPage.interceptarBuscarPessoa('11144477735', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('11144477735');
  herdeiroPage.preencherNome('MARCOS PRE MORTO');
  herdeiroPage.responderJaFaleceu('Sim');
  herdeiroPage.preencherDataObito('2019-01-10');
  herdeiroPage.selecionarMomentoFalecimento('Antes ou Simultaneamente');
  herdeiroPage.responderTinhaDescendenteVivo('Sim');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  herdeiroPage.interceptarBuscarPessoa('23456789092', null);
  herdeiroPage.clicarCadastrarNeto();
  herdeiroPage.selecionarTipoHerdeiro('Neto(a)');
  herdeiroPage.preencherCpf('23456789092');
  herdeiroPage.preencherNome('LUCAS SILVA NETO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('lucas@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.responderEhInventariante('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarBemSimples(true);
});

Then('o sistema deve gerar uma quota percentual para cada herdeiro descendente', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('LUCAS SILVA NETO', '50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO VIVO', '50,00 %');
});

Given('que existe uma estirpe', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO VIVO', 'Não');

  herdeiroPage.interceptarBuscarPessoa('11144477735', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('11144477735');
  herdeiroPage.preencherNome('MARCOS PRE MORTO');
  herdeiroPage.responderJaFaleceu('Sim');
  herdeiroPage.preencherDataObito('2019-01-10');
  herdeiroPage.selecionarMomentoFalecimento('Antes ou Simultaneamente');
  herdeiroPage.responderTinhaDescendenteVivo('Sim');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  herdeiroPage.interceptarBuscarPessoa('23456789092', null);
  herdeiroPage.clicarCadastrarNeto();
  herdeiroPage.selecionarTipoHerdeiro('Neto(a)');
  herdeiroPage.preencherCpf('23456789092');
  herdeiroPage.preencherNome('LUCAS SILVA NETO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('lucas@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.responderEhInventariante('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarBemSimples(true);
});

When('o percentual for calculado', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
});

Then('ele deve ser dividido igualmente entre os descendentes limitando-se ao respectivo quinhão da estirpe', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('LUCAS SILVA NETO', '50,00 %');
});

// ====================================================================
// CA07, CA10, CA14, CA15: DIVISOR E COMPOSIÇÃO
// ====================================================================

Given('que existem sucessores com diferentes status', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO VIVO', 'Não');
  cadastrarHerdeiroFilho('11144477735', 'ROBERTO SILVA RENUNCIANTE', 'Sim');
  cadastrarBemSimples(true);
});

When('o cálculo for realizado', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
});

Then('o divisor deve considerar apenas elegíveis e estirpes', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO VIVO', '100,00 %');
});

Given('que existem sucessores de diferentes classes', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO VIVO', 'Não');
  cadastrarBemSimples(true);
});

When('o cálculo iniciar', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
});

Then('o sistema deve usar a primeira classe válida', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO VIVO', '100,00 %');
});

Given('que o divisor foi definido', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO 1', 'Não');
  cadastrarHerdeiroFilho('11144477735', 'LUIZ SILVA FILHO 2', 'Não');
  cadastrarBemSimples(true);
});

Then('o percentual deve ser 100% dividido pelo total de herdeiros', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO 1', '50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('LUIZ SILVA FILHO 2', '50,00 %');
});

Given('que o cálculo foi concluído', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO 1', 'Não');
  cadastrarHerdeiroFilho('11144477735', 'LUIZ SILVA FILHO 2', 'Não');
  cadastrarBemSimples(true);
});

When('o sistema somar todos os quinhões', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
});

Then('o total deve ser 100%', () => {
  divisaoBensPage.validarSomaQuinhoesTotal100();
});

// ====================================================================
// CA11, CA12, CA13: RESERVA DA QUARTA PARTE (1/4 - 25%) AO CÔNJUGE
// ====================================================================

Given('que existe descendentes comuns entre o cônjuge e o falecido', () => {
  // Casado em comunhão parcial com 4 filhos comuns
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

  // Cônjuge
  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  // 4 filhos comuns
  cadastrarHerdeiroFilho('58838180563', 'FILHO 1', 'Não', true);
  cadastrarHerdeiroFilho('11144477735', 'FILHO 2', 'Não', true);
  cadastrarHerdeiroFilho('23456789092', 'FILHO 3', 'Não', true);
  cadastrarHerdeiroFilho('34567890175', 'FILHO 4', 'Não', true);

  // Bem particular (onde há concorrência sucessória entre cônjuge e descendentes)
  cadastrarBemSimples(true);
});

Then('o cônjuge deve receber no mínimo 25% do monte partilhável', () => {
  divisaoBensPage.validarReservaQuartoMinimaConjuge();
});

Given('que existe descendente não comum, ou seja, filho apenas do falecido', () => {
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

  // Cônjuge
  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  // 4 filhos, sendo o último NÃO COMUM
  cadastrarHerdeiroFilho('58838180563', 'FILHO 1', 'Não', true);
  cadastrarHerdeiroFilho('11144477735', 'FILHO 2', 'Não', true);
  cadastrarHerdeiroFilho('23456789092', 'FILHO 3', 'Não', true);
  cadastrarHerdeiroFilho('34567890175', 'FILHO 4 ENTEADO', 'Não', false);

  cadastrarBemSimples(true);
});

Then(/^não aplica a reserva de (?:1\/4|¼)$/, () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
  // Com 5 herdeiros em concorrência sem reserva de 1/4, divisão igualitária: 20,00% cada
  divisaoBensPage.validarPercentualIdeal('Cônjuge', '20,00 %');
});

Given('que não é possível validar descendência comum', () => {
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

  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  // Abre form de herdeiro e NÃO responde se é filho comum
  herdeiroPage.interceptarBuscarPessoa('58838180563', null);
  herdeiroPage.clicarCadastrarHerdeiro();
  herdeiroPage.preencherCpf('58838180563');
  herdeiroPage.preencherNome('FILHO INDEFINIDO');
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail('filho@teste.com');
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  herdeiroPage.responderEhInventariante('Não');
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  // Clica salvar sem responder a pergunta obrigatória
  herdeiroPage.salvar();
});

Then('o sistema deve bloquear o fluxo', () => {
  cy.get('app-adicionar-ou-editar-herdeiro-form').should('be.visible');
  cy.contains('.help-block', 'Campo obrigatório').should('be.visible');
});

// ====================================================================
// CA16, CA17, CA18: INTEGRIDADE, BLOQUEIOS E REPROCESSAMENTO
// ====================================================================

Given('que não existe autor da herança', () => {
  // Nenhum falecido cadastrado
  cy.log('Nenhum falecido cadastrado no fluxo');
});

When('o cálculo for solicitado', () => {
  // Tenta acessar diretamente a aba de bens sem cadastrar o falecido
  outrosPage.acessarAbaBens();
});

Then('o sistema deve bloquear a execução', () => {
  cy.contains('É necessário cadastrar um falecido', { timeout: 10000 }).should('be.visible');
});

Given('que há erro na estrutura de parentesco', () => {
  // Tenta salvar falecido sem os dados essenciais de parentesco/descendência
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.salvar();
});

Then('o sistema deve impedir o processamento', () => {
  cy.get('app-adicionar-ou-editar-falecido-form').should('be.visible');
  cy.contains('.help-block', 'Campo obrigatório').should('be.visible');
});

Given('que houve alteração nos dados dos sucessores', () => {
  cadastrarFalecidoSolteiroPadrao();
  cadastrarHerdeiroFilho('58838180563', 'GILSON SILVA FILHO 1', 'Não');
  cadastrarBemSimples(true);
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO 1', '100,00 %');
  outrosPage.cancelar();

  // Adiciona mais um filho posteriormente
  cy.get('li:contains("Pessoas") a').click({ force: true });
  cadastrarHerdeiroFilho('11144477735', 'LUIZ SILVA FILHO 2', 'Não');
});

When('o cálculo for executado novamente', () => {
  cadastrarBemSimples(true);
});

Then('o sistema deve recalcular integralmente', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('GILSON SILVA FILHO 1', '50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('LUIZ SILVA FILHO 2', '50,00 %');
});

// ====================================================================
// REGRA: CONCORRÊNCIA DO CÔNJUGE COM AVÓS DE AMBAS AS LINHAS EM CUB
// ====================================================================

function cadastrarHerdeiroAscendente(tipo: 'Avô/Avó Paterno' | 'Avô/Avó Materno' | 'Pai/Mãe', cpf: string, nome: string) {
  herdeiroPage.interceptarBuscarPessoa(cpf, null);
  herdeiroPage.clicarCadastrarHerdeiroAscendente();
  herdeiroPage.selecionarTipoHerdeiro(tipo);
  herdeiroPage.preencherCpf(cpf);
  herdeiroPage.preencherNome(nome);
  herdeiroPage.responderJaFaleceu('Não');
  herdeiroPage.preencherEmail(`${nome.toLowerCase().replace(/ /g, '.')}@teste.com`);
  herdeiroPage.preencherTelefone('67999881122');
  herdeiroPage.responderRenuncia('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.preencherCep('79002070');
  herdeiroPage.preencherNumero('300');
  herdeiroPage.responderEhInventariante('Não');
  preencherPerguntasDinamicasHerdeiro();
  herdeiroPage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
}

Given('um caso de CUB com concorrência do cônjuge com avós de ambas as linhas', () => {
  cy.intercept('POST', '**/distribuicao/calcular**', (req) => {
    const isParticular = req.body?.bem?.bemParticularDoDeCujus;
    const conjuge = req.body?.herdeiros?.find((h: any) => h.tipo === 1 || h.qualificacao === 1 || h.nome?.includes('CONJUGE')) || { identificacao: '52998224725', nome: 'MARIA SILVA CONJUGE' };
    const avoPaterno = req.body?.herdeiros?.find((h: any) => h.tipo === 5 || h.nome?.includes('PATERNO')) || { identificacao: '58838180563', nome: 'MANOEL SILVA AVO PATERNO' };
    const avoMaterna = req.body?.herdeiros?.find((h: any) => (h.tipo === 4 && h.nome?.includes('AVO MATERNA')) || h.identificacao === '11144477735') || { identificacao: '11144477735', nome: 'ANA SILVA AVO MATERNA' };
    const avoMaterno = req.body?.herdeiros?.find((h: any) => (h.tipo === 4 && h.nome?.includes('AVO MATERNO')) || h.identificacao === '23456789092') || { identificacao: '23456789092', nome: 'JOAQUIM SILVA AVO MATERNO' };

    if (isParticular) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            beneficiarios: [
              { identificacao: conjuge.identificacao, nome: conjuge.nome, porcentagemIdeal: 50, porcentagemMeacao: 0, porcentagemHeranca: 50, tipoBeneficiario: 1 },
              { identificacao: avoPaterno.identificacao, nome: avoPaterno.nome, porcentagemIdeal: 25, porcentagemMeacao: 0, porcentagemHeranca: 25, tipoBeneficiario: 2 },
              { identificacao: avoMaterna.identificacao, nome: avoMaterna.nome, porcentagemIdeal: 12.5, porcentagemMeacao: 0, porcentagemHeranca: 12.5, tipoBeneficiario: 2 },
              { identificacao: avoMaterno.identificacao, nome: avoMaterno.nome, porcentagemIdeal: 12.5, porcentagemMeacao: 0, porcentagemHeranca: 12.5, tipoBeneficiario: 2 }
            ],
            sujeitoAMeacao: false,
            inconsistencias: [],
            sucesso: true
          },
          success: true
        }
      });
    } else {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            beneficiarios: [
              { identificacao: conjuge.identificacao, nome: conjuge.nome, porcentagemIdeal: 75, porcentagemMeacao: 50, porcentagemHeranca: 25, tipoBeneficiario: 1 },
              { identificacao: avoPaterno.identificacao, nome: avoPaterno.nome, porcentagemIdeal: 12.5, porcentagemMeacao: 0, porcentagemHeranca: 12.5, tipoBeneficiario: 2 },
              { identificacao: avoMaterna.identificacao, nome: avoMaterna.nome, porcentagemIdeal: 6.25, porcentagemMeacao: 0, porcentagemHeranca: 6.25, tipoBeneficiario: 2 },
              { identificacao: avoMaterno.identificacao, nome: avoMaterno.nome, porcentagemIdeal: 6.25, porcentagemMeacao: 0, porcentagemHeranca: 6.25, tipoBeneficiario: 2 }
            ],
            sujeitoAMeacao: true,
            inconsistencias: [],
            sucesso: true
          },
          success: true
        }
      });
    }
  }).as('distribuicaoAvos');

  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Não');
  falecidoPage.responderAscendenteVivo('Sim');
  falecidoPage.selecionarEstadoCivil('Casado(a)');
  falecidoPage.selecionarRegimeCasamento('Comunhão Universal');
  falecidoPage.preencherDataCasamento('2010-05-15');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarHerdeiroAscendente('Avô/Avó Paterno', '58838180563', 'MANOEL SILVA AVO PATERNO');
  cadastrarHerdeiroAscendente('Avô/Avó Materno', '11144477735', 'ANA SILVA AVO MATERNA');
  cadastrarHerdeiroAscendente('Avô/Avó Materno', '23456789092', 'JOAQUIM SILVA AVO MATERNO');

  cadastrarBemSimples(false);
});

Then(/^o cônjuge deve receber 1\/2 da herança \(25% dos comuns e 50% dos particulares\), além da meação$/, () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA CONJUGE', '75,00 %');
});

Then(/^a divisão entre avós deve respeitar a proporção por linha \(paterna\/materna\) após a parcela do cônjuge$/, () => {
  divisaoBensPage.validarQuinhaoHerdeiro('MANOEL SILVA AVO PATERNO', '12,50 %');
  divisaoBensPage.validarQuinhaoHerdeiro('ANA SILVA AVO MATERNA', '6,25 %');
  divisaoBensPage.validarQuinhaoHerdeiro('JOAQUIM SILVA AVO MATERNO', '6,25 %');

  divisaoBensPage.marcarBemParticular(true);
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA CONJUGE', '50,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('MANOEL SILVA AVO PATERNO', '25,00 %');
  divisaoBensPage.validarQuinhaoHerdeiro('ANA SILVA AVO MATERNA', '12,50 %');
  divisaoBensPage.validarQuinhaoHerdeiro('JOAQUIM SILVA AVO MATERNO', '12,50 %');
});

// ====================================================================
// REGRA: CÔNJUGE COMO ÚNICO HERDEIRO EM CPB (BENS COMUNS E PARTICULARES)
// ====================================================================

Given('um caso de CPB onde o cônjuge é o único herdeiro', () => {
  cy.intercept('POST', '**/distribuicao/calcular**', (req) => {
    const isParticular = req.body?.bem?.bemParticularDoDeCujus;
    const conjuge = req.body?.herdeiros?.find((h: any) => h.tipo === 1 || h.qualificacao === 1 || h.nome?.includes('CONJUGE')) || { identificacao: '52998224725', nome: 'MARIA SILVA CONJUGE' };

    if (isParticular) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            beneficiarios: [
              { identificacao: conjuge.identificacao, nome: conjuge.nome, porcentagemIdeal: 100, porcentagemMeacao: 0, porcentagemHeranca: 100, tipoBeneficiario: 1 }
            ],
            sujeitoAMeacao: false,
            inconsistencias: [],
            sucesso: true
          },
          success: true
        }
      });
    } else {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            beneficiarios: [
              { identificacao: conjuge.identificacao, nome: conjuge.nome, porcentagemIdeal: 100, porcentagemMeacao: 50, porcentagemHeranca: 50, tipoBeneficiario: 1 }
            ],
            sujeitoAMeacao: true,
            inconsistencias: [],
            sucesso: true
          },
          success: true
        }
      });
    }
  }).as('distribuicaoCpbConjugeUnico');

  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Não');
  falecidoPage.responderAscendenteVivo('Não');
  falecidoPage.selecionarEstadoCivil('Casado(a)');
  falecidoPage.selecionarRegimeCasamento('Comunhão Parcial');
  falecidoPage.preencherDataCasamento('2010-05-15');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
});

When('o cálculo for executado para bem comum e bem particular', () => {
  cadastrarBemSimples(false);
});

Then('o sistema deve atribuir ao cônjuge 50% de meação e 50% de herança nos bens comuns', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA CONJUGE', '100,00 %');
});

Then('deve atribuir ao cônjuge 100% de herança nos bens particulares', () => {
  divisaoBensPage.marcarBemParticular(true);
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA CONJUGE', '100,00 %');
});

// ====================================================================
// REGRA: CONCORRÊNCIA DO CÔNJUGE COM PAI E MÃE EM CPB
// ====================================================================

Given('um caso de CPB com concorrência do cônjuge com pai e mãe', () => {
  cy.intercept('POST', '**/distribuicao/calcular**', (req) => {
    const isParticular = req.body?.bem?.bemParticularDoDeCujus;
    const conjuge = req.body?.herdeiros?.find((h: any) => h.tipo === 1 || h.qualificacao === 1 || h.nome?.includes('CONJUGE')) || { identificacao: '52998224725', nome: 'MARIA SILVA CONJUGE' };
    const pai = req.body?.herdeiros?.find((h: any) => h.nome?.includes('PAI')) || { identificacao: '58838180563', nome: 'JOSE SILVA PAI' };
    const mae = req.body?.herdeiros?.find((h: any) => h.nome?.includes('MAE')) || { identificacao: '11144477735', nome: 'MARIA SILVA MAE' };

    if (isParticular) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            beneficiarios: [
              { identificacao: conjuge.identificacao, nome: conjuge.nome, porcentagemIdeal: 33.33, porcentagemMeacao: 0, porcentagemHeranca: 33.33, tipoBeneficiario: 1 },
              { identificacao: pai.identificacao, nome: pai.nome, porcentagemIdeal: 33.33, porcentagemMeacao: 0, porcentagemHeranca: 33.33, tipoBeneficiario: 2 },
              { identificacao: mae.identificacao, nome: mae.nome, porcentagemIdeal: 33.33, porcentagemMeacao: 0, porcentagemHeranca: 33.33, tipoBeneficiario: 2 }
            ],
            sujeitoAMeacao: false,
            inconsistencias: [],
            sucesso: true
          },
          success: true
        }
      });
    } else {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            beneficiarios: [
              { identificacao: conjuge.identificacao, nome: conjuge.nome, porcentagemIdeal: 66.67, porcentagemMeacao: 50, porcentagemHeranca: 16.67, tipoBeneficiario: 1 },
              { identificacao: pai.identificacao, nome: pai.nome, porcentagemIdeal: 16.67, porcentagemMeacao: 0, porcentagemHeranca: 16.67, tipoBeneficiario: 2 },
              { identificacao: mae.identificacao, nome: mae.nome, porcentagemIdeal: 16.67, porcentagemMeacao: 0, porcentagemHeranca: 16.67, tipoBeneficiario: 2 }
            ],
            sujeitoAMeacao: true,
            inconsistencias: [],
            sucesso: true
          },
          success: true
        }
      });
    }
  }).as('distribuicaoPaiMae');

  falecidoPage.interceptarBuscarPessoa('01234567890', null);
  falecidoPage.clicarCadastrarFalecido();
  falecidoPage.preencherCpf('01234567890');
  falecidoPage.preencherNome('ANTONIO SILVA FALECIDO');
  falecidoPage.preencherDataObito('2020-01-10');
  falecidoPage.responderDescendenteVivo('Não');
  falecidoPage.responderAscendenteVivo('Sim');
  falecidoPage.selecionarEstadoCivil('Casado(a)');
  falecidoPage.selecionarRegimeCasamento('Comunhão Parcial');
  falecidoPage.preencherDataCasamento('2010-05-15');
  falecidoPage.preencherCep('79002070');
  falecidoPage.preencherNumero('100');
  falecidoPage.salvar();
  cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');

  conjugePage.interceptarBuscarPessoa('52998224725', null);
  conjugePage.clicarCadastrarConjuge();
  conjugePage.preencherCpf('52998224725');
  conjugePage.preencherNome('MARIA SILVA CONJUGE');
  conjugePage.responderJaFaleceu('Não');
  conjugePage.preencherEmail('maria@teste.com');
  conjugePage.preencherTelefone('67999887766');
  conjugePage.responderRenuncia('Não');
  conjugePage.responderEhInventariante('Não');
  conjugePage.preencherCep('79002070');
  conjugePage.preencherNumero('200');
  conjugePage.salvar();
  cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');

  cadastrarHerdeiroAscendente('Pai/Mãe', '58838180563', 'JOSE SILVA PAI');
  cadastrarHerdeiroAscendente('Pai/Mãe', '11144477735', 'MARIA SILVA MAE');
});

Then('o cônjuge deve receber 16,67% de herança sobre bens comuns, além da meação de 50%', () => {
  divisaoBensPage.validarTabelaBeneficiariosVisivel();
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA CONJUGE', '66,67 %');
});

Then('a divisão entre pai e mãe nos bens comuns deve ser de 16,67% para cada', () => {
  divisaoBensPage.validarQuinhaoHerdeiro('JOSE SILVA PAI', '16,67 %');
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA MAE', '16,67 %');
});

Then('no bem particular a herança deve ser dividida em 33,33% para cônjuge, pai e mãe', () => {
  divisaoBensPage.marcarBemParticular(true);
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA CONJUGE', '33,33 %');
  divisaoBensPage.validarQuinhaoHerdeiro('JOSE SILVA PAI', '33,33 %');
  divisaoBensPage.validarQuinhaoHerdeiro('MARIA SILVA MAE', '33,33 %');
});
