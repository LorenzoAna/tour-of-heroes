//@Injectable: decorador que se usa para marcar una clase como un servicio que puede ser inyectado en otros componentes o servicios.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes'; // URL to web api

  getHeroes(): Observable<Hero[]> {
    /*
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;*/
    /** GET heroes from the server */

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
