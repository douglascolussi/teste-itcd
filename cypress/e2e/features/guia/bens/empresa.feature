# language: pt
# encoding: UTF-8

@guia @bens @empresa @regressao
Funcionalidade: Cadastro e Validação do Bem Empresa
  Como um declarante ou usuário autenticado
  Quero cadastrar as informações de empresas e participações societárias na aba de Bens
  Para garantir a correta declaração patrimonial em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de empresa em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Empresa"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "CNPJ" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Nome/Razão Social" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "UF da sede" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Município da sede" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Capital Social" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Patrimônio Líquido" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade de cotas/ações total" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade de cotas/ações doadas" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor por cota declarado" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor das cotas doadas declarado" do bem empresa

  @condicionais_doacao
  Cenário: Regras condicionais de inscrição estadual em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Empresa"
    Então o campo "Inscrição Estadual" do bem empresa deve estar "desabilitado"
    Quando seleciono "Sim" para A empresa possui Inscrição Estadual do bem empresa
    Então o campo "Inscrição Estadual" do bem empresa deve estar "habilitado"
    Quando seleciono "Não" para A empresa possui Inscrição Estadual do bem empresa
    Então o campo "Inscrição Estadual" do bem empresa deve estar "desabilitado"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de Empresa em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Empresa"
    Quando preencho o CNPJ do bem empresa "11222333000181"
    E preencho o Nome ou Razão Social do bem empresa "Empresa Modelo Ltda"
    E seleciono a UF da sede do bem empresa "MS"
    E seleciono o Município da sede do bem empresa "Campo Grande"
    E preencho o Capital Social do bem empresa "10000000"
    E preencho o Patrimônio Líquido do bem empresa "10000000"
    E preencho a Quantidade de cotas total do bem empresa "100000"
    E preencho a Quantidade de cotas doadas do bem empresa "10000"
    E preencho o Valor por cota declarado do bem empresa "10000"
    E clico em salvar bem
    Então o bem empresa deve estar cadastrado na tabela com espécie "Empresa", resumo "Empresa Modelo Ltda, CNPJ: 11.222.333/0001-81, Cotas doadas: 100,00" e valor "10.000,00"

    Exemplos:
      | tipo                     |
      | Simples                  |
      | Cessão De Direitos       |
      | Com Reserva De Usufruto  |
      | Desigualdade De Partilha |
      | Extinção De Usufruto     |
      | Instituição De Usufruto  |
      | Nua Propriedade          |
      | Renúncia De Herança      |
      | Renúncia De Usufruto     |

  @validacao_obrigatoriedade_causa_mortis
  Cenário: Validar campos obrigatórios ao tentar salvar formulário de empresa em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Empresa"
    E clico em salvar bem
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "CNPJ" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Nome/Razão Social" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "UF da sede" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Município da sede" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Capital Social" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Contrato Social" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Patrimônio Líquido" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Balanço Patrimonial" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade de cotas/ações total" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Quantidade de cotas/ações inventariadas" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor por cota declarado" do bem empresa
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Valor total das cotas inventariadas declarado" do bem empresa

  @condicionais_causa_mortis
  Cenário: Regras condicionais de inscrição estadual e declaração de contabilista em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Empresa"
    Então o campo "Inscrição Estadual" do bem empresa deve estar "desabilitado"
    E o campo "Declaração do profissional contabilista responsável" do bem empresa deve estar "desabilitado"
    Quando seleciono "Sim" para A empresa possui Inscrição Estadual do bem empresa
    Então o campo "Inscrição Estadual" do bem empresa deve estar "habilitado"
    Quando seleciono "Sim" para Empresa Desobrigada a Elaboração de Balanço Patrimonial do bem empresa
    Então o campo "Declaração do profissional contabilista responsável" do bem empresa deve estar "habilitado"
    Quando seleciono "Não" para Empresa Desobrigada a Elaboração de Balanço Patrimonial do bem empresa
    Então o campo "Declaração do profissional contabilista responsável" do bem empresa deve estar "desabilitado"

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de Empresa em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Bens"
    E clico para adicionar um Bem
    E seleciono a espécie do bem "Empresa"
    Quando preencho o CNPJ do bem empresa "11222333000181"
    E preencho o Nome ou Razão Social do bem empresa "Empresa Modelo Ltda"
    E seleciono a UF da sede do bem empresa "MS"
    E seleciono o Município da sede do bem empresa "Campo Grande"
    E preencho o Capital Social do bem empresa "10000000"
    E anexo o Contrato Social do bem empresa
    E preencho o Patrimônio Líquido do bem empresa "10000000"
    E anexo o Balanço Patrimonial do bem empresa
    E preencho a Quantidade de cotas total do bem empresa "100000"
    E preencho a Quantidade de cotas inventariadas do bem empresa "20000"
    E preencho o Valor por cota declarado do bem empresa "10000"
    E clico em salvar bem
    Então o bem empresa deve estar cadastrado na tabela com espécie "Empresa", resumo "Empresa Modelo Ltda, CNPJ: 11.222.333/0001-81, Cotas inventariadas: 200,00" e valor "20.000,00"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
