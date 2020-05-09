import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'


import {Question} from '../models/question'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Observable<Question[]>;
  private questionsCollection: AngularFirestoreCollection<Question>;
  private questionDoc: AngularFirestoreDocument<Question>;

  private collectionName = "questions";
  private db = this.firestore.collection(this.collectionName);

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

  getQuestions(){
    //return this.firestore.collection(this.items).get().toPromise();
    return this.questions;
  }
  deleteQuestion(question: Question){
    this.questionDoc= this.firestore.doc(`questions/${question._id}`)
    this.questionDoc.delete();
  }
  /*getQuestionById(id){
    return this.db.doc(id).get().toPromise();
  }*/
  addQuestion(question : Question){
    this.questionsCollection.add(question);
  }
  
}
