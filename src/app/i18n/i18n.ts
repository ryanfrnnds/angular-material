import { HttpClient } from '@angular/common/http';

export class I18n {
    private static singleton: I18n = null;
    public traducao: any;

    private constructor() {}

    public static Instance(http: HttpClient = null , emUso: string = null): I18n {
        if (this.singleton == null) {
            this.singleton = new I18n();
        }
        if (http) {
            const referenciaLingua: string = emUso ? emUso : 'pt-BR';
            this.singleton.traducao = this.Instance().getTraducoesGerais(referenciaLingua);
            http.get<any>('assets/i18n/' + referenciaLingua + '.json').subscribe( (traducao) => {
              if (traducao) {
                this.Instance().traducao = Object.assign(this.Instance().traducao, traducao);
              }
            });
        }
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
                'nome': 'nome'
            },
            'erro': {
                'obrigatoriedade' : 'Campo obrigatório'
            },
            'operacao' : {
                'cancelar' : 'Cancelar',
                'salvar' : 'Salvar',
                'mensagemGeral' : 'Confirma operação?'
            },
            'autoComplete': {
                'itensPorPagina': 'Itens por página',
                'proximaPagina': 'Proxima página',
                'paginaAnterior':'Página anterior',
                'de': 'de'
            }
          }
      };

      if (lingua = 'pt-BR') {
        return ptBr;
      }
    }
}
