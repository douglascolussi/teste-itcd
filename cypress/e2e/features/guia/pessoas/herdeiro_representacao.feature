# language: pt
# encoding: UTF-8

@guia @pessoas @herdeiro @herdeiro_representacao @regressao
Funcionalidade: Cadastro e Validação de Herdeiros por Representação - Neto e Bisneto (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações dos herdeiros por representação (netos e bisnetos) na aba de Pessoas
  Para garantir o cumprimento das regras sucessórias por estirpe e transmissão hereditária correta

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E que cadastro um filho pré-morto com descendentes vivos

  @validacao_obrigatoriedade_neto
  Cenário: Validar campos fixos e obrigatoriedade no formulário do herdeiro neto
    Quando clico para cadastrar o herdeiro Neto
    Então a Qualificação do herdeiro deve ser "Por representação"
    E o campo Tipo de Herdeiro deve estar "desabilitado"
    E o campo Tipo de Herdeiro deve estar selecionado como "Neto(a)"
    E o campo "É filho(a) comum com o cônjuge" do herdeiro deve estar "oculto"
    Quando clico em salvar herdeiro
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do herdeiro
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Esta pessoa já é falecida?" do herdeiro

  @validacao_cpf_contato_neto
  Cenário: Validar CPF inválido, duplicado e formato de contato do herdeiro neto
    Quando clico para cadastrar o herdeiro Neto
    E preencho o CPF do herdeiro "111.111.111-11"
    Então devo visualizar a mensagem "CPF inválido" para o campo "CPF" do herdeiro
    Quando preencho o CPF do herdeiro "58838180563"
    Então devo visualizar a mensagem "Já existe um herdeiro utilizando esse CPF/CNPJ." para o campo "CPF" do herdeiro
    Quando preencho o CPF do herdeiro "01234567890"
    Então devo visualizar a mensagem "O falecido já possui esse CPF" para o campo "CPF" do herdeiro
    Quando preencho o CPF do herdeiro "55552058488"
    E respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "netoinvalido"
    Então devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" do herdeiro
    Quando preencho o Telefone do herdeiro "67999"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do herdeiro

  @cadastro_sucesso_neto_vivo
  Cenário: Cadastrar herdeiro neto vivo com sucesso e exibir card de representação
    Quando clico para cadastrar o herdeiro Neto
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "LUCAS SILVA NETO"
    E respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "lucas.neto@teste.com"
    E preencho o Telefone do herdeiro "67999887711"
    E respondo "Não" para renúncia de quinhão do herdeiro
    E respondo "Não" para herdeiro inventariante
    E preencho o CEP do herdeiro "79002010"
    E preencho o número do herdeiro "110"
    E clico em salvar herdeiro
    Então o card do herdeiro por representação "LUCAS SILVA NETO" com CPF "555.520.584-88" deve ser exibido

  @cadastro_neto_falecido_habilita_bisneto
  Cenário: Cadastrar herdeiro neto falecido com descendentes vivos e habilitar cadastro de bisneto
    Quando clico para cadastrar o herdeiro Neto
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "LUCAS SILVA NETO FALECIDO"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2019-06-15"
    E respondo "Sim" para descendente vivo na data do óbito do autor da herança
    E clico em salvar herdeiro
    Então o card do herdeiro por representação "LUCAS SILVA NETO FALECIDO" com CPF "555.520.584-88" deve ser exibido
    E o card para cadastrar herdeiro bisneto deve estar visível

  @impedimento_bisneto_pre_morto
  Cenário: Impedir cadastramento de bisneto pré-morto por falta de direito de representação
    Quando clico para cadastrar o herdeiro Neto
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "LUCAS SILVA NETO FALECIDO"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2019-06-15"
    E respondo "Sim" para descendente vivo na data do óbito do autor da herança
    E clico em salvar herdeiro
    E clico para cadastrar o herdeiro Bisneto
    Então a Qualificação do herdeiro deve ser "Por representação"
    E o campo Tipo de Herdeiro deve estar "desabilitado"
    E o campo Tipo de Herdeiro deve estar selecionado como "Bisneto(a)"
    Quando preencho o CPF do herdeiro "11144477735"
    E preencho o Nome do herdeiro "BRUNO SILVA BISNETO"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2019-07-01"
    Então devo visualizar o modal de validação sem direito de representação com o texto "Não é permitido o cadastramento de Herdeiro(a) Pré-Morto quando não há direito de representação."
    Quando confirmo o modal de validação de herdeiro pré-morto sem direito de representação
    E clico em voltar no formulário do herdeiro

  @cadastro_sucesso_bisneto_vivo
  Cenário: Cadastrar bisneto vivo com sucesso e validar disponibilidade do card para múltiplos bisnetos
    Quando clico para cadastrar o herdeiro Neto
    E preencho o CPF do herdeiro "55552058488"
    E preencho o Nome do herdeiro "LUCAS SILVA NETO FALECIDO"
    E respondo "Sim" para herdeiro já falecido
    E preencho a Data de Óbito do herdeiro "2019-06-15"
    E respondo "Sim" para descendente vivo na data do óbito do autor da herança
    E clico em salvar herdeiro
    E clico para cadastrar o herdeiro Bisneto
    Quando preencho o CPF do herdeiro "11144477735"
    E preencho o Nome do herdeiro "BRUNO SILVA BISNETO"
    E respondo "Não" para herdeiro já falecido
    E preencho o E-Mail do herdeiro "bruno.bisneto@teste.com"
    E preencho o Telefone do herdeiro "67999887755"
    E respondo "Não" para renúncia de quinhão do herdeiro
    E respondo "Não" para herdeiro inventariante
    E preencho o CEP do herdeiro "79002010"
    E preencho o número do herdeiro "300"
    E clico em salvar herdeiro
    Então o card do herdeiro por representação "BRUNO SILVA BISNETO" com CPF "111.444.777-35" deve ser exibido
    E o card para cadastrar herdeiro bisneto deve estar visível
