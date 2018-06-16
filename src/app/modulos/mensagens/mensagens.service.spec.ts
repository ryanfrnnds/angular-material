import { TestBed, inject } from '@angular/core/testing';

import { MdbMensageria } from './mensagens.service';

describe('MensagensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdbMensageria]
    });
  });

  it('should be created', inject([MdbMensageria], (service: MdbMensageria) => {
    expect(service).toBeTruthy();
  }));
});
