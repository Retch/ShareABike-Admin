import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CrudService} from '../shared/services/crud/crud.service';
import {AuthService} from '../shared/services/auth/auth.service';
import {Subscription} from 'rxjs';


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

  constructor(
    public crudService: CrudService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authenticatedSubscription = this.authService.authenticated$.subscribe(
      (auth) => {
        this.isLoggedIn = auth;
      }
    );
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
      .subscribe((res) => {
      });
  }
}
