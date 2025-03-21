import { Component, OnInit } from '@angular/core';
//Para manejar flujos de datos reactivos.
import { Observable, Subject } from 'rxjs';
// Para manipular los flujos de datos.
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../../shared/models/hero';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    // se usa para enviar datos a través de un Subject.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Espera 300ms después de cada pulsación de tecla antes de considerar el término.
      debounceTime(300),

      //  Ignora el nuevo término si es igual al anterior.
      distinctUntilChanged(),

      //  Cambia a un nuevo observable de búsqueda cada vez que el término cambia, llamando al método searchHeroes del HeroService.
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
