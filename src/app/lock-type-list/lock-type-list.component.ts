import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CrudService} from "../shared/services/crud/crud.service";
import {Subscription} from "rxjs";
import {LockType} from "../types/LockType";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddEditDialogComponent} from "./add-edit-dialog/add-edit-dialog.component";

@Component({
  selector: 'app-lock-type-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule, MatTooltipModule, MatDialogModule],
  templateUrl: './lock-type-list.component.html',
  styleUrls: ['./lock-type-list.component.css']
})
export class LockTypeListComponent implements OnInit {
  private lockTypeSubscription: Subscription | undefined;
  lockTypes: LockType[] = [];
  displayedColumns: string[] = ['id', 'description', 'range-voltage', 'range-csq', 'edit'];
  tooltipDelayShow = 500;

  constructor(
      private crudService: CrudService,
      public dialog: MatDialog
  ) {
  }

  openAddEditDialog(id = 0): void {
    let lockTypeElement: LockType | undefined;
    if (id != 0) {
        lockTypeElement = this.lockTypes.find((element: LockType) => element.id === id);
    }
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      data: {
        lockTypeElement: lockTypeElement,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  ngOnInit(): void {
    this.lockTypeSubscription = this.crudService.lockTypes$.subscribe((locks: LockType[]) => {
      this.lockTypes = locks.sort((a, b) => {
            return a.id - b.id;
          }
      );
    });
    this.crudService.fetchAllLockTypes();
  }

  ngOnDestroy(): void {
    this.lockTypeSubscription!.unsubscribe();
  }
}
