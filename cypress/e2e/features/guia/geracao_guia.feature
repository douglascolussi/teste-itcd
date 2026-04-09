# language: pt
# encoding: UTF-8

@itcd @geracao_guia
Funcionalidade: Geração de Guia de ITCD
  Como um usuário autenticado no sistema
  Quero gerar guias de pagamento para declarações
  Para que o imposto possa ser devidamente recolhido

  Contexto:
    Dado que acesso o sistema ITCD com o perfil "Contribuinte"
    E devo visualizar a página inicial com sucesso

  @regressao @smoke
  Cenário: Iniciar fluxo de geração de guia
    Quando navego para o módulo de guias
    Então devo visualizar a listagem de guias e declarações
    E devo conseguir clicar no botão para gerar uma nova guia
