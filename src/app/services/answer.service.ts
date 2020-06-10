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

  async addAnswer(content: string, qid) {
    try {
      var author, aux=[],uid, photoURL;
      await this.user$.subscribe((user) => {
        author = user.displayName;
        uid = user.uid;
        photoURL = user.photoURL;
      });
      this.questionService.getQuestionById(qid).subscribe((d)=>{
        if(d.data().responses){
          this.query(qid).get().subscribe((data)=>{
            data.forEach((doc)=>{              
              aux =doc.data().content    
              aux.push({author,uid,photoURL,content})                  
              const ans = {id : doc.id, content: aux}              
              this.updateAnswer(ans)              
            })           
          })                   
          
        }else{
          var answer: Answer = {id: qid,content: []};          
          answer.content.push({ author, content });
          this.answersCollection.add(answer)            
          this.questionService.updateQuestion({_id:qid,responses:true});
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
  updateAnswer({id,content}:Answer){
    const ref: AngularFirestoreDocument<Answer> = this.afs.doc(`answers/${id}`);
    const data = {      
      content
    };
    return ref.set(data, { merge: true });
  }
  
  getAnswerById(id) {
    return this.db.doc(id).get();
  }
  private query(qid){
    return this.afs.collection("answers",ref=> ref.where('id','==',qid));
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
