import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth/auth.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListComponent } from './list/list.component';


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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ShareABike-Admin';
  isLoggedIn = false;
  private authenticatedSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authenticatedSubscription = this.authService.authenticated$.subscribe(
      (auth) => {
        this.isLoggedIn = auth;
      }
    );
    this.authService.isLoggedIn().subscribe((isValid) => {
    });
  }

  ngOnDestroy() {
    this.authenticatedSubscription!.unsubscribe();
  }
}
