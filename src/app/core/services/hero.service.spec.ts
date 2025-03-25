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

  it('getHero debería devolver un héroe de la API por su ID', () => {
    const mockHero: Hero = { id: 1, name: 'Superman' };

    service.getHero(1).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toBe('GET');

    req.flush(mockHero);
  });

  it('updateHero debería actualizar un héroe en la API ', () => {
    const mockUpdateHero: Hero = { id: 1, name: 'Superman' };

    service.updateHero(mockUpdateHero).subscribe((hero) => {
      expect(hero).toEqual(mockUpdateHero);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUpdateHero); // Verifica que el cuerpo de la solicitud sea el héroe actualizado

    req.flush(mockUpdateHero);
  });

  it('addHero debería añadir un héroe en la API ', () => {
    const mockAddHero: Hero = { id: 3, name: 'Catwoman' };

    service.addHero(mockAddHero).subscribe((hero) => {
      expect(hero).toEqual(mockAddHero);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAddHero); // Verifica que el cuerpo de la solicitud sea el héroe añadido

    req.flush(mockAddHero);
  });

  it('deleteHero debería eliminar un héroe de la API', () => {
    const mockDeletedHero: Hero = { id: 3, name: 'Catwoman' };

    service.deleteHero(mockDeletedHero.id).subscribe((hero) => {
      expect(hero).toEqual(mockDeletedHero);
    });

    const req = httpMock.expectOne('api/heroes/3');
    expect(req.request.method).toBe('DELETE');

    req.flush(mockDeletedHero);
  });
});
