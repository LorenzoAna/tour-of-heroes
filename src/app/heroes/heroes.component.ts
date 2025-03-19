// lista de heroes
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes', // etiqueta para el html
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero;
  heroes: Hero[] = [];

  //constructor: Inyecta el servicio HeroService en el componente. Esto permite que el componente use los métodos del servicio.
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  //Este método del ciclo de vida de Angular se llama automáticamente después de crear el componente.
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  //Llama al método getHeroes del servicio HeroService, Se suscribe al observable, y asigna el resultado a la propiedad heroes del componente.
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
