# language: pt
# encoding: UTF-8

@guia @bens @divisao_bens @causa_mortis @meacao @regressao
Funcionalidade: Divisão do Bem para os Herdeiros e Direito de Meação (Causa Mortis)
  Como um declarante ou usuário autenticado
  Quero registrar os bens da sucessão com suas respectivas características patrimoniais
  Para garantir que as regras de meação e divisão dos quinhões hereditários sejam calculadas e gravadas corretamente

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Pessoas"

  # ====================================================================
  # REGRA 1: COMUNHÃO UNIVERSAL DE BENS
  # ====================================================================

  @meacao_comunhao_universal @bens_comuns
  Cenário: Garantir 50% como direito do meeiro sobre bens comuns adquiridos após o casamento em comunhão universal
    Dado que o falecido era casado no regime de comunhão universal de bens
    Quando adiciono um bem comum do casal na declaração com data de aquisição "2015-08-20"
    Então o sistema deve gravar que o percentual de "50,00 %" do total dos bens comuns pertence ao conjuge sobrevivente
    E o percentual de "50,00 %" deve ser registrado como direito do meeiro sobre todos bens comuns
    E os "50,00 %" restantes devem ser distribuídos para os herdeiros
    E ao salvar o bem comum os percentuais de partilha devem ser gravados com sucesso

  @meacao_comunhao_universal @independente_data_aquisicao
  Cenário: Garantir 50% ao meeiro independentemente da data de aquisição dos bens comuns em comunhão universal
    Dado que o falecido era casado no regime de comunhão universal de bens
    Quando adiciono um bem adquirido antes do casamento com a opção bem particular não selecionada
    Então o percentual de meação de "50,00 %" deve pertencer ao cônjuge independentemente da data de aquisição dos bens
    E os "50,00 %" restantes devem ser distribuídos para os herdeiros

  # ====================================================================
  # REGRA 2: COMUNHÃO PARCIAL DE BENS
  # ====================================================================

  @meacao_comunhao_parcial @bens_comuns_apos_casamento
  Cenário: Gravar 50% referente à meação quando não classificar como bem particular ou data for após o casamento
    Dado que o falecido era casado com regime de comunhão parcial de bens
    Quando o declarante não classificar como bem particular ou a data da aquisição for após a data do casamento
    Então o sistema deve gravar o percentual de "50,00 %" referente à meação
    E os "50,00 %" restantes devem ser distribuídos para os herdeiros
    E ao salvar o bem comum em comunhão parcial os percentuais de partilha devem ser gravados com sucesso

  @meacao_comunhao_parcial @aquisicao_apos_casamento
  Cenário: Aplicar meação de 50% para bens comuns adquiridos após a data do casamento sob regime de comunhão parcial
    Dado que o falecido era casado com regime de comunhão parcial de bens
    Quando o declarante adiciona um bem comum com data de aquisição após o casamento
    Então deve aplicar meação de "50,00 %" para o cônjuge sobre o bem comum adquirido após a data do casamento
    E os "50,00 %" restantes devem ser distribuídos para os herdeiros

  @meacao_comunhao_parcial @selecionado_como_comum
  Cenário: Aplicar meação de 50% quando o bem for selecionado como comum
    Dado que o falecido era casado com regime de comunhão parcial de bens
    Quando o declarante adiciona um bem selecionado como comum
    Então o sistema deve gravar o percentual de "50,00 %" referente à meação
    E os "50,00 %" restantes devem ser distribuídos para os herdeiros

  # ====================================================================
  # REGRA 3: UNIÃO ESTÁVEL E PARTICIPAÇÃO FINAL NOS AQUESTOS
  # ====================================================================

  @meacao_uniao_estavel_participacao_final @bens_comuns
  Cenário: Aplicar regras de meação da comunhão parcial para união estável ou regime de participação final nos aquestos
    Dado que o falecido vivia em união estável ou regime de participação final nos aquestos
    Quando o declarante seleciona o regime correspondente
    Então o sistema deve aplicar as mesmas regras de meação da comunhão parcial de bens, considerando 50% sobre os bens classificados como comuns

  @meacao_uniao_estavel @bens_comuns
  Cenário: Aplicar mesmas regras de meação da comunhão parcial para união estável sobre bens comuns
    Dado que o falecido vivia em união estável
    Quando o declarante seleciona o regime correspondente
    E o declarante adiciona um bem selecionado como comum
    Então o sistema deve aplicar as mesmas regras de meação da comunhão parcial de bens, considerando 50% sobre os bens classificados como comuns

  @meacao_participacao_final_aquestos @bens_comuns
  Cenário: Aplicar mesmas regras de meação da comunhão parcial para participação final nos aquestos sobre bens comuns
    Dado que o falecido era casado no regime de participação final nos aquestos
    Quando o declarante seleciona o regime correspondente
    E o declarante adiciona um bem comum com data de aquisição após o casamento
    Então o sistema deve aplicar as mesmas regras de meação da comunhão parcial de bens, considerando 50% sobre os bens classificados como comuns

  # ====================================================================
  # REGRA 4: APURAÇÃO DO MONTE PARTILHÁVEL E VALOR PARA CÁLCULO (VPC)
  # ====================================================================

  @monte_partilhavel @meacao @ca01
  Cenário: CA01 - Apuração do monte partilhável com existência de meação
    Dado que existem bens comuns sujeitos à meação e que os bens foram previamente apurados e classificados
    Quando o sistema calcular o monte partilhável
    Então deve considerar 50% dos bens comuns excluindo a meação do cônjuge sobrevivente e 100% dos bens particulares

  @monte_partilhavel @sem_meacao @ca02
  Cenário: CA02 - Apuração do monte partilhável sem existência de meação
    Dado que não existem bens sujeitos à meação
    Quando o sistema calcular o monte partilhável
    Então deve considerar 100% dos bens apurados

  @monte_partilhavel @copropriedade @vpc @ca03
  Cenário: CA03 - Com copropriedade ajuste pelo percentual de titularidade do falecido
    Dado que o falecido era titular de apenas parte de um bem em copropriedade com terceiros
    Quando o sistema apurar o valor do bem para composição do monte partilhável
    Então deve considerar apenas o percentual de titularidade do falecido sobre o valor total do bem antes de aplicar qualquer classificação de meação

  @monte_partilhavel @sem_conjuge @ca04
  Cenário: CA04 - Sem meação por ausência de cônjuge
    Dado que o falecido não possuía cônjuge ou companheiro sobrevivente
    Quando o sistema calcular o monte partilhável
    Então deve considerar 100% do valor para cálculo de todos os bens cadastrados em nome do falecido independentemente de sua natureza


