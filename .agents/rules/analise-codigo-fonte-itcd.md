# Regra: Análise do Código Fonte ITCD e Graphify

Esta regra define o direcionamento obrigatório para análise do código fonte da aplicação ITCD ao projetar ou implementar cenários de teste automatizados em `teste-itcd`.

## Contexto de Diretórios

- **Repositório de Testes (Atual):** `c:/Users/dougl/Sefaz/teste-itcd`
- **Código Fonte da Aplicação (Frontend Angular):** `c:/Users/dougl/Sefaz/ITCD/ClientApp` (ou relativo `../ITCD/ClientApp`)
- **Código Fonte da Aplicação (Backend .NET):** `c:/Users/dougl/Sefaz/ITCD` (ou relativo `../ITCD`)
- **Grafo de Conhecimento da Aplicação (Graphify):** `c:/Users/dougl/Sefaz/ITCD/graphify-out` (ou relativo `../ITCD/graphify-out`)

## Diretrizes de Execução

1. **Investigação Antes de Implementação:**
   - Sempre consulte o grafo em `../ITCD/graphify-out/GRAPH_REPORT.md` e `../ITCD/graphify-out/graph.json` para entender o ecossistema do componente (quem chama, dependências de models e services).
   - Inspecione diretamente os arquivos de template (`.html`) e lógica (`.ts`) em `../ITCD/ClientApp/src/app` para extrair mensagens de validação literais, regras de desabilitação de botões e seletores dos inputs.
   - Para regras de cálculo e validações de servidor, consulte os controllers e services em `../ITCD`.

2. **Arquitetura de Testes Obrigatória:**
   - Siga rigorosamente a convenção de 4 camadas descrita em [cypress-cucumber-ts-skill.md](file:///c:/Users/dougl/Sefaz/teste-itcd/Agents/cypress-cucumber-ts-skill.md):
     - `cypress/e2e/features/`
     - `cypress/support/elements/`
     - `cypress/support/pageobjects/`
     - `cypress/support/steps/`
   - Toda comunicação e Gherkin em Português (PT-BR).
