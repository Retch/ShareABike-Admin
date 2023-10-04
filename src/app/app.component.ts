import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth/auth.service';
import { OnInit } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import {MatSnackBar, MatSnackBarModule, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {SnackBarContent} from "./types/SnackBarContent";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    LoginComponent,
    ListComponent,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MapComponent,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ShareABike-Admin';
  isLoggedIn = false;
  private authenticatedSubscription: Subscription | undefined;
  snackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'end';
  snackBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
  snackBarDuration = 2000;
  snackBarSubject = new Subject<SnackBarContent>();

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authenticatedSubscription = this.authService.authenticated$.subscribe(
      (auth) => {
        this.isLoggedIn = auth;
      }
    );
    this.authService.isLoggedIn().subscribe((isValid) => {
    });
    this.snackBarSubject.subscribe((data) => {
      this.openSnackBar(data.message, data.dismiss);
    });
  }

  ngOnDestroy() {
    this.authenticatedSubscription!.unsubscribe();
    this.snackBarSubject.unsubscribe();
  }

  openSnackBar(content: string, dismiss: string) {
    this._snackBar.open(content, dismiss, {
      horizontalPosition: this.snackBarHorizontalPosition,
      verticalPosition: this.snackBarVerticalPosition,
      duration: this.snackBarDuration,
    });
  }

  logout() {
    this.authService.logout().subscribe((success) => {
      if (success) {
        window.location.reload();
      }
      else {
        this.snackBarSubject.next({
          message: 'Logout not possible',
          dismiss: 'Dismiss',
        });
      }
    });
  }
}
