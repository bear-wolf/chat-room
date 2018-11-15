export class StorageService {
    private storageName = 'localStorage';

    setAuth(data: any ) {
        window[this.storageName].setItem('auth', data);
    }

    getAuth():string {
        return window[this.storageName].getItem('auth');
    }
}
