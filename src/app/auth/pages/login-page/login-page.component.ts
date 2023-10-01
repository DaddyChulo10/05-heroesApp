import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService, 
    private router : Router
    ) { }

  usuario: string = '';
  contrasena: string = ''
  concatenar: string = ''


  ingresar(): void {
    this.concatenar = 'Usuario: ' + this.usuario + ' Contraseña: '

    this.authService.login('ejemplo', '123')
      .subscribe( resp => {

        this.router.navigate(['/'])

      })
  }

}
