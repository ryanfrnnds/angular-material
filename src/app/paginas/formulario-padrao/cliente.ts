import { Endereco } from './endereco';
export class Cliente {
	
	public nome:string = '';
	public tipo:string = '';
	public cpf:string = '';
	public dataDeNascimento:Date = null;

	public endereco:Endereco[];

	constructor(nome, tipo, cpf, dataDeNascimento) {
		this.nome = nome;
		this.tipo = tipo;
		this.cpf = cpf;
		this.dataDeNascimento = dataDeNascimento;
	}
}
