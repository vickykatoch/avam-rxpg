import { Injectable } from '@angular/core';
import { WorkspaceManager } from './host/workspace-manager';
import * as fromModels from '../models';
import { AppHostProvider } from './host/app-host-provider';
import { AppComponentManagerService } from './app-component-manager.service';

const replacer = (key, value) => {
  if (value instanceof Map) {
    const obj = {};
    value.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  return value;
};

@Injectable()
export class ChildAppWorkspaceManagerService extends WorkspaceManager {

  //#region Private Fields
  private logger = console;
  private workspaceString = '';
  //#endregion

  //#region ctor
  constructor(
    private appHostProvider: AppHostProvider,
    private componentManager: AppComponentManagerService) {
    super();
    this.logger.info('Workspace service has been initialized');
  }
  //#endregion

  //#region Parent overrides
  restoreWorkspace(workspace?: fromModels.AppWorkspace): void {
    // const workspaceJson = JSON.parse(this.workspaceString);
    if (workspace) {

    } else {

    }
  }
  saveWorkspace(): void {
    this.logger.time('Saving workspace');
    const workspace = {
      windows: this.appHostProvider.getState(),
      components: this.componentManager.getState(),
      layout: {}
    };
    this.workspaceString = JSON.stringify(workspace, replacer);
    this.logger.info('Workspace saved : ', this.workspaceString);
  }
  //#endregion

}
