import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  // styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public heroInput!: Hero;

  ngOnInit(): void {
    if (!this.heroInput) throw new Error('Hero es requerido.');
  }


}
