import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceManagerService } from './workspace-manager.service';
import { AppComponentManagerService } from './app-component-manager.service';
import { AppComponentsRepository } from './app-components-repository.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    WorkspaceManagerService,
    AppComponentManagerService,
    AppComponentsRepository
  ]
})
export class CoreModule { }
