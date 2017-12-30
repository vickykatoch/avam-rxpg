import { TestBed, inject } from '@angular/core/testing';

import { FinAppHostProviderService } from './fin-app-host-provider.service';

describe('FinAppHostProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinAppHostProviderService]
    });
  });

  it('should be created', inject([FinAppHostProviderService], (service: FinAppHostProviderService) => {
    expect(service).toBeTruthy();
  }));
});
