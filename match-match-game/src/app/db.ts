export interface User {
  name: string;
  email: string;
  score: number;
  avatar: string;
}

export class DataBase {
  public db: IDBDatabase | null = null;

  async init(name: string, version?: number): Promise<void> {
    this.db = await this.open(name, version);
  }

  open(name: string, version?: number): Promise<IDBDatabase> {
    return new Promise(res => {
      const IDB = window.indexedDB;
      const openReq = IDB.open(name, version);

      openReq.onupgradeneeded = () => {
        const database = openReq.result;
        const store = database.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('name', 'name');
        store.createIndex('email', 'email');
        store.createIndex('score', 'score');
        this.db = database;
      };

      openReq.onsuccess = () => res(openReq.result);
    });
  }

  add(user: User): void {
    if (!this.db) {
      return;
    }
    const request = this.db
      .transaction(['users'], 'readwrite')
      .objectStore('users')
      .add(user);

    // request.onsuccess = () => {
    //   console.log(`${user.name} added`);
    // };

    request.onerror = () => {
      throw new Error('user adding failed');
    };
  }

  read(email: string): void {
    if (!this.db) {
      return;
    }
    const transaction = this.db.transaction('users');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.get(email);

    request.onerror = () => {
      throw new Error('reading failed');
    };
  }

  readAll(collection: string): void {
    if (!this.db) {
      return;
    }
    const transaction = this.db.transaction([collection], 'readonly');
    const objectStore = transaction.objectStore(collection);
    const res = objectStore.getAll();

    transaction.oncomplete = () => res.result;
  }

  readFiltered(): Promise<User[]> {
    return new Promise(resolve => {
      if (!this.db) {
        return;
      }
      const transaction = this.db.transaction(['users']);
      const objectStore = transaction.objectStore('users');

      const res = objectStore.openCursor();
      const resData: User[] = [];
      res.onsuccess = () => {
        const cursor = res.result;
        if (cursor) {
          resData.push(cursor.value);
          cursor.continue();
        }
      };

      transaction.oncomplete = () => resolve(resData);
    });
  }
}
