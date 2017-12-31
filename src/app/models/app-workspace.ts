import { WinInfo } from "./win-info";
import { ComponentState } from "./component-state";


export interface AppWorkspace {
    windows : WindowState;
    components : Map<number | string,ComponentState>;
    layout? : any;
    children? : Map<string,AppWorkspace>;
}

export interface WindowState {
    main : WinInfo;
    children : Map<number|string,WinInfo>;
}