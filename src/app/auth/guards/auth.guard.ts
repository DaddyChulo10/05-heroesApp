import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
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
export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
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



//Tipado CanMatchFN
export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
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
export const canActivateGuardNegacion: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(resp => {
        if (resp) {
          router.navigate(['./moduloHeroes/submoduloHero/list'])
        }
      })
    )
};



//Tipado CanMatchFN
export const canMatchGuardNegacion: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(resp => {
        if (resp) {
          router.navigate(['./moduloHeroes/submoduloHero/list'])
        }
      })
    )
};

