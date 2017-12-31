import { Injectable } from '@angular/core';
import { AppHostProvider, WindowHostProvider } from '../core';
import { WinInfo } from '../models';
import { FinWindowHostProvider } from './fin-window-host-provider';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class FinAppHostProviderService extends AppHostProvider {
  private application: fin.OpenFinApplication;
  private applicationWindowManager: FinWindowHostProvider;
  private children = new Map<string, FinWindowHostProvider>();

  constructor() {
    super();
    this.application = fin.desktop.Application.getCurrent();
    this.applicationWindowManager = FinWindowHostProvider.wrap(fin.desktop.Window.getCurrent());
  }

  get appId(): string {
    return this.application.uuid;
  }

  createEmptyWindow(options: WinInfo): Observable<WindowHostProvider> {
    if (!this.children.has(options.name)) {
      return Observable.create((observer: Observer<WindowHostProvider>) => {
        FinWindowHostProvider.createNew(options)
          .subscribe(provider => {
            this.children.set(options.name, provider as FinWindowHostProvider);
            observer.next(provider);
            observer.complete();
          }, error => observer.error(error));
      });
    }
    throw new Error(`Window with the name : ${options.name} already exists`);
  }
  getDefaultWindowOptions(id: number) : WinInfo {
    return {
      id,
      name: `${this.appId}-${id}`,
      top: 50,
      left:50,
      height: 500,
      width: 500,
      taskbarIconGroup : this.appId,
      alwaysOnTop: false,
      opacity: 1,
      resizable: true,
      isPersistable : true,
      showTaskbarIcon : true,
      state: 'normal'
    };
  }
}
