import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<Pessoa[]>(this.api);
  }

  buscarPorId(id: number) {
    return this.http.get<Pessoa>(`${this.api}/${id}`);
  }

  cadastrar(profile: Pessoa) {
    return this.http.post<Pessoa>(this.api, profile);
  }

  editar(id: number, profile: Pessoa) {
    return this.http.put<Pessoa>(`${this.api}/${id}`, profile);
  }

  excluir(id: number) {
    return this.http.delete<Pessoa>(`${this.api}/${id}`);
  }
}
