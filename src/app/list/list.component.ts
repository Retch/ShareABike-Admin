import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CrudService } from '../shared/services/crud/crud.service';
import { Subscription } from 'rxjs';
import { Lock } from '../types/Lock';
import { MatListModule } from '@angular/material/list';
import { timeStampToDateString } from '../shared/utils/timeUtil';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  locks: Lock[] = [];
  private lockSubscription: Subscription | undefined;
  columnsToDisplay = ['id', 'deviceId', 'isLocked', 'battery', 'cellular', 'lastContact', 'gps'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Lock | undefined;

  constructor(public crudService: CrudService) {}

  addData() {}

  removeData() {}

  makeReadableTime(timeStamp: number): string {
    return timeStampToDateString(timeStamp);
  }

  ngOnInit() {
    this.lockSubscription = this.crudService.locks$.subscribe((locks: any) => {
      this.locks = locks;
    });
    this.crudService.fetchAllLocks();
  }

  ngOnDestroy() {
    this.lockSubscription!.unsubscribe();
  }
}
