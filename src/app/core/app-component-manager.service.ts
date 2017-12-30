import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AppHostProvider } from './host/app-host-provider';
import { AppComponentsRepository } from './app-components-repository.service';
import { WindowHostProvider, ComponentDefinition, UIComponentBase } from './index';

@Injectable()
export class AppComponentManagerService {

  constructor(private appHostProvider: AppHostProvider, private componentRepo: AppComponentsRepository, private componentFactoryResolver: ComponentFactoryResolver) {

  }

  createPopupComponent(viewContainer: ViewContainerRef, componentName: string, options?: any) {
    const componentDefinition = this.componentRepo.getComponentDefinition(componentName);
    const winOptions = {
      ...this.appHostProvider.getDefaultWindowOptions(),
      ...{ height: componentDefinition.height, width: componentDefinition.width },
      ...options
    };
    this.appHostProvider.createEmptyWindow(winOptions)
      .subscribe(winProvider => {
        this.createComponent(componentDefinition,winProvider,viewContainer)
      }, error => {

      });
  }

  private createComponent(componentDefinition: ComponentDefinition, host: WindowHostProvider, vc: ViewContainerRef) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentDefinition.type);
    const component = vc.createComponent(factory);
    const viewRef = component.instance as UIComponentBase;
    viewRef.host = host;
    viewRef.viewState = {
      id : 10,
      title : 'Dynamic Compnent',
      type : componentDefinition.name
    };
    host.Provider.contentWindow.document.body.append(component.location.nativeElement);
    host.Provider.show();
  }

}
