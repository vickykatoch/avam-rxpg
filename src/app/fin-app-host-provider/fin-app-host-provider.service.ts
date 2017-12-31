import { Injectable } from '@angular/core';
import { AppHostProvider, WindowHostProvider } from '../core';
import * as fromModels from '../models';
import { FinWindowHostProvider } from './fin-window-host-provider';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

@Injectable()
export class FinAppHostProviderService extends AppHostProvider {
  private application: fin.OpenFinApplication;
  private applicationWindowManager: FinWindowHostProvider;
  private children = new Map<string, FinWindowHostProvider>();
  private subscriptions = new Map<number, Subscription>();

  constructor() {
    super();
    this.application = fin.desktop.Application.getCurrent();
    this.applicationWindowManager = FinWindowHostProvider.wrap(fin.desktop.Window.getCurrent());
  }

  get appId(): string {
    return this.application.uuid;
  }

  createEmptyWindow(options: fromModels.WinInfo): Observable<WindowHostProvider> {
    if (!this.children.has(options.name)) {
      return Observable.create((observer: Observer<WindowHostProvider>) => {
        FinWindowHostProvider.createNew(options)
          .subscribe(provider => {
            const winProvider = provider as FinWindowHostProvider;
            this.children.set(options.name, winProvider);
            this.subscribeWindowNotifications(winProvider);
            observer.next(provider);
            observer.complete();
          }, error => observer.error(error));
      });
    }
    throw new Error(`Window with the name : ${options.name} already exists`);
  }
  getDefaultWindowOptions(id: number): fromModels.WinInfo {
    return {
      id,
      name: `${this.appId}-${id}`,
      top: 50,
      left: 50,
      height: 500,
      width: 500,
      taskbarIconGroup: this.appId,
      alwaysOnTop: false,
      opacity: 1,
      resizable: true,
      isPersistable: true,
      showTaskbarIcon: true,
      state: 'normal'
    };
  }

  private subscribeWindowNotifications(winProvider: FinWindowHostProvider) {
    const subscription = winProvider.notifications$.pipe(
      filter(n => n.id === winProvider.windowInfo.id && (n.type === fromModels.CLOSE_REQUESTED || n.type === fromModels.CLOSED))
    ).subscribe(notification => {
      if (this.subscriptions.has(notification.id)) {
        const subscription = this.subscriptions.get(notification.id);
        subscription.unsubscribe();
        this.subscriptions.delete(notification.id);
      }
    });
    this.subscriptions.set(winProvider.windowInfo.id,subscription);
  }
}
