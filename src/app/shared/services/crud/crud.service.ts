import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Lock} from '../../../types/Lock';
import {AddLock} from "../../../types/AddLock";
import {LockType} from '../../../types/LockType';
import {AddLockType} from 'src/app/types/AddLockType';
import {UpdateLockType} from 'src/app/types/UpdateLockType';
import {getJwtRequestOptions} from '../auth/jwtHelper';
import {environment} from 'environment';

interface ResponseWithLocks {
  locks: Lock[];
}

interface ResponseWithLockTypes {
  lockTypes: LockType[];
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private lockSource = new BehaviorSubject<Lock[]>([]);
  private lockTypeSource = new BehaviorSubject<LockType[]>([]);
  locks$ = this.lockSource.asObservable();
  lockTypes$ = this.lockTypeSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  fetchAllLocks(): void {
    const options = getJwtRequestOptions();
    if (options != null) {
      this.httpClient
        .get<ResponseWithLocks>(
          environment.apiUrl + '/api/admin/locks',
          options
        )
        .pipe(
          catchError((err: any) => {
            return of(err);
          })
        )
        .subscribe((response: ResponseWithLocks) => {
          this.lockSource.next(response.locks);
        });
    }
  }

  addLock(lock: AddLock): Observable<boolean> {
    const options = getJwtRequestOptions('text');
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .post(environment.apiUrl + '/api/admin/lock', lock, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            this.fetchAllLocks();
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  addLockType(lock: AddLockType): Observable<boolean> {
    const options = getJwtRequestOptions('text');
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .post(environment.apiUrl + '/api/admin/locktype', lock, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            this.fetchAllLockTypes();
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  updateLockType(lock: UpdateLockType): Observable<boolean> {
    const options = getJwtRequestOptions('text');
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .put(environment.apiUrl + '/api/admin/locktype', lock, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            this.fetchAllLockTypes();
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  deleteLockType(id: number): Observable<boolean> {
    const options = getJwtRequestOptions('text');
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .delete(environment.apiUrl + '/api/admin/locktype/' + id, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            this.fetchAllLockTypes();
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  deleteLock(id: number): Observable<boolean> {
    const options = getJwtRequestOptions('text');
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .delete(environment.apiUrl + '/api/admin/lock/' + id, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            this.fetchAllLocks();
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  fetchAllLockTypes(): void {
    const options = getJwtRequestOptions();
    if (options != null) {
      this.httpClient
        .get<ResponseWithLocks>(
          environment.apiUrl + '/api/admin/locktypes',
          options
        )
        .pipe(
          catchError((err: any) => {
            return of(err);
          })
        )
        .subscribe((response: ResponseWithLockTypes) => {
          this.lockTypeSource.next(response.lockTypes);
        });
    }
  }

  unlockLock(id: number): Observable<boolean> {
    const options = getJwtRequestOptions();
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .get(environment.apiUrl + '/api/admin/requestunlock/' + id, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  requestPositionForLock(id: number): Observable<boolean> {
    const options = getJwtRequestOptions();
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .get(environment.apiUrl + '/api/admin/requestposition/' + id, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  requestInfoForLock(id: number): Observable<boolean> {
    const options = getJwtRequestOptions();
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .get(environment.apiUrl + '/api/admin/requestinfo/' + id, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  requestRingForLock(id: number): Observable<boolean> {
    const options = getJwtRequestOptions();
    return new Observable<boolean>((observer) => {
      if (options != null) {
        this.httpClient
          .get(environment.apiUrl + '/api/admin/requestring/' + id, options)
          .pipe(
            catchError((err: any) => {
              observer.next(false);
              observer.complete();
              return of(err);
            })
          )
          .subscribe(() => {
            observer.next(true);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }
}
