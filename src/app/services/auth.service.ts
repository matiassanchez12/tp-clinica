import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from '../interfaces';
import { BehaviorSubject, Observable, mergeMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userLogged: BehaviorSubject<IUser | undefined> = new BehaviorSubject<
    IUser | undefined
  >(undefined);
  public isPromiseResolved: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  signUp(user: IUser) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.default.auth.UserCredential) => {
        const userId = userCredential.user!.uid;
        const isAproved = user.type === 'patient' ? true : false;

        if (user.type !== 'patient') {
          userCredential.user?.sendEmailVerification();
        }

        this.firestore
          .collection('users')
          .doc(userId)
          .set({
            ...user,
            id: userId,
            isAproved,
            timestamp: new Date(),
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  getUser(): Observable<IUser | undefined> {
    return this.afAuth.authState.pipe(
      mergeMap((authState) => {
        const userDoc = this.firestore
          .collection<IUser>('users')
          .doc(authState?.uid);
        return userDoc.valueChanges().pipe(take(1));
      })
    );
  }
}
