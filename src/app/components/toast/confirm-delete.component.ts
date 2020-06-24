import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faExclamationCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { QuestionService } from '../../services/question.service';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
})
export class ConfirmDeleteComponent implements OnInit {
  deleteForm: FormGroup;
  faExclamationCircle = faExclamationCircle;
  question: any;
  tipo: string;
  faTrash = faTrash;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public questionService: QuestionService,
    private toastService: ToastService,
    private router: Router
  ) {}
  ngOnInit() {
    this.deleteForm = this.formBuilder.group({});
  }
  gotoList() {
    this.router.navigate(['/questions']);
  }
  async onDelete(msg) {
    try {
      await this.questionService
        .deleteQuestion(this.question)
        .then(() => this.activeModal.dismiss());
      this.toastService.showSuccess(msg);
      this.gotoList();
    } catch (error) {
      console.log(error);
    }
  }
}
