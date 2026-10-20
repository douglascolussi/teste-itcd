# language: pt
# encoding: UTF-8

@dados_gerais @doacao @regressao
Funcionalidade: Regras Condicionais - Doação
  Como um analista de testes
  Quero validar que campos específicos aparecem conforme o tipo de Doação selecionado
  Para garantir que dados de usufruto e datas de ocorrência sejam coletados

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

  @renuncia_usufruto
  Cenário: Campos específicos para Renúncia de Usufruto
    Quando seleciono o tipo "Renúncia De Usufruto"
    Então o campo "Data do Registro da Doação com Reserva na Matrícula do Imóvel" deve ficar visível e obrigatório
    E ao responder "Sim" para "A Renúncia já ocorreu?"
    Então o campo "Data da Renúncia" deve ficar visível e obrigatório
    E o campo "Comprovante da renúncia" deve ficar visível e obrigatório
    E o campo "Declaração de ITCD relativa à doação com reserva de usufruto" deve estar "visível"

  @doacao_simples
  Cenário: Validação de data e anexos em Doação Simples
    Quando seleciono o tipo "Simples"
    E ao responder "Sim" para "A Doação já ocorreu?"
    Então o campo "Data da doação" deve ficar visível e obrigatório
    E o campo "Comprovante de doação" deve estar "visível"
    Quando ao preencher uma data futura o sistema deve exibir erro "A data informada não pode ser superior à data atual"
