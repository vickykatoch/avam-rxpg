import { Injectable } from '@angular/core';
import { AppHostProvider } from './host/app-host-provider';
import { AppComponentManagerService } from './app-component-manager.service';
import { AppWorkspace } from '../models/index';
import { WorkspaceManager } from './host/workspace-manager';

@Injectable()
export class WorkspaceManagerService extends WorkspaceManager {
  private logger = console;

  constructor(
    private appHostProvider: AppHostProvider,
    private componentManager: AppComponentManagerService) {
    super();
    this.logger.info('Workspace service has been initialized');
  }

  restoreWorkspace(workspace?: AppWorkspace) {

  }

  saveWorkspace() {

  }
}
