import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl

  constructor( private http: HttpClient  ) { }


  //Consulta de la bd
  getHeroes():Observable<Hero[]>{
    // console.log(`${this.baseUrl}/heroes`)
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  //buscar por id, undefined es cuando no existe el id
  getHeroById(id: string):Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    //CAPTURA EL ERROR SI NO EXISTE LA INFORMACION
    .pipe(
      catchError( error => of(undefined))
    )
  }

  getSuggestions(query:string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }
}
