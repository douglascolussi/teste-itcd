# language: pt
# encoding: UTF-8

@guia @dividas @separacao @regressao
Funcionalidade: Rateio e Percentual de Dívida entre Separando e Separanda
  Como um declarante ou usuário cadastrando uma guia de separação
  Quero que os percentuais de partilha da dívida sejam atribuídos e recalculados automaticamente conforme a titularidade selecionada
  Para garantir a consistência das cotas entre Separando e Separanda e impedir divisões inválidas

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais
    E seleciono a natureza "Doação"
    E seleciono o tipo "Separação Judicial"

  @CA01 @distribuicao_padrao_ambos
  Cenário: CA01: Distribuição padrão para "Ambos"
    Dado que o usuário está cadastrando uma dívida
    Quando selecionar "Ambos" em "A dívida irá pertencer a quem?"
    Então o sistema deve preencher "50,00%" para o Separando e "50,00%" para a Separanda, com os campos editáveis

  @CA02 @divida_separando
  Cenário: CA02: Dívida do Separando
    Dado que o usuário está cadastrando uma dívida
    Quando selecionar "Separando"
    Então o sistema deve preencher "100,00%" para o Separando e "0,00%" para a Separanda, com os campos bloqueados

  @CA03 @divida_separanda
  Cenário: CA03: Dívida da Separanda
    Dado que o usuário está cadastrando uma dívida
    Quando selecionar "Separanda"
    Então o sistema deve preencher "0,00%" para o Separando e "100,00%" para a Separanda, com os campos bloqueados

  @CA04 @recalculo_editar_ambos
  Cenário: CA04: Recálculo ao editar percentual em "Ambos"
    Dado que o usuário está cadastrando uma dívida
    E que a opção "Ambos" está selecionada
    Quando o usuário informar "30,00%" no percentual do Separando
    Então o sistema deve preencher automaticamente "70,00%" no percentual da Separanda

  @CA05 @bloqueio_zero_ou_cem_ambos
  Cenário: CA05: Bloqueio de 0% ou 100% em "Ambos"
    Dado que o usuário está cadastrando uma dívida
    E que a opção "Ambos" está selecionada
    Quando o usuário informar "0,00%" ou "100,00%" para uma das partes e clicar em "Salvar"
    Então o sistema deve impedir o salvamento e exibir a mensagem: "Quando a dívida pertence a ambos, cada parte deve ter percentual maior que 0% e menor que 100%."

  @CA06 @soma_diferente_cem
  Cenário: CA06: Soma diferente de 100%
    Dado que o usuário está cadastrando uma dívida
    E que a opção "Ambos" está selecionada
    Quando a soma dos percentuais for diferente de 100% e o usuário clicar em "Salvar"
    Então o sistema deve impedir o salvamento e exibir a mensagem: "A soma dos percentuais deve ser igual a 100%."

  @CA07 @troca_opcao
  Cenário: CA07: Troca de opção
    Dado que o usuário está cadastrando uma dívida
    E que o usuário selecionou "Separanda" e os percentuais estão em "0,00%" / "100,00%"
    Quando alterar a opção para "Ambos"
    Então o sistema deve recalcular os percentuais para "50,00%" / "50,00%"

  @CA08 @edicao_divida_existente
  Cenário: CA08: Edição de dívida existente
    Dado que existe uma dívida salva com "Ambos" e percentuais "40,00%" / "60,00%"
    Quando o usuário abrir a edição do item
    Então o sistema deve exibir os percentuais salvos ("40,00%" / "60,00%") e não sobrescrevê-los com o padrão

