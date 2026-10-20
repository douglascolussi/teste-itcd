# language: pt
# encoding: UTF-8

@dados_gerais @causa_mortis @regressao
Funcionalidade: Regras Condicionais - Causa Mortis
  Como um analista de testes
  Quero validar que campos específicos aparecem conforme a combinação de Natureza e Tipo
  Para garantir a integridade dos dados da guia

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"

  @extrajudicial
  Cenário: Campos específicos para Inventariante em Extrajudicial
    Quando seleciono o tipo "Extrajudicial"
    Então o campo "Certidão de Óbito" deve ficar visível e obrigatório
    E devo visualizar os campos "Cartório" e "Estado (UF) de Tramitação" como obrigatórios
    E ao responder "Sim" para "O inventariante já foi nomeado?"
    Então o campo "Data da nomeação do inventariante" deve ficar visível e obrigatório
    E o campo "Escritura pública de nomeação de inventariante" deve ficar visível e obrigatório

  @judicial
  Esquema do Cenário: Campos de Sentença, Testamento e Anexos em tipos Judiciais
    Quando seleciono o tipo "<tipo>"
    E respondo "<ja_homologada>" para "Já ocorreu sentença homologatória?"
    Então o campo "Data da sentença homologatória da partilha ou adjudicação" deve estar "<estado_sentenca>"
    E o campo "<campo_arquivo>" deve ficar visível e obrigatório
    E o campo "Certidão de Óbito" deve ficar visível e obrigatório
    Quando respondo "<tem_testamento>" para "Existe Testamento?"
    Então o campo "Proc. judicial de abertura, registro e cumprimento do testamento" deve estar "<estado_testamento>"

    Exemplos:
      | tipo            | ja_homologada | estado_sentenca | campo_arquivo                                | tem_testamento | estado_testamento |
      | Ordinário       | Sim           | visível         | Sentença homologatória da partilha ou adjudicação | Não            | oculto            |
      | Ordinário       | Não           | oculto          | Petição Inicial com Comprovação de Protocolo | Sim            | visível           |
      | Arrolamento     | Sim           | visível         | Sentença homologatória da partilha ou adjudicação | Sim            | visível           |
      | Alvará Judicial | Não           | oculto          | Petição Inicial com Comprovação de Protocolo | Não            | oculto            |

  @validacao_obrigatoriedade
  Cenário: Validação de mensagens de erro ao tentar avançar sem documentos
    Quando seleciono o tipo "Extrajudicial"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Certidão de Óbito, Cartório e Estado (UF) de Tramitação"
    E ao responder "Sim" para "O inventariante já foi nomeado?"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Data da nomeação do inventariante e Escritura pública de nomeação de inventariante"

  @validacao_obrigatoriedade @judicial
  Cenário: Validação de mensagens de erro em Judicial
    Quando seleciono o tipo "Ordinário"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Número de Processo, Data de Protocolo e Estado (UF) de Tramitação"
    E devo visualizar a mensagem "Campo obrigatório" para os campos "Petição Inicial com Comprovação de Protocolo e Certidão de Óbito"
    Quando respondo "Sim" para "Já ocorreu sentença homologatória?"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Data da sentença homologatória da partilha ou adjudicação e Sentença homologatória da partilha ou adjudicação"
    Quando respondo "Sim" para "Existe Testamento?"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Proc. judicial de abertura, registro e cumprimento do testamento"
