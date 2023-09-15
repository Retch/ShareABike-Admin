import {HttpHeaders} from '@angular/common/http';
import {Buffer} from 'buffer/';

const getJwtFromSessionStorage = (): string | null => {
    return sessionStorage.getItem('jwt');
}

const setJwtInSessionStorage = (jwt: string): void => {
    sessionStorage.setItem('jwt', jwt);
}

const isJwtExpired = (jwt: string): boolean => {
    const tokenDecodablePart = jwt.split('.')[1];
    const decoded = JSON.parse(
    Buffer.from(tokenDecodablePart, 'base64').toString()
    );
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp <= now;
}

const getJwtRequestOptions = (responseType = "json"): { headers: HttpHeaders, responseType: "json" | undefined } | null => {
    const jwt = getJwtFromSessionStorage();
    if (jwt != null) {
        if (isJwtExpired(jwt)) {
            return null;
        }
        return {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + jwt,
          }),
          responseType: responseType as "json"
        };
    }
    return null;
}

export { setJwtInSessionStorage, getJwtRequestOptions }
