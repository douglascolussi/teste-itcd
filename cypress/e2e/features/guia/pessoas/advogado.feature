# language: pt
# encoding: UTF-8

@guia @pessoas @advogado @regressao
Funcionalidade: Cadastro e Validação do Advogado (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do advogado na aba de Pessoas
  Para vincular o representante legal do processo de inventário e partilha

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Advogado

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do advogado em branco
    Quando clico em salvar advogado
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número da OAB" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF da OAB" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-mail" do advogado
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" do advogado

  @validacao_contato
  Cenário: Validar formato de e-mail e telefone inválidos
    Quando preencho o E-Mail do advogado "emailinvalido"
    Então devo visualizar a mensagem "Campo inválido" para o campo "E-mail" do advogado
    Quando preencho o Telefone do advogado "67999"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do advogado

  @cadastro_sucesso
  Cenário: Cadastrar advogado com sucesso e visualizar card
    Quando preencho o Nome do advogado "DRA JULIA ADVOGADA TESTE"
    E preencho o Número da OAB do advogado "12345"
    E seleciono a UF da OAB do advogado "MS"
    E preencho o E-Mail do advogado "julia.advogada@teste.com"
    E preencho o Telefone do advogado "67999887766"
    E clico em salvar advogado
    Então o card do advogado "DRA JULIA ADVOGADA TESTE" com OAB "OAB/UF: 12345/MS" deve ser exibido
