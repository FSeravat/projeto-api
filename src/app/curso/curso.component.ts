import { Component, OnInit } from '@angular/core';

import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  vetor: Curso[] = [];

  curso = new Curso();

  constructor(private cursoService: CursoService) {}

  ngOnInit() {
    this.selecao();
  }

  cadastro(c: Curso) {
    console.log(JSON.stringify(c));
    this.cursoService.cadastrarCurso(c).subscribe((res: Curso[]) => {
      this.vetor = res;

      this.curso.nome = null;
      this.curso.valor = null;

      this.selecao;
    });
  }

  selecao() {
    this.cursoService.obterCurso().subscribe((res: Curso[]) => {
      this.vetor = res;
    });
  }

  alterar(c: Curso) {
    this.cursoService.atualizarCurso(c).subscribe((res) => {
      this.vetor = res;
      this.curso.nome = null;
      this.curso.valor = null;
      this.selecao();
    });
  }

  remover(c: Curso) {
    this.cursoService.removerCurso(c).subscribe((res: Curso[]) => {
      this.vetor = res;
      this.curso.nome = null;
      this.curso.valor = null;
    });
  }

  selecionarCurso(c: Curso) {
    this.curso.id = c.id;
    this.curso.nome = c.nome;
    this.curso.valor = c.valor;
  }
}
