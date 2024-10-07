import { TestBed } from '@angular/core/testing';

import { MarcaServicioService } from './marca-servicio.service';

describe('MarcaServicioService', () => {
  let service: MarcaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
