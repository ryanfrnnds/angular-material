/**
 * Script de scaffoldind de CRUD.
 */

var prompt = require('prompt');
var copydir = require('copy-dir');
var replace = require('replace-in-file');
var fs = require('fs');
var path = require('path');

var modulo;
var moduloCap;
var moduloCapPlural;
var moduloPlural;

function capitalize(texto, sufixo) {
	sufixo = sufixo || '';
	var arrTexto = texto.split('-');
	var textoCap = '';

	for (var i=0; i<arrTexto.length; i++) {
		textoCap += arrTexto[i].charAt(0).toUpperCase() + 
			arrTexto[i].slice(1) + sufixo;
	}

    return textoCap;
}

// Obtém o nome dos TEMPLATES a serem criados
var schema = {
    properties: {
      modulo: {
        pattern: /^[a-zA-Z-_]+$/,
        message: 'Módulo deve conter somente caracteres de a-z A-Z ou - ou _',
        required: true
      }
    }
};

prompt.start();
console.log('################################################');
console.log('##                                            ##');
console.log('##    ####   ####  ###   #     #     #####    ##');
console.log('##    ##  ###  ##  #  #       # #    #        ##');
console.log('##    ##   #   ##  #  #  #   #   #   #####    ##');
console.log('##    ##       ##  #  #  #  # # # #      #    ##');
console.log('##    ##       ##  ###   # #       # #####    ##');
console.log('##                                            ##');
console.log('## Seja bem vindo ao gerador de CRUD da mdias ##');
console.log('################################################');
console.log('');
console.log('Digite o nome do módulo a ser criado (ex.: ata):');


prompt.get(schema, function (err, input) {
	modulo = input.modulo;
	moduloPlural = modulo + 's';
	moduloCap = capitalize(modulo);
	moduloCapPlural = capitalize(modulo, 's');

	console.log('Copiando os arquivos...');
	var pathOrigem = path.join(__dirname,'source');
	var pathDestino = pathOrigem.replace(path.join('scaffolding/source'), 
		path.join('src/app/paginas/' + modulo));
	//copia os arquivos para o projeto
	copydir.sync(pathOrigem, pathDestino);
	//renomeia os arquivos
	fs.renameSync(path.join(pathDestino, '/modulo-routing.module.ts'), 
		path.join(pathDestino, modulo + '-routing.module.ts'));
	fs.renameSync(path.join(pathDestino, '/modulo.module.ts'), 
		path.join(pathDestino, modulo + '.module.ts'));
	//formulario
	fs.renameSync(path.join(pathDestino, '/formulario/modulo-formulario.component.css'), 
		path.join(pathDestino, '/formulario/' + modulo + '-formulario.component.css'));
	fs.renameSync(path.join(pathDestino, '/formulario/modulo-formulario.component.html'), 
		path.join(pathDestino, '/formulario/' + modulo + '-formulario.component.html'));
	fs.renameSync(path.join(pathDestino, '/formulario/modulo-formulario.component.ts'), 
		path.join(pathDestino, '/formulario/' + modulo + '-formulario.component.ts'));

	//listar
	fs.renameSync(path.join(pathDestino, '/listagem/modulo-listagem.component.css'), 
	path.join(pathDestino, '/listagem/' + modulo + '-listagem.component.css'));
	fs.renameSync(path.join(pathDestino, '/listagem/modulo-listagem.component.html'), 
		path.join(pathDestino, '/listagem/' + modulo + '-listagem.component.html'));
	fs.renameSync(path.join(pathDestino, '/listagem/modulo-listagem.component.ts'), 
		path.join(pathDestino, '/listagem/' + modulo + '-listagem.component.ts'));

	var arqModificados = '';

	// #MODULO_CAP_PLURAL#
	var optModuloCapPlural = {
	  files: [
	  	pathDestino + '/*.ts',
	  	pathDestino + '/**/*.ts',
	  	pathDestino + '/**/*.html'
	  ],
	  replace: /#MODULO_CAP_PLURAL#/g,
	  with: moduloCapPlural
	};

	try {
	  arqModificados = replace.sync(optModuloCapPlural);
	}
	catch (error) {
	  console.error('Erro:', error);
	}

	// #MODULO_PLURAL#
	var optModuloPlural = {
	  files: [
	  	pathDestino + '/*.ts',
	  	pathDestino + '/**/*.ts',
	  	pathDestino + '/**/*.html'
	  ],
	  replace: /#MODULO_PLURAL#/g,
	  with: moduloPlural
	};

	try {
	  arqModificados = replace.sync(optModuloPlural);
	}
	catch (error) {
	  console.error('Erro:', error);
	}

	// #MODULO_CAP#
	var optModuloCap = {
	  files: [
	  	pathDestino + '/*.ts',
	  	pathDestino + '/**/*.ts',
	  	pathDestino + '/**/*.html'
	  ],
	  replace: /#MODULO_CAP#/g,
	  with: moduloCap
	};

	try {
	  arqModificados = replace.sync(optModuloCap);
	}
	catch (error) {
	  console.error('Erro:', error);
	}

	// #MODULO#
	var optModulo = {
	  files: [
	  	pathDestino + '/*.ts',
	  	pathDestino + '/**/*.ts',
	  	pathDestino + '/**/*.html'
	  ],
	  replace: /#MODULO#/g,
	  with: modulo
	};
	console.log('Replaceando!!!!!!');
	try {
	  arqModificados = replace.sync(optModulo);
	}
	catch (error) {
	  console.error('Erro:', error);
	}

	// /*#
	var optComentarioIni = {
	  files: [
	  	pathDestino + '/*.ts',
	  	pathDestino + '/**/*.ts'
	  ],
	  replace: /\/\*#/g,
	  with: ''
	};

	try {
	  arqModificados = replace.sync(optComentarioIni);
	}
	catch (error) {
	  console.error('Erro:', error);
	}

	// #*/
	var optComentarioFim = {
	  files: [
	  	pathDestino + '/*.ts',
	  	pathDestino + '/**/*.ts'
	  ],
	  replace: /#\*\//g,
	  with: ''
	};

	try {
	  arqModificados = replace.sync(optComentarioFim);
	}
	catch (error) {
	  console.error('Erro:', error);
	}

	console.log('############################################################');
	console.log('## MODULO ' + modulo + ' criado com sucesso!!!');
	console.log('## Execute as operações abaixo para registrar o novo módulo na aplicação:');
	console.log('#');
	console.log('## 1 - Importe o modulo no arquivo de rotas');
	console.log('#   ...' + moduloCap + 'Routes');
	console.log('#');
	console.log('## 2 - Declare no modulo da aplicação: app.module.ts');
	console.log('# ' + moduloCap + 'Module');
	console.log('############################################################');
	console.log('');
});
// Fim prompt para obter o nome do módulo