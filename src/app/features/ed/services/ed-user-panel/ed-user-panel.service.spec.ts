import { TestBed } from '@angular/core/testing';

import { EdUserPanelService } from './ed-user-panel.service';

describe('EdUserPanelService', () => {
  let service: EdUserPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdUserPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
