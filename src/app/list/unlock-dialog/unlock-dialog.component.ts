import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { DialogData } from 'src/app/types/DialogData';

@Component({
  selector: 'app-unlock-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './unlock-dialog.component.html',
  styleUrls: ['./unlock-dialog.component.css'],
})
export class UnlockDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UnlockDialogComponent>,
    public crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUnlockClick(id: string): void {
    this.crudService.unlockLock(id).subscribe((response: boolean) => {
      if (response) {
        this.data.snackBarSubject.next({
          message: 'Command successfully sent',
          dismiss: 'Dismiss',
        });
      } else {
        this.data.snackBarSubject.next({
          message: 'Error sending command to lock',
          dismiss: 'Dismiss',
        });
      }
    });
    this.dialogRef.close();
  }
}
