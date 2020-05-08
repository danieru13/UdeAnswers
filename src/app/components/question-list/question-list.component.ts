import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../../services/question.service';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions=[];
  it: any;

  constructor(private QuestionService: QuestionService) { }

  ngOnInit(){
    // this.ItemService.getItems().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     this.items.push(doc.data());        
    //   });
    // })
    // .catch(error => { console.log(error);
    // });
    
    this.QuestionService.getQuestions().subscribe(questions =>{      
      this.questions = questions;
    });
  }
  deleteQuestion(question){
    this.QuestionService.deleteQuestion(question);
  }

}
