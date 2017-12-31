import { TestBed, inject } from '@angular/core/testing';

import { ChildAppWorkspaceManagerService } from './child-app-workspace-manager.service';

describe('ChildAppWorkspaceManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildAppWorkspaceManagerService]
    });
  });

  it('should be created', inject([ChildAppWorkspaceManagerService], (service: ChildAppWorkspaceManagerService) => {
    expect(service).toBeTruthy();
  }));
});
