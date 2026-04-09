// cypress/support/commands.ts
// Adicione aqui comandos customizados se necessário

declare global {
  namespace Cypress {
    interface Chainable {
      // Exemplo: login(email: string, senha: string): Chainable<void>;
    }
  }
}

export {};
