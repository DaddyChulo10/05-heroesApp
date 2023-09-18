import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  usuario: string = ''
  nombre: string = ''
  correo: string = ''
  concatenar: string = ''

  guardar(): void {
    this.concatenar = `Usuario: ${this.usuario} Nombre: ${this.nombre} Correo: ${this.correo} Contraseña: `
  }


}
