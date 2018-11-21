export class StorageService {
    private storageName = 'localStorage';

    setAuth(data: any ) {
        window[this.storageName].setItem('auth', data);
    }

    getAuth():string {
        return window[this.storageName].getItem('auth');
    }

    setToken(data: string ) {
        window[this.storageName].setItem('token', data);
    }

    getToken():string {
        return window[this.storageName].getItem('token');
    }
}
