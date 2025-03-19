// detalles del heroe seleccionado
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  // input: pasar datos de un componente padre a un componente hijo. Estamos recibiendo del heroes.component el selectedHero
  @Input() hero?: Hero;
}
