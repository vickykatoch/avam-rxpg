
export const BOUNDS_CHANGED = 'bounds-changed';
export const CLOSED = 'closed';
export const CLOSE_REQUESTED = 'close-requested';
export const FOCUSED = 'focused';
export const HIDDEN = 'hidden';
export const INITIALIZED = 'initialized';
export const MAXIMIZED = 'maximized';
export const MINIMIZED = 'minimized';
export const RESTORED = 'restored';
export const SHOW_REQUESTED = 'show-requested';
export const SHOWN = 'shown';


export type WindowNotificationType = 
		| "bounds-changed"
		| "close-requested"
		| "closed"
		| "focused"
		| "hidden"
		| "initialized"
		| "maximized"
		| "minimized"
		| "restored"
		| "show-requested"
		| "shown";

export interface WindowNotification {
    type : WindowNotificationType;
    id : number | string;
}

