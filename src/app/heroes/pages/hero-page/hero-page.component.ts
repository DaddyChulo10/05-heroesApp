import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {
  // Con esto puedo leer el id de la ruta <activated: ActivatedRoute>

  public hero?: Hero

  constructor(
    private heroService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.ActivatedRoute.params
      .pipe(
        // delay(3000),
        switchMap(({ id }) => this.heroService.getHeroById(id))
      )
      .subscribe(heroDelService => {
        if (!heroDelService) return this.router.navigate(['/moduloHeroes/submoduloHero/list'])
        this.hero = heroDelService
        return
      })
  }


  goBack(): void {
   this.router.navigate(['/moduloHeroes/submoduloHero/list'])
  }


}
