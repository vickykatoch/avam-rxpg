import { WinInfo } from "../../models";
import { WindowHostProvider } from "./window-host-provider";
import { Observable } from "rxjs/Observable";

export abstract class AppHostProvider {

  appId: string;

  abstract createEmptyWindow(winInfo: WinInfo) : Observable<WindowHostProvider>;
  abstract getDefaultWindowOptions() : WinInfo;
}
