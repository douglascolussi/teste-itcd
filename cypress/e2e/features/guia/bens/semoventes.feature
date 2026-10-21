# language: pt
# encoding: UTF-8

@guia @bens @semoventes @regressao
Funcionalidade: Cadastro e Validação do Bem Semoventes
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de semoventes (rebanho bovino, equino, etc.) na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de semoventes em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Semoventes"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "UF" do bem semoventes
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Município" do bem semoventes
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Grupo do semovente" do bem semoventes

  @condicionais_doacao
  Cenário: Regras condicionais de inscrição estadual e faixas etárias em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Semoventes"
    Então o campo Inscrição Estadual do bem semoventes não deve ser obrigatório
    Quando seleciono a UF do bem semoventes "MS"
    Então o campo Inscrição Estadual do bem semoventes deve ser obrigatório
    Quando seleciono a UF do bem semoventes "SP"
    Então o campo Inscrição Estadual do bem semoventes não deve ser obrigatório
    Quando seleciono o Grupo do semovente do bem semoventes "Equinos"
    Então os campos de Eras/Faixa etária do bem semoventes não devem estar visíveis
    Quando seleciono o Grupo do semovente do bem semoventes "Bovino - Fêmeas (Vacas)"
    Então os campos de Eras/Faixa etária do bem semoventes devem estar visíveis
    Quando preencho a faixa etária 00-12M do bem semoventes "20"
    E preencho a faixa etária 13-24M do bem semoventes "30"
    Então a quantidade total doada do bem semoventes calculada deve ser "50"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Semoventes em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Semoventes"
    Quando seleciono a UF do bem semoventes "MS"
    E seleciono o Município do bem semoventes "Campo Grande"
    E preencho a Inscrição Estadual do bem semoventes "281234567"
    E seleciono o Grupo do semovente do bem semoventes "Equinos"
    E preencho a Quantidade total doada do bem semoventes "50"
    E preencho o Valor Total Declarado do bem semoventes "10000000"
    E clico em salvar bem
    Então o bem semoventes deve estar cadastrado na tabela com espécie "Semoventes", resumo "50 cabeças - Equinos, IE 28.123.456.7" e valor "100.000,00"

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
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de semoventes em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Semoventes"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "UF" do bem semoventes
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Município" do bem semoventes
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Ficha de saldo do IAGRO" do bem semoventes
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Grupo do semovente" do bem semoventes

  @condicionais_causa_mortis
  Cenário: Regras condicionais de inscrição estadual e faixas etárias em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Semoventes"
    Então o campo Inscrição Estadual do bem semoventes não deve ser obrigatório
    Quando seleciono a UF do bem semoventes "MS"
    Então o campo Inscrição Estadual do bem semoventes deve ser obrigatório
    Quando seleciono o Grupo do semovente do bem semoventes "Bovino - Machos (Bois e Touros)"
    Então os campos de Eras/Faixa etária do bem semoventes devem estar visíveis
    Quando preencho a faixa etária 00-12M do bem semoventes "10"
    E preencho a faixa etária 25-36M do bem semoventes "15"
    Então a quantidade total inventariada do bem semoventes calculada deve ser "25"

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Semoventes em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Semoventes"
    Quando seleciono a UF do bem semoventes "MS"
    E seleciono o Município do bem semoventes "Campo Grande"
    E preencho a Inscrição Estadual do bem semoventes "281234567"
    E anexo a Ficha de saldo do IAGRO do bem semoventes
    E seleciono o Grupo do semovente do bem semoventes "Equinos"
    E preencho a Quantidade total inventariada do bem semoventes "50"
    E preencho o Valor Total Declarado do bem semoventes "10000000"
    E clico em salvar bem
    Então o bem semoventes deve estar cadastrado na tabela com espécie "Semoventes", resumo "50 cabeças - Equinos, IE 28.123.456.7" e valor "100.000,00"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
