// cypress/support/steps/dadosGeraisSteps.ts
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { dadosGeraisPage } from '../pageobjects/base/dadosGeraisPage';
import { declarantePage } from '../pageobjects/base/declarantePage';
import { dadosGeraisElements as elDados } from '../elements/dadosGeraisElements';

Given('que venha preenchido todos os dados do declarante pela api', () => {
    declarantePage.preencherTodosOsDados();
});

When('tento avançar para o próximo passo sem preencher os dados gerais', () => {
    declarantePage.avancarParaDadosGerais();
});

Then('devo visualizar mensagens de {string} para Natureza, Tipo, Processo e Data', (msg: string) => {
    cy.contains('Natureza da Operação').parents('.form-group').should('contain', msg);
    cy.contains('Tipo de Operação').parents('.form-group').should('contain', msg);
    cy.contains('Número de Processo').parents('.form-group').should('contain', msg);
    cy.contains('Data de Protocolo').parents('.form-group').should('contain', msg);
});

Then('devo visualizar o campo {string} como obrigatório', (label: string) => {
    cy.contains('label', label).parent().find('span.required').should('be.visible');
});

Then('devo visualizar a mensagem {string} para o campo {string}', (msg: string, campo: string) => {
    cy.contains('label', campo, { timeout: 10000 }).parent().find('.help-block').should('contain', msg);
});

Then('devo visualizar a mensagem {string} para os campos {string}', (msg: string, camposLista: string) => {
    const campos = camposLista.split(/, | e /);
    campos.forEach(campo => {
        cy.contains('label', campo, { timeout: 10000 }).parent().find('.help-block').should('contain', msg);
    });
});

Then('devo visualizar os campos {string} e {string} como obrigatórios', (l1: string, l2: string) => {
    cy.contains('label', l1).find('span.required', { timeout: 10000 }).should('be.visible');
    cy.contains('label', l2).find('span.required', { timeout: 10000 }).should('be.visible');
});

When('ao responder {string} para {string}', (resposta: string, pergunta: string) => {
    dadosGeraisPage.responderSimOuNao(pergunta, resposta as any);
    cy.wait(500); // Aguarda renderização condicional do Angular
});

When('respondo {string} para {string}', (resposta: string, pergunta: string) => {
    dadosGeraisPage.responderSimOuNao(pergunta, resposta as any);
    cy.wait(500); // Aguarda renderização condicional do Angular
});

Then('o campo {string} deve estar {string}', (label: string, estado: string) => {
    if (estado === 'visível') {
        cy.contains('label', label).should('be.visible');
    } else {
        cy.contains('label', label).should('not.exist');
    }
});

Then('o campo {string} deve ficar visível e obrigatório', (label: string) => {
    cy.contains('label', label).should('be.visible');
    cy.contains('label', label).parent().find('span.required').should('be.visible');
});

When('ao preencher uma data futura o sistema deve exibir erro {string}', (msg: string) => {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const dia = String(amanha.getDate()).padStart(2, '0');
    const mes = String(amanha.getMonth() + 1).padStart(2, '0');
    const ano = amanha.getFullYear();
    const dataStr = `${ano}-${mes}-${dia}`;
    dadosGeraisPage.preencherDataDoacao(dataStr);
    cy.contains(msg).should('be.visible');
});

When('seleciono a natureza {string}', (natureza: string) => {
    dadosGeraisPage.selecionarNatureza(natureza as any);
});

When('seleciono o tipo {string}', (tipo: string) => {
    dadosGeraisPage.selecionarTipoOperacao(tipo);
});

When('altero a natureza para {string}', (natureza: string) => {
    dadosGeraisPage.selecionarNatureza(natureza as any);
});

Then('o campo {string} deve ser resetado e exibir opções de Doação', (campo: string) => {
    dadosGeraisPage.validarCampoResetado();
    dadosGeraisPage.validarOpcoesTipo('Doação');
});

When('preencho o número do processo {string}', (processo: string) => {
    dadosGeraisPage.preencherProcesso(processo);
});

When('preencho a data de protocolo {string}', (data: string) => {
    dadosGeraisPage.preencherDataProtocolo(data);
});

When('clico em avançar', () => {
    dadosGeraisPage.avancar();
});

Then('devo ser redirecionado para o passo de {string}', (passo: string) => {
    cy.get('.step-title').should('contain', passo);
});
