# language: pt
# encoding: UTF-8

@guia @pessoas @herdeiro @regressao
Funcionalidade: Cadastro e Validação do Herdeiro (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do herdeiro na aba de Pessoas
  Para garantir a correta transmissão e partilha dos quinhões hereditários em todos os tipos de causa mortis

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do herdeiro em branco
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando clico em salvar herdeiro
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Esta pessoa já é falecida?" do herdeiro

  @validacao_cpf
  Cenário: Validar formato inválido e restrição de CPF igual ao do falecido
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando preencho o CPF do herdeiro "111.111.111-11"
    Então devo visualizar a mensagem "CPF inválido" para o campo "CPF" do herdeiro
    Quando preencho o CPF do herdeiro "01234567890"
    Então devo visualizar a mensagem "O falecido já possui esse CPF" para o campo "CPF" do herdeiro

  @validacao_contato
  Cenário: Validar formato de e-mail e telefone inválidos
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "emailinvalido"
    Então devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" do herdeiro
    Quando preencho o Telefone do herdeiro "67999"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do herdeiro

  @condicional_falecimento
  Cenário: Regras condicionais para herdeiro falecido e bloqueio de data futura
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando respondo "Sim" para herdeiro já falecido
    Então o campo "Data de Óbito" do herdeiro deve estar "visível"
    E o campo "E-Mail" do herdeiro deve estar "oculto"
    E o campo "Telefone" do herdeiro deve estar "oculto"
    E o campo "CEP" do herdeiro deve estar "oculto"
    Quando ao preencher uma data futura no campo Data de Óbito do herdeiro o sistema deve exibir erro "A data não deve ser maior que hoje"
    Quando respondo "Não" para herdeiro já falecido
    Então o campo "Data de Óbito" do herdeiro deve estar "oculto"
    E o campo "E-Mail" do herdeiro deve estar "visível"
    E o campo "Telefone" do herdeiro deve estar "visível"
    E o campo "CEP" do herdeiro deve estar "visível"

  @condicional_filho_comum
  Cenário: Exibição condicional do campo filho comum com o cônjuge
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando respondo "Não" para herdeiro já falecido
    Então o campo "É filho(a) comum com o cônjuge" do herdeiro deve estar "visível"
    Quando clico em salvar herdeiro
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "É filho(a) comum com o cônjuge" do herdeiro

  @condicional_renuncia
  Cenário: Exibição condicional do tipo de renúncia
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando respondo "Não" para herdeiro já falecido
    E respondo "Sim" para renúncia de quinhão do herdeiro
    Então o campo "Tipo de renúncia" do herdeiro deve estar "visível"
    Quando respondo "Não" para renúncia de quinhão do herdeiro
    Então o campo "Tipo de renúncia" do herdeiro deve estar "oculto"

  @condicional_inventariante
  Cenário: Exibição condicional do termo de inventariante
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando respondo "Não" para herdeiro já falecido
    E respondo "Sim" para herdeiro inventariante
    Então o campo "Termo de nomeação de inventariante" do herdeiro deve estar "visível"
    Quando respondo "Não" para herdeiro inventariante
    Então o campo "Termo de nomeação de inventariante" do herdeiro deve estar "oculto"

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição do card do Herdeiro em todos os tipos de Causa Mortis
    Quando seleciono o tipo "<tipo>"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Herdeiro
    Quando preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "<nome>"
    E respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "marcos.herdeiro@teste.com"
    E preencho o Telefone do herdeiro "67999887766"
    E respondo "Sim" para filho comum com o cônjuge
    E respondo "Não" para renúncia de quinhão do herdeiro
    E respondo "Não" para herdeiro inventariante
    E preencho o CEP do herdeiro "79002010"
    E preencho o número do herdeiro "250"
    E clico em salvar herdeiro
    Então o card do herdeiro "<nome>" com CPF "555.520.584-88" deve ser exibido

    Exemplos:
      | tipo            | nome                      |
      | Ordinário       | MARCOS HERDEIRO ORDINARIO |
      | Arrolamento     | MARCOS HERDEIRO ARROLAM   |
      | Extrajudicial   | MARCOS HERDEIRO EXTRAJUD  |
      | Alvará Judicial | MARCOS HERDEIRO ALVARA    |
