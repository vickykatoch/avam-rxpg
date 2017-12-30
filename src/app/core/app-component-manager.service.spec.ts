import { TestBed, inject } from '@angular/core/testing';

import { AppComponentManagerService } from './app-component-manager.service';

describe('AppComponentManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponentManagerService]
    });
  });

  it('should be created', inject([AppComponentManagerService], (service: AppComponentManagerService) => {
    expect(service).toBeTruthy();
  }));
});
