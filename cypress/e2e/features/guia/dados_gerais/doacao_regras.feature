# language: pt
# encoding: UTF-8

@dados_gerais @doacao @regressao
Funcionalidade: Regras Condicionais - Doação
  Como um analista de testes
  Quero validar que campos específicos aparecem conforme o tipo de Doação selecionado
  Para garantir que dados de usufruto, datas de ocorrência, processos e cartórios sejam coletados

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Doação"

  @extincao_usufruto
  Cenário: Campos obrigatórios para Extinção de Usufruto
    Quando seleciono o tipo "Extinção De Usufruto"
    Então o campo "Data do óbito do usufrutuário" deve ficar visível e obrigatório
    E o campo "Data do Registro da Doação com Reserva na Matrícula do Imóvel" deve ficar visível e obrigatório
    E o campo "Certidão de Óbito" deve estar "visível"
    E o campo "Declaração de ITCD relativa à doação com reserva de usufruto" deve estar "visível"

  @extincao_usufruto @validacao_obrigatoriedade
  Cenário: Validação de mensagens de erro ao tentar avançar em Extinção de Usufruto
    Quando seleciono o tipo "Extinção De Usufruto"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Data do Registro da Doação com Reserva na Matrícula do Imóvel, Certidão de Óbito e Declaração de ITCD relativa à doação com reserva de usufruto"

  @renuncia_usufruto
  Cenário: Campos específicos para Renúncia de Usufruto
    Quando seleciono o tipo "Renúncia De Usufruto"
    Então o campo "Data do Registro da Doação com Reserva na Matrícula do Imóvel" deve ficar visível e obrigatório
    E o campo "Declaração de ITCD relativa à doação com reserva de usufruto" deve estar "visível"
    E o campo "A Renúncia já ocorreu?" deve estar "visível"
    Quando ao responder "Não" para "A Renúncia já ocorreu?"
    Então o campo "Data da Renúncia" deve estar "oculto"
    E o campo "Comprovante da renúncia" deve estar "oculto"
    Quando ao responder "Sim" para "A Renúncia já ocorreu?"
    Então o campo "Data da Renúncia" deve ficar visível e obrigatório
    E o campo "Comprovante da renúncia" deve ficar visível e obrigatório

  @renuncia_usufruto @validacao_obrigatoriedade
  Cenário: Validação de mensagens de erro ao tentar avançar em Renúncia de Usufruto
    Quando seleciono o tipo "Renúncia De Usufruto"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Data do Registro da Doação com Reserva na Matrícula do Imóvel e Declaração de ITCD relativa à doação com reserva de usufruto"
    Quando ao responder "Sim" para "A Renúncia já ocorreu?"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Data da Renúncia e Comprovante da renúncia"

  @doacao_padrao
  Esquema do Cenário: Campos condicionais e validação em tipos de doação padrão
    Quando seleciono o tipo "<tipo>"
    Então o campo "A Doação já ocorreu?" deve estar "visível"
    Quando ao responder "Não" para "A Doação já ocorreu?"
    Então o campo "Data da doação" deve estar "oculto"
    E o campo "Comprovante de doação" deve estar "oculto"
    Quando ao responder "Sim" para "A Doação já ocorreu?"
    Então o campo "Data da doação" deve ficar visível e obrigatório
    E o campo "Comprovante de doação" deve estar "visível"
    Quando ao preencher uma data futura o sistema deve exibir erro "A data informada não pode ser superior à data atual"

    Exemplos:
      | tipo                     |
      | Simples                  |
      | Cessão De Direitos       |
      | Com Reserva De Usufruto  |
      | Desigualdade De Partilha |
      | Instituição De Usufruto  |
      | Nua Propriedade          |
      | Renúncia De Herança      |

  @doacao_padrao @validacao_obrigatoriedade
  Cenário: Validação de mensagens de erro ao tentar avançar em Doação Padrão
    Quando seleciono o tipo "Simples"
    E ao responder "Sim" para "A Doação já ocorreu?"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Data da doação e Comprovante de doação"

  @separacao_judicial
  Cenário: Campos específicos para Separação Judicial
    Quando seleciono o tipo "Separação Judicial"
    Então o campo "Número de Processo" deve ficar visível e obrigatório
    E o campo "Data do trânsito em julgado da sentença que homologou a partilha" deve ficar visível e obrigatório
    E o campo "Estado (UF) de Tramitação" deve ficar visível e obrigatório
    E o campo "Carta de sentença" deve ficar visível e obrigatório

  @separacao_judicial @validacao_obrigatoriedade
  Cenário: Validação de mensagens de erro ao tentar avançar em Separação Judicial
    Quando seleciono o tipo "Separação Judicial"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Número de Processo, Estado (UF) de Tramitação e Carta de sentença"

  @separacao_judicial @validacao_formato
  Cenário: Validação de formato inválido e máscara no Número de Processo em Separação Judicial
    Quando seleciono o tipo "Separação Judicial"
    E preencho o número do processo "12345"
    Então devo visualizar a mensagem "Campo inválido" para o campo "Número de Processo"
    Quando preencho o número do processo "08001234520238120001"
    Então não devo visualizar mensagem de erro para o campo "Número de Processo"

  @separacao_judicial @validacao_data_futura
  Cenário: Validação de data futura do trânsito em julgado em Separação Judicial
    Quando seleciono o tipo "Separação Judicial"
    Quando ao preencher uma data futura no campo "Data do trânsito em julgado da sentença que homologou a partilha" o sistema deve exibir erro "A data informada não pode ser superior à data atual"

  @separacao_extrajudicial
  Cenário: Campos específicos e condicionais para Separação Extrajudicial
    Quando seleciono o tipo "Separação Extrajudicial"
    Então o campo "Cartório" deve ficar visível e obrigatório
    E o campo "Estado (UF) de Tramitação" deve ficar visível e obrigatório
    E o campo "Já ocorreu lavratura da escritura?" deve estar "visível"
    Quando ao responder "Não" para "Já ocorreu lavratura da escritura?"
    Então o campo "Data da lavratura da escrita" deve estar "oculto"
    E o campo "Minuta de escritura pública de inventário" deve ficar visível e obrigatório
    Quando ao responder "Sim" para "Já ocorreu lavratura da escritura?"
    Então o campo "Data da lavratura da escrita" deve ficar visível e obrigatório
    E o campo "Escritura Pública de Inventário e Partilha" deve ficar visível e obrigatório

  @separacao_extrajudicial @validacao_obrigatoriedade
  Cenário: Validação de mensagens de erro ao tentar avançar em Separação Extrajudicial
    Quando seleciono o tipo "Separação Extrajudicial"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Cartório e Estado (UF) de Tramitação"
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Minuta de escritura pública de inventário"
    Quando ao responder "Sim" para "Já ocorreu lavratura da escritura?"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para o campo "Data da lavratura da escrita"
    E devo visualizar a mensagem "Campo obrigatório" para o campo "Escritura Pública de Inventário e Partilha"

  @separacao_extrajudicial @validacao_data_futura
  Cenário: Validação de data futura da lavratura da escrita em Separação Extrajudicial
    Quando seleciono o tipo "Separação Extrajudicial"
    E ao responder "Sim" para "Já ocorreu lavratura da escritura?"
    Quando ao preencher uma data futura no campo "Data da lavratura da escrita" o sistema deve exibir erro "A data informada não pode ser superior à data atual"

  @separacao_extrajudicial @validacao_cartorio
  Cenário: Validação de preenchimento e resolução de erros em Cartório e Estado de Tramitação
    Quando seleciono o tipo "Separação Extrajudicial"
    E clico em avançar
    Então devo visualizar a mensagem "Campo obrigatório" para os campos "Cartório e Estado (UF) de Tramitação"
    Quando preencho o cartório "1º Ofício de Notas"
    E seleciono o estado de tramitação "MS"
    E clico em avançar
    Então não devo visualizar a mensagem "Campo obrigatório" para os campos "Cartório e Estado (UF) de Tramitação"

