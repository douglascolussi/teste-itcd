// cypress/support/elements/guia/bens/empresaElements.ts

export const empresaElements = {
  // Navegação e Ações Gerais de Bens
  abaBens: 'a.step:contains("Bens")',
  btnAdicionarBem: '#divAddBem button:contains("Adicionar Bem"), button.btn-success-itcd:contains("Adicionar Bem")',
  selectEspecieDoBem: 'select[formControlName="especieDoBem"]',
  btnSalvarBem: 'app-bens-form button.btn-success-itcd:contains("Salvar")',
  btnCancelarBem: 'button.btn.blue:contains("Cancelar")',
  btnFecharFormBem: 'button[title="Fechar e Voltar"]',
  tabelaBens: '.table-scrollable table.table',
  linhasTabelaBens: '.table-scrollable table.table tbody tr',

  // Campos Comuns de Empresa
  inputCnpj: 'input[formControlName="cnpj"]',
  inputNomeRazaoSocial: 'input[formControlName="nomeOuRazaoSocial"]',
  radiosPossuiInscricaoEstadual: 'input[formControlName="possuiInscricaoEstadual"]',
  inputInscricaoEstadual: 'input[formControlName="inscricaoEstadual"]',
  selectUfDaSede: 'select[formControlName="ufDaSede"]',
  selectMunicipioDaSede: 'select[formControlName="municipioDaSede"]',
  inputCapitalSocial: 'input[formControlName="capitalSocial"]',
  inputPatrimonioLiquido: 'input[formControlName="patrimonioLiquidoConstanteDoUltimoBalancoPatrimonial"]',
  radiosEmpresaDesobrigadaBalanco: 'input[formControlName="empresaDesobrigadaElaboracaoBalancoPatrimonial"]',
  inputQtdCotasTotal: 'input[formControlName="quantidadeDeCotasOuAcoesTotalEmQueEhDivididoOCapitalSocial"]',
  radiosPossuiBensImoveis: 'input[formControlName="possuiBensImoveis"]',
  inputValorPorCotaDeclarado: 'input[formControlName="valorPorCotaDeclarado"]',

  // Campos Exclusivos Doação
  inputQtdCotasDoadas: 'input[formControlName="quantidadeDeCotasOuAcoesDoadas"]',
  inputValorDasCotasDoadasDeclarado: 'input[formControlName="valorDasCotasDoadasDeclarado"]',

  // Campos Exclusivos Causa Mortis
  inputContratoSocialAnexo: '#contratoSocialAnexo',
  inputBalancoPatrimonialAnexo: '#balancoPatrimonialAnexo',
  inputDeclaracaoContabilistaAnexo: '#declaracaoDoProfissionalContabilistaResponsavelAnexo',
  inputQtdCotasInventariadas: 'input[formControlName="quantidadeDeCotasOuAcoesInventariadas"]',
  inputValorTotalCotasInventariadas: 'input[formControlName="valorTotalDasCotasInventariadasDeclarado"]',
  checkboxBemParticularDoDeCujus: '#bemParticularDoDeCujus',

  // Mensagens e Alertas
  msgErroCampo: '.has-error .help-block',
  alertaGlobal: 'div.alert'
};
