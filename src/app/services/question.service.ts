import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import {Question} from '../models/question'
import { QuestionSearchComponent } from '../components/question-search/question-search.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Observable<Question[]>;
  
  private questionsCollection: AngularFirestoreCollection<Question>;
  private questionDoc: AngularFirestoreDocument<Question>;
  private collectionName = "questions";
  private db = this.firestore.collection(this.collectionName);
  result : Question[];

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
  searchQuestion(s: string){
    if(this.questions === undefined){
        this.getQuestions().toPromise().then(()=>{
            this.filter(s);
        })
    }else{
        this.filter(s);
    }
  }
  filter(s:string){
      this.result=[];      
      s = s.toLocaleLowerCase();
      this.questions.subscribe((question)=>{
            console.log(question);
            question.forEach((q)=>{
                const lower = q.content.toLocaleLowerCase();                
                if(lower.indexOf(s)>=0){
                  this.result.push(q)
                }
            })                 
      })  
  } 
}
