import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../../models/answer';
import { AuthService } from '../../services/auth.service';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.css']
})
export class AnswerCreateComponent implements OnInit {

  @Input() questionId: string;
  public answer: Answer = {}
  constructor(private auth: AuthService, private answerService: AnswerService) { }

  ngOnInit() {        
  }
  
  async onSubmit(form){
    
    this.answerService.addAnswer(this.answer,this.questionId);
    
    form.reset();
    this.answer.content = "";
   }

}
