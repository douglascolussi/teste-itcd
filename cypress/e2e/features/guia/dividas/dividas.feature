# language: pt
# encoding: UTF-8

@guia @dividas @regressao
Funcionalidade: Cadastro e Validação de Anexo de Arquivos na Aba Dívidas
  Como um declarante ou usuário autenticado
  Quero gerenciar os comprovantes e anexos na aba "Dívidas" da declaração
  Para garantir o envio obrigatório e correto da documentação comprobatória de dívidas em todos os tipos de guia aplicáveis (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar anexo de dívida em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Separação Judicial"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E clico em salvar anexo de dívida
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição" do anexo de dívida
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Arquivo" do anexo de dívida

  @validacao_obrigatoriedade_causa_mortis
  Cenário: Validar campos obrigatórios ao tentar salvar anexo de dívida em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E clico em salvar anexo de dívida
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição" do anexo de dívida
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Arquivo" do anexo de dívida

  @validacao_tipo_arquivo_invalido
  Cenário: Validar rejeição ao anexar arquivo com extensão não permitida pelo sistema
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E seleciono a descrição do anexo de dívida "Outros"
    E anexo um arquivo de dívida com extensão inválida "executavel_divida.exe"
    E clico em salvar anexo de dívida
    Então devo visualizar a mensagem de erro "O tipo de arquivo informado não é aceito pelo sistema. São permitidos apenas: Imagem (JPG, JPEG, BMP, PNG) e Texto (PDF, TXT, DOC, DOCX)." para o arquivo do anexo de dívida

  @validacao_tamanho_maximo_arquivo
  Cenário: Validar rejeição ao anexar arquivo com tamanho superior a 4MB
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E seleciono a descrição do anexo de dívida "Outros"
    E anexo um arquivo de dívida que ultrapassa 4MB "divida_pesada.pdf"
    E clico em salvar anexo de dívida
    Então devo visualizar a mensagem de erro "O tamanho do arquivo não deve ultrapassar 4mb" para o arquivo do anexo de dívida

  @cancelar_adicao_arquivo
  Cenário: Cancelar a inclusão de um novo anexo de dívida
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E clico em cancelar anexo de dívida
    Então o formulário de anexo de dívida não deve estar visível

  @edicao_anexo_divida
  Cenário: Editar a descrição de um anexo de dívida já cadastrado na lista
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E seleciono a descrição do anexo de dívida "Outros"
    E anexo o arquivo de dívida "comprovante_divida.pdf"
    E clico em salvar anexo de dívida
    E clico para editar o primeiro arquivo de dívida da lista
    E seleciono a descrição do anexo de dívida na edição "Comprovante de Pagamento"
    E clico em salvar edição do anexo de dívida
    Então devo visualizar o alerta de dívida "O Arquivo foi alterado"
    E o arquivo de dívida deve estar cadastrado na tabela com descrição "Comprovante de Pagamento" e nome "comprovante_divida.pdf"

  @exclusao_anexo_divida
  Cenário: Excluir um anexo de dívida da lista com confirmação no modal
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E seleciono a descrição do anexo de dívida "Outros"
    E anexo o arquivo de dívida "arquivo_para_excluir.pdf"
    E clico em salvar anexo de dívida
    E clico para excluir o primeiro arquivo de dívida da lista
    E confirmo a exclusão do anexo de dívida no modal
    Então devo visualizar o alerta de dívida "O Arquivo foi excluído"
    E devo visualizar a mensagem de tabela vazia de anexo de dívida "Nenhuma dívida foi inserido até agora"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de anexo de dívida nos tipos de Doação aplicáveis
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E seleciono a descrição do anexo de dívida "Outros"
    E anexo o arquivo de dívida "<nome_arquivo>"
    E clico em salvar anexo de dívida
    Então devo visualizar o alerta de dívida "O Arquivo foi adicionado"
    E o arquivo de dívida deve estar cadastrado na tabela com descrição "Outros" e nome "<nome_arquivo>"

    Exemplos:
      | tipo                     | nome_arquivo                      |
      | Separação Judicial       | anexo_separacao_judicial.pdf      |
      | Separação Extrajudicial  | anexo_separacao_extrajudicial.pdf |

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de anexo de dívida em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E clico para adicionar um arquivo de dívida
    E seleciono a descrição do anexo de dívida "Outros"
    E anexo o arquivo de dívida "<nome_arquivo>"
    E clico em salvar anexo de dívida
    Então devo visualizar o alerta de dívida "O Arquivo foi adicionado"
    E o arquivo de dívida deve estar cadastrado na tabela com descrição "Outros" e nome "<nome_arquivo>"

    Exemplos:
      | tipo            | nome_arquivo                    |
      | Ordinário       | anexo_divida_ordinario.pdf      |
      | Arrolamento     | anexo_divida_arrolamento.pdf    |
      | Extrajudicial   | anexo_divida_extrajudicial.pdf  |
      | Alvará Judicial | anexo_divida_alvara.pdf         |

  @vinculo_bem_obrigatoriedade
  Cenário: Validar obrigatoriedade do campo Bem vinculado ao marcar que a dívida está vinculada a um bem
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E informar que a dívida está vinculada a um bem do espólio "Sim"
    Então o campo de seleção de bem vinculado deve estar visível
    Quando clico em salvar a dívida
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Bem vinculado" da dívida

  @vinculo_bem_desmarcar
  Cenário: Validar que o campo Bem vinculado é ocultado ao marcar que a dívida não está vinculada a um bem
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E informar que a dívida está vinculada a um bem do espólio "Sim"
    Então o campo de seleção de bem vinculado deve estar visível
    Quando informar que a dívida está vinculada a um bem do espólio "Não"
    Então o campo de seleção de bem vinculado não deve estar visível

  @vinculo_bem_exclusao_numerarios
  Cenário: Validar que bens da espécie Numerários não são elegíveis para vínculo com dívida
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E cadastro um bem da espécie "Outro Bem" na guia
    E cadastro um bem da espécie "Numerários" na guia
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E informar que a dívida está vinculada a um bem do espólio "Sim"
    Então a opção do bem vinculado contendo "Outro Bem" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Numerários" não deve estar disponível para seleção

  @vinculo_multiplos_bens
  Cenário: Validar que múltiplos tipos de bens cadastrados na guia ficam disponíveis simultaneamente para vínculo com a dívida
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E possuo todos os tipos de bens cadastrados na guia
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E informar que a dívida está vinculada a um bem do espólio "Sim"
    Então a opção do bem vinculado contendo "Imóvel Rural" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Imóvel Urbano" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Veículo" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Empresa" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Semoventes Bovinos" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Equipamento Agrícola" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Grãos / Prod. Agrícolas" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Títulos em Bolsa" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Outro Bem" deve estar disponível para seleção
    E a opção do bem vinculado contendo "Numerários" não deve estar disponível para seleção

  @vinculo_todos_os_bens
  Esquema do Cenário: Validar o vínculo da dívida com todas as espécies de bens cadastrados na guia
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E cadastro um bem da espécie "<tipo_bem>" na guia
    E acesso a aba "Dívidas"
    E abro o formulário de inclusão de dívida
    E informar que a dívida está vinculada a um bem do espólio "Sim"
    Então a opção do bem vinculado contendo "<descricao_especie>" deve estar disponível para seleção
    Quando seleciono o bem vinculado contendo "<descricao_especie>"
    Então o bem vinculado contendo "<descricao_especie>" deve estar selecionado na dívida

    Exemplos:
      | tipo_bem             | descricao_especie        |
      | Imóvel Rural         | Imóvel Rural             |
      | Imóvel Urbano        | Imóvel Urbano            |
      | Veículo              | Veículo                  |
      | Empresa              | Empresa                  |
      | Semoventes           | Semoventes Bovinos       |
      | Equipamento Agrícola | Equipamento Agrícola     |
      | Grãos                | Grãos / Prod. Agrícolas  |
      | Títulos em Bolsa     | Títulos em Bolsa         |
      | Outro Bem            | Outro Bem                |

