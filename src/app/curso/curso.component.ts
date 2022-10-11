import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  cadastro(): void {
    alert('Cadastro');
  }

  selecao(): void {
    alert('Seleção');
  }

  alterar(): void {
    alert('Alterar');
  }

  remover(): void {
    alert('Remover');
  }
}
