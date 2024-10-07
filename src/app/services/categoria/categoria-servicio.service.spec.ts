import { TestBed } from '@angular/core/testing';

import { CategoriaServicioService } from './categoria-servicio.service';

describe('CategoriaServicioService', () => {
  let service: CategoriaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
