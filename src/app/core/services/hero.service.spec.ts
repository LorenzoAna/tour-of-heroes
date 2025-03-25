import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from 'src/app/shared/models/hero';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // debemos importat los modulos que usemos en la aplicación, ya que los test están aislados de esta
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debería crear el hero.service', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes debería retornar el valor de la API en forma de Observable', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
    ];

    // Llamamos al servicio para obtener los héroes
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes); // Verifica que los héroes devueltos sean los esperados
    });

    // Interceptamos la solicitud GET
    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('GET'); // Verifica que el método sea GET

    // Simulamos la respuesta de la API
    req.flush(mockHeroes);
  });
});
