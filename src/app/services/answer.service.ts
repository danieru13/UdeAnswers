import { Injectable, DoBootstrap } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';
import { AngularFirestoreCollection, AngularFirestoreDocument,AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { QuestionService } from './question.service';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private answers: Observable<Answer[]>;
  private answersCollection: AngularFirestoreCollection<Answer>;
  private answerDoc: AngularFirestoreDocument<Answer>;
  private collectionName = "answers";
  private db = this.afs.collection(this.collectionName);  
  public response: Observable<Answer[]>

  constructor(private afs: AngularFirestore,private questionService: QuestionService) { 
    this.answersCollection = this.db;
    this.answers = this.answersCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Answer;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  getAnswers(){
    return this.answers;
  }
 addAnswer(answer:Answer, qId){
    var a = answer.content;
    this.answersCollection.add(answer).then(data=>{      
      var id= data.id      
      var u = {
        id: id
      }
      this.updateAnswerId(u);       
      var question = this.questionService.getQuestionById(qId)      
      question.subscribe((q:any)=>{        
        var collection = this.afs.doc(`questions/${qId}`).collection("responses")        
         collection.doc(id).set({
           id:id,
           content:a
         }) 
      })            
    });            
  }
  updateAnswerId({id}){
    const ref: AngularFirestoreDocument<Answer> = this.afs.doc(`answers/${id}`);
    const data = {
      id,
    };
    return ref.set(data, { merge: true });
  }
  getAnswerById(id){
    return this.db.doc(id).get();
  }
  getResponses(id){
    var res = "responses";
    var collection = this.afs.doc(`questions/${id}`).collection(res)
    var responses: Observable<Answer[]>
           responses = collection.snapshotChanges().pipe(map(actions=>{
             return actions.map(a=>{
               const d = a.payload.doc.data() as Answer;                             
               return d;
             })
           }))           
    return responses;
  }
}
