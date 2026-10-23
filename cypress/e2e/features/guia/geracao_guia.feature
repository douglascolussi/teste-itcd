# language: pt
# encoding: UTF-8

@itcd @geracao_guia @regressao
Funcionalidade: Cadastro, Validação e Finalização de Todos os Tipos de Guia
  Como um declarante ou usuário autenticado no sistema ITCD
  Quero preencher todas as etapas da declaração (Dados Gerais, Pessoas, Bens e Arquivos)
  Para validar a finalização com sucesso de todos os tipos de guia, tanto por Rascunho quanto por Encaminhamento para Análise

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @doacao @rascunho
  Esquema do Cenário: Salvar como rascunho declaração no tipo "<tipo>" de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E preencho os dados gerais válidos para a natureza "Doação" e tipo "<tipo>"
    E possuo as pessoas obrigatórias cadastradas para a natureza "Doação" e tipo "<tipo>"
    E possuo um bem válido cadastrado na declaração
    E possuo um documento comprobatório anexado na aba Arquivos
    E clico em salvar como rascunho a declaração
    Então devo visualizar a confirmação de que a guia foi salva com a mensagem "O Rascunho da guia foi salvo!"

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
      | Separação Judicial       |
      | Separação Extrajudicial  |

  @doacao @encaminhar_analise
  Esquema do Cenário: Salvar e encaminhar para análise declaração no tipo "<tipo>" de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E preencho os dados gerais válidos para a natureza "Doação" e tipo "<tipo>"
    E possuo as pessoas obrigatórias cadastradas para a natureza "Doação" e tipo "<tipo>"
    E possuo um bem válido cadastrado na declaração
    E possuo um documento comprobatório anexado na aba Arquivos
    E clico em salvar e encaminhar para análise a declaração
    Então devo visualizar a confirmação de que a guia foi salva com a mensagem "A guia foi incluída com successo!"

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
      | Separação Judicial       |
      | Separação Extrajudicial  |

  @causa_mortis @rascunho
  Esquema do Cenário: Salvar como rascunho declaração no tipo "<tipo>" de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E preencho os dados gerais válidos para a natureza "Causa Mortis" e tipo "<tipo>"
    E possuo as pessoas obrigatórias cadastradas para a natureza "Causa Mortis" e tipo "<tipo>"
    E possuo um bem válido cadastrado na declaração
    E possuo um documento comprobatório anexado na aba Arquivos
    E clico em salvar como rascunho a declaração
    Então devo visualizar a confirmação de que a guia foi salva com a mensagem "O Rascunho da guia foi salvo!"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |

  @causa_mortis @encaminhar_analise
  Esquema do Cenário: Salvar e encaminhar para análise declaração no tipo "<tipo>" de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E preencho os dados gerais válidos para a natureza "Causa Mortis" e tipo "<tipo>"
    E possuo as pessoas obrigatórias cadastradas para a natureza "Causa Mortis" e tipo "<tipo>"
    E possuo um bem válido cadastrado na declaração
    E possuo um documento comprobatório anexado na aba Arquivos
    E clico em salvar e encaminhar para análise a declaração
    Então devo visualizar a confirmação de que a guia foi salva com a mensagem "A guia foi incluída com successo!"

    Exemplos:
      | tipo            |
      | Ordinário       |
      | Arrolamento     |
      | Extrajudicial   |
      | Alvará Judicial |
