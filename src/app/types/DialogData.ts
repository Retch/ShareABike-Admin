import { SnackBarContent } from "./SnackBarContent";
import { Subject } from "rxjs";

export interface DialogData {
  id: number;
  deviceId: string;
  snackBarSubject: Subject<SnackBarContent>;
}
