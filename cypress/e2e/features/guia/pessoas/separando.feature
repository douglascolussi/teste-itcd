# language: pt
# encoding: UTF-8

@guia @pessoas @separando @regressao
Funcionalidade: Cadastro e Validação do Separando (Separação)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do separando na aba de Pessoas
  Para garantir a correta identificação da primeira parte envolvida na separação

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Doação"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do separando em branco
    Quando seleciono o tipo "Separação Judicial"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Separando
    Então a qualificação do separando deve ser "Separando"
    Quando clico em salvar separando
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-Mail" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CEP" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Endereço" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Bairro" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF" do separando
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Município" do separando

  @validacao_cpf_contato
  Cenário: Validar formatos inválidos de CPF, E-mail e Telefone do separando
    Quando seleciono o tipo "Separação Judicial"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Separando
    Quando preencho o CPF do separando "11111111111"
    E preencho o E-Mail do separando "email_invalido"
    E preencho o Telefone do separando "12345"
    E clico em salvar separando
    Então devo visualizar a mensagem "Campo inválido" para o campo "CPF" do separando
    E devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" do separando
    E devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do separando

  @cancelar_formulario
  Cenário: Cancelar preenchimento do formulário do separando
    Quando seleciono o tipo "Separação Judicial"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Separando
    Quando preencho o Nome do separando "TESTE CANCELAR"
    E clico em cancelar no formulário do separando
    Então o formulário do separando não deve ser exibido
    E o card para cadastrar Separando deve ser exibido

  @todos_tipos_separacao
  Esquema do Cenário: Validar cadastro e exibição do card do Separando nos tipos de Separação
    Quando seleciono o tipo "<tipo>"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Separando
    Então a qualificação do separando deve ser "Separando"
    Quando preencho o CPF do separando "01234567890"
    E preencho o Nome do separando "<nome>"
    E preencho o E-Mail do separando "separando@teste.com"
    E preencho o Telefone do separando "67999998888"
    E preencho o CEP "79002070"
    E preencho o número "100"
    E clico em salvar separando
    Então o card do separando "<nome>" com documento "012.345.678-90" deve ser exibido

    Exemplos:
      | tipo                    | nome                    |
      | Separação Judicial      | ROBERTO SILVA SEPARANDO |
      | Separação Extrajudicial | ROBERTO SILVA EXTRAJUD  |
