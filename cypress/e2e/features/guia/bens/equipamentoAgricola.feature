# language: pt
# encoding: UTF-8

@guia @bens @equipamento_agricola @regressao
Funcionalidade: Cadastro e Validação do Bem Equipamento Agrícola
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de equipamentos agrícolas na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de equipamento agrícola em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Equipamento agrícola"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Marca" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Modelo" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Ano" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de propriedade total que será doado" do equipamento agrícola

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Equipamento Agrícola em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Equipamento agrícola"
    Quando preencho o Tipo do equipamento agrícola "Trator"
    E preencho a Marca do equipamento agrícola "John Deere"
    E preencho o Modelo do equipamento agrícola "6110M"
    E preencho o Ano do equipamento agrícola "2020"
    E preencho o Valor Total Declarado do equipamento agrícola "35000000"
    E preencho o Percentual doado do equipamento agrícola "10000"
    E clico em salvar bem
    Então o equipamento agrícola deve estar cadastrado na tabela com espécie "Equipamento Agrícola", resumo "Trator - John Deere (2020)" e valor "350.000,00"

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
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de equipamento agrícola em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Equipamento agrícola"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Especificação" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Data de Aquisição" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Marca" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Modelo" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Ano" do equipamento agrícola
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de Propriedade do de Cujus + Eventual Meeiro(a) %" do equipamento agrícola

  @regra_data_aquisicao_causa_mortis
  Cenário: Validar que a data de aquisição não pode ser anterior ao ano do bem em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Equipamento agrícola"
    Quando preencho o Ano do equipamento agrícola "2022"
    E preencho a Data de aquisição do equipamento agrícola "2020-05-10"
    E clico em salvar bem
    Então devo visualizar a mensagem "A data de aquisição não pode ser anterior ao ano do bem." para o campo "Data de Aquisição" do equipamento agrícola

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Equipamento Agrícola em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Equipamento agrícola"
    Quando preencho a Especificação do equipamento agrícola "Colheitadeira"
    E preencho a Data de aquisição do equipamento agrícola "2021-08-15"
    E preencho a Marca do equipamento agrícola "New Holland"
    E preencho o Modelo do equipamento agrícola "TC 5070"
    E preencho o Ano do equipamento agrícola "2021"
    E preencho o Valor Total Declarado do equipamento agrícola "50000000"
    E preencho o Percentual do de cujus meeiro do equipamento agrícola "10000"
    E clico em salvar bem
    Então o equipamento agrícola deve estar cadastrado na tabela com espécie "Equipamento Agrícola", resumo "Colheitadeira - New Holland (2021)" e valor "500.000,00"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
