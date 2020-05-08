import { Component, OnInit } from '@angular/core';
import {Question} from '../../models/question'
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  public question: Question = {}

  constructor(private questionService: QuestionService) {}  

  ngOnInit(): void {
  }
  onSubmit(form){       

    this.questionService.addQuestion(this.question)
    form.reset();
    this.question = {}
   }

}
