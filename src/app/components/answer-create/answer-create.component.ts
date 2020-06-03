import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.css']
})
export class AnswerCreateComponent implements OnInit {

  @Input() questionId: string;  
  content : string= "";
  constructor(private answerService: AnswerService) { }

  ngOnInit() {        
  }
  
  async onSubmit(form){

    this.answerService.addAnswer(this.content,this.questionId);    
    form.reset();    
    this.content = "";  
    
   }

}
