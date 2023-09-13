import { SnackBarContent } from "./SnackBarContent";
import { Subject } from "rxjs";

export interface DialogData {
  id: string;
  deviceId: string;
  snackBarSubject: Subject<SnackBarContent>;
}
