import {LockType} from "./LockType";
import {Subject} from "rxjs";
import {SnackBarContent} from "./SnackBarContent";

export interface DialogDataLockTypeAddEdit {
  lockTypeElement: LockType | undefined;
  snackBarSubject: Subject<SnackBarContent>;
}
