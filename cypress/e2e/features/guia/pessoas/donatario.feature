# language: pt
# encoding: UTF-8

@guia @pessoas @donatario @regressao
Funcionalidade: Cadastro e Validação do Donatário (Doação)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do donatário na aba de Pessoas
  Para garantir a correta identificação do beneficiário em todos os tipos de doação

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Doação"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do donatário em branco
    Quando seleciono o tipo "Simples"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Donatário
    Então a qualificação do donatário deve ser "Donatário"
    Quando clico em salvar donatário
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF/CNPJ" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-Mail" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CEP" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Endereço" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Bairro" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF" do donatário
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Município" do donatário

  @validacao_cpf_contato
  Cenário: Validar formatos inválidos de CPF, E-mail e Telefone do donatário
    Quando seleciono o tipo "Simples"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Donatário
    Quando preencho o CPF do donatário "11111111111"
    E preencho o E-Mail do donatário "email_invalido"
    E preencho o Telefone do donatário "12345"
    E clico em salvar donatário
    Então devo visualizar a mensagem "Campo inválido" para o campo "CPF/CNPJ" do donatário
    E devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" do donatário
    E devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do donatário

  @validacao_cpf_duplicado_com_doador
  Cenário: Validar impedimento de CPF duplicado entre Donatário e Doador já cadastrado
    Quando seleciono o tipo "Simples"
    E acesso a aba "Pessoas"
    Dado que o doador está cadastrado com CPF "01234567890" e nome "CARLOS SILVA DOADOR"
    Quando clico para cadastrar o Donatário
    E preencho o CPF do donatário "01234567890"
    E clico em salvar donatário
    Então devo visualizar a mensagem "CPF/CNPJ já cadastrado" para o campo "CPF/CNPJ" do donatário

  @cancelar_formulario
  Cenário: Cancelar preenchimento do formulário do donatário
    Quando seleciono o tipo "Simples"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Donatário
    Quando preencho o Nome do donatário "TESTE CANCELAR"
    E clico em cancelar no formulário do donatário
    Então o formulário do donatário não deve ser exibido
    E o card para cadastrar Donatário deve ser exibido

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição do card do Donatário em todos os tipos de Doação
    Quando seleciono o tipo "<tipo>"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Donatário
    Então a qualificação do donatário deve ser "Donatário"
    Quando preencho o CPF do donatário "58838180563"
    E preencho o Nome do donatário "<nome>"
    E preencho o E-Mail do donatário "maria.donataria@teste.com"
    E preencho o Telefone do donatário "67988887777"
    E preencho o CEP "79002070"
    E preencho o número "200"
    E clico em salvar donatário
    Então o card do donatário "<nome>" com documento "588.381.805-63" deve ser exibido

    Exemplos:
      | tipo                     | nome                          |
      | Simples                  | MARIA OLIVEIRA DONATARIA      |
      | Cessão De Direitos       | MARIA CESSAO DONATARIA        |
      | Com Reserva De Usufruto  | MARIA RESERVA DONATARIA       |
      | Desigualdade De Partilha | MARIA PARTILHA DONATARIA      |
      | Extinção De Usufruto     | MARIA EXTINCAO DONATARIA      |
      | Instituição De Usufruto  | MARIA INSTITUICAO DONATARIA   |
      | Nua Propriedade          | MARIA NUA PROPRIEDADE         |
      | Renúncia De Herança      | MARIA RENUNCIA HERANCA        |
      | Renúncia De Usufruto     | MARIA RENUNCIA USUFRUTO       |

  @separacao_nao_exibe_donatario
  Cenário: Validar que tipos de Separação sob Doação não exibem cadastro de Donatário
    Quando seleciono o tipo "Separação Judicial"
    E acesso a aba "Pessoas"
    Então o card para cadastrar Donatário não deve ser exibido
