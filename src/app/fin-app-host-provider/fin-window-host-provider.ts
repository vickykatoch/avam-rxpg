import { WindowHostProvider } from "../core";
import * as fromModels from "../models";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";


// PS: Do not directly create the instance of this class
export class FinWindowHostProvider extends WindowHostProvider {

  //#region Private Fields
  private logger = console;
  //#endregion

  //#region ctor
  private constructor(private windowInstance: fin.OpenFinWindow) {
    super();
    this._provider = windowInstance;
    this.wireEvents();
  }
  //#endregion

  close(force?: boolean): void {
    if(force) {
      (this._provider as fin.OpenFinWindow).close(true, ()=> {
        this.logger.info('Window is closed');
      },error=> {
        this.logger.error('Error occurred while hiding the window ', error);
      });
    } else {
      (this._provider as fin.OpenFinWindow).hide(()=> {
        this.logger.info('Window is hidden');
      },error=> {
        this.logger.error('Error occurred while hiding the window ', error);
      });
    }
  }
  show() : void {

  }
  //#region Singleton methods
  static wrap(windowInstance: fin.OpenFinWindow, isPersistable: boolean): Promise<FinWindowHostProvider> {
    const winProvider = new FinWindowHostProvider(windowInstance);
    return winProvider.readWindowInfo(isPersistable);
  }
  static createNew(options: fromModels.WinInfo): Observable<WindowHostProvider> {
    return Observable.create((observer: Observer<WindowHostProvider>) => {
      const winOptions = FinWindowHostProvider.getWindowOptions(options);
      const finWindow = new fin.desktop.Window(winOptions, () => {
        const provider = new FinWindowHostProvider(finWindow);
        provider.windowInfo = options;
        observer.next(provider);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }
  //#endregion

  //#region Helper Methods
  private static getWindowOptions(winInfo: fromModels.WinInfo, url?: string): fin.WindowOptions {
    return {
      accelerator: {
        devtools: true,
        zoom: true,
        reload: true,
        reloadIgnoreCache: true,
      },
      alwaysOnTop: winInfo.alwaysOnTop,
      autoShow: true,
      contextMenu: true, // context menu when right-clicking on a window
      cornerRounding: {
        width: 0,
        height: 0
      },
      customData: { // attach serializable data to to be ferried around with the window options
        'hei': 'hello'
      },
      defaultCentered: true,
      defaultHeight: winInfo.height,
      defaultWidth: winInfo.width,
      defaultTop: winInfo.top,
      defaultLeft: winInfo.left,
      frame: true,  // A flag to show the frame. Default: true.
      hideOnClose: true,
      // icon: string;
      // maxHeight?: number;
      // maximizable?: boolean;
      // maxWidth?: number;
      // minHeight?: number;
      minimizable: true,
      // minWidth: 50,
      name: winInfo.name,
      opacity: winInfo.opacity,
      resizable: winInfo.resizable || true,
      // resizeRegion?: {
      //   size?: number;
      //   bottomRightCorner?: number;
      // }
      showTaskbarIcon: winInfo.resizable || true,
      saveWindowState: false,
      taskbarIconGroup: winInfo.taskbarIconGroup,
      state: winInfo.state || 'normal',
      url: url || 'about:blank',
      waitForPageLoad: true
    };
  }
  private wireEvents() {
    // TODO: Most of the event handlers can be combined here, Single handler can handle most the events
    const finWindow = this._provider as fin.OpenFinWindow;
    finWindow.addEventListener(fromModels.CLOSED, this.onWindowClosed.bind(this));

    // finWindow.addEventListener(fromModels.CLOSE_REQUESTED, this.onWindowCloseRequested.bind(this));
    // finWindow.addEventListener(fromModels.HIDDEN,this.onWindowHide.bind(this));
    // finWindow.addEventListener(fromModels.SHOW_REQUESTED,this.onWindowShowRequested.bind(this));
    // finWindow.addEventListener(fromModels.SHOWN,this.onWindowShown.bind(this));
    finWindow.addEventListener(fromModels.RESTORED, this.onWindowRestored.bind(this));
    finWindow.addEventListener(fromModels.MINIMIZED, this.onWindowMinimized.bind(this));
    finWindow.addEventListener(fromModels.MAXIMIZED, this.onWindowMaximized.bind(this));
    finWindow.addEventListener(fromModels.BOUNDS_CHANGED, this.onWindowSizeChanged.bind(this));
  }
  private removeEvents() {
    const finWindow = this._provider as fin.OpenFinWindow;
    // finWindow.removeEventListener(fromModels.CLOSE_REQUESTED, this.onWindowCloseRequested.bind(this));
    finWindow.removeEventListener(fromModels.CLOSED, this.onWindowClosed);
    // finWindow.removeEventListener(fromModels.HIDDEN,this.onWindowHide.bind(this));
    // finWindow.removeEventListener(fromModels.SHOW_REQUESTED,this.onWindowShowRequested.bind(this));
    // finWindow.removeEventListener(fromModels.SHOWN,this.onWindowShown.bind(this));
    finWindow.removeEventListener(fromModels.RESTORED, this.onWindowRestored);
    finWindow.removeEventListener(fromModels.MINIMIZED, this.onWindowMinimized);
    finWindow.removeEventListener(fromModels.MAXIMIZED, this.onWindowMaximized);
    finWindow.removeEventListener(fromModels.BOUNDS_CHANGED, this.onWindowSizeChanged);
  }
  private onWindowCloseRequested(evt: any) {
    debugger;
    evt.force =true;
    this.removeEvents();
    this.notifier.next({ id: this.windowInfo.id, type: fromModels.CLOSE_REQUESTED });
    console.info('onWindowCloseRequested');
  }
  private onWindowClosed(evt: any) {
    console.info('onWindowClosed');
    this.removeEvents();
  }
  private onWindowHide(evt: any) {
    console.info('onWindowClosed');
  }
  private onWindowShowRequested(evt: any) {
    console.info('onWindowShowRequested');
  }
  private onWindowShown(evt: any) {
    console.info('onWindowShown');
  }
  private onWindowRestored(evt: any) {
    console.info('onWindowRestored');
    this.notifier.next({ id: this.windowInfo.id, type: fromModels.RESTORED });
  }
  private onWindowMinimized(evt: any) {
    this.notifier.next({ id: this.windowInfo.id, type: fromModels.MINIMIZED });
    console.info('onWindowMinimized');
  }
  private onWindowMaximized(evt: any) {
    this.notifier.next({ id: this.windowInfo.id, type: fromModels.MAXIMIZED });
    console.info('onWindowMaximized');
  }
  private onWindowSizeChanged(evt: any) {
    console.info('onWindowSizeChanged');
  }
  private readWindowInfo(isPersistable: boolean): Promise<FinWindowHostProvider> {
    return new Promise<FinWindowHostProvider>((resolve, reject) => {
      const finWindow = this._provider as fin.OpenFinWindow;
      finWindow.getBounds((bounds) => {
        this.windowInfo = this.getWinInfoFromBounds(bounds,isPersistable);
        resolve(this);
      }, error => reject(error));
    });
  }
  private getWinInfoFromBounds(bounds: fin.WindowBounds, isPersistable): fromModels.WinInfo {
    return {
      id: this._provider.name,
      name: this._provider.name,
      left: bounds.left,
      top: bounds.top,
      height: bounds.height,
      width: bounds.width,
      isPersistable
    };
  }
  //#endregion
}
