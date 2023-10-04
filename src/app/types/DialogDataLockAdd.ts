import {SnackBarContent} from "./SnackBarContent";
import {Subject} from "rxjs";
import {Lock} from "./Lock";

export interface DialogDataLockAdd {
  locks: Lock[];
  snackBarSubject: Subject<SnackBarContent>;
}
