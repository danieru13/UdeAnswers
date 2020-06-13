import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css'],
})
export class QuestionCreateComponent implements OnInit {
  public question: Question = { responses: false };
  public user$: Observable<any> = this.auth.afAuth.user;
  public questionForm: FormGroup;
  constructor(
    private questionService: QuestionService,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getUId();
    this.questionForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  async getUId() {
    await this.auth.user$.subscribe((data) => {
      this.question.author = data.uid;
      return this.question.author;
    });
  }

  async onSubmit(msg) {
    try {
      if (this.questionForm.invalid) {
        return;
      }
      this.question.content = this.questionForm.value.content;
      await this.questionService
        .addQuestion(this.question)
        .then(() => this.activeModal.dismiss());
      this.question.content = '';
      this.toastService.showSuccess(msg)
    } catch (error) {
      console.log(error);
    }
  }  
}
