// cypress/support/pageobjects/guia/pessoas/pessoasPage.ts
import { pessoasElements as el } from '../../../elements/guia/pessoas/pessoasElements';
import { doadorElements } from '../../../elements/guia/pessoas/doadorElements';
import { donatarioElements } from '../../../elements/guia/pessoas/donatarioElements';
import { separandoElements } from '../../../elements/guia/pessoas/separandoElements';
import { separandaElements } from '../../../elements/guia/pessoas/separandaElements';
import { falecidoElements } from '../../../elements/guia/pessoas/falecidoElements';
import { herdeiroElements } from '../../../elements/guia/pessoas/herdeiroElements';
import { advogadoElements } from '../../../elements/guia/pessoas/advogadoElements';
import { inventarianteElements } from '../../../elements/guia/pessoas/inventarianteElements';

export class PessoasPage {
  acessarAbaPessoas() {
    cy.get(el.stepPessoas, { timeout: 15000 }).should('be.visible').click();
  }

  preencherNome(nome: string) {
    cy.get(el.inputNome).then($input => {
      if (!$input.is(':disabled')) {
        cy.wrap($input).clear().type(nome).trigger('change');
      }
    });
  }

  preencherCep(cep: string) {
    cy.get(el.inputCep).should('be.visible').clear().type(cep).trigger('input').trigger('change').trigger('blur');
    cy.wait(1000);
    cy.get(el.loaderBlock, { timeout: 10000 }).should('not.exist');

    // Assegura que UF e Município fiquem devidamente preenchidos caso o retorno do endereço os deixe vazios/bloqueados
    cy.get(el.selectUf).then(($uf) => {
      const ufVal = $uf.val();
      const ufText = $uf.find('option:selected').text();
      if (!ufVal || ufVal === 'null' || ufText.includes('Selecione')) {
        cy.wrap($uf).invoke('prop', 'disabled', false);
        cy.wrap($uf).select('MS', { force: true }).trigger('change');
      }
      cy.wrap($uf).find('option:selected').invoke('attr', 'selected', 'selected');
    });

    cy.get(el.selectMunicipio).then(($mun) => {
      const munVal = $mun.val();
      const munText = $mun.find('option:selected').text();
      if (!munVal || munVal === 'null' || munText.includes('Selecione')) {
        cy.wrap($mun).invoke('prop', 'disabled', false);
        cy.wrap($mun).find('option').then(($opts) => {
          const matchOpt = $opts.filter((_, o) => (o.text || '').toLowerCase().includes('campo grande')).first();
          if (matchOpt.length > 0) {
            cy.wrap($mun).select(matchOpt.val() as string, { force: true }).trigger('change');
          } else {
            cy.wrap($mun).select('Campo Grande', { force: true }).trigger('change');
          }
        });
      }
      cy.wrap($mun).find('option:selected').invoke('attr', 'selected', 'selected');
    });
  }

  preencherEndereco(endereco: string) {
    cy.get(el.inputEndereco).then($input => {
      if (!$input.is(':disabled') && !$input.val()) {
        cy.wrap($input).clear({ force: true }).type(endereco, { force: true }).trigger('change');
      }
    });
  }

  preencherBairro(bairro: string) {
    cy.get(el.inputBairro).then($input => {
      if (!$input.is(':disabled') && !$input.val()) {
        cy.wrap($input).clear({ force: true }).type(bairro, { force: true }).trigger('change');
      }
    });
  }

  preencherNumero(numero: string) {
    cy.get(el.inputNumero).should('be.visible').clear().type(numero).trigger('change');
  }

  preencherComplemento(complemento: string) {
    cy.get(el.inputComplemento).should('be.visible').clear().type(complemento).trigger('change');
  }

  selecionarUf(uf: string) {
    cy.get(el.selectUf).then($select => {
      const val = $select.val();
      const text = $select.find('option:selected').text();
      if (!val || val === 'null' || text.includes('Selecione')) {
        cy.wrap($select).invoke('prop', 'disabled', false);
        cy.wrap($select).select(uf, { force: true }).trigger('change');
      }
    });
  }

