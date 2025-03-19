//@Injectable: decorador que se usa para marcar una clase como un servicio que puede ser inyectado en otros componentes o servicios.
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// rxjs: bibliteca para programacion asincrona
import { Observable } from 'rxjs';

@Injectable({
  // La opción providedIn: 'root' indica que el servicio está disponible en toda la aplicación.
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  getHeroes(): Hero[] {
    return HEROES;
  }
}
