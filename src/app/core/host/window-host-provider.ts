import { WinInfo, WindowNotification } from "../../models";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";


export abstract class WindowHostProvider {
  windowInfo : WinInfo;
  protected notifier = new Subject<WindowNotification>();
  notifications$ = this.notifier.asObservable();

  protected _provider : any;

  protected constructor() {

  }
  get Provider() : any {
    return this._provider;
  }

  static createNew(options: WinInfo) : Observable<WindowHostProvider> {
    throw new Error('Method must be written in child classes as this is just a template');
  }


}
