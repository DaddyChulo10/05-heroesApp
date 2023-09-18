import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  usuario: string = '';
  contrasena : string = ''
  concatenar : string = ''
  
  ingresar(): void {
    this.concatenar = 'Usuario: ' + this.usuario + ' Contraseña: '
  }

}
