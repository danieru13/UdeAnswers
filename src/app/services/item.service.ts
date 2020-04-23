import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import {Question} from '../models/question'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items = "item";
  private questions: Observable<Question[]>;
  private questionsCollection: AngularFirestoreCollection<Question>;
  private itemDoc: AngularFirestoreDocument<Question>;
  private db = this.firestore.collection(this.items);

  constructor(private firestore: AngularFirestore) {
      this.questionsCollection = this.db;
      this.questions = this.questionsCollection.snapshotChanges().pipe(map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Question;
          data._id = a.payload.doc.id;
          return data;
        })
      }))      
   }

  getItems(){
    //return this.firestore.collection(this.items).get().toPromise();
    return this.questions;
  }
  deleteItem(item: Question){
    this.itemDoc= this.firestore.doc(`item/${item._id}`)
    this.itemDoc.delete();
  }
  getItemById(id){
    return this.db.doc(id).get().toPromise();
  }
  addItem(item : Question){
    this.questionsCollection.add(item);
  }
  
}
