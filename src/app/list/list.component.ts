import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {CrudService} from '../shared/services/crud/crud.service';
import {Subscription, Subject, timer, of} from 'rxjs';
import {Lock} from '../types/Lock';
import {timeStampToDateString} from '../shared/utils/timeUtil';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UnlockDialogComponent} from './unlock-dialog/unlock-dialog.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {AddDialogComponent} from "./add-dialog/add-dialog.component";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarModule,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {SnackBarContent} from '../types/SnackBarContent';
import {switchMap} from "rxjs/operators";
import {MatSortModule} from "@angular/material/sort";

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatSortModule,
    ],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
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
    columnsToDisplay = [
        'id',
        'deviceId',
        'isLocked',
        'battery',
        'cellular',
        'lastContact',
        'gps',
    ];
    locks: Lock[] = [];
    private lockSubscription: Subscription | undefined;
    private timerSubscription: Subscription | undefined;
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'delete'];
    expandedElement: Lock | undefined;
    snackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'end';
    snackBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
    snackBarDuration = 4000;
    snackBarSubject = new Subject<SnackBarContent>();
    tooltipDelayShow = 500;

    constructor(
        public crudService: CrudService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {
    }

    makeReadableTime(timeStamp: number): string {
        return timeStampToDateString(timeStamp);
    }

    openUnlockDialog(id: number, deviceId: string): void {
        const dialogRef = this.dialog.open(UnlockDialogComponent, {
            data: {
                id: id,
                deviceId: deviceId,
                snackBarSubject: this.snackBarSubject,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

    openDeleteDialog(id: number, deviceId: string): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: {
                id: id,
                deviceId: deviceId,
                snackBarSubject: this.snackBarSubject,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: {
                locks: this.locks,
                snackBarSubject: this.snackBarSubject,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

    requestLocationForLock(id: number) {
        this.crudService.requestPositionForLock(id).subscribe((response: boolean) => {
            if (response) {
                this.snackBarSubject.next({
                    message: 'Command successfully sent',
                    dismiss: 'Dismiss',
                });
            } else {
                this.snackBarSubject.next({
                    message: 'Error sending command to lock',
                    dismiss: 'Dismiss',
                });
            }
        });
    }

    requestInfoForLock(id: number) {
        this.crudService.requestInfoForLock(id).subscribe((response: boolean) => {
            if (response) {
                this.snackBarSubject.next({
                    message: 'Command successfully sent',
                    dismiss: 'Dismiss',
                });
            } else {
                this.snackBarSubject.next({
                    message: 'Error sending command to lock',
                    dismiss: 'Dismiss',
                });
            }
        });
    }

    requestRingForLock(id: number) {
        this.crudService.requestRingForLock(id).subscribe((response: boolean) => {
            if (response) {
                this.snackBarSubject.next({
                    message: 'Command successfully sent',
                    dismiss: 'Dismiss',
                });
            } else {
                this.snackBarSubject.next({
                    message: 'Error sending command to lock',
                    dismiss: 'Dismiss',
                });
            }
        });
    }

    openSnackBar(content: string, dismiss: string) {
        this._snackBar.open(content, dismiss, {
            horizontalPosition: this.snackBarHorizontalPosition,
            verticalPosition: this.snackBarVerticalPosition,
            duration: this.snackBarDuration,
        });
    }

    ngOnInit() {
        this.lockSubscription = this.crudService.locks$.subscribe((locks: Lock[]) => {
            this.locks = locks.sort((a, b) => {
              return a.id - b.id;
                }
            );
        });
        this.crudService.fetchAllLocks();
        this.timerSubscription = timer(0, 10000)
            .pipe(
                switchMap(() => {
                    this.crudService.fetchAllLocks();
                    return of();
                })
            )
            .subscribe();
        this.snackBarSubject.subscribe((data) => {
            this.openSnackBar(data.message, data.dismiss);
        });
    }

    ngOnDestroy() {
        this.lockSubscription!.unsubscribe();
        this.snackBarSubject.unsubscribe();
    }
}
