import { TestBed, inject } from '@angular/core/testing';

import { MdbMensagemServico } from './mensagens.service';

describe('MensagensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdbMensagemServico]
    });
  });

  it('should be created', inject([MdbMensagemServico], (service: MdbMensagemServico) => {
    expect(service).toBeTruthy();
  }));
});
