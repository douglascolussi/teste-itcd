// cypress/support/pageobjects/base/loginPage.ts
import { loginElements as ELogin } from '../../elements/loginElements';

export class LoginPage {
  /**
   * Realiza o acesso ao sistema utilizando o perfil e CPF via URL
   * @param perfil - 'Contribuinte' | 'Gerencial'
   * @param cpf - Opcional, CPF do usuário (default: 02177959195)
   */
  acessarSistemaPorPerfil(perfil: 'Contribuinte' | 'Gerencial', cpf: string = '02177959195'): this {
    const baseUrl = perfil === 'Contribuinte' ? ELogin.urlContribuinteBase : ELogin.urlGerencialBase;
    cy.visit(`${baseUrl}&cpf=${cpf}`);
    return this;
  }

  /**
   * Valida se o carregamento da página inicial foi concluído
   */
  validarAcessoConcluido(): this {
    cy.get(ELogin.dashboardHome, { timeout: 30000 }).should('be.visible');
    return this;
  }

  /**
   * Navega para o módulo de Guias
   */
  navegarParaModuloGuias(): void {
    cy.get(ELogin.menuDeclaracoes).first().click();
  }
}

export const loginPage = new LoginPage();
