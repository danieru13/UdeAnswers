import { Component, OnInit } from '@angular/core';
import {Question} from '../../models/question'
import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  public question: Question = {responses:false}  
  constructor(private questionService: QuestionService, public auth: AuthService) {}  

  ngOnInit() { 
    this.getUId();    
  }

  async getUId() {
    await this.auth.user$.subscribe( data => {
      this.question.author = data.uid;
      return this.question.author;
     });
  }
  
  onSubmit(form){
    
    this.questionService.addQuestion(this.question);
    form.reset();
    this.question.content = "";
   }

}
