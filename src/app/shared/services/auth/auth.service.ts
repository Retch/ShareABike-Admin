import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of} from 'rxjs';
import {getJwtRequestOptions, setJwtInSessionStorage} from './jwtHelper';
import {environment} from '../../../../../environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedSource = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

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
    withCredentials: true,
  };

  loginWithCredentials(
    username: string,
    password: string
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpClient
        .post(
          environment.apiUrl + '/api/login_check',
          {username: username, password: password},
          this.loginOptions
        )
        .subscribe((response: any) => {
          if (response.status == 200) {
            const newJwt = response.body.token;
            setJwtInSessionStorage(newJwt);
            observer.next(true);
            this.authenticatedSource.next(true);
          } else {
            observer.next(false);
            this.authenticatedSource.next(false);
          }
          observer.complete();
        });
    });
  }

  logout(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const logoutOptions = {
        observe: 'response' as const,
        withCredentials: true,
      };

      sessionStorage.removeItem('jwt');

      this.httpClient
        .get(
          environment.apiUrl + '/api/token/invalidate',
          logoutOptions
        )
        .pipe(
          catchError((err: any) => {
            return of(err);
          })
        )
        .subscribe((response: any) => {
          if (response.status == 200) {
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        });
    });
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const checkOptions = getJwtRequestOptions();
      const refreshOptions = {
        observe: 'response' as const,
        withCredentials: true,
      };
      if (checkOptions != null) {
        this.httpClient
          .get(environment.apiUrl + '/api/jwt_check', checkOptions)
          .pipe(
            catchError((err: any) => {
              return of(err);
            })
          )
          .subscribe((response: any) => {
            if (response.status == 200) {
              observer.next(true);
              observer.complete();
              this.authenticatedSource.next(true);
            } else {
              this.httpClient
                .get(
                  environment.apiUrl + '/api/token/refresh',
                  refreshOptions
                )
                .pipe(
                  catchError((err: any) => {
                    return of(err);
                  })
                )
                .subscribe((response: any) => {
                  if (response.status == 200) {
                    const newJwt = response.body.token;
                    setJwtInSessionStorage(newJwt);
                    observer.next(true);
                    observer.complete();
                    this.authenticatedSource.next(true);
                  } else {
                    observer.next(false);
                    observer.complete();
                    this.authenticatedSource.next(false);
                  }
                });
            }
          });
      } else {
        this.httpClient
          .get(environment.apiUrl + '/api/token/refresh', refreshOptions)
          .pipe(
            catchError((err: any) => {
              return of(err);
            })
          )
          .subscribe((response: any) => {
            if (response.status == 200) {
              const newJwt = response.body.token;
              setJwtInSessionStorage(newJwt);
              observer.next(true);
              observer.complete();
              this.authenticatedSource.next(true);
            } else {
              observer.next(false);
              observer.complete();
              this.authenticatedSource.next(false);
            }
          });
      }
    });
  }
}
