# language: pt
# encoding: UTF-8

@guia @pessoas @separanda @regressao
Funcionalidade: Cadastro e Validação da Separanda (Separação)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações da separanda na aba de Pessoas
  Para garantir a correta identificação da segunda parte envolvida na separação

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Doação"
    E seleciono o tipo "Separação Judicial"
    E acesso a aba "Pessoas"
    Dado que o separando está cadastrado com CPF "01234567890" e nome "ROBERTO SILVA SEPARANDO"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário da separanda em branco
    Quando clico para cadastrar a Separanda
    Então a qualificação da separanda deve ser "Separanda"
    Quando clico em salvar separanda
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-Mail" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CEP" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Endereço" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Bairro" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF" da separanda
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Município" da separanda

  @validacao_cpf_contato
  Cenário: Validar formatos inválidos de CPF, E-mail e Telefone da separanda
    Quando clico para cadastrar a Separanda
    E preencho o CPF da separanda "11111111111"
    E preencho o E-Mail da separanda "email_invalido"
    E preencho o Telefone da separanda "12345"
    E clico em salvar separanda
    Então devo visualizar a mensagem "Campo inválido" para o campo "CPF" da separanda
    E devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" da separanda
    E devo visualizar a mensagem "Campo inválido" para o campo "Telefone" da separanda

  @cancelar_formulario
  Cenário: Cancelar preenchimento do formulário da separanda
    Quando clico para cadastrar a Separanda
    E preencho o Nome da separanda "TESTE CANCELAR"
    E clico em cancelar no formulário da separanda
    Então o formulário da separanda não deve ser exibido
    E o card para cadastrar Separanda deve ser exibido

  @cadastro_sucesso
  Cenário: Cadastrar Separanda com sucesso e validar exibição do card
    Quando clico para cadastrar a Separanda
    E preencho o CPF da separanda "58838180563"
    E preencho o Nome da separanda "MARIA SILVA SEPARANDA"
    E preencho o E-Mail da separanda "maria.separanda@teste.com"
    E preencho o Telefone da separanda "67988887777"
    E preencho o CEP "79002070"
    E preencho o número "200"
    E clico em salvar separanda
    Então o card da separanda "MARIA SILVA SEPARANDA" com documento "588.381.805-63" deve ser exibido
