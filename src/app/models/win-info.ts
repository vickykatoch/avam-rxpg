export interface WinInfo {
  id : number;
  name: string; // name of the child window
  top: number;
  left: number;
  height: number;
  width: number;
  taskbarIconGroup : string;
  alwaysOnTop?: boolean;
  opacity?: number;
  resizable?: boolean;
  isPersistable : boolean;
  showTaskbarIcon? : boolean;
  state?: string;
}
