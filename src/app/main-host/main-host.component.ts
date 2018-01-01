import { Component, ViewEncapsulation } from '@angular/core';
import { UIComponentBase } from '../core/host/component-base';
import { ComponentState } from '../models';


@Component({
  selector: 'app-main-host',
  templateUrl: './main-host.component.html',
  styleUrls: ['./main-host.component.scss'],
  encapsulation : ViewEncapsulation.Native
})
export class MainHostComponent extends UIComponentBase  {

  // #region ctor
  constructor() {
    super();
  }
  //#endregion

  // #region Angular Lifecycle Hooks
  ngOnInit() {
  }
  //#endregion

  onClose() {
    this.host.close();
  }

  // #region Base Class Overrides
  applyState(): void {

  }
  getState(): ComponentState {
    return this.viewState;
  }
  onDispose(): void {

  }
  // #endregion
}
