import { WindowHostProvider } from "../core";
import { WinInfo } from "../models";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";


// PS: Do not directly create the instance of this class
export class FinWindowHostProvider extends WindowHostProvider {

  //#region ctor
  private constructor(private windowInstance: fin.OpenFinWindow) {
    super();
    this._provider = windowInstance;
    this.wireEvents();
  }
  //#endregion

  //#region Singleton methods
  static wrap(windowInstance: fin.OpenFinWindow): FinWindowHostProvider {
    return new FinWindowHostProvider(windowInstance);
  }
  static createNew(options: WinInfo): Observable<WindowHostProvider> {
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
  private static getWindowOptions(winInfo: WinInfo, url?: string): fin.WindowOptions {
    return {
      accelerator: {
        devtools: true,
        zoom: true,
        reload: true,
        reloadIgnoreCache: true,
      },
      alwaysOnTop: winInfo.alwaysOnTop,
      autoShow: false,
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
    const finWindow = this._provider as fin.OpenFinWindow;
    finWindow.addEventListener('close-requested',this.onWindowCloseRequested.bind(this));
    finWindow.addEventListener('closed',this.onWindowClosed.bind(this));
    finWindow.addEventListener('hidden',this.onWindowHide.bind(this));
    finWindow.addEventListener('show-requested',this.onWindowShowRequested.bind(this));
    finWindow.addEventListener('shown',this.onWindowShown.bind(this));
    finWindow.addEventListener('restored',this.onWindowRestored.bind(this));
    finWindow.addEventListener('minimized',this.onWindowMinimized.bind(this));
    finWindow.addEventListener('maximized',this.onWindowMaximized.bind(this));
    finWindow.addEventListener('bounds-changed',this.onWindowSizeChanged.bind(this));
  }
  private removeEvents() {
    const finWindow = this._provider as fin.OpenFinWindow;
    finWindow.removeEventListener('close-requested',this.onWindowCloseRequested.bind(this));
    finWindow.removeEventListener('closed',this.onWindowClosed.bind(this));
    finWindow.removeEventListener('hidden',this.onWindowHide.bind(this));
    finWindow.removeEventListener('show-requested',this.onWindowShowRequested.bind(this));
    finWindow.removeEventListener('shown',this.onWindowShown.bind(this));
    finWindow.removeEventListener('restored',this.onWindowRestored.bind(this));
    finWindow.removeEventListener('minimized',this.onWindowMinimized.bind(this));
    finWindow.removeEventListener('maximized',this.onWindowMaximized.bind(this));
    finWindow.removeEventListener('bounds-changed',this.onWindowSizeChanged.bind(this));
  }
  private onWindowCloseRequested(evt: any) {
    console.info('onWindowCloseRequested');
  }
  private onWindowClosed(evt: any) {
    this.removeEvents();
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
  }
  private onWindowMinimized(evt: any) {
    console.info('onWindowMinimized');
  }
  private onWindowMaximized(evt: any) {
    console.info('onWindowMaximized');
  }
  private onWindowSizeChanged(evt: any) {
    console.info('onWindowSizeChanged');
  }
  //#endregion
}
