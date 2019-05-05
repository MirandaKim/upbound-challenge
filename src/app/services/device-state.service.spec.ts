import { TestBed } from '@angular/core/testing';

import { DeviceStateService } from './device-state.service';

describe('DeviceStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceStateService = TestBed.get(DeviceStateService);
    expect(service).toBeTruthy();
  });
});
