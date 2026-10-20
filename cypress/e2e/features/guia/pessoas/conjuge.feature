# language: pt
# encoding: UTF-8

@guia @pessoas @conjuge @regressao
Funcionalidade: Cadastro e Validação do Cônjuge/Meeiro (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do cônjuge na aba de Pessoas
  Para garantir a partilha e regras de meação e sucessão

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado como casado
    E clico para cadastrar o Cônjuge

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do cônjuge em branco
    Quando clico em salvar cônjuge
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Esta pessoa já é falecida?" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-Mail" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Esta pessoa renuncia ao seu quinhão?" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CEP" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Endereço" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Bairro" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF" do cônjuge
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Município" do cônjuge

  @validacao_cpf
  Cenário: Validar formato inválido e restrição de CPF igual ao do falecido
    Quando preencho o CPF do cônjuge "111.111.111-11"
    Então devo visualizar a mensagem "CPF inválido" para o campo "CPF" do cônjuge
    Quando preencho o CPF do cônjuge "01234567890"
    Então devo visualizar a mensagem "O falecido já possui esse CPF" para o campo "CPF" do cônjuge

  @validacao_contato
  Cenário: Validar formato de e-mail e telefone inválidos
    Quando preencho o E-Mail do cônjuge "emailinvalido"
    Então devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" do cônjuge
    Quando preencho o Telefone do cônjuge "67999"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do cônjuge

  @condicional_falecimento
  Cenário: Regras condicionais para cônjuge já falecido e bloqueio de data futura
    Quando respondo "Sim" para cônjuge já falecido
    Então o campo "Data de Óbito" do cônjuge deve estar "visível"
    E o campo "E-Mail" do cônjuge deve estar "oculto"
    E o campo "Telefone" do cônjuge deve estar "oculto"
    Quando ao preencher uma data futura no campo Data de Óbito do cônjuge o sistema deve exibir erro "A data não deve ser maior que hoje"
    Quando respondo "Não" para cônjuge já falecido
    Então o campo "Data de Óbito" do cônjuge deve estar "oculto"
    E o campo "E-Mail" do cônjuge deve estar "visível"
    E o campo "Telefone" do cônjuge deve estar "visível"

  @condicional_renuncia
  Cenário: Exibição condicional do tipo de renúncia
    Quando respondo "Não" para cônjuge já falecido
    E respondo "Sim" para renúncia de quinhão do cônjuge
    Então o campo "Tipo de renúncia" do cônjuge deve estar "visível"
    Quando respondo "Não" para renúncia de quinhão do cônjuge
    Então o campo "Tipo de renúncia" do cônjuge deve estar "oculto"

  @condicional_inventariante
  Cenário: Exibição condicional do termo de inventariante
    Quando respondo "Não" para cônjuge já falecido
    E respondo "Sim" para cônjuge inventariante
    Então o campo "Termo de nomeação de inventariante" do cônjuge deve estar "visível"
    Quando respondo "Não" para cônjuge inventariante
    Então o campo "Termo de nomeação de inventariante" do cônjuge deve estar "oculto"

  @cadastro_sucesso
  Cenário: Cadastrar cônjuge vivo com sucesso e visualizar card
    Quando preencho o CPF do cônjuge "52998224725"
    E preencho o Nome do cônjuge "Maria Aparecida da Silva"
    E respondo "Não" para cônjuge já falecido
    E preencho o E-Mail do cônjuge "maria.silva@teste.com"
    E preencho o Telefone do cônjuge "67999887766"
    E respondo "Não" para renúncia de quinhão do cônjuge
    E respondo "Não" para cônjuge inventariante
    E preencho o CEP do cônjuge "79002070"
    E preencho o número do cônjuge "200"
    E clico em salvar cônjuge
    Então o card do cônjuge "Maria Aparecida da Silva" com CPF "529.982.247-25" deve ser exibido
