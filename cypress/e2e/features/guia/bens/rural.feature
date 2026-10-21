# language: pt
# encoding: UTF-8

@guia @bens @rural @regressao
Funcionalidade: Cadastro e Validação do Bem Imóvel Rural
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações do imóvel rural na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do bem rural em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Rural"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Município" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Matrícula" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Distância ao município mais próximo" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Qualidade do acesso ao imóvel" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo do Imóvel" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Nome/Descrição do Imóvel" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Área Total na Matrícula" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Área Doada" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual que será doado" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do imóvel rural

  @condicionais_doacao
  Cenário: Regras condicionais de CIB, IE, CAR, Coordenadas e ITR em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Rural"
    Quando respondo "Não" para possui número no cadastro imobiliário brasileiro do imóvel rural
    Então o campo "Número no Cadastro Imobiliário Brasileiro (CIB)" do imóvel rural deve estar "desabilitado"
    Quando respondo "Sim" para possui número no cadastro imobiliário brasileiro do imóvel rural
    Então o campo "Número no Cadastro Imobiliário Brasileiro (CIB)" do imóvel rural deve estar "habilitado"
    Quando respondo "Não" para possui inscrição estadual do imóvel rural
    Então o campo "Inscrição Estadual" do imóvel rural deve estar "desabilitado"
    Quando respondo "Sim" para possui inscrição estadual do imóvel rural
    Então o campo "Inscrição Estadual" do imóvel rural deve estar "habilitado"
    Quando respondo "Não" para cadastrado no CAR do imóvel rural
    Então o campo "Número no Cadastro Ambiental Rural (CAR)" do imóvel rural deve estar "desabilitado"
    Quando respondo "Sim" para cadastrado no CAR do imóvel rural
    Então o campo "Número no Cadastro Ambiental Rural (CAR)" do imóvel rural deve estar "habilitado"
    Quando respondo "Não" para tenho as coordenadas do imóvel rural
    Então o campo "Latitude do imóvel" do imóvel rural deve estar "desabilitado"
    E o campo "Longitude do imóvel" do imóvel rural deve estar "desabilitado"
    Quando respondo "Sim" para tenho as coordenadas do imóvel rural
    Então o campo "Latitude do imóvel" do imóvel rural deve estar "habilitado"
    E o campo "Longitude do imóvel" do imóvel rural deve estar "habilitado"
    Quando respondo "Sim" para há declaração de ITR do imóvel rural
    Então o campo "Justificativa" do imóvel rural deve estar "desabilitado"
    Quando respondo "Não" para há declaração de ITR do imóvel rural
    Então o campo "Justificativa" do imóvel rural deve estar "habilitado"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição do Bem Rural em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Rural"
    Quando seleciono o Município do imóvel rural "Campo Grande"
    E preencho a Matrícula do imóvel rural "12345"
    E respondo "Não" para possui número no cadastro imobiliário brasileiro do imóvel rural
    E respondo "Não" para possui inscrição estadual do imóvel rural
    E respondo "Não" para cadastrado no CAR do imóvel rural
    E respondo "Não" para tenho as coordenadas do imóvel rural
    E seleciono a Distância ao município mais próximo do imóvel rural "Até 20km"
    E seleciono a Qualidade do acesso ao imóvel rural "Acesso por Asfalto"
    E seleciono o Tipo do Imóvel rural "Fazenda"
    E preencho o Nome do Imóvel rural "<nome>"
    E preencho a Área Total na Matrícula do imóvel rural "100"
    E preencho o Percentual que será doado do imóvel rural "50"
    E respondo "Não" para há declaração de ITR do imóvel rural
    E preencho a Justificativa de ausência de ITR do imóvel rural "Imóvel rural sem ITR para teste"
    E preencho o Valor Total Declarado do imóvel rural "500000"
    E clico em salvar bem
    Então o bem rural deve estar cadastrado na tabela com espécie "Rural", município "Campo Grande" e valor "5.000,00"

    Exemplos:
      | tipo                     | nome                      |
      | Simples                  | FAZENDA RURAL SIMPLES     |
      | Cessão De Direitos       | FAZENDA RURAL CESSAO      |
      | Com Reserva De Usufruto  | FAZENDA RURAL RESERVA     |
      | Desigualdade De Partilha | FAZENDA RURAL DESIGUALD   |
      | Extinção De Usufruto     | FAZENDA RURAL EXTINCAO    |
      | Instituição De Usufruto  | FAZENDA RURAL INSTITUICAO |
      | Nua Propriedade          | FAZENDA RURAL NUA PROP    |
      | Renúncia De Herança      | FAZENDA RURAL RENUNCIA H  |
      | Renúncia De Usufruto     | FAZENDA RURAL RENUNCIA U  |

  @validacao_obrigatoriedade_causa_mortis
  Cenário: Validar campos obrigatórios ao tentar salvar formulário do bem rural em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Rural"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Município" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Matrícula" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Certidão de Matrícula" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Data de aquisição" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Registro de aquisição na matrícula" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Distância ao município mais próximo" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Qualidade do acesso ao imóvel" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Tipo do Imóvel" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Nome/Descrição do Imóvel" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Área Total na Matrícula" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Percentual de propriedade do de cujus + eventual meeiro(a)" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Área Inventariada" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Declaração de ITR" do imóvel rural
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor Total Declarado" do imóvel rural

  @condicionais_causa_mortis
  Cenário: Regras condicionais de Aquisição não registrada e ITR em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Rural"
    Quando marco aquisição ainda não registrada do imóvel rural
    Então o campo "Registro de aquisição na matrícula" do imóvel rural deve estar "desabilitado"
    Quando desmarco aquisição ainda não registrada do imóvel rural
    Então o campo "Registro de aquisição na matrícula" do imóvel rural deve estar "habilitado"
    Quando respondo "Não" para há declaração de ITR do imóvel rural
    Então o campo "Declaração de ITR" do imóvel rural deve estar "desabilitado"
    E o campo "Justificativa" do imóvel rural deve estar "habilitado"
    Quando respondo "Sim" para há declaração de ITR do imóvel rural
    Então o campo "Declaração de ITR" do imóvel rural deve estar "habilitado"
    E o campo "Justificativa" do imóvel rural deve estar "desabilitado"

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição do Bem Rural em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Imóvel Rural"
    Quando seleciono o Município do imóvel rural "Campo Grande"
    E preencho a Matrícula do imóvel rural "54321"
    E anexo a certidão de matrícula do imóvel rural
    E preencho a Data de aquisição do imóvel rural "2018-03-20"
    E marco aquisição ainda não registrada do imóvel rural
    E respondo "Não" para possui número no cadastro imobiliário brasileiro do imóvel rural
    E respondo "Não" para possui inscrição estadual do imóvel rural
    E respondo "Não" para cadastrado no CAR do imóvel rural
    E respondo "Não" para tenho as coordenadas do imóvel rural
    E seleciono a Distância ao município mais próximo do imóvel rural "Até 20km"
    E seleciono a Qualidade do acesso ao imóvel rural "Acesso por Asfalto"
    E seleciono o Tipo do Imóvel rural "Fazenda"
    E preencho o Nome do Imóvel rural "<nome>"
    E preencho a Área Total na Matrícula do imóvel rural "150"
    E preencho o Percentual de propriedade do de cujus do imóvel rural "100"
    E respondo "Não" para há declaração de ITR do imóvel rural
    E preencho a Justificativa de ausência de ITR do imóvel rural "Imóvel rural sem ITR para teste causa mortis"
    E preencho o Valor Total Declarado do imóvel rural "750000"
    E clico em salvar bem
    Então o bem rural deve estar cadastrado na tabela com espécie "Rural", município "Campo Grande" e valor "7.500,00"

    Exemplos:
      | tipo            | nome                       |
      | Ordinário       | FAZENDA RURAL ORDINARIO    |
      | Arrolamento     | FAZENDA RURAL ARROLAM      |
      | Extrajudicial   | FAZENDA RURAL EXTRAJUD     |
      | Alvará Judicial | FAZENDA RURAL ALVARA       |
