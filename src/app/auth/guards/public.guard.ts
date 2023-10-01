import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of, tap, map } from 'rxjs';
//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing



const validacion: any = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(resp => {
        if (!resp) {
          router.navigate(['./auth'])
        }
      })
    )
};

//Hay que tener en cuenta el tipado CanActiveFn
export const publicGuardCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(resp => {
        if (resp) {
          router.navigate(['./moduloHeroes'])
        }
      }),
      map( resp => !resp)
    )
};



//Tipado CanMatchFN
export const publicGuardCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(resp => {
        if (resp) {
          router.navigate(['./moduloHeroes'])
        }
      }),
      map( resp => !resp)
    )
};




