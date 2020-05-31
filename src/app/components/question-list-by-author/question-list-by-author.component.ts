import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-list-by-author',
  templateUrl: './question-list-by-author.component.html',
  styleUrls: ['./question-list-by-author.component.css']
})
export class QuestionListByAuthorComponent implements OnInit {
  
  @Input() uid: string;
  questions = [];

  constructor(private questionsService: QuestionService) { }

  ngOnInit(): void {
    if(this.uid){
      this.questionsService.getQuestionsByAuthor(this.uid).subscribe((questions: any) => {
        if(questions){
          questions.forEach( doc => {
            let data = doc.data();
            data.id = doc.id;
            this.questions.push(data);
          })
        } else {
          console.log(`No questions made yet`);
        }
      });
    }
  }
}
