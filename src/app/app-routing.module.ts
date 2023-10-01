import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanMatch } from '@angular/router';
import { Error404PageComponent } from './shared/error404-page/error404-page.component';
import { canActivateGuard, canActivateGuardNegacion, canMatchGuard, canMatchGuardNegacion } from './auth/guards/auth.guard';
import { publicGuardCanActivate, publicGuardCanMatch } from './auth/guards/public.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [publicGuardCanActivate], canMatch: [ publicGuardCanMatch] },
  {
    path: 'moduloHeroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard]
  },
  { path: '404', component: Error404PageComponent },
  { path: '', redirectTo: 'moduloHeroes', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
