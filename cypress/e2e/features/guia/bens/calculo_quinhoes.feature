# language: pt
# encoding: UTF-8

@guia @bens @calculo_quinhoes @causa_mortis @sucessao @regressao
Funcionalidade: US – Cálculo de Quinhões Individualizado
  Como Gestor do Sistema do ITCD
  Quero que o sistema calcule automaticamente o percentual de quinhão de cada sucessor
  Para que a partilha da herança seja realizada de forma correta, conforme as regras legais e a estrutura de sucessão

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"

  # ====================================================================
  # REGRA 01 & 04: RENÚNCIA E ELEGIBILIDADE (CA01, CA02, CA03)
  # ====================================================================

  @renuncia @exclusao_renunciante @ca01
  Cenário: CA01 – Exclusão de renunciante do cálculo de partilha
    Dado que o falecido possuía 2 herdeiros filhos e um deles renunciou à herança
    Quando o cálculo for iniciado na aba de bens
    Então o herdeiro renunciante deve ser removido do cálculo e não gerar representação

  @renuncia @redistribuicao @ca02
  Cenário: CA02 – Redistribuição de percentuais após renúncia entre herdeiros da mesma classe
    Dado que há renúncia entre herdeiros da mesma classe
    Quando o cálculo for executado
    Então o sistema deve redistribuir os percentuais entre os demais herdeiros da mesma classe atribuindo 100% ao herdeiro remanescente

  @renuncia @classe_esgotada @ca03
  Cenário: CA03 – Avanço de classe sucessória quando a classe precedente estiver esgotada por renúncia
    Dado que todos os herdeiros de uma classe renunciaram
    Quando o cálculo for executado
    Então o sistema deve avançar para a próxima classe sucessória válida

  # ====================================================================
  # REGRA 03 & 05: PRÉ-MORTO, PÓS-MORTO E ESTIRPE (CA04, CA05, CA06, CA08, CA09)
  # ====================================================================

  @pre_morto @estirpe @ca04
  Cenário: CA04 – Sucessor pré-morto com descendentes gerando estirpe
    Dado que existe sucessor pré-morto com descendentes
    Quando o cálculo for executado
    Então deve ser criada uma estirpe para ele com o quinhão dividido entre os seus descendentes

  @pre_morto @sem_descendentes @ca05
  Cenário: CA05 – Sucessor pré-morto sem descendentes desconsiderado do cálculo
    Dado que existe sucessor pré-morto sem descendentes
    Quando o cálculo for executado
    Então ele deve ser desconsiderado

  @pos_morto @ca06
  Cenário: CA06 – Sucessor pós-morto participando normalmente do cálculo
    Dado que existe sucessor pós-morto
    Quando o cálculo for executado
    Então ele deve receber o percentual do quinhão normalmente

  @multiplos_status @ca08
  Cenário: CA08 – Múltiplos sucessores pré-mortos com descendentes
    Dado que existem múltiplos pré-mortos com descendentes
    Quando o cálculo for executado
    Então o sistema deve gerar uma quota percentual para cada herdeiro descendente

  @divisao_estirpe @ca09
  Cenário: CA09 – Divisão igualitária do quinhão dentro da estirpe
    Dado que existe uma estirpe
    Quando o percentual for calculado
    Então ele deve ser dividido igualmente entre os descendentes limitando-se ao respectivo quinhão da estirpe

  # ====================================================================
  # REGRA 02 & 07: COMPOSIÇÃO DO DIVISOR E CLASSES (CA07, CA10, CA14, CA15)
  # ====================================================================

  @divisor @ca07
  Cenário: CA07 – Composição do divisor considerando apenas herdeiros elegíveis e estirpes
    Dado que existem sucessores com diferentes status
    Quando o cálculo for realizado
    Então o divisor deve considerar apenas elegíveis e estirpes

  @ordem_sucessoria @ca10
  Cenário: CA10 – Observância da ordem sucessória legal
    Dado que existem sucessores de diferentes classes
    Quando o cálculo iniciar
    Então o sistema deve usar a primeira classe válida

  @percentual_base @ca14
  Cenário: CA14 – Percentual base distribuído igualmente entre os herdeiros
    Dado que o divisor foi definido
    Quando o cálculo for executado
    Então o percentual deve ser 100% dividido pelo total de herdeiros

  @soma_total @ca15
  Cenário: CA15 – Garantia de integridade com soma total de 100%
    Dado que o cálculo foi concluído
    Quando o sistema somar todos os quinhões
    Então o total deve ser 100%

  # ====================================================================
  # REGRA 06: RESERVA DA QUARTA PARTE (1/4 - 25%) AO CÔNJUGE (CA11, CA12, CA13)
  # ====================================================================

  @reserva_quarto @filhos_comuns @ca11
  Cenário: CA11 – Aplicação da reserva de 1/4 (25%) para cônjuge sobrevivente com filhos comuns
    Dado que existe descendentes comuns entre o cônjuge e o falecido
    Quando o cálculo for executado
    Então o cônjuge deve receber no mínimo 25% do monte partilhável

  @nao_aplicacao_quarto @filho_nao_comum @ca12
  Cenário: CA12 – Não aplicação da reserva de 1/4 quando houver filho não comum
    Dado que existe descendente não comum, ou seja, filho apenas do falecido
    Quando o cálculo for executado
    Então não aplica a reserva de 1/4

  @validacao_descendencia @ca13
  Cenário: CA13 – Bloqueio do fluxo se não for possível validar descendência comum
    Dado que não é possível validar descendência comum
    Quando o cálculo for executado
    Então o sistema deve bloquear o fluxo

  # ====================================================================
  # REGRA 08: INTEGRIDADE, BLOQUEIOS E REPROCESSAMENTO (CA16, CA17, CA18)
  # ====================================================================

  @bloqueio_sem_falecido @ca16
  Cenário: CA16 – Bloqueio de cálculo na ausência do autor da herança
    Dado que não existe autor da herança
    Quando o cálculo for solicitado
    Então o sistema deve bloquear a execução

  @inconsistencia_dados @ca17
  Cenário: CA17 – Impedimento do cálculo em caso de erro na estrutura de parentesco
    Dado que há erro na estrutura de parentesco
    Quando o cálculo for executado
    Então o sistema deve impedir o processamento

  @reprocessamento @ca18
  Cenário: CA18 – Reprocessamento integral após alteração de dados dos sucessores
    Dado que houve alteração nos dados dos sucessores
    Quando o cálculo for executado novamente
    Então o sistema deve recalcular integralmente

  # ====================================================================
  # REGRA: CONCORRÊNCIA DO CÔNJUGE COM AVÓS DE AMBAS AS LINHAS EM CUB
  # ====================================================================

  @concorrencia_avos @cub @bens_comuns @bens_particulares
  Cenário: Concorrência do cônjuge com avós de ambas as linhas sob regime de comunhão universal de bens
    Dado um caso de CUB com concorrência do cônjuge com avós de ambas as linhas
    Quando o cálculo for executado
    Então o cônjuge deve receber 1/2 da herança (25% dos comuns e 50% dos particulares), além da meação
    E a divisão entre avós deve respeitar a proporção por linha (paterna/materna) após a parcela do cônjuge

  # ====================================================================
  # REGRA: CÔNJUGE COMO ÚNICO HERDEIRO EM CPB (BENS COMUNS E PARTICULARES)
  # ====================================================================

  @cpb @conjuge_unico_herdeiro @bens_comuns @bens_particulares
  Cenário: CPB — cônjuge único herdeiro
    Dado um caso de CPB onde o cônjuge é o único herdeiro
    Quando o cálculo for executado para bem comum e bem particular
    Então o sistema deve atribuir ao cônjuge 50% de meação e 50% de herança nos bens comuns
    E deve atribuir ao cônjuge 100% de herança nos bens particulares

  # ====================================================================
  # REGRA: CONCORRÊNCIA DO CÔNJUGE COM PAI E MÃE EM CPB
  # ====================================================================

  @cpb @concorrencia_pai_mae @bens_comuns @bens_particulares
  Cenário: Concorrência do cônjuge com pai e mãe sob regime de comunhão parcial de bens
    Dado um caso de CPB com concorrência do cônjuge com pai e mãe
    Quando o cálculo for executado para bem comum e bem particular
    Então o cônjuge deve receber 16,67% de herança sobre bens comuns, além da meação de 50%
    E a divisão entre pai e mãe nos bens comuns deve ser de 16,67% para cada
    E no bem particular a herança deve ser dividida em 33,33% para cônjuge, pai e mãe
    