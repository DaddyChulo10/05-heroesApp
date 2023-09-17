import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

//localhost:4200/auth/

const routes: Routes = [
  {
    path: 'auth', component: LayoutPageComponent, children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'new-account', component: RegisterPageComponent },
      { path: '**', redirectTo: 'login' }
    ]
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
