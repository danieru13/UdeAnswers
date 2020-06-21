import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { QuestionService } from './question.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private answers: Observable<Answer[]>;
  private answersCollection: AngularFirestoreCollection<Answer>;  
  private collectionName = 'answers';
  private db = this.afs.collection(this.collectionName);
  public response: Observable<Answer[]>;
  public user$: Observable<any> = this.auth.afAuth.user;
  public aid = "";    
  constructor(
    private afs: AngularFirestore,
    private questionService: QuestionService,
    private auth: AuthService
  ) {
    this.answersCollection = this.db;
    this.answers = this.answersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Answer;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }
  getAnswers() {
    return this.answers;
  }

  async addAnswer(content: string, questionid) {
    try {
      var aux=[],uid;
      await this.user$.subscribe((user) => {        
        uid = user.uid;        
      });
      var date = new Date();
      this.questionService.getQuestionById(questionid).subscribe((d)=>{                
        if(d.data().responses){
          this.query(questionid).get().subscribe((data)=>{            
            data.forEach((doc)=>{                                          
              aux =doc.data().content                  
              aux.push({uid,content, date})                  
              const ans = {id : doc.id, content: aux}              
              this.updateAnswer(ans.id,ans)              
            })           
          })                   
          
        }else{
          var answer: Answer = {qid: questionid,content: []};          
          
          answer.content.push({ uid, content, date });
          this.answersCollection.add(answer).then(doc=>{
            var id = doc.id
            var data={
              id : id
            }
            this.updateAnswerId(data)
            this.questionService.updateQuestion({_id:questionid,responses:true});
          })         
          
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  updateAnswerId({ id }) {
    const ref: AngularFirestoreDocument<Answer> = this.afs.doc(`answers/${id}`);
    const data = {
      id,
    };
    return ref.set(data, { merge: true });
  }  
  updateAnswer(id, obj){    
    return this.afs.collection(this.collectionName).doc(id).update(obj)            
  }
  deleteAnswerDocument(qid, id){    
    return this.afs.collection(this.collectionName).doc(id).delete().then(()=>{
      this.questionService.updateQuestion({_id:qid, responses: false});
    });
  }
  getAnswerById(id) {
    return this.db.doc(id).get();
  }
  private query(questionid){
    return this.afs.collection("answers",ref=> ref.where('qid','==',questionid));
  }
  getAnswersByQuestionId(qid){
    var collection= this.query(qid);    
    var answers: Observable<Answer[]>;    
    answers = collection.snapshotChanges().pipe(map(actions=>{
      return actions.map((a)=>{
        const data = a.payload.doc.data() as Answer;                  
        return data;
      })
    }))
    
    return answers;
  }
}
