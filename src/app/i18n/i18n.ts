import { HttpClient } from '@angular/common/http';

export class I18n {
    private static singleton: I18n = null;
    public traducao: any;

    private constructor() {}

    public static Instance(emUso: string = null): I18n {
        if (this.singleton == null) {
            this.singleton = new I18n();
        }
        const referenciaLingua: string = emUso ? emUso : 'pt-BR';
        this.singleton.traducao = this.singleton.getTraducoesGerais(referenciaLingua);
        return this.singleton;
    }

    private getTraducoesGerais(lingua) {
      const ptBr = {
          'mdbComponentes': {
            'botao' : {
                'novo' : 'Novo',
                'limpar' : 'Limpar',
                'pesquisar' : 'Pesquisar',
                'adicionar' : 'Adicionar',
                'salvar' : 'Salvar',
                'editar' : 'Editar',
                'deletar' : 'Deletar',
                'remover' : 'Remover',
                'cancelar' : 'Cancelar',
                'visualizar' : 'Visualizar'
            },
            'label' : {
                'nao' : 'Não',
                'sim' : 'Sim',
                'todos' : 'Todos',
                'criadoPor' : 'Criado por',
                'dataCriacao' : 'Data criação',
                'atualizadoPor' : 'Atualizado por',
                'dataAtualizacao' : 'Data atualização',
                'ativo' : 'Ativo',
                'acoes' : 'Ações',
                'nome': 'Nome'
            },
            'erro': {
                'obrigatoriedade' : 'Campo obrigatório',
                'semValorSelecionado' : 'Escolha um item da lista'
            },
            'operacao' : {
                'cancelar' : 'Cancelar',
                'salvar' : 'Salvar',
                'atualizar' : 'Atualizar',
                'mensagemGeral' : 'Confirma operação?',
                'sucesso' : {
                    'salvar' : 'Salvo com sucesso',
                    'editar' : 'Atualizado com sucesso',
                    'excluir' : 'Excluído com sucesso'
                },
                'busca':{
                  'sucesso':'Registros recuperados com sucesso',
                  'erro': 'Não foi possível recuperar os registros'
                },
                'formulario': {
                  'erro': 'Verifique campo(s) obrigatório(s)'
                }
            },
            'autoComplete': {
                'itensPorPagina': 'Itens por página',
                'proximaPagina': 'Proxima página',
                'paginaAnterior':'Página anterior',
                'de': 'de'
            }
            ,'permissao': {
                'semAcesso': 'Usuário não possui acesso a função',
                'semFuncaoConfigurada': 'A tela não possui função configurada'
            }
          }
      };

      if (lingua = 'pt-BR') {
        return ptBr;
      }
    }
}
