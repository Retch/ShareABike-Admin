import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loginOptions = {
    observe: 'response' as const,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  loginWithCredentials(
    username: string,
    password: string
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient
        .post(
          this.endpoint + '/login_check',
          { username: username, password: password },
          this.loginOptions
        )
        .subscribe((response: any) => {
          console.log("stat: " + response.status);
          if (response.status == 200) {
            const newJwt = response.body.token;
            this.setJwtInSessionStorage(newJwt);
            observer.next(true);
          } else {
            observer.next(false);
            
          }
          observer.complete();
        });
    });
  }

  getJwtFromSessionStorage(): string | null {
    return sessionStorage.getItem('jwt');
  }

  setJwtInSessionStorage(jwt: string): void {
    sessionStorage.setItem('jwt', jwt);
  }

  getRefreshTokenFromCookie(): string | null {
    let name = 'refresh_token=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const jwt = this.getJwtFromSessionStorage();

      if (jwt != null) {
        console.log("old jwt found")
        const checkOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + jwt,
          }),
        };

        this.httpClient.get(this.endpoint + '/jwt_check', checkOptions)
        .pipe(catchError((err: any) => {
          return of(err)
        }))
        .subscribe((response: any) => {
          if (response.status == 200) {
            observer.next(true);
            observer.complete();
          }
          else {
            const refreshToken = this.getRefreshTokenFromCookie();
            const refreshOptions = {
              observe: 'response' as const,
              headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
              }),
              withCredentials: true,
            };
            if (refreshToken != null) {
              const body = new HttpParams().set('refresh_token', refreshToken);
              this.httpClient.post(
                this.endpoint + '/token/refresh',
                body,
                refreshOptions
              )
              .pipe(catchError((err: any) => {
                return of(err)
              }))
              .subscribe((response: any) => {
                console.log(response)
                if (response.status == 200) {
                  const newJwt = response.body.token;
                  this.setJwtInSessionStorage(newJwt);
                  observer.next(true);
                  observer.complete();
                }
                else {
                  observer.next(false);
                  observer.complete();
                }
              });
            }
            else {
              observer.next(false);
              observer.complete();
            }
          }
        })
      }
      else {
        observer.next(false);
        observer.complete();
      }
    });
  }
}
