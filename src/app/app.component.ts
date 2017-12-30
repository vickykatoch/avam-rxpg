import { Component, Injector, ViewContainerRef } from '@angular/core';
import { AppComponentsRepository } from './core/app-components-repository.service';
import * as entryComponents from './entryComponents';
import { AppComponentManagerService } from './core/app-component-manager.service';
import { AppHostProvider } from './core';

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
    componentBuilder.createPopupComponent(this.viewContainer, entryComponents.MAIN_HOST);
  }

  // #region Helper Methods
  private registerEntryComponents() {
    const repo = this.injector.get(AppComponentsRepository) as AppComponentsRepository;
    repo.register(entryComponents.MAIN_HOST, entryComponents.MainHostComponent, 600,400);
  }
  //#endregion
}
