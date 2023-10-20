import {SnackBarContent} from "./SnackBarContent";
import {Subject} from "rxjs";

export interface DialogDataLockBasic {
  id: number;
  deviceId: string;
  description: string;
  snackBarSubject: Subject<SnackBarContent>;
}
