import { WinInfo } from "../../models/index";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";


export abstract class WindowHostProvider {
  windowInfo : WinInfo;
  protected closeNotifier = new Subject<boolean>();
  closed$ = this.closeNotifier.asObservable();
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
