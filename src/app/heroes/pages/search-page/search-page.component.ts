import { FormControl } from '@angular/forms';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit {

  constructor(private service_Hero: HeroesService) {

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  public searchInput = new FormControl('')
  public heroes: Hero[] = []
  public selectedHero?: Hero

  searchHero(): void {
    const value: string = this.searchInput.value || '';
    this.service_Hero.getSuggestions(value)
      .subscribe(heroes_subscribe => this.heroes = heroes_subscribe)
    // console.log(this.heroes)
  }

  onSelectedOption(event: MatAutocompleteActivatedEvent): void {
    if (!event.option?.value) {
      this.selectedHero = undefined
    }

    const hero: Hero = event.option?.value
    this.searchInput.setValue(hero.superhero)
    this.selectedHero = hero

    console.log(event)
  }






}
