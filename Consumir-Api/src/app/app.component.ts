import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './models/pessoa';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule], // Adicionar CommonModule ao array de imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrigir styleUrl para styleUrls
})
export class AppComponent implements OnInit {
  title = 'Consumir-Api';
  http = inject(HttpClient);
  urlApi = 'http://localhost:5066';
  // Listar Pessoas
  pessoas$?: Observable<Pessoa[]>;

  // Buscar Pessoas
  pessoaEncontrada$?: Observable<Pessoa>;
  ValorBuscaPessoa = '';

  // Adicionar pessoa
  nomeAdicionar = '';

  // Atualizar pessoa
  idAtualizar = '';
  nomeAtualizar = '';

  ngOnInit(): void {
    this.obterPessoas();
  }

  obterPessoas() {
    this.pessoas$ = this.http.get<Pessoa[]>(`${this.urlApi}/pessoas`);
  }

  obterPessoaEspecifica() {
    if (!this.ValorBuscaPessoa) return;
    this.pessoaEncontrada$ = this.http.get<Pessoa>(
      `${this.urlApi}/pessoas/${this.ValorBuscaPessoa}`
    );
  }

  adicionarPesoa() {
    if (!this.nomeAdicionar) return;
    const pessoaCriar: Pessoa = {
      id: 'ebaf4191-4a66-4fab-ae94-3d2ea90103f0',
      nome: this.nomeAdicionar,
    };

    this.http
      .post<void>(`${this.urlApi}/pessoas`, pessoaCriar)
      .subscribe((_) => {
        this.obterPessoas();
        this.nomeAdicionar = '';
      });
  }

  obterDadosAtualizar(pessoa: Pessoa) {
    console.log(pessoa);

    this.idAtualizar = pessoa.id;
    this.nomeAtualizar = pessoa.nome;
  }

  atualizarNome() {
    if (!this.nomeAtualizar || !this.idAtualizar) return;

    const pessoa: Pessoa = { id: this.idAtualizar, nome: this.nomeAtualizar };

    const url = `${this.urlApi}/pessoas/${this.idAtualizar}`;

    this.http.put<Pessoa>(url, pessoa).subscribe((_) => {
      this.obterPessoas();
      this.nomeAtualizar = '';
    });
  }
}
