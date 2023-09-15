import { SnackBarContent } from "./SnackBarContent";
import { Subject } from "rxjs";

export interface DialogDataLockUnlock {
  id: number;
  deviceId: string;
  snackBarSubject: Subject<SnackBarContent>;
}
