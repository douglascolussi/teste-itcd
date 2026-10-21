# language: pt
# encoding: UTF-8

@guia @bens @graos @regressao
Funcionalidade: Cadastro e Validação do Bem Grãos/Produtos Agrícolas
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de grãos e produtos agrícolas na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de grãos em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Grãos/Produtos agrícolas"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Produto" do bem grãos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade doada" do bem grãos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Unidade" do bem grãos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem grãos

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Grãos em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Grãos/Produtos agrícolas"
    Quando seleciono o Produto do bem grãos "Soja"
    E preencho a Quantidade doada do bem grãos "500"
    E seleciono a Unidade do bem grãos "Sacas"
    E preencho o Valor Total Declarado do bem grãos "7500000"
    E clico em salvar bem
    Então o bem grãos deve estar cadastrado na tabela com espécie "Grãos/Produtos agrícolas", resumo "Soja: 500 Sacas" e valor "75.000,00"

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
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de grãos em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Grãos/Produtos agrícolas"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Produto" do bem grãos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade inventariada" do bem grãos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Unidade" do bem grãos
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem grãos

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Grãos em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Grãos/Produtos agrícolas"
    Quando seleciono o Produto do bem grãos "Milho"
    E preencho a Quantidade inventariada do bem grãos "30000"
    E seleciono a Unidade do bem grãos "Sacas"
    E preencho o Valor Total Declarado do bem grãos "4500000"
    E clico em salvar bem
    Então o bem grãos deve estar cadastrado na tabela com espécie "Grãos/Produtos agrícolas", resumo "Milho: 300 Sacas" e valor "45.000,00"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
