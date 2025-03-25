import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/app/core/services/in-memory-data.service';

import { HeroesComponent } from './heroes.component';

// definimos el area de pruebas
describe('HeroesComponent', () => {
  // para la instancia del componente.
  let component: HeroesComponent;
  // para la referencia al entorno de pruebas del componente.
  let fixture: ComponentFixture<HeroesComponent>;

  //configurar el area de pruebas.
  //beforeEach se ejecuta antes de cada prueba
  beforeEach(() => {
    //Configura el entorno de pruebas declarando el HeroesComponent. Esto es necesario para que Angular pueda crear una instancia del componente durante la prueba.
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      declarations: [HeroesComponent],
    });

    //Crea una instancia del componente y la asigna a fixture.
    fixture = TestBed.createComponent(HeroesComponent);
    //Asigna la instancia del componente a la variable component.
    component = fixture.componentInstance;
    //Inicializa el componente y detecta cualquier cambio.
    fixture.detectChanges();
  });

  //realiza una prueba específica
  //Define una prueba que verifica si el componente se crea correctamente.
  it('should create', () => {
    //Comprueba que la instancia del componente no es nula o indefinida, lo que significa que el componente se ha creado exitosamente.
    expect(component).toBeTruthy();
  });
});
