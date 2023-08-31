import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrudService } from '../shared/crud/crud.service';
import { AuthService } from '../shared/auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatFormFieldModule,
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
  Locks: any = [];

  constructor(public crudService: CrudService, public authService: AuthService) {}

  ngOnInit() {}

  fetchData() {
    console.log(this.username, this.password);
    //this.result$ = this.http.get('http://localhost:8000/api/login_check');
    //let res = this.http.get('https://enpwbd5az2w17.x.pipedream.net/');
  }

  login() {
    //this.fetchData();
    /*return this.crudService.getAllLocks().subscribe((res: {}) => {
      this.Locks = res;
      console.log(this.Locks);
    });*/
    //sessionStorage.setItem('jwt', 'test');
    //console.log(sessionStorage.getItem('jwt'));
    //const res = this.authService.isLoggedIn();
    //res.subscribe((res: any) => {
    //  console.log(res);
    //});
    this.authService.loginWithCredentials(this.username, this.password).subscribe(res => console.log("worked: " + res))
  }
}
