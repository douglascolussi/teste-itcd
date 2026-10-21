# language: pt
# encoding: UTF-8

@guia @bens @veiculo @regressao
Funcionalidade: Cadastro e Validação do Bem Veículo
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de veículos na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de veículo em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Veículo"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Placa" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Renavam" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Marca" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Modelo" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Ano Fabricação" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Ano Modelo" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de propriedade total que será doado" do bem veículo

  @validacao_formato_doacao
  Cenário: Validar mensagem de formato inválido para Renavam em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Veículo"
    Quando preencho o Renavam do bem veículo "123"
    Então devo visualizar a mensagem "Campo inválido." para o campo "Renavam" do bem veículo

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Veículo em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Veículo"
    Quando preencho a Placa do bem veículo "ABC1D23"
    E preencho o Renavam do bem veículo "12345678901"
    Então os dados do bem veículo devem ser preenchidos automaticamente com marca "FIAT", modelo "PALIO ATTRACTIV 1.0", ano fabricação "2015", ano modelo "2016" e valor "25.000,00"
    Quando preencho o Percentual de propriedade total que será doado do bem veículo "10000"
    E clico em salvar bem
    Então o bem veículo deve estar cadastrado na tabela com espécie "Veículo", resumo "FIAT - PALIO ATTRACTIV 1.0 (2015/2016), Placas ABC1D23" e valor "25.000,00"

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
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de veículo em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Veículo"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Placa" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Renavam" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Data de Aquisição" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Marca" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Modelo" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Ano Fabricação" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Ano Modelo" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do bem veículo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de Propriedade do de Cujus + Eventual Meeiro(a)" do bem veículo

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Veículo em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Veículo"
    Quando preencho a Placa do bem veículo "ABC1D23"
    E preencho o Renavam do bem veículo "12345678901"
    Então os dados do bem veículo devem ser preenchidos automaticamente com marca "FIAT", modelo "PALIO ATTRACTIV 1.0", ano fabricação "2015", ano modelo "2016" e valor "25.000,00"
    Quando preencho o Percentual de Propriedade do de Cujus do bem veículo "10000"
    E clico em salvar bem
    Então o bem veículo deve estar cadastrado na tabela com espécie "Veículo", resumo "FIAT - PALIO ATTRACTIV 1.0 (2015/2016), Placas ABC1D23" e valor "25.000,00"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
