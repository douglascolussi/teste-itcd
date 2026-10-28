// cypress/support/pageobjects/guia/bens/divisaoBensPage.ts
import { divisaoBensElements as el } from '../../../elements/guia/bens/divisaoBensElements';

export class DivisaoBensPage {
  validarTabelaBeneficiariosVisivel() {
    cy.get(el.tabelaBeneficiarios, { timeout: 15000 }).should('be.visible');
  }

  garantirBemComum() {
    cy.get('body').then(($body) => {
      if ($body.find(el.checkboxBemParticular).length > 0) {
        cy.get(el.checkboxBemParticular).then(($chk) => {
          if ($chk.is(':checked')) {
            cy.wrap($chk).uncheck({ force: true });
          }
        });
      }
    });
  }

  marcarBemParticular(marcar: boolean) {
    if (marcar) {
      cy.get(el.checkboxBemParticular).check({ force: true });
    } else {
      cy.get(el.checkboxBemParticular).uncheck({ force: true });
    }
  }

  validarPercentualIdeal(identificadorOuTipo: string, percentualEsperado: string) {
    cy.get(el.linhaBeneficiario(identificadorOuTipo), { timeout: 15000 })
      .should('be.visible')
      .find('td')
      .eq(1)
      .should('contain', percentualEsperado);
  }

  validarPercentualDeclarado(identificadorOuTipo: string, percentualEsperado: string) {
    cy.get(el.linhaBeneficiario(identificadorOuTipo), { timeout: 15000 })
      .should('be.visible')
      .find('td')
      .eq(2)
      .then(($td) => {
        const input = $td.find('input');
        if (input.length > 0) {
          cy.wrap(input).should('have.value', percentualEsperado);
        } else {
          cy.wrap($td).should('contain', percentualEsperado);
        }
      });
  }

  validarDireitoMeacaoConjuge(percentualEsperado: string = '50,00 %') {
    this.validarTabelaBeneficiariosVisivel();
    // O cônjuge meeiro deve receber 50% como direito de meação nos bens comuns
    cy.get(el.linhasBeneficiarios, { timeout: 15000 })
      .filter(':contains("Cônjuge"), :contains("CONJUGE")')
      .first()
      .within(() => {
        cy.get('td').eq(1).should('contain', percentualEsperado);
        cy.get('td').eq(2).then(($td) => {
          const input = $td.find('input');
          if (input.length > 0) {
            cy.wrap(input).should('have.value', percentualEsperado);
          } else {
            cy.wrap($td).should('contain', percentualEsperado);
          }
        });
      });
  }

  validarQuinhaoHerdeiro(nomeOuTipo: string, percentualEsperado: string = '50,00 %') {
    this.validarTabelaBeneficiariosVisivel();
    cy.get(el.linhasBeneficiarios, { timeout: 15000 })
      .filter(`:contains("${nomeOuTipo}")`)
      .first()
      .within(() => {
        cy.get('td').eq(1).should('contain', percentualEsperado);
        cy.get('td').eq(2).then(($td) => {
          const input = $td.find('input');
          if (input.length > 0) {
            cy.wrap(input).should('have.value', percentualEsperado);
          } else {
            cy.wrap($td).should('contain', percentualEsperado);
          }
        });
      });
  }

  preencherPercentualDeclarado(identificadorOuTipo: string, percentual: string) {
    cy.get(el.linhaBeneficiario(identificadorOuTipo))
      .find('td')
      .eq(2)
      .find('input')
      .should('be.visible')
      .clear()
      .type(percentual)
      .blur();
  }

  limparCampos() {
    cy.get(el.btnLimparCampos, { timeout: 10000 }).should('be.visible').click();
  }

  validarMensagemErroDistribuicao(mensagem: string) {
    cy.get(el.msgErroDistribuicao, { timeout: 10000 })
      .should('be.visible')
      .and('contain', mensagem);
  }

  validarAusenciaDeMeeiro() {
    this.validarTabelaBeneficiariosVisivel();
    cy.get(el.linhasBeneficiarios)
      .should('not.contain', 'Cônjuge')
      .and('not.contain', 'Meeiro');
  }

