export class LocalStorageService {
    private storageName = 'localStorage';

    setAuth(data: string ) {
        window[this.storageName].setItem('auth', data);

        return this;
    }

    getAuth():string {
        return window[this.storageName].getItem('auth');
    }

    setToken(data: string ) {
        window[this.storageName].setItem('token', data);

        return this;
    }

    removeToken(data: string ) {
        window[this.storageName].removeItem('token', data);

        return this;
    }

    getToken():string {
        return window[this.storageName].getItem('token');
    }
}
