# language: pt
# encoding: UTF-8

@guia @pessoas @herdeiro @herdeiro_ascendente @regressao
Funcionalidade: Cadastro e Validação de Herdeiros Ascendentes (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações dos herdeiros ascendentes na aba de Pessoas
  Para garantir a correta transmissão hereditária na linha ascendente em todos os tipos de causa mortis

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do herdeiro ascendente em branco
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente
    Quando clico em salvar herdeiro
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Tipo de Herdeiro" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Esta pessoa já é falecida?" do herdeiro

  @validacao_cpf
  Cenário: Validar formato inválido e restrição de CPF igual ao do falecido no formulário do ascendente
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente
    Quando preencho o CPF do herdeiro "111.111.111-11"
    Então devo visualizar a mensagem "CPF inválido" para o campo "CPF" do herdeiro
    Quando preencho o CPF do herdeiro "01234567890"
    Então devo visualizar a mensagem "O falecido já possui esse CPF" para o campo "CPF" do herdeiro

  @validacao_contato
  Cenário: Validar formato de e-mail e telefone inválidos no formulário do ascendente
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente
    Quando respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "emailinvalido"
    Então devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" do herdeiro
    Quando preencho o Telefone do herdeiro "67999"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do herdeiro

  @pre_morto_bloqueio
  Cenário: Bloqueio legal ao tentar cadastrar herdeiro ascendente pré-morto
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente
    Quando seleciono o Tipo de Herdeiro "Pai/Mãe"
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "JOAO SILVA PAI"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2019-01-01"
    Então devo visualizar o modal de validação sem direito de representação com o texto "Não é permitido o cadastramento de Herdeiro(a) Pré-Morto quando não há direito de representação."
    Quando confirmo o modal de validação de herdeiro pré-morto sem direito de representação
    E clico em voltar no formulário do herdeiro

  @pos_morto_informativo
  Cenário: Validar herdeiro ascendente pós-morto com exibição de modal informativo
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente
    Quando seleciono o Tipo de Herdeiro "Pai/Mãe"
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "MARIA SILVA MAE"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2021-01-01"
    E clico em salvar herdeiro
    Quando confirmo o modal informativo do herdeiro
    Então o card do herdeiro ascendente "MARIA SILVA MAE" com CPF "555.520.584-88" deve ser exibido

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição do card do Herdeiro Ascendente em todos os tipos de Causa Mortis
    Quando seleciono o tipo "<tipo>"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente
    Quando seleciono o Tipo de Herdeiro "Pai/Mãe"
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "<nome>"
    E respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "joao.pai@teste.com"
    E preencho o Telefone do herdeiro "67999887766"
    E respondo "Não" para renúncia de quinhão do herdeiro
    E respondo "Não" para herdeiro inventariante
    E preencho o CEP do herdeiro "79002010"
    E preencho o número do herdeiro "300"
    E clico em salvar herdeiro
    Então o card do herdeiro ascendente "<nome>" com CPF "555.520.584-88" deve ser exibido

    Exemplos:
      | tipo            | nome                     |
      | Ordinário       | JOAO PAI ORDINARIO       |
      | Arrolamento     | JOAO PAI ARROLAM         |
      | Extrajudicial   | JOAO PAI EXTRAJUD        |
      | Alvará Judicial | JOAO PAI ALVARA          |

  @regra_sucessao_pais_prioridade
  Cenário: Validar restrição de tipo de herdeiro quando já existe um Pai ou Mãe cadastrado
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com ascendentes vivos
    E clico para cadastrar o Herdeiro Ascendente
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
