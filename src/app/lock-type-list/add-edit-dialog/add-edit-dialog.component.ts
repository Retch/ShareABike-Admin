import {CommonModule} from '@angular/common';
import {Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,} from '@angular/material/dialog';
import {CrudService} from "../../shared/services/crud/crud.service";
import {DialogDataLockTypeAddEdit} from "../../types/DialogDataLockTypeAddEdit";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@Component({
  selector: 'app-add-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.css']
})
export class AddEditDialogComponent {
  description: string = '';
  minVoltage: number = 0.0;
  maxVoltage: number = 0.0;
  minCsq: number = 0.0;
  maxCsq: number = 0.0;

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    public crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataLockTypeAddEdit
  ) {
    if (data.lockTypeElement) {
      this.description = data.lockTypeElement.description;
      this.minVoltage = data.lockTypeElement.batteryVoltageMin;
      this.maxVoltage = data.lockTypeElement.batteryVoltageMax;
      this.minCsq = data.lockTypeElement.cellularSignalQualityMin
      this.maxCsq = data.lockTypeElement.cellularSignalQualityMax;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
