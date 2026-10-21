# language: pt
# encoding: UTF-8

@guia @bens @numerarios @regressao
Funcionalidade: Cadastro e Validação do Bem Numerários/Aplicações/Títulos
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de numerários, aplicações e títulos na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de numerários em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Numerários/Aplicações/Títulos"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Instituição financeira" do bem numerários
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo" do bem numerários
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem numerários

  @condicionais_doacao
  Cenário: Regras condicionais de previdência privada e pecúlio em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Numerários/Aplicações/Títulos"
    Então o campo "Tipo de previdência privada" do bem numerários deve estar "desabilitado"
    E o campo "Há seguro vinculado ao plano de previdência?" do bem numerários deve estar "desabilitado"
    E o campo "Valor do pecúlio contratado" do bem numerários deve estar "desabilitado"
    Quando seleciono o Tipo do bem numerários "Saldo em plano de previdência"
    Então o campo "Tipo de previdência privada" do bem numerários deve estar "habilitado"
    E o campo "Há seguro vinculado ao plano de previdência?" do bem numerários deve estar "habilitado"
    E o campo "Valor do pecúlio contratado" do bem numerários deve estar "desabilitado"
    Quando seleciono "Sim" para Há seguro vinculado ao plano de previdência do bem numerários
    Então o campo "Valor do pecúlio contratado" do bem numerários deve estar "habilitado"
    Quando seleciono "Não" para Há seguro vinculado ao plano de previdência do bem numerários
    Então o campo "Valor do pecúlio contratado" do bem numerários deve estar "desabilitado"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Numerários em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Numerários/Aplicações/Títulos"
    Quando preencho a Instituição financeira do bem numerários "Banco do Brasil"
    E seleciono o Tipo do bem numerários "Saldo em conta corrente"
    E preencho a Agência do bem numerários "1234"
    E preencho a Conta do bem numerários "56789-0"
    E preencho o Valor Total Declarado do bem numerários "150000"
    E clico em salvar bem
    Então o bem numerários deve estar cadastrado na tabela com espécie "Numerários/Aplicações/Títulos", resumo "Banco do Brasil - Saldo em conta corrente" e valor "1.500,00"

    Exemplos:
      | tipo                     |
      | Simples                  |
      | Cessão De Direitos       |
      | Com Reserva De Usufruto  |
      | Desigualdade De Partilha |
      | Extinção De Usufruto     |
      | Instituição De Usufruto  |
      | Nua Propriedade          |
      | Renúncia De Herança      |
      | Renúncia De Usufruto     |

  @validacao_obrigatoriedade_causa_mortis
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de numerários em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Numerários/Aplicações/Títulos"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Instituição financeira" do bem numerários
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Extrato da instituição financeira" do bem numerários
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo" do bem numerários
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem numerários

  @condicionais_causa_mortis
  Cenário: Regras condicionais de previdência privada e pecúlio em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Numerários/Aplicações/Títulos"
    Então o campo "Tipo de previdência privada" do bem numerários deve estar "desabilitado"
    E o campo "Há seguro vinculado ao plano de previdência?" do bem numerários deve estar "desabilitado"
    E o campo "Valor do pecúlio contratado" do bem numerários deve estar "desabilitado"
    Quando seleciono o Tipo do bem numerários "Saldo em plano de previdência"
    Então o campo "Tipo de previdência privada" do bem numerários deve estar "habilitado"
    E o campo "Há seguro vinculado ao plano de previdência?" do bem numerários deve estar "habilitado"
    E o campo "Valor do pecúlio contratado" do bem numerários deve estar "desabilitado"
    Quando seleciono "Sim" para Há seguro vinculado ao plano de previdência do bem numerários
    Então o campo "Valor do pecúlio contratado" do bem numerários deve estar "habilitado"
    Quando seleciono "Não" para Há seguro vinculado ao plano de previdência do bem numerários
    Então o campo "Valor do pecúlio contratado" do bem numerários deve estar "desabilitado"

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Numerários em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Numerários/Aplicações/Títulos"
    Quando preencho a Instituição financeira do bem numerários "Caixa Econômica Federal"
    E seleciono o Tipo do bem numerários "Saldo em conta corrente"
    E anexo o extrato da instituição financeira do bem numerários
    E preencho a Agência do bem numerários "4321"
    E preencho a Conta do bem numerários "98765-4"
    E preencho o Valor Total Declarado do bem numerários "250000"
    E clico em salvar bem
    Então o bem numerários deve estar cadastrado na tabela com espécie "Numerários/Aplicações/Títulos", resumo "Caixa Econômica Federal - Saldo em conta corrente" e valor "2.500,00"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
