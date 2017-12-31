import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponentManagerService } from './app-component-manager.service';
import { AppComponentsRepository } from './app-components-repository.service';
import { WorkspaceManager } from './host/workspace-manager';
import { ChildAppWorkspaceManagerService } from './child-app-workspace-manager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    { provide : WorkspaceManager, useClass : ChildAppWorkspaceManagerService },
    AppComponentManagerService,
    AppComponentsRepository
  ]
})
export class CoreModule { }
