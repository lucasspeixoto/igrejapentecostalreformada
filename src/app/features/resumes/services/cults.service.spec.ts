import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { CultsService } from './cults.service';

describe('CultsService', () => {
  let service: CultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CultsService, MessageService],
    });
    service = TestBed.inject(CultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
