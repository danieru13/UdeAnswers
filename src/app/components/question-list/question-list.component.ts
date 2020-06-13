import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCreateComponent } from '../question-create/question-create.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions=[];
  uid = '';
  it: any;
  public user$: Observable<any> = this.auth.afAuth.user;

  constructor(private QuestionService: QuestionService, private auth: AuthService, private modalService: NgbModal) { }

  ngOnInit(){
    this.QuestionService.getQuestions().subscribe(questions =>{      
      this.questions = questions;
    });

    this.getUId();
  }

  async getUId() {
    await this.auth.user$.subscribe( data => {
      this.uid = data.uid;
      return this.uid;
     });
  }

  isAuthor(question){
    return this.uid === question.author;
  }

  deleteQuestion(question){
    if(!this.isAuthor(question)){
      alert("Denied")
    }else{
    this.QuestionService.deleteQuestion(question);
    }
  }
  addQuestion(){
    this.modalService.open(QuestionCreateComponent);  
  }
  
  
  

}
