import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Curso } from './curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  url = 'http://localhost/api/php/';
  vetor: Curso[] = [];

  constructor(private http: HttpClient) {}

  obterCurso(): Observable<Curso[]> {
    return this.http.get(this.url + 'listar').pipe(
      map((res: any) => {
        this.vetor = res.cursos;
        return this.vetor;
      })
    );
  }

  cadastrarCurso(c: Curso): Observable<Curso[]> {
    return this.http.post(this.url + 'cadastrar', { cursos: c }).pipe(
      map((res: any) => {
        this.vetor.push(res.cursos);
        return this.vetor;
      })
    );
  }

  removerCurso(c: Curso): Observable<Curso[]> {
    const params = new HttpParams().set('id', c.id.toString());
    let a = this.http.delete(this.url + 'excluir', { params: params });
    console.log(a);
    return a.pipe(
      map((res) => {
        console.log(res);
        const filtro = this.vetor.filter((curso) => {
          return +curso['id'] !== +c.id;
        });
        return (this.vetor = filtro);
      })
    );
  }

  atualizarCurso(c: Curso): Observable<Curso[]> {
    // const params = new HttpParams().set('curso', JSON.stringify(c));
    // console.log(params.get('curso'));

    let a = this.http.put(this.url + 'alterar', { cursos: c });

    console.log(a);

    return a.pipe(
      map((res) => {
        const cursoAlterado = this.vetor.find((item) => {
          return +item['id'] === +c.id;
        });
        if (cursoAlterado) {
          cursoAlterado['nome'] = c['nome'];
          cursoAlterado['valor'] = c['valor'];
        }
        return this.vetor;
      })
    );
  }
}
