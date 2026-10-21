# language: pt
# encoding: UTF-8

@guia @pessoas @advogado @regressao
Funcionalidade: Cadastro e Validação do Advogado (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do advogado na aba de Pessoas
  Para vincular o representante legal do processo em todos os tipos de causa mortis

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do advogado em branco
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Advogado
    Quando clico em salvar advogado
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número da OAB" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF da OAB" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-mail" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" do advogado

  @validacao_contato
  Cenário: Validar formato de e-mail e telefone inválidos
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Advogado
    Quando preencho o E-Mail do advogado "emailinvalido"
    Então devo visualizar a mensagem "Campo inválido" para o campo "E-mail" do advogado
    Quando preencho o Telefone do advogado "67999"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do advogado

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição do card do Advogado em todos os tipos de Causa Mortis
    Quando seleciono o tipo "<tipo>"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Advogado
    Quando preencho o Nome do advogado "<nome>"
    E preencho o Número da OAB do advogado "12345"
    E seleciono a UF da OAB do advogado "MS"
    E preencho o E-Mail do advogado "julia.advogada@teste.com"
    E preencho o Telefone do advogado "67999887766"
    E clico em salvar advogado
    Então o card do advogado "<nome>" com OAB "OAB/UF: 12345/MS" deve ser exibido

    Exemplos:
      | tipo            | nome                    |
      | Ordinário       | DRA JULIA ADV ORDINARIO |
      | Arrolamento     | DRA JULIA ADV ARROLAM   |
      | Extrajudicial   | DRA JULIA ADV EXTRAJUD  |
      | Alvará Judicial | DRA JULIA ADV ALVARA    |
