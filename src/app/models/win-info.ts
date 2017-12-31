export interface WinInfo {
  id : number | string;
  name?: string; // name of the child window
  top: number;
  left: number;
  height: number;
  width: number;
  taskbarIconGroup? : string;
  alwaysOnTop?: boolean;
  opacity?: number;
  resizable?: boolean;
  isPersistable : boolean;
  showTaskbarIcon? : boolean;
  state?: string;
}
//TODO: Add zoom level
