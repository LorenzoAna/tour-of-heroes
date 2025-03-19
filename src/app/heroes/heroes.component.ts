// lista de heroes
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes', // etiqueta para el html
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = [];

  //constructor: Inyecta el servicio HeroService en el componente. Esto permite que el componente use los métodos del servicio.
  constructor(private heroService: HeroService) {}

  //Este método del ciclo de vida de Angular se llama automáticamente después de crear el componente.
  ngOnInit(): void {
    this.getHeroes();
  }

  //Llama al método getHeroes del servicio HeroService y asigna el resultado a la propiedad heroes del componente.
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
