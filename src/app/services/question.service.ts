import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators'
import { Question } from '../models/question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Observable<Question[]>;
  private questionsCollection: AngularFirestoreCollection<Question>;
  private questionDoc: AngularFirestoreDocument<Question>;
  private collectionName = "questions";
  private db = this.firestore.collection(this.collectionName, ref => ref.orderBy('date','desc'));
  result: Question[];

  constructor(private firestore: AngularFirestore) {
    this.questionsCollection = this.db;
    this.questions = this.questionsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Question;
        data._id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getQuestions() {    
    return this.questions;
  }

  getQuestionById(id) {
    return this.db.doc(id).get();
  }

  getQuestionsByAuthor(uid){
    return this.firestore.collection("questions", ref => 
    ref.where('author', '==', uid)).snapshotChanges().pipe(map(actions=>{
      return actions.map(question =>{
        const data = question.payload.doc.data() as Question
        return data;
      })
    }))
  }

  deleteQuestion(question: Question) {
       
    this.questionDoc = this.firestore.doc(`questions/${question._id}`)    
    return this.questionDoc.delete()
    
  }  
 
  addQuestion(question: Question) {
    
   return this.questionsCollection.add(question).then(data=>{
      var id= data.id      
      var u = {
        _id: id
      }                 
      this.updateQuestionId(u);
    });    
  }
  
  private updateQuestionId({ _id}: Question) {

    const ref: AngularFirestoreDocument<Question> = this.firestore.doc(`questions/${_id}`);
    const data = {
      _id,
    };

    return ref.set(data, { merge: true });
  }  
  updateQuestion({ _id, responses}: Question) {

    const ref = this.firestore.doc(`questions/${_id}`);
    return ref.update({
      responses
    })
    
  } 
  searchQuestion(s: string) {
    if (this.questions === undefined) {
      this.getQuestions().toPromise().then(() => {
        this.filter(s);
      })
    } else {
      this.filter(s);
    }
  }
  filter(s: string) {
    this.result = [];
    s = s.toLocaleLowerCase();
    this.questions.subscribe((question) => {
      question.forEach((q) => {
        const lower = q.content.toLocaleLowerCase();
        if (lower.indexOf(s) >= 0) {
          this.result.push(q)
        }
      })
    })
  }
}
