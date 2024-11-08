import { TestBed } from '@angular/core/testing';

import { SyncServicioService } from './sync-servicio.service';

describe('SyncServicioService', () => {
  let service: SyncServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
