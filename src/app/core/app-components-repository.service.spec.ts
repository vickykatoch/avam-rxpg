import { TestBed, inject } from '@angular/core/testing';

import { AppComponentsRepository } from './app-components-repository.service';

describe('AppComponentRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponentsRepository]
    });
  });

  it('should be created', inject([AppComponentsRepository], (service: AppComponentsRepository) => {
    expect(service).toBeTruthy();
  }));
});
