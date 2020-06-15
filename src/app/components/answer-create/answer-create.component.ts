import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../../services/answer.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast/toast.service';

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
    public answerService: AnswerService, private auth: AuthService , private toastService: ToastService
  ) {}

  ngOnInit() {        
  } 

  async onSubmit(form, msg) {
    try {

    await this.answerService.addAnswer(this.content, this.questionId);
    form.reset();
    this.content = "";
    this.answerService.showAnswerCreate = false;
    this.toastService.showSuccess(msg)
    } catch (error) {
      console.log(error)
    }
  } 
  
}
