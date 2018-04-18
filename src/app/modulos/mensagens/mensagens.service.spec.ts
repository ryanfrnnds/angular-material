import { TestBed, inject } from '@angular/core/testing';

import { MensagensService } from './mensagens.service';

describe('MensagensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MensagensService]
    });
  });

  it('should be created', inject([MensagensService], (service: MensagensService) => {
    expect(service).toBeTruthy();
  }));
});
