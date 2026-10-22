# language: pt
# encoding: UTF-8

@guia @bens @outros @regressao
Funcionalidade: Cadastro e Validação do Bem Outros
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de outros bens ou direitos na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de outros bens em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Outros"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição" do bem outros
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem outros
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de propriedade total que será doado" do bem outros

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Outros em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Outros"
    Quando preencho a Descrição do bem outros "Jóias de família em ouro 18k e pedras preciosas"
    E preencho o Valor Total Declarado do bem outros "5000000"
    E preencho o Percentual de propriedade total que será doado do bem outros "10000"
    E clico em salvar bem
    Então o bem outros deve estar cadastrado na tabela com espécie "Outros", resumo "Jóias de família em ouro 18k e pedras preciosas" e valor "50.000,00"

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
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de outros bens em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Outros"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição" do bem outros
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Data de aquisição" do bem outros
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem outros
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de propriedade do de cujus" do bem outros

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Outros em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Outros"
    Quando preencho a Descrição do bem outros "Coleção de obras de arte e quadros raros"
    E preencho a Data de aquisição do bem outros "2020-05-15"
    E preencho o Valor Total Declarado do bem outros "8000000"
    E preencho o Percentual de propriedade do de cujus do bem outros "10000"
    E marco bem particular do de cujus do bem outros
    E clico em salvar bem
    Então o bem outros deve estar cadastrado na tabela com espécie "Outros", resumo "Coleção de obras de arte e quadros raros" e valor "80.000,00"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
