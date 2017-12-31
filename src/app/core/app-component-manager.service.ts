import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AppHostProvider } from './host/app-host-provider';
import { AppComponentsRepository } from './app-components-repository.service';
import { WindowHostProvider, ComponentDefinition, UIComponentBase } from './index';
import * as fromModels from '../models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AppComponentManagerService {
  private componentsMap = new Map<number, UIComponentBase>();
  private subscriptions = new Map<number, Subscription>();

  private logger = console;

  constructor(
    private appHostProvider: AppHostProvider,
    private componentRepo: AppComponentsRepository,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }
  createPopupComponent(state: fromModels.ComponentState, viewContainer: ViewContainerRef, options?: fromModels.WinInfo): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.logger.info(`Creating a component with the state : `, state);
      const componentDefinition = this.componentRepo.getComponentDefinition(state.type);
      const winOptions = {
        ...this.appHostProvider.getDefaultWindowOptions(state.id),
        ...{ height: componentDefinition.height, width: componentDefinition.width },
        ...options
      };
      this.logger.debug(`Creating a popup window with options : `, winOptions);
      this.logger.time(winOptions.name);
      this.appHostProvider.createEmptyWindow(winOptions)
        .subscribe(winProvider => {
          this.logger.timeEnd(winOptions.name);
          this.buildComponent(state, winProvider, viewContainer, componentDefinition);
          observer.next(true);
          observer.complete();
        }, observer.error);
    });
  }

  getUniqueComponentId(): number {
    let id = Math.floor(Math.random() * 10000);
    while (this.componentsMap.has(id)) {
      id = Math.floor(Math.random() * 10000);
    }
    return id;
  }

  //#region Helper Methods
  private buildComponent(compState: fromModels.ComponentState, host: WindowHostProvider, vc: ViewContainerRef, compDef: ComponentDefinition): boolean {
    const factory = this.componentFactoryResolver.resolveComponentFactory(compDef.type);
    const component = vc.createComponent(factory);
    const viewRef = component.instance as UIComponentBase;
    viewRef.host = host;
    viewRef.viewState = compState;
    const body = host.Provider.contentWindow.document.body;
    body.appendChild(component.location.nativeElement);
    this.buildStyleRefs().forEach(style => {
      body.appendChild(style);
    });
    const closeSubscription = host.notifications$.pipe(
      filter(n => n.id === compState.id && (n.type === fromModels.CLOSE_REQUESTED || n.type === fromModels.CLOSED))
    ).subscribe(this.onWindowClosed.bind(this));
    this.subscriptions.set(compState.id, closeSubscription);
    return true;
  }
  private buildStyleRefs(): any[] {
    const styles = [];
    const mainStyles = document.createElement("link");
    mainStyles.type = "text/css";
    mainStyles.rel = "stylesheet";
    mainStyles.href = "http://localhost:4200/assets/bootstrap.min.css";
    styles.push(mainStyles);
    return styles;
  }
  private onWindowClosed(notification: fromModels.WindowNotification) {
    if (this.subscriptions.has(notification.id)) {
      debugger;
      const subscription = this.subscriptions.get(notification.id);
      subscription.unsubscribe();
      this.subscriptions.delete(notification.id);
      this.componentsMap.delete(notification.id);
    }
  }
  //#endregion

}
