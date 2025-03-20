// lista de heroes
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes', // etiqueta para el html
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  //constructor: Inyecta el servicio HeroService en el componente. Esto permite que el componente use los métodos del servicio.
  constructor(private heroService: HeroService) {}

  //Este método del ciclo de vida de Angular se llama automáticamente después de crear el componente.
  ngOnInit(): void {
    this.getHeroes();
  }

  //Llama al método getHeroes del servicio HeroService, Se suscribe al observable, y asigna el resultado a la propiedad heroes del componente.
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
}
