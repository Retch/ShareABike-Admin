import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {CrudService} from "../../shared/services/crud/crud.service";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';
import {DialogDataLockAdd} from "../../types/DialogDataLockAdd";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LockType} from "../../types/LockType";
import {Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    public crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataLockAdd
  ) {}
  lockTypeId: number = 0;
  deviceId: string = '';
  qrCodeContent: string = '';


  lockTypes: LockType[] = [];
  private lockTypeSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.lockTypeSubscription = this.crudService.lockTypes$.subscribe((lockTypes: LockType[]) => {
      this.lockTypes = lockTypes;
    });
    this.crudService.fetchAllLockTypes();
  }

  ngOnDestroy(): void {
    this.lockTypeSubscription!.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    let doesLockDeviceIdExist = false;
    this.data.locks.map((lock) => {
      if (lock.deviceId == this.deviceId) {
        doesLockDeviceIdExist = true;
      }
    });
    if (!doesLockDeviceIdExist) {
      this.crudService.addLock({
        lockTypeId: this.lockTypeId,
        deviceId: this.deviceId,
        qrCodeContent: this.qrCodeContent
      }).subscribe((response: boolean) => {
        console.log(response);
        if (response) {
          this.data.snackBarSubject.next({
            message: 'Registered lock successfully',
            dismiss: 'Dismiss',
          });
        } else {
          this.data.snackBarSubject.next({
            message: 'Error registering lock',
            dismiss: 'Dismiss',
          });
        }
      });
      this.dialogRef.close();
    }
    else {
      this.data.snackBarSubject.next({
        message: 'Lock with device id ' + this.deviceId + ' already exists',
        dismiss: 'Dismiss',
      });
    }

  }
}
