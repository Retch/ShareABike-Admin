import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,} from '@angular/material/dialog';
import {CrudService} from 'src/app/shared/services/crud/crud.service';
import {DialogDataLockBasic} from 'src/app/types/DialogDataLockBasic';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataLockBasic
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(id: number): void {
    this.crudService.deleteLockType(id).subscribe((response: boolean) => {
      if (response) {
        this.data.snackBarSubject.next({
          message: 'Lock type successfully deleted',
          dismiss: 'Dismiss',
        });
      } else {
        this.data.snackBarSubject.next({
          message: 'Error deleting lock type',
          dismiss: 'Dismiss',
        });
      }
    });
    this.dialogRef.close();
  }
}
