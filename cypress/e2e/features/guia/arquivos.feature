# language: pt
# encoding: UTF-8

@guia @arquivos @regressao
Funcionalidade: Cadastro e Validação de Anexo de Arquivos na Aba Arquivos
  Como um declarante ou usuário autenticado
  Quero gerenciar os documentos e anexos na aba "Arquivos" da declaração
  Para garantir o envio obrigatório e correto da documentação comprobatória em todos os tipos de guia (Doação e Causa Mortis)

  Contexto:
    Dado que estou autenticado no sistema
    E tento avançar para o próximo passo sem preencher os dados gerais

  @validacao_obrigatoriedade_doacao
  Cenário: Validar campos obrigatórios ao tentar salvar anexo de arquivo em branco em Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E clico em salvar arquivo
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição" do arquivo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Arquivo" do anexo

  @validacao_obrigatoriedade_causa_mortis
  Cenário: Validar campos obrigatórios ao tentar salvar anexo de arquivo em branco em Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E clico em salvar arquivo
    Então devo visualizar a mensagem "Campo obrigatório." para o campo "Descrição" do arquivo
    E devo visualizar a mensagem "Campo obrigatório." para o campo "Arquivo" do anexo

  @validacao_tipo_arquivo_invalido
  Cenário: Validar rejeição ao anexar arquivo com extensão não permitida pelo sistema
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo um arquivo com extensão inválida "executavel_teste.exe"
    E clico em salvar arquivo
    Então devo visualizar a mensagem de erro "O tipo de arquivo informado não é aceito pelo sistema. São permitidos apenas: Imagem (JPG, JPEG, BMP, PNG) e Texto (PDF, TXT, DOC, DOCX)." para o anexo

  @validacao_tamanho_maximo_arquivo
  Cenário: Validar rejeição ao anexar arquivo com tamanho superior a 4MB
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo um arquivo que ultrapassa 4MB "documento_pesado.pdf"
    E clico em salvar arquivo
    Então devo visualizar a mensagem de erro "O tamanho do arquivo não deve ultrapassar 4mb" para o anexo

  @cancelar_adicao_arquivo
  Cenário: Cancelar a inclusão de um novo arquivo
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E clico em cancelar adição do arquivo
    Então o formulário de inclusão de arquivo não deve estar visível

  @validacao_duplicidade_arquivo
  Cenário: Validar bloqueio ao tentar anexar arquivo duplicado com o mesmo nome e mesma descrição
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo o arquivo "comprovante_doacao.pdf"
    E clico em salvar arquivo
    Então devo visualizar o alerta "O arquivo foi adicionado a lista."
    Quando clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo o arquivo "comprovante_doacao.pdf"
    E clico em salvar arquivo
    Então devo visualizar o alerta "O sistema não permite a inclusão de mais de um arquivo com o mesmo nome e descrição. Por favor, altere o nome do arquivo ou sua descrição e repita a operação."

  @edicao_arquivo
  Cenário: Editar a descrição de um arquivo já cadastrado na lista
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo o arquivo "documento_identificacao.pdf"
    E clico em salvar arquivo
    E clico para editar o primeiro arquivo da lista
    E seleciono a descrição do arquivo na edição "Documento pessoal - RG/CPF"
    E clico em salvar edição do arquivo
    Então devo visualizar o alerta "O arquivo da Lista Selecionado foi editado."
    E o arquivo deve estar cadastrado na tabela de arquivos com descrição "Documento pessoal - RG/CPF" e nome "documento_identificacao.pdf"

  @exclusao_arquivo
  Cenário: Excluir um arquivo da lista com confirmação no modal
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "Simples"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo o arquivo "arquivo_temporario.pdf"
    E clico em salvar arquivo
    E clico para excluir o primeiro arquivo da lista
    E confirmo a exclusão no modal
    Então devo visualizar o alerta "O arquivo foi excluído da lista"
    E devo visualizar a mensagem de tabela vazia "Nenhum arquivo foi incluído."

  @validacao_obrigatoriedade_avancar
  Cenário: Validar bloqueio de avanço de passo quando nenhum arquivo for enviado
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "Ordinário"
    E acesso a aba "Arquivos"
    E clico no botão avançar no wizard
    Então devo visualizar o alerta "É necessário o envio de pelo menos um arquivo"
    E devo permanecer na aba "Arquivos"

  @todos_tipos_doacao
  Esquema do Cenário: Validar cadastro e exibição de arquivo em todos os tipos de Doação
    Quando seleciono a natureza "Doação"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo o arquivo "<nome_arquivo>"
    E clico em salvar arquivo
    Então devo visualizar o alerta "O arquivo foi adicionado a lista."
    E o arquivo deve estar cadastrado na tabela de arquivos com descrição "Outros" e nome "<nome_arquivo>"

    Exemplos:
      | tipo                     | nome_arquivo                  |
      | Simples                  | doacao_simples.pdf            |
      | Cessão De Direitos       | cessao_direitos.pdf           |
      | Com Reserva De Usufruto  | reserva_usufruto.pdf          |
      | Desigualdade De Partilha | desigualdade_partilha.pdf     |
      | Extinção De Usufruto     | extincao_usufruto.pdf         |
      | Instituição De Usufruto  | instituicao_usufruto.pdf      |
      | Nua Propriedade          | nua_propriedade.pdf           |
      | Renúncia De Herança      | renuncia_heranca_doacao.pdf   |
      | Renúncia De Usufruto     | renuncia_usufruto_doacao.pdf  |

  @todos_tipos_causa_mortis
  Esquema do Cenário: Validar cadastro e exibição de arquivo em todos os tipos de Causa Mortis
    Quando seleciono a natureza "Causa Mortis"
    E seleciono o tipo "<tipo>"
    E acesso a aba "Arquivos"
    E clico para adicionar um Arquivo
    E seleciono a descrição do arquivo "Outros"
    E anexo o arquivo "<nome_arquivo>"
    E clico em salvar arquivo
    Então devo visualizar o alerta "O arquivo foi adicionado a lista."
    E o arquivo deve estar cadastrado na tabela de arquivos com descrição "Outros" e nome "<nome_arquivo>"

    Exemplos:
      | tipo            | nome_arquivo               |
      | Ordinário       | causa_mortis_ordinario.pdf |
      | Arrolamento     | causa_mortis_arrolam.pdf   |
      | Extrajudicial   | causa_mortis_extrajud.pdf  |
      | Alvará Judicial | causa_mortis_alvara.pdf    |
