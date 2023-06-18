import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private firestore: AngularFirestore) {}

  getAllUsers() {
    const usersCollection = this.firestore.collection<IUser>('users');
    return usersCollection.valueChanges();
  }

  createLoginLog(userId: string) {
    const id = this.firestore.createId();

    return this.firestore
      .collection('logs_login')
      .doc(id)
      .set({ user_id: userId, date: new Date() });
  }

  registerUser(user: IUser) {
    const id = this.firestore.createId();

    return this.firestore
      .collection('users')
      .doc(id)
      .set({ id, ...user });
  }
}
