import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  constructor( private AuthService: AuthService,  private router: Router ){}

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },

  ]

  get user(): User | undefined {
    return this.AuthService.currentUser;
  }

  onLogout() : void {
    this.AuthService.logout()
    this.router.navigate(['auth'])
  }

}
