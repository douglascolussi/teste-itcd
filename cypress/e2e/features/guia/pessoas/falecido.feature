# language: pt
# encoding: UTF-8

@guia @pessoas @falecido @regressao
Funcionalidade: Cadastro e Validação do Falecido (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do falecido na aba de Pessoas
  Para garantir a correta identificação do transmitente e suas regras de sucessão

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Falecido

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do falecido em branco
    Quando clico em salvar falecido
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Data de Óbito" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Essa pessoa tinha descendente vivo na data do óbito?" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Estado Civil" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CEP" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Endereço" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Bairro" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Município" do falecido

  @validacao_cpf
  Cenário: Validar formato inválido e restrição de CPF igual ao declarante
    Quando preencho o CPF do falecido "111.111.111-11"
    Então devo visualizar a mensagem "Campo inválido" para o campo "CPF" do falecido
    Quando preencho o CPF do falecido "74555611560"
    Então devo visualizar a mensagem "O cpf do falecido não pode ser o mesmo do Declarante" para o campo "CPF" do falecido

  @validacao_datas
  Cenário: Validar bloqueio de Data de Óbito futura
    Quando ao preencher uma data futura no campo Data de Óbito o sistema deve exibir erro "A data não deve ser maior que hoje"

  @condicional_sucessao
  Cenário: Regras condicionais para descendentes e ascendentes vivos
    Quando respondo "Não" para descendente vivo na data do óbito
    Então o campo "Essa pessoa tinha ascendente vivo na data do óbito?" do falecido deve estar "visível"
    Quando clico em salvar falecido
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Essa pessoa tinha ascendente vivo na data do óbito?" do falecido
    Quando respondo "Sim" para descendente vivo na data do óbito
    Então o campo "Essa pessoa tinha ascendente vivo na data do óbito?" do falecido deve estar "oculto"

  @condicional_estado_civil
  Cenário: Regras condicionais de casamento e validação de data de casamento posterior ao óbito
    Quando seleciono o Estado Civil do falecido "Solteiro(a)"
    Então o campo "Regime de Casamento" do falecido deve estar "oculto"
    E o campo "Data de Casamento" do falecido deve estar "oculto"
    Quando seleciono o Estado Civil do falecido "Casado(a)"
    Então o campo "Regime de Casamento" do falecido deve estar "visível"
    E o campo "Data de Casamento" do falecido deve estar "visível"
    Quando clico em salvar falecido
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Regime de Casamento" do falecido
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Data de Casamento" do falecido
    Quando preencho a Data de Óbito do falecido "2020-01-01"
    E preencho a Data de Casamento do falecido "2021-01-01"
    Então devo visualizar a mensagem "A 'Data de Casamento' deve ser menor ou igual que a 'Data de Óbito'" para o campo "Data de Casamento" do falecido

  @cadastro_sucesso
  Cenário: Cadastrar falecido com sucesso e visualizar card
    Dado que intercepto a busca da pessoa CPF "01234567890" como não cadastrada para o falecido
    Quando preencho o CPF do falecido "01234567890"
    E preencho o Nome do falecido "ANTONIO SILVA FALECIDO"
    E preencho a Data de Óbito do falecido "2022-05-10"
    E respondo "Sim" para descendente vivo na data do óbito
    E seleciono o Estado Civil do falecido "Solteiro(a)"
    E preencho o CEP do falecido "79002-010"
    E preencho o Endereço do falecido "Rua das Flores"
    E preencho o Bairro do falecido "Centro"
    E preencho o Número do endereço do falecido "100"
    E seleciono a UF do falecido "MS"
    E seleciono o Município do falecido "Campo Grande"
    E clico em salvar falecido
    Então o card de Falecido deve ser exibido com o nome "ANTONIO SILVA FALECIDO" e CPF "012.345.678-90"
