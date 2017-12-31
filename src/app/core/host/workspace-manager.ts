import { AppWorkspace } from "../../models/index";


export abstract class WorkspaceManager {
    abstract restoreWorkspace(workspace?: AppWorkspace) : void
    abstract  saveWorkspace() : void;
}