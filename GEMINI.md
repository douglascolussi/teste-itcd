# Regras de Desenvolvimento e Análise: Automação de Testes ITCD

Este repositório (`teste-itcd`) contém a suíte de testes automatizados E2E em **Cypress + Cucumber (Gherkin) + TypeScript**.

## 1. Referência Obrigatória ao Código-Fonte da Aplicação (ITCD)

A aplicação sendo testada **não** reside neste repositório. O código-fonte oficial da aplicação e seu grafo de conhecimento estão localizados em diretórios irmãos:

- **Código-Fonte Frontend (Angular):**
  - Caminho Absoluto: `C:/Users/dougl/Sefaz/ITCD/ClientApp`
  - Caminho Relativo: `../ITCD/ClientApp`
  - Código-fonte principal: `../ITCD/ClientApp/src/app`
    - Páginas e fluxos: `src/app/core/pages/` e `src/app/v2/pages/`
    - Componentes reutilizáveis: `src/app/core/components/`
    - Modelos de dados: `src/app/shared/model/` e `src/app/v2/domain/`
    - Serviços e chamadas HTTP: `src/app/shared/service/`

- **Código-Fonte Backend (.NET/C#):**
  - Caminho Absoluto: `C:/Users/dougl/Sefaz/ITCD`
  - Caminho Relativo: `../ITCD`
  - Controllers, Services, ViewModels, Requests e Regras de Negócio.

- **Grafo de Conhecimento (Graphify):**
  - Caminho Absoluto: `C:/Users/dougl/Sefaz/ITCD/graphify-out`
  - Caminho Relativo: `../ITCD/graphify-out`
  - Arquivos essenciais:
    - `GRAPH_REPORT.md`: Mapeamento de comunidades funcionais, nós centrais (*God Nodes*), dependências e conexões entre telas.
    - `graph.json`: Grafo estruturado para consultas de relações entre componentes, formulários e serviços.
    - `.graphify_labels.json`: Dicionário com nomes dos módulos e agrupamentos lógicos da aplicação.

---

## 2. Fluxo Obrigatório de Trabalho para Criação/Manutenção de Testes

Antes de escrever qualquer cenário BDD, seletor ou step de teste:

1. **Consultar o Graphify (`../ITCD/graphify-out`):**
   - Verificar a comunidade e os componentes envolvidos na funcionalidade que será testada.
   - Identificar dependências cruzadas (ex: se o formulário depende de `UsuarioLogado`, `GuiaService` ou modais auxiliares).

2. **Inspecionar o Código-Fonte Real (`../ITCD/ClientApp`):**
   - Ler o arquivo `.html` do componente para extrair:
     - IDs, classes, atributos de acessibilidade ou atributos customizados (`data-cy`, `data-testid`).
     - Condicionais visuais (`*ngIf`, `[disabled]`, `[hidden]`).
     - Mensagens textuais exatas de erro e validação.
   - Ler o arquivo `.ts` do componente para extrair:
     - Regras de validação do formulário (`FormBuilder`, `Validators.required`, `Validators.minLength`, regex, etc.).
     - Comportamentos disparados por eventos (`change`, `blur`, etc.) e estados de carregamento.
     - Endpoints de API consumidos (para configurar `cy.intercept` quando necessário).

3. **Seguir o Padrão de Arquitetura do Projeto (`Agents/cypress-cucumber-ts-skill.md`):**
   - Toda lógica organizada nas 4 camadas:
     1. `cypress/e2e/features/<modulo>/<nome>.feature` (Gherkin em PT-BR)
     2. `cypress/support/elements/<modulo>Elements.ts` (apenas seletores)
     3. `cypress/support/pageobjects/<base|especifico>/<modulo>Page.ts` (ações e asserções)
     4. `cypress/support/steps/<modulo>Steps.ts` (bindings Gherkin)
   - **Checklist Anti-Duplicação:** Sempre verificar e reutilizar steps, pageobjects e seletores existentes antes de criar novos.
