import { Component, Injector, ViewContainerRef } from '@angular/core';
import { AppComponentsRepository } from './core/app-components-repository.service';
import * as entryComponents from './entryComponents';
import { AppComponentManagerService } from './core/app-component-manager.service';
import { AppHostProvider, WorkspaceManager } from './core';
import { Observable } from 'rxjs/Observable';
// import { zip } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private injector: Injector, appHostProvider: AppHostProvider, private viewContainer: ViewContainerRef) {
    console.log(appHostProvider.appId);
    this.registerEntryComponents();
  }

  onCreatePopup() {
    const componentBuilder = this.injector.get(AppComponentManagerService) as AppComponentManagerService;
    const compState = {
      id : componentBuilder.getUniqueComponentId(),
      title : 'MSFT',
      type : entryComponents.MAIN_HOST,
      state : {
        indicative : 'MSFT.DOW'
      }
    };
    componentBuilder.createPopupComponent(compState, this.viewContainer).subscribe(x=> {
      console.log('Created Successfully');
    },console.error);
  }
  restoreWorkspace() {
    // const workspaceManager = this.injector.get(WorkspaceManager) as WorkspaceManager;
    // workspaceManager.restoreWorkspace();
    const componentBuilder = this.injector.get(AppComponentManagerService) as AppComponentManagerService;
    const observable$ = zip(
      this.getC1(componentBuilder),
      this.getC2(componentBuilder),
      this.getC3(componentBuilder)
    );
    observable$.subscribe(x=> {
      console.log(x);
    },error=> {
      console.log(error);
    });
  }
  saveWorkspace() {
    const workspaceManager = this.injector.get(WorkspaceManager) as WorkspaceManager;
    workspaceManager.saveWorkspace();
  }
  private getC1(compBuilder: AppComponentManagerService) : Observable<boolean> {
    const compState = {
      id : compBuilder.getUniqueComponentId(),
      title : 'XYZ',
      type : entryComponents.MAIN_HOST,
      state : {
        indicative : 'XYZ.DOW'
      }
    };
    const winInfo  = {
      id : compState.id,
      top : 25,
      left: 25,
      height : 200,
      width : 100,
      isPersistable : true
    };
    return compBuilder.createPopupComponent(compState, this.viewContainer, winInfo);
  }
  private getC2(compBuilder: AppComponentManagerService) : Observable<boolean> {
    const compState = {
      id : compBuilder.getUniqueComponentId(),
      title : 'ABC',
      type : entryComponents.MAIN_HOST,
      state : {
        indicative : 'ABC.DOW'
      }
    };
    const winInfo  = {
      id : compState.id,
      top : 25,
      left: 325,
      height : 300,
      width : 200,
      isPersistable : true
    };
    return compBuilder.createPopupComponent(compState, this.viewContainer, winInfo);
  }
  private getC3(compBuilder: AppComponentManagerService) : Observable<boolean> {
    const compState = {
      id : compBuilder.getUniqueComponentId(),
      title : 'HGK',
      type : entryComponents.MAIN_HOST,
      state : {
        indicative : 'HGK.DOW'
      }
    };
    const winInfo  = {
      id : compState.id,
      top : 25,
      left: 650,
      height : 600,
      width : 400,
      isPersistable : true
    };
    return compBuilder.createPopupComponent(compState, this.viewContainer, winInfo);
  }
  // #region Helper Methods
  private registerEntryComponents() {
    const repo = this.injector.get(AppComponentsRepository) as AppComponentsRepository;
    repo.register(entryComponents.MAIN_HOST, entryComponents.MainHostComponent, 600,400);
  }
  //#endregion
}
