# language: pt
# encoding: UTF-8

@guia @bens @titulos @regressao
Funcionalidade: Cadastro e Validação do Bem Títulos Negociados em Bolsa de Valores
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de títulos negociados em bolsa de valores na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de títulos em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Títulos negociados em bolsa de valores"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Instituição de custódia" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Identificação/Ticker" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade de doada" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem títulos

  @condicionais_doacao
  Cenário: Regras condicionais de tipo de ativo em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Títulos negociados em bolsa de valores"
    Quando seleciono o Tipo do bem títulos "Ação"
    Então o campo "Quantidade de doada" do bem títulos deve estar "visível"
    E o campo "Quantidade de criptomoeda doada" do bem títulos deve estar "oculto"
    Quando seleciono o Tipo do bem títulos "Cripto ativo"
    Então o campo "Quantidade de doada" do bem títulos deve estar "oculto"
    E o campo "Quantidade de criptomoeda doada" do bem títulos deve estar "visível"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Títulos em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Títulos negociados em bolsa de valores"
    Quando preencho a Instituição de custódia do bem títulos "XP Investimentos"
    E seleciono o Tipo do bem títulos "Ação"
    E preencho a Identificação ou Ticker do bem títulos "<ticker>"
    E preencho a Quantidade doada do bem títulos "100"
    E preencho o Valor Total Declarado do bem títulos "500000"
    E clico em salvar bem
    Então o bem títulos deve estar cadastrado na tabela com espécie "Títulos negociados em bolsa de valores", resumo "<ticker>: 100" e valor "5.000,00"

    Exemplos:
      | tipo                     | ticker   |
      | Simples                  | PETR4    |
      | Cessão De Direitos       | VALE3    |
      | Com Reserva De Usufruto  | ITUB4    |
      | Desigualdade De Partilha | BBDC4    |
      | Extinção De Usufruto     | BBAS3    |
      | Instituição De Usufruto  | WEGE3    |
      | Nua Propriedade          | ABEV3    |
      | Renúncia De Herança      | RENT3    |
      | Renúncia De Usufruto     | MGLU3    |

  @validacao_obrigatoriedade_causa_mortis
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de títulos em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Títulos negociados em bolsa de valores"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Instituição de custódia" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Identificação/Ticker" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Extrato da instituição de custódia" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade inventariada" do bem títulos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem títulos

  @condicionais_causa_mortis
  Cenário: Regras condicionais de tipo de ativo em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Títulos negociados em bolsa de valores"
    Quando seleciono o Tipo do bem títulos "Ação"
    Então o campo "Quantidade inventariada" do bem títulos deve estar "visível"
    E o campo "Quantidade criptomoeda inventariada" do bem títulos deve estar "oculto"
    Quando seleciono o Tipo do bem títulos "Cripto ativo"
    Então o campo "Quantidade inventariada" do bem títulos deve estar "oculto"
    E o campo "Quantidade criptomoeda inventariada" do bem títulos deve estar "visível"

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Títulos em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Títulos negociados em bolsa de valores"
    Quando preencho a Instituição de custódia do bem títulos "BTG Pactual"
    E seleciono o Tipo do bem títulos "Ação"
    E preencho a Identificação ou Ticker do bem títulos "<ticker>"
    E anexo o extrato da instituição de custódia do bem títulos
    E preencho a Quantidade inventariada do bem títulos "200"
    E preencho o Valor Total Declarado do bem títulos "700000"
    E clico em salvar bem
    Então o bem títulos deve estar cadastrado na tabela com espécie "Títulos negociados em bolsa de valores", resumo "<ticker>: 200" e valor "7.000,00"

    Exemplos:
      | tipo            | ticker   |
      | Ordinário       | PETR4    |
      | Arrolamento     | VALE3    |
      | Extrajudicial   | ITUB4    |
      | Alvará Judicial | BBDC4    |
