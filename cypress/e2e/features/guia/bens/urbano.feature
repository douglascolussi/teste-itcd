# language: pt
# encoding: UTF-8

@guia @bens @urbano @regressao
Funcionalidade: Cadastro e Validação do Bem Imóvel Urbano
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do imóvel urbano na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do bem urbano em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Urbano"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Município" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Matrícula" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "CEP" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo do Logradouro" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Logradouro" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Número" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Bairro" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição do Imóvel / Complemento" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Lote" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quadra" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo do Imóvel" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Área Construída" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor total declarado" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual da propriedade total que será doado" do imóvel urbano
    E devo visualizar a mensagem "Deve possuir pelo menos 1 item" para o campo "Inscrições municipais" do imóvel urbano

  @condicionais_doacao
  Cenário: Regras condicionais de número e tipo de imóvel em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Urbano"
    Quando marco que o imóvel urbano não tem número
    Então o campo "Número" do imóvel urbano deve estar "desabilitado"
    Quando desmarco que o imóvel urbano não tem número
    Então o campo "Número" do imóvel urbano deve estar "habilitado"
    Quando seleciono o Tipo do Imóvel urbano "Apartamento"
    Então o campo "Área do Terreno" do imóvel urbano deve estar "desabilitado"
    E o campo "Área Construída" do imóvel urbano deve estar "habilitado"
    Quando seleciono o Tipo do Imóvel urbano "Terreno"
    Então o campo "Área do Terreno" do imóvel urbano deve estar "habilitado"
    E o campo "Área Construída" do imóvel urbano deve estar "desabilitado"
    Quando seleciono o Tipo do Imóvel urbano "Casa"
    Então o campo "Área do Terreno" do imóvel urbano deve estar "habilitado"
    E o campo "Área Construída" do imóvel urbano deve estar "habilitado"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição do Bem Urbano em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Urbano"
    Quando seleciono o Município do imóvel urbano "Campo Grande"
    E preencho a Matrícula do imóvel urbano "11223"
    E preencho o CEP do imóvel urbano "79002000"
    E seleciono o Tipo do Logradouro do imóvel urbano "Rua"
    E preencho o Logradouro do imóvel urbano "14 de Julho"
    E preencho o Número do imóvel urbano "100"
    E preencho o Bairro do imóvel urbano "Centro"
    E preencho a Descrição ou Complemento do imóvel urbano "<nome>"
    E preencho o Lote do imóvel urbano "10"
    E preencho a Quadra do imóvel urbano "05"
    E seleciono o Tipo do Imóvel urbano "Casa"
    E preencho a Área do Terreno do imóvel urbano "200"
    E preencho a Área Construída do imóvel urbano "100"
    E preencho o Valor Total Declarado do imóvel urbano "350000"
    E preencho o Percentual que será doado do imóvel urbano "100"
    E adiciono uma inscrição municipal "987654321" no imóvel urbano
    E clico em salvar bem
    Então o bem urbano deve estar cadastrado na tabela com espécie "Urbano", município "Campo Grande" e valor "3.500,00"

    Exemplos:
      | tipo                     | nome                     |
      | Simples                  | CASA URBANA SIMPLES      |
      | Cessão De Direitos       | CASA URBANA CESSAO       |
      | Com Reserva De Usufruto  | CASA URBANA RESERVA      |
      | Desigualdade De Partilha | CASA URBANA DESIGUALD    |
      | Extinção De Usufruto     | CASA URBANA EXTINCAO     |
      | Instituição De Usufruto  | CASA URBANA INSTITUICAO  |
      | Nua Propriedade          | CASA URBANA NUA PROP     |
      | Renúncia De Herança      | CASA URBANA RENUNCIA H   |
      | Renúncia De Usufruto     | CASA URBANA RENUNCIA U   |

  @validacao_obrigatoriedade_causa_mortis
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do bem urbano em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Urbano"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Município" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Matrícula" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Certidão de Matrícula" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Data de aquisição" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Registro de aquisição na matrícula" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "CEP" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo do Logradouro" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Logradouro" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Número" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Bairro" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição do Imóvel / Complemento" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Lote" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quadra" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo do Imóvel" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Área do Terreno" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor total declarado" do imóvel urbano
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de propriedade do de cujus + eventual meeiro(a)" do imóvel urbano
    E devo visualizar a mensagem "Deve possuir pelo menos 1 item" para o campo "Inscrições municipais" do imóvel urbano

  @condicionais_causa_mortis
  Cenário: Regras condicionais de número, aquisição não registrada e tipo de imóvel em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Urbano"
    Quando marco que o imóvel urbano não tem número
    Então o campo "Número" do imóvel urbano deve estar "desabilitado"
    Quando desmarco que o imóvel urbano não tem número
    Então o campo "Número" do imóvel urbano deve estar "habilitado"
    Quando marco aquisição ainda não registrada do imóvel urbano
    Então o campo "Registro de aquisição na matrícula" do imóvel urbano deve estar "desabilitado"
    Quando desmarco aquisição ainda não registrada do imóvel urbano
    Então o campo "Registro de aquisição na matrícula" do imóvel urbano deve estar "habilitado"
    Quando seleciono o Tipo do Imóvel urbano "Apartamento"
    Então o campo "Área do Terreno" do imóvel urbano deve estar "desabilitado"
    E o campo "Área Construída" do imóvel urbano deve estar "habilitado"
    Quando seleciono o Tipo do Imóvel urbano "Terreno"
    Então o campo "Área do Terreno" do imóvel urbano deve estar "habilitado"
    E o campo "Área Construída" do imóvel urbano deve estar "desabilitado"
    Quando seleciono o Tipo do Imóvel urbano "Casa"
    Então o campo "Área do Terreno" do imóvel urbano deve estar "habilitado"
    E o campo "Área Construída" do imóvel urbano deve estar "habilitado"

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição do Bem Urbano em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Urbano"
    Quando seleciono o Município do imóvel urbano "Campo Grande"
    E preencho a Matrícula do imóvel urbano "33445"
    E anexo a certidão de matrícula do imóvel urbano
    E preencho a Data de aquisição do imóvel urbano "2019-05-15"
    E marco aquisição ainda não registrada do imóvel urbano
    E preencho o CEP do imóvel urbano "79002000"
    E seleciono o Tipo do Logradouro do imóvel urbano "Rua"
    E preencho o Logradouro do imóvel urbano "Dom Aquino"
    E preencho o Número do imóvel urbano "250"
    E preencho o Bairro do imóvel urbano "Centro"
    E preencho a Descrição ou Complemento do imóvel urbano "<nome>"
    E preencho o Lote do imóvel urbano "12"
    E preencho a Quadra do imóvel urbano "08"
    E seleciono o Tipo do Imóvel urbano "Casa"
    E preencho a Área do Terreno do imóvel urbano "250"
    E preencho a Área Construída do imóvel urbano "120"
    E preencho o Percentual de propriedade do de cujus do imóvel urbano "100"
    E preencho o Valor Total Declarado do imóvel urbano "450000"
    E adiciono uma inscrição municipal "123456789" com ficha imobiliária no imóvel urbano
    E clico em salvar bem
    Então o bem urbano deve estar cadastrado na tabela com espécie "Urbano", município "Campo Grande" e valor "4.500,00"

    Exemplos:
      | tipo            | nome                    |
      | Ordinário       | CASA URBANA ORDINARIO   |
      | Arrolamento     | CASA URBANA ARROLAM     |
      | Extrajudicial   | CASA URBANA EXTRAJUD    |
      | Alvará Judicial | CASA URBANA ALVARA      |
