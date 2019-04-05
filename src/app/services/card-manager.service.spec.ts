import { TestBed } from '@angular/core/testing';

import { CardManagerService } from './card-manager.service';

describe('CardManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardManagerService = TestBed.get(CardManagerService);
    expect(service).toBeTruthy();
  });
});
