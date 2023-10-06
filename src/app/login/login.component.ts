import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarContent } from '../types/SnackBarContent';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CrudService} from '../shared/services/crud/crud.service';
import {AuthService} from '../shared/services/auth/auth.service';
import {Subject, Subscription} from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  private authenticatedSubscription: Subscription | undefined;
  Locks: any = [];
  snackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'end';
  snackBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
  snackBarDuration = 4000;
  snackBarSubject = new Subject<SnackBarContent>();

  constructor(
    public crudService: CrudService,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(content: string, dismiss: string) {
    this._snackBar.open(content, dismiss, {
      horizontalPosition: this.snackBarHorizontalPosition,
      verticalPosition: this.snackBarVerticalPosition,
      duration: this.snackBarDuration,
    });
  }

  ngOnInit() {
    this.authenticatedSubscription = this.authService.authenticated$.subscribe(
      (auth) => {
        this.isLoggedIn = auth;
      }
    );
    this.snackBarSubject.subscribe((data) => {
      this.openSnackBar(data.message, data.dismiss);
    });
  }

  ngOnDestroy() {
    this.authenticatedSubscription!.unsubscribe();
  }

  fetchData() {
    console.log(this.username, this.password);
  }

  login() {
    this.authService
      .loginWithCredentials(this.username, this.password)
      .subscribe((test: boolean) => {
        if (!test) {
          this.snackBarSubject.next({
          message: 'Error logging in',
          dismiss: 'Dismiss',
        });
        }
      });
  }
}
