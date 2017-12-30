import { WindowHostProvider } from "./window-host-provider";
import { ComponentState } from "../../models";


export abstract class UIComponentBase {
  host: WindowHostProvider;
  viewState : ComponentState;
  private isDisposed = false;

  constructor() {

  }

  abstract applyState(): void;
  abstract getState(): ComponentState;
  abstract onDispose(): void;

  // PS: Not meant to be overridden in the child classes
  dispose(): void {
    if (!this.isDisposed) {
      this.onDispose();
    }
  }


}
