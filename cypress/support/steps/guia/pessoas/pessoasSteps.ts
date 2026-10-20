// cypress/support/steps/guia/pessoas/pessoasSteps.ts
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { pessoasPage } from '../../../pageobjects/guia/pessoas/pessoasPage';

When('acesso a aba "Pessoas"', () => {
  pessoasPage.acessarAbaPessoas();
});

When('preencho o CEP {string}', (cep: string) => {
  pessoasPage.preencherCep(cep);
});

When('preencho o endereço {string}', (endereco: string) => {
  pessoasPage.preencherEndereco(endereco);
});

When('preencho o bairro {string}', (bairro: string) => {
  pessoasPage.preencherBairro(bairro);
});

When('preencho o número {string}', (numero: string) => {
  pessoasPage.preencherNumero(numero);
});

When('preencho o complemento {string}', (complemento: string) => {
  pessoasPage.preencherComplemento(complemento);
});

When('seleciono a UF {string}', (uf: string) => {
  pessoasPage.selecionarUf(uf);
});

When('seleciono o município {string}', (municipio: string) => {
  pessoasPage.selecionarMunicipio(municipio);
});
