import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl

  constructor(private http: HttpClient) { }


  //Consulta de la bd
  getHeroes(): Observable<Hero[]> {
    // console.log(`${this.baseUrl}/heroes`)
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  //buscar por id, undefined es cuando no existe el id
  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      //CAPTURA EL ERROR SI NO EXISTE LA INFORMACION
      .pipe(
        catchError(error => of(undefined))
      )
  }

  //Buscar por sugerencias <Buscador></Buscador>
  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }


  //Agregar un nuevo elemento
  addHero(hero: Hero): Observable<Hero> {
    //El hero va ser el body del backend
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  // actualizar un nuevoi elemento "por registros"
  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('El Hero.id is required')
    //El patch es para cambiar parte del registro
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  }

  //elimina registro por id
  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      )
  }


}
