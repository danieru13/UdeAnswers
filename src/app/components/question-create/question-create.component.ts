import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css'],
})
export class QuestionCreateComponent implements OnInit {
  public question: Question = { responses: false };  
  public questionForm: FormGroup;
  constructor(
    private questionService: QuestionService,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private router: Router
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
      this.question.date = new Date();      
      await this.questionService
        .addQuestion(this.question)
        .then(() => {
          this.activeModal.dismiss()           
        });            
        if(this.router.url.includes("search")){
          this.router.navigate(['/questions'])
        }    
      this.question.content = '';      
      this.toastService.showSuccess(msg)
    } catch (error) {
      console.log(error);
    }
  }  
}
