# language: pt
# encoding: UTF-8

@guia @pessoas @herdeiro @herdeiro_ascendente @regressao
Funcionalidade: Cadastro e Validação de Herdeiros Ascendentes (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações dos herdeiros ascendentes na aba de Pessoas
  Para garantir a correta transmissão hereditária na linha ascendente conforme as regras sucessórias

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do herdeiro ascendente em branco
    Quando clico em salvar herdeiro
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Tipo de Herdeiro" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Esta pessoa já é falecida?" do herdeiro

  @opcoes_tipo_herdeiro
  Cenário: Validar qualificação Ascendente e opções disponíveis no Tipo de Herdeiro
    Então a Qualificação do herdeiro deve ser "Ascendente"
    E o campo Tipo de Herdeiro deve estar "habilitado"
    E o campo Tipo de Herdeiro deve conter a opção "Pai/Mãe"
    E o campo Tipo de Herdeiro deve conter a opção "Avô/Avó Materno"
    E o campo Tipo de Herdeiro deve conter a opção "Avô/Avó Paterno"
    E o campo Tipo de Herdeiro deve conter a opção "Bisavô/Bisavó Materno"
    E o campo Tipo de Herdeiro deve conter a opção "Bisavô/Bisavó Paterno"

  @regras_condicionais_ascendente
  Cenário: Validar que o campo filho comum com cônjuge não é exibido para herdeiro ascendente
    Quando respondo "Não" para herdeiro já falecido
    E seleciono o Tipo de Herdeiro "Pai/Mãe"
    Então o campo "É filho(a) comum com o cônjuge" do herdeiro deve estar "oculto"

  @pre_morto_sem_direito_representacao
  Cenário: Validar impedimento de herdeiro ascendente pré-morto por inexistência de direito de representação
    Quando seleciono o Tipo de Herdeiro "Pai/Mãe"
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "MARIA SILVA MAE"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2019-01-01"
    Então devo visualizar o modal de validação sem direito de representação com o texto "Não é permitido o cadastramento de Herdeiro(a) Pré-Morto quando não há direito de representação."
    Quando confirmo o modal de validação de herdeiro pré-morto sem direito de representação

  @pos_morto_informativo
  Cenário: Validar herdeiro ascendente pós-morto com exibição de modal informativo
    Quando seleciono o Tipo de Herdeiro "Pai/Mãe"
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "MARIA SILVA MAE"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2021-01-01"
    E clico em salvar herdeiro
    Quando confirmo o modal informativo do herdeiro
    Então o card do herdeiro ascendente "MARIA SILVA MAE" com CPF "555.520.584-88" deve ser exibido

  @cadastro_sucesso
  Cenário: Cadastrar herdeiro ascendente vivo com sucesso e validar exibição do card
    Quando seleciono o Tipo de Herdeiro "Pai/Mãe"
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "JOAO SILVA PAI"
    E respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "joao.pai@teste.com"
    E preencho o Telefone do herdeiro "67999887766"
    E respondo "Não" para renúncia de quinhão do herdeiro
    E respondo "Não" para herdeiro inventariante
    E preencho o CEP do herdeiro "79002010"
    E preencho o número do herdeiro "300"
    E clico em salvar herdeiro
    Então o card do herdeiro ascendente "JOAO SILVA PAI" com CPF "555.520.584-88" deve ser exibido

  @regra_sucessao_pais_prioridade
  Cenário: Validar restrição de tipo de herdeiro quando já existe um Pai ou Mãe cadastrado
    Quando seleciono o Tipo de Herdeiro "Pai/Mãe"
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "JOAO SILVA PAI"
    E respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "joao.pai@teste.com"
    E preencho o Telefone do herdeiro "67999887766"
    E respondo "Não" para renúncia de quinhão do herdeiro
    E respondo "Não" para herdeiro inventariante
    E preencho o CEP do herdeiro "79002010"
    E preencho o número do herdeiro "300"
    E clico em salvar herdeiro
    Então o card do herdeiro ascendente "JOAO SILVA PAI" com CPF "555.520.584-88" deve ser exibido
    Quando clico para cadastrar o Herdeiro Ascendente
    Então o campo Tipo de Herdeiro deve estar "desabilitado"
    E o campo Tipo de Herdeiro deve conter a opção "Pai/Mãe"
