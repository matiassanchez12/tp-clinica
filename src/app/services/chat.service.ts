import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { IChatMessage } from '../interfaces';
import {
  concatMap,
  map,
  mergeAll,
  mergeMap,
  reduce,
  toArray,
} from 'rxjs/operators';
import * as firebase from 'firebase/compat';
import { Observable, combineLatest, concat, forkJoin, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: AngularFirestore) {}

  public createMessage(
    message: string,
    receiver_id: string,
    sender_id: string
  ) {
    const id = this.firestore.createId();

    return this.firestore.collection('chat_messages').doc(id).set({
      id,
      content: message,
      receiver_id,
      sender_id,
      timestamp: new Date(),
    });
  }

  public getAllMessages(userLoggedId: string) {
    //solo traer los mensajes que sean del usuario logged
    const chatCollection = this.firestore.collection<IChatMessage>(
      'chat_messages',
      (ref) =>
        ref
          .where('sender_id', '==', userLoggedId)
          .where('receiver_id', '==', userLoggedId)
          .orderBy('timestamp')
    );

    return chatCollection.valueChanges();
  }

  public getChatMessages(userLoggedId: string, userChatId: string) {
    const sentMessagesCollection = this.firestore.collection<IChatMessage>(
      'chat_messages',
      (ref) =>
        ref
          .where('sender_id', '==', userLoggedId)
          .where('receiver_id', '==', userChatId)
    );

    const receivedMessagesCollection = this.firestore.collection<IChatMessage>(
      'chat_messages',
      (ref) =>
        ref
          .where('sender_id', '==', userChatId)
          .where('receiver_id', '==', userLoggedId)
    );

    const sentMessages = sentMessagesCollection.valueChanges();
    const receivedMessages = receivedMessagesCollection.valueChanges();

    return combineLatest([sentMessages, receivedMessages]).pipe(
      map(([sentMessages, receivedMessages]) => [
        ...sentMessages,
        ...receivedMessages,
      ]),
      map((messages) => {
        return messages.sort((a: any, b: any) => {
          const timestampA =
            a.timestamp.seconds * 1000 + a.timestamp.nanoseconds / 1000000;
          const timestampB =
            b.timestamp.seconds * 1000 + b.timestamp.nanoseconds / 1000000;
          return timestampA - timestampB;
        });
      })
    );
  }
}
