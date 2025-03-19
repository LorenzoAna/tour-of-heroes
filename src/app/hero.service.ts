//@Injectable: decorador que se usa para marcar una clase como un servicio que puede ser inyectado en otros componentes o servicios.
import { Injectable } from '@angular/core';

// rxjs: bibliteca para programacion asincrona
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  // La opción providedIn: 'root' indica que el servicio está disponible en toda la aplicación.
  providedIn: 'root',
})
export class HeroService {
  // Inyecta el servicio para permitir que usemos sus métodos
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