  selecionarMunicipio(municipio: string) {
    cy.get(el.selectMunicipio).then($select => {
      const val = $select.val();
      const text = $select.find('option:selected').text();
      if (!val || val === 'null' || text.includes('Selecione')) {
        cy.wrap($select).invoke('prop', 'disabled', false);
        cy.wrap($select).find('option').then(($opts) => {
          const matchOpt = $opts.filter((_, o) => (o.text || '').toLowerCase().includes(municipio.toLowerCase())).first();
          if (matchOpt.length > 0) {
            cy.wrap($select).select(matchOpt.val() as string, { force: true }).trigger('change');
          } else {
            cy.wrap($select).select(municipio, { force: true }).trigger('change');
          }
        });
      }
    });
  }

  validarMensagemErroCampo(label: string, msg: string) {
    cy.contains('label', label, { timeout: 10000 })
      .parents('.form-group')
      .first()
      .find('.help-block')
      .should('contain', msg);
  }

  validarMensagemErroCampos(camposLista: string, msg: string) {
    const campos = camposLista.split(/, | e /);
    campos.forEach(campo => {
      this.validarMensagemErroCampo(campo.trim(), msg);
    });
  }

  validarCampoVisivel(label: string, visivel: boolean) {
    if (visivel) {
      cy.contains('label', label, { timeout: 10000 }).should('be.visible');
    } else {
      cy.contains('label', label).should('not.exist');
    }
  }

  interceptarBuscarPessoa(cpf: string, data: any = null) {
    const response = data ? data : { body: null };
    cy.intercept('GET', `**/pessoa/get_pessoa?cpfcnpj=${cpf.replace(/\D/g, '')}`, response).as('getPessoa');
  }

  interceptarBuscarCep(cep: string, data: any = null) {
    const response = data ? data : { body: null };
    cy.intercept('GET', `**/endereco/Get_Endereco?cep=${cep.replace(/\D/g, '')}*`, response).as('getCep');
  }

  /**
   * Realiza o cadastro do Advogado padrão se ainda não estiver presente na tela
   */
  cadastrarAdvogadoPadrao() {
    cy.get('body').then(($root) => {
      const temAdvogado = $root.find(advogadoElements.cardAdvogadoCadastrado).length > 0 ||
                          $root.find('.card:contains("DRA JULIA")').length > 0 ||
                          $root.find('.card:contains("ADVOGADA")').length > 0;
      if (!temAdvogado) {
        cy.get(advogadoElements.cardCadastrarAdvogado, { timeout: 15000 }).scrollIntoView().first().click({ force: true });
        cy.get(advogadoElements.inputNome).should('be.visible').clear().type('DRA JULIA ADVOGADA').blur();
        cy.get(advogadoElements.inputNumeroOAB).should('be.visible').clear().type('12345').blur();
        cy.get(advogadoElements.selectUfOAB).find('option').filter((_, elOpt) => (elOpt.textContent || '').includes('MS')).first().then(($o) => {
          cy.get(advogadoElements.selectUfOAB).select($o.val() as string);
        });
        cy.get(advogadoElements.inputEmail).should('be.visible').clear().type('julia.adv@teste.com').blur();
        cy.get(advogadoElements.inputTelefone).should('be.visible').clear().type('67999887766').blur();
        cy.get(advogadoElements.btnSalvar).scrollIntoView().click({ force: true });
        cy.get('app-adicionar-ou-editar-advogado-form', { timeout: 15000 }).should('not.exist');
      }
    });
  }

  /**
   * Realiza o cadastro do Inventariante padrão se aplicável e ainda não presente na tela
   */
  cadastrarInventariantePadrao() {
    cy.get('body').then(($root) => {
      const temInventariante = $root.find(inventarianteElements.cardInventarianteCadastrado).length > 0 ||
                               $root.find('.card:contains("CARLOS INVENTARIANTE")').length > 0;
      if (!temInventariante && $root.find(inventarianteElements.cardCadastrarInventariante).length > 0) {
        this.interceptarBuscarPessoa('55552058488', null);
        cy.get(inventarianteElements.cardCadastrarInventariante, { timeout: 15000 }).first().click({ force: true });
        cy.get(inventarianteElements.inputCpf).should('be.visible').clear().type('55552058488').blur();
        cy.wait(500);
        cy.get('.loader-block', { timeout: 10000 }).should('not.exist');
        cy.get('input[formControlName="nome"]').should('be.visible').clear().type('CARLOS INVENTARIANTE').blur();
        cy.get(inventarianteElements.inputEmail).should('be.visible').clear().type('carlos.inventariante@teste.com').blur();
        cy.get(inventarianteElements.inputTelefone).should('be.visible').clear().type('67999887766').blur();
        cy.get(inventarianteElements.inputTermoInventariante).selectFile(
          {
            contents: Cypress.Buffer.from('Conteúdo simulado do termo de inventariante para testes automatizados.'),
            fileName: 'termo_inventariante.pdf',
            mimeType: 'application/pdf',
          },
          { force: true }
        );
        this.preencherCep('79002010');
        this.preencherNumero('120');
        cy.get(inventarianteElements.btnSalvar).scrollIntoView().click({ force: true });
        cy.get('app-adicionar-ou-editar-inventariante-form', { timeout: 15000 }).should('not.exist');
      }
    });
  }

