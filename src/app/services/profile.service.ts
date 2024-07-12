import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get(this.api);
  }

  buscarPorId(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  cadastrar(profile: any) {
    return this.http.post<any>(this.api, profile);
  }

  editar(id: number, profile: any) {
    return this.http.put<any>(`${this.api}/${id}`, profile);
  }

  excluir(id: number) {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
