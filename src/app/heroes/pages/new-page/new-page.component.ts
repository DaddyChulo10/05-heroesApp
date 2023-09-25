// import { Hero } from './../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return

    this.activatedRoute.params
      .pipe(
        //Obtener el id de la URL
        switchMap(({ id }) => this.heroService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/')
        //reset() asigna los valores como en el formulario, interfaces = formControlName 
        this.heroForm.reset(hero)
        return

      })
  }

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  get CurrentHero(): Hero {
    const hero = this.heroForm.value as Hero
    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;
    //  this.heroService.updateHero(this.heroForm.value)

    if (this.CurrentHero.id) {
      this.heroService.updateHero(this.CurrentHero)
        .subscribe(hero => {
          this.router.navigateByUrl('/')
          this.showSnackbar(` ${hero.superhero} Actualizado! `)
        })
      return

    }

    this.heroService.addHero(this.CurrentHero)
      .subscribe(hero => {
        this.router.navigate(['moduloHeroes/submoduloHero/edit', hero.id])
        this.showSnackbar(` ${hero.superhero} Creado! `)
      })

    // console.log({
    //   formIsValid: this.heroForm.valid, 
    //   value: this.heroForm.value
    // })
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Done', {
      duration: 3500,
    })
  }

  onDeleteHero() {
    if (!this.CurrentHero.id) throw Error('hero id is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) return

        this.heroService.deleteHeroById(this.CurrentHero.id)
          .subscribe(wasDeleted => {
            if (wasDeleted)
              this.router.navigate(['/moduloHeroes/submoduloHero/list'])

          })


        // console.log({ result });
        // this.animal = result;
      });


  }


  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];


}