  /**
   * Preenche o rol completo de pessoas necessárias para a natureza/tipo de guia
   */
  cadastrarPessoasCompletasPorNatureza(natureza: string, tipo: string) {
    this.acessarAbaPessoas();

    if (natureza === 'Causa Mortis') {
      // 1. Falecido
      this.interceptarBuscarPessoa('01234567890', null);
      cy.get('body').then(($root) => {
        if ($root.find(falecidoElements.cardFalecidoCadastrado).length === 0 && $root.find('.card:contains("ANTONIO")').length === 0) {
          cy.get(falecidoElements.cardCadastrarFalecido).first().click({ force: true });
          cy.get(falecidoElements.inputCpf).should('be.visible').clear().type('01234567890').blur();
          cy.get('input[formControlName="nome"]').should('be.visible').clear().type('ANTONIO DA SILVA FALECIDO').blur();
          cy.get(falecidoElements.inputDataDeObito).should('be.visible').clear().type('2020-01-10').blur();
          cy.get(falecidoElements.containerDescendentes).find('label:contains("Sim") input').click({ force: true });
          cy.get(falecidoElements.selectEstadoCivil).select('Solteiro(a)');
          this.preencherCep('79002070');
          this.preencherNumero('100');
          cy.get(falecidoElements.btnSalvar).scrollIntoView().click({ force: true });
          cy.get('app-adicionar-ou-editar-falecido-form', { timeout: 15000 }).should('not.exist');
        }
      });

      // 2. Herdeiro
      this.interceptarBuscarPessoa('58838180563', null);
      cy.get('body').then(($root) => {
        if ($root.find(herdeiroElements.cardHerdeiroCadastrado).length === 0 && $root.find('.card:contains("GILSON")').length === 0) {
          cy.get(herdeiroElements.cardCadastrarHerdeiro).first().click({ force: true });
          cy.get(herdeiroElements.inputCpfCnpj).should('be.visible').clear().type('58838180563').blur();
          cy.get('input[formControlName="nome"]').should('be.visible').clear().type('GILSON DOS SANTOS FILHO').blur();
          cy.get(herdeiroElements.containerJaFaleceu).find('label:contains("Não") input').click({ force: true });
          cy.get(herdeiroElements.inputEmail).should('be.visible').clear().type('gilson.herdeiro@teste.com').blur();
          cy.get(herdeiroElements.inputTelefone).should('be.visible').clear().type('67999881122').blur();
          cy.get('.form-group:contains("renuncia") label:contains("Não") input').click({ force: true });
          cy.get('body').then(($b) => {
            if ($b.find('input[formControlName="ehFilhoComumComConjuge"]').length > 0) {
              cy.get('input[formControlName="ehFilhoComumComConjuge"]').first().click({ force: true });
            }
          });
          cy.get('.form-group:contains("Inventariante") label:contains("Não") input').click({ force: true });
          this.preencherCep('79002070');
          this.preencherNumero('100');
          cy.get(herdeiroElements.btnSalvar).scrollIntoView().click({ force: true });
          cy.get('app-adicionar-ou-editar-herdeiro-form', { timeout: 15000 }).should('not.exist');
        }
      });

      // 3. Inventariante para Causa Mortis
      this.cadastrarInventariantePadrao();

      // 4. Advogado para Causa Mortis
      this.cadastrarAdvogadoPadrao();

    } else if (natureza === 'Doação') {
      if (tipo === 'Separação Judicial' || tipo === 'Separação Extrajudicial') {
        // Separando
        this.interceptarBuscarPessoa('01234567890', null);
        cy.get('body').then(($b) => {
          if ($b.find(separandoElements.cardSeparandoCadastrado).length === 0 && $b.find('.card:contains("MARCOS SEPARANDO")').length === 0) {
            cy.get(separandoElements.cardCadastrarSeparando).first().click({ force: true });
            cy.get(separandoElements.inputCpf).should('be.visible').clear().type('01234567890').blur();
            cy.get('input[formControlName="nome"]').should('be.visible').clear().type('MARCOS SEPARANDO').blur();
            cy.get(separandoElements.inputEmail).should('be.visible').clear().type('marcos@teste.com').blur();
            cy.get(separandoElements.inputTelefone).should('be.visible').clear().type('67999998888').blur();
            this.preencherCep('79002070');
            this.preencherNumero('100');
            cy.get(separandoElements.btnSalvar).scrollIntoView().click({ force: true });
            cy.get('app-separando-form', { timeout: 15000 }).should('not.exist');
          }
        });

        // Separanda
        this.interceptarBuscarPessoa('58838180563', null);
        cy.get('body').then(($b) => {
          if ($b.find(separandaElements.cardSeparandaCadastrada).length === 0 && $b.find('.card:contains("MARIA SEPARANDA")').length === 0) {
            cy.get(separandaElements.cardCadastrarSeparanda).first().click({ force: true });
            cy.get(separandaElements.inputCpf).should('be.visible').clear().type('58838180563').blur();
            cy.get('input[formControlName="nome"]').should('be.visible').clear().type('MARIA SEPARANDA').blur();
            cy.get(separandaElements.inputEmail).should('be.visible').clear().type('maria@teste.com').blur();
            cy.get(separandaElements.inputTelefone).should('be.visible').clear().type('67999998877').blur();
            this.preencherCep('79002070');
            this.preencherNumero('200');
            cy.get(separandaElements.btnSalvar).scrollIntoView().click({ force: true });
            cy.get('app-separando-form', { timeout: 15000 }).should('not.exist');
          }
        });

        // Advogado para Separação
        this.cadastrarAdvogadoPadrao();

      } else {
        // Doação Padrão (Simples, Reserva de Usufruto, etc.): Doador, Donatário e Advogado
        this.interceptarBuscarPessoa('01234567890', null);
        cy.get('body').then(($b) => {
          if ($b.find(doadorElements.cardDoadorCadastrado).length === 0 && $b.find('.card:contains("CARLOS SILVA DOADOR")').length === 0) {
            cy.get(doadorElements.cardCadastrarDoador).first().click({ force: true });
            cy.get(doadorElements.inputCpfCnpj).should('be.visible').clear().type('01234567890').blur();
            cy.get('input[formControlName="nome"]').should('be.visible').clear().type('CARLOS SILVA DOADOR').blur();
            cy.get(doadorElements.inputEmail).should('be.visible').clear().type('carlos.doador@teste.com').blur();
            cy.get(doadorElements.inputTelefone).should('be.visible').clear().type('67999998888').blur();
            this.preencherCep('79002070');
            this.preencherNumero('100');
            cy.get(doadorElements.btnSalvar).scrollIntoView().click({ force: true });
            cy.get('app-form-pessoa-doacao', { timeout: 15000 }).should('not.exist');
          }
        });

        this.interceptarBuscarPessoa('58838180563', null);
        cy.get('body').then(($b) => {
          if ($b.find(donatarioElements.cardDonatarioCadastrado).length === 0 && $b.find('.card:contains("BEATRIZ DONATARIA")').length === 0) {
            cy.get(donatarioElements.cardCadastrarDonatario).first().click({ force: true });
            cy.get(donatarioElements.inputCpfCnpj).should('be.visible').clear().type('58838180563').blur();
            cy.get('input[formControlName="nome"]').should('be.visible').clear().type('BEATRIZ DONATARIA').blur();
            cy.get(donatarioElements.inputEmail).should('be.visible').clear().type('beatriz.donataria@teste.com').blur();
            cy.get(donatarioElements.inputTelefone).should('be.visible').clear().type('67999997766').blur();
            this.preencherCep('79002070');
            this.preencherNumero('200');
            cy.get(donatarioElements.btnSalvar).scrollIntoView().click({ force: true });
            cy.get('app-form-pessoa-doacao', { timeout: 15000 }).should('not.exist');
          }
        });

        // Advogado para Doação Padrão
        this.cadastrarAdvogadoPadrao();
      }
    }
  }
}

export const pessoasPage = new PessoasPage();
