import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = environments.baseUrl;
  private user?: User

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined

    return structuredClone(this.user)
  }

  login(email: string, password: string): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(resp => this.user = resp),
        tap(resp => localStorage.setItem('token', 'das123.gsdf45.fds451')),
      )
    // .subscribe()

  }

  checkAuthentication(): Observable<boolean>  {
    if (!localStorage.getItem('token')) return of(false)

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(resp => this.user = resp),
        map(resp => !!resp),
        catchError(err => of(false))
      )
    // return of(true)

  }

  // checkAuthentication(): Observable<boolean> | boolean {
  //   if (!localStorage.getItem('token')) return false

  //   return this.http.get<User>(`${this.baseUrl}/users/1`)
  //     .pipe(
  //       tap(resp => this.user = resp),
  //       map(resp => !!resp),
  //       catchError(err => of(false))
  //     )
  //   // return of(true)

  // }

  logout() {
    this.user = undefined
    localStorage.clear()
  }




}
