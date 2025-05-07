import { TestBed } from '@angular/core/testing';

import { EdUserPanelService } from './ed-user-panel.service';
import { MessageService } from 'primeng/api';

describe('EdUserPanelService', () => {
  let service: EdUserPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(EdUserPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