  validarQuinhaoExclusivoHerdeiro(percentualEsperado: string = '100,00 %') {
    this.validarTabelaBeneficiariosVisivel();
    cy.get(el.linhasBeneficiarios, { timeout: 15000 })
      .filter(':contains("Filho(a)"), :contains("Herdeiro")')
      .first()
      .within(() => {
        cy.get('td').eq(1).should('contain', percentualEsperado);
        cy.get('td').eq(2).then(($td) => {
          const input = $td.find('input');
          if (input.length > 0) {
            cy.wrap(input).should('have.value', percentualEsperado);
          } else {
            cy.wrap($td).should('contain', percentualEsperado);
          }
        });
      });
  }

  validarAjusteTitularidadeVpc(percentualEsperado: string) {
    const valorLimpo = percentualEsperado.replace('%', '').trim();
    cy.get(el.inputPercentualPropriedadeDeCujus, { timeout: 10000 })
      .should('be.visible')
      .and('have.value', valorLimpo);
  }

  validarPartilhaIntegralBensParticulares() {
    this.validarTabelaBeneficiariosVisivel();
    // Nos bens particulares, a meação é excluída (0%) e 100% do bem é transmitido como herança
    // rateado entre os herdeiros concorrentes (50% cônjuge + 50% filho)
    cy.get(el.linhasBeneficiarios, { timeout: 15000 })
      .filter(':contains("Cônjuge")')
      .first()
      .find('td')
      .eq(1)
      .should('contain', '50,00 %');

    cy.get(el.linhasBeneficiarios, { timeout: 15000 })
      .filter(':contains("Filho(a)")')
      .first()
      .find('td')
      .eq(1)
      .should('contain', '50,00 %');
  }

  editarBemNaLista(index: number = 0) {
    cy.get('table.table-striped tbody', { timeout: 15000 })
      .should('not.contain', 'Nenhum bem informado');
    cy.get('table.table-striped tbody a[title="Editar Bem"]', { timeout: 15000 })
      .eq(index)
      .click({ force: true });
    this.validarTabelaBeneficiariosVisivel();
  }

  validarBeneficiarioNaoListado(identificadorOuNome: string) {
    this.validarTabelaBeneficiariosVisivel();
    cy.get(el.tabelaBeneficiarios)
      .should('not.contain', identificadorOuNome);
  }

  validarSomaQuinhoesTotal100() {
    this.validarTabelaBeneficiariosVisivel();
    cy.get(el.tabelaBeneficiarios, { timeout: 15000 })
      .should('not.contain', 'Nenhum beneficiário foi adicionado');
    let somaTotal = 0;
    cy.get(el.linhasBeneficiarios, { timeout: 15000 })
      .should('have.length.greaterThan', 0)
      .each(($tr) => {
        const texto = $tr.find('td').eq(1).text().trim();
        const valorNumerico = parseFloat(texto.replace('%', '').replace(',', '.').trim());
        if (!isNaN(valorNumerico)) {
          somaTotal += valorNumerico;
        }
      }).then(() => {
        // Arredonda para 2 casas decimais e valida proximidade de 100%
        expect(Math.round(somaTotal)).to.equal(100);
      });
  }

  validarReservaQuartoMinimaConjuge() {
    this.validarTabelaBeneficiariosVisivel();
    cy.get(el.tabelaBeneficiarios, { timeout: 15000 })
      .should('not.contain', 'Nenhum beneficiário foi adicionado');
    cy.get(el.linhasBeneficiarios, { timeout: 15000 })
      .filter(':contains("Cônjuge")')
      .first()
      .find('td')
      .eq(1)
      .then(($td) => {
        const texto = $td.text().trim();
        const valorNumerico = parseFloat(texto.replace('%', '').replace(',', '.').trim());
        expect(valorNumerico).to.be.at.least(25.0);
      });
  }
}

export const divisaoBensPage = new DivisaoBensPage();
