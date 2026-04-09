# language: pt
# encoding: UTF-8
@declarante @regressao
Funcionalidade: Declarante da Nova Guia ITCD
  Como um usuário iniciando uma nova declaração ITCD
  Quero fornecer meus dados pessoais e de contato
  Para ser identificado como o declarante do processo

  Contexto:
    Dado que estou autenticado no sistema
    E que estou na página de início de declaração

  @visual @btn_desabilitado
  Cenário: Botão de iniciar desabilitado sem aceitar termos
    Quando o usuário não marca o checkbox "Declaro que li e concordo..."
    Então o botão de iniciar declaração deve estar desabilitado
    E devo visualizar a mensagem de erro "É necessário concordar com os termos acima, para iniciar a declaração." para o campo declarante

  @negativo @validacao @campos_obrigatorios
  Esquema do Cenário: Validar campos obrigatórios do declarante
    Quando concordo com os termos do declarante
    E tento iniciar a declaração
    Então devo visualizar a mensagem de erro "Campo obrigatório." para o campo declarante

  @negativo @formato @validar_formatos
  Esquema do Cenário: Validação de formato dos campos
    Quando preencho o campo "<campo>" com "<valor>"
    E concordo com os termos do declarante
    E tento iniciar a declaração
    Então devo visualizar a mensagem de erro "Campo inválido" para o campo declarante

    Exemplos:
      | campo    | valor           |
      | E-mail   | email_errado    |
      | Telefone | (11) 9 9999     |

  @auto_preenchimento @busca_cep
  Cenário: Auto-preenchimento de endereço pelo CEP
    Dado que intercepto a busca do CEP "79002000" com endereço "RUA TESTE"
    Quando preencho o campo "CEP" com "79.002-000"
    E aguardo o carregamento do endereço pelo CEP
    Então os campos de endereço devem estar preenchidos e desabilitados

  @positivo @fluxo_sucesso
  Cenário: Iniciar declaração com sucesso
    Dado que intercepto a busca do declarante CPF "74555611560" como não cadastrado
    Quando preencho o campo "CPF" com "74555611560"
    E preencho o campo "Nome" com "USUARIO TESTE"
    E preencho o campo "E-mail" com "teste@sefaz.ms.gov.br"
    E preencho o campo "Telefone" com "(67) 9 9999-9999"
    E preencho o campo "CEP" com "79002-000"
    E preencho o campo "Número" com "100"
    E concordo com os termos do declarante
    E tento iniciar a declaração
    Então devo ser redirecionado para o próximo passo da guia
