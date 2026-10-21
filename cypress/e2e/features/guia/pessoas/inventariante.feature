# language: pt
# encoding: UTF-8

@guia @pessoas @inventariante @regressao
Funcionalidade: Cadastro e Validação do Inventariante (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do inventariante na aba de Pessoas
  Para vincular o responsável legal pelo inventário em todos os tipos de causa mortis

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do inventariante em branco
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Inventariante
    Quando clico em salvar inventariante
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do inventariante
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do inventariante
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-mail" do inventariante
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" do inventariante
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Termo de nomeação de inventariante" do inventariante
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CEP" do inventariante

  @validacao_cpf
  Cenário: Validar formato inválido e restrição de CPF igual ao do falecido
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Inventariante
    Quando preencho o CPF do inventariante "111.111.111-11"
    Então devo visualizar a mensagem "CPF inválido" para o campo "CPF" do inventariante
    Quando preencho o CPF do inventariante "01234567890"
    Então devo visualizar a mensagem "O falecido já possui esse CPF" para o campo "CPF" do inventariante

  @validacao_contato
  Cenário: Validar formato de e-mail e telefone inválidos
    Quando seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Inventariante
    Quando preencho o E-Mail do inventariante "emailinvalido"
    Então devo visualizar a mensagem "Campo inválido" para o campo "E-mail" do inventariante
    Quando preencho o Telefone do inventariante "67999"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do inventariante

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição do card do Inventariante em todos os tipos de Causa Mortis
    Quando seleciono o tipo "<tipo>"
    E acesso a aba "Pessoas"
    E que o falecido está cadastrado com descendentes vivos
    E clico para cadastrar o Inventariante
    Quando preencho o CPF do inventariante "55552058488"
    E preencho o Nome do inventariante "<nome>"
    E preencho o E-Mail do inventariante "carlos.inventariante@teste.com"
    E preencho o Telefone do inventariante "67999887766"
    E anexo o termo de nomeação do inventariante
    E preencho o CEP do inventariante "79002010"
    E preencho o número do inventariante "120"
    E clico em salvar inventariante
    Então o card do inventariante "<nome>" com CPF "555.520.584-88" deve ser exibido

    Exemplos:
      | tipo            | nome                           |
      | Ordinário       | CARLOS INVENTARIANTE ORDINARIO |
      | Arrolamento     | CARLOS INVENTARIANTE ARROLAM   |
      | Extrajudicial   | CARLOS INVENTARIANTE EXTRAJUD  |
      | Alvará Judicial | CARLOS INVENTARIANTE ALVARA    |
