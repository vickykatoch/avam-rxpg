import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceManagerService } from './workspace-manager.service';

describe('WorkspaceManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceManagerService]
    });
  });

  it('should be created', inject([WorkspaceManagerService], (service: WorkspaceManagerService) => {
    expect(service).toBeTruthy();
  }));
});
