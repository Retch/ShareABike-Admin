import { HttpHeaders } from '@angular/common/http';

const getJwtFromSessionStorage = (): string | null => {
    return sessionStorage.getItem('jwt');
}

const setJwtInSessionStorage = (jwt: string): void => {
    sessionStorage.setItem('jwt', jwt);
}

const getJwtRequestOptions = (): { headers: HttpHeaders } | null => {
    const jwt = getJwtFromSessionStorage();
    if (jwt != null) {
        const checkOptions = {
            headers: new HttpHeaders({
            Authorization: 'Bearer ' + jwt,
            }),
        };
        return checkOptions;
    }
    return null;
}

export { setJwtInSessionStorage, getJwtRequestOptions }
