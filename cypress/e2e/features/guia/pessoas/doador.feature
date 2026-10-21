# language: pt
# encoding: UTF-8

@guia @pessoas @doador @regressao
Funcionalidade: Cadastro e Validação do Doador (Doação)
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do doador na aba de Pessoas
  Para garantir a correta identificação do transmitente em todos os tipos de doação

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Doação"

  @validacao_obrigatoriedade
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do doador em branco
    Quando seleciono o tipo "Simples"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Doador
    Então a qualificação do doador deve ser "Doador"
    Quando clico em salvar doador
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "CPF/CNPJ" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Nome" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "E-Mail" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Telefone" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "CEP" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Endereço" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Bairro" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Número" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "UF" do doador
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Município" do doador

  @validacao_cpf_contato
  Cenário: Validar formatos inválidos de CPF, E-mail e Telefone do doador
    Quando seleciono o tipo "Simples"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Doador
    Quando preencho o CPF do doador "11111111111"
    E preencho o E-Mail do doador "email_invalido"
    E preencho o Telefone do doador "12345"
    E clico em salvar doador
    Então devo visualizar a mensagem "Campo inválido" para o campo "CPF/CNPJ" do doador
    E devo visualizar a mensagem "Campo inválido" para o campo "E-Mail" do doador
    E devo visualizar a mensagem "Campo inválido" para o campo "Telefone" do doador

  @cancelar_formulario
  Cenário: Cancelar preenchimento do formulário do doador
    Quando seleciono o tipo "Simples"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Doador
    Quando preencho o Nome do doador "TESTE CANCELAR"
    E clico em cancelar no formulário do doador
    Então o formulário do doador não deve ser exibido
    E o card para cadastrar Doador deve ser exibido

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição do card do Doador em todos os tipos de Doação
    Quando seleciono o tipo "<tipo>"
    E acesso a aba "Pessoas"
    E clico para cadastrar o Doador
    Então a qualificação do doador deve ser "Doador"
    Quando preencho o CPF do doador "01234567890"
    E preencho o Nome do doador "<nome>"
    E preencho o E-Mail do doador "carlos.doador@teste.com"
    E preencho o Telefone do doador "67999998888"
    E preencho o CEP "79002070"
    E preencho o número "100"
    E clico em salvar doador
    Então o card do doador "<nome>" com documento "012.345.678-90" deve ser exibido

    Exemplos:
      | tipo                     | nome                        |
      | Simples                  | CARLOS SILVA DOADOR         |
      | Cessão De Direitos       | CARLOS CESSAO DOADOR        |
      | Com Reserva De Usufruto  | CARLOS RESERVA DOADOR       |
      | Desigualdade De Partilha | CARLOS PARTILHA DOADOR      |
      | Extinção De Usufruto     | CARLOS EXTINCAO DOADOR      |
      | Instituição De Usufruto  | CARLOS INSTITUICAO DOADOR   |
      | Nua Propriedade          | CARLOS NUA PROPRIEDADE      |
      | Renúncia De Herança      | CARLOS RENUNCIA HERANCA     |
      | Renúncia De Usufruto     | CARLOS RENUNCIA USUFRUTO    |

  @separacao_nao_exibe_doador
  Cenário: Validar que tipos de Separação sob Doação não exibem cadastro de Doador
    Quando seleciono o tipo "Separação Judicial"
    E acesso a aba "Pessoas"
    Então o card para cadastrar Doador não deve ser exibido
