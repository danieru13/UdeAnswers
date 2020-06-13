import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../../services/answer.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.css'],
  
})
export class AnswerCreateComponent implements OnInit {
  @Input() questionId: string;
  content: string = '';  
  public user$: Observable<any> = this.auth.afAuth.user;
  constructor(
    public answerService: AnswerService, private auth: AuthService 
  ) {}

  ngOnInit() {        
  } 

  async onSubmit(form) {
    await this.answerService.addAnswer(this.content, this.questionId);
    form.reset();
    this.content = "";
    this.answerService.showAnswerCreate = false;
  } 
}
