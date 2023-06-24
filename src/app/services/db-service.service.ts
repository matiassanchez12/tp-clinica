import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IProfession, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private firestore: AngularFirestore) {}

  getUserById(userId: string) {
    const userDoc = this.firestore.collection<IUser>('users').doc(userId);
    return userDoc.valueChanges();
  }

  getAllUsers() {
    const usersCollection = this.firestore.collection<IUser>('users');
    return usersCollection.valueChanges();
  }

  getAllProfessions() {
    const usersCollection =
      this.firestore.collection<IProfession>('professions');
    return usersCollection.valueChanges();
  }

  createLoginLog(userId: string) {
    const id = this.firestore.createId();

    return this.firestore
      .collection('logs_login')
      .doc(id)
      .set({ user_id: userId, date: new Date() });
  }

  createProfession(profession: string) {
    const id = this.firestore.createId();

    return this.firestore
      .collection('professions')
      .doc(id)
      .set({ id, profession });
  }

  registerUser(user: IUser) {
    const id = this.firestore.createId();

    return this.firestore
      .collection('users')
      .doc(id)
      .set({ id, ...user });
  }
}
