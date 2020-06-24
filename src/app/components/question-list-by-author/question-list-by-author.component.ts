import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../toast/confirm-delete.component';

@Component({
  selector: 'app-question-list-by-author',
  templateUrl: './question-list-by-author.component.html',
  styleUrls: ['./question-list-by-author.component.css'],
})
export class QuestionListByAuthorComponent implements OnInit {
  // Icons
  faTrash = faTrash;

  // Everything else

  private _uid = '';  
  @Input()
  set uid(uid: string) {
    this._uid = uid;
    this.getData();
  }

  get uid(): string {
    return this._uid;
  }
  questions = [];

  constructor(
    private questionsService: QuestionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  getData(): void {
    if (this.uid) {
      this.questionsService
        .getQuestionsByAuthor(this.uid)
        .subscribe((questions: any) => {
          if (questions) {
            this.questions = questions;
          } else {
            console.log(`No questions made yet`);
          }
        });
    }
  }
  async deleteQuestion(question) {
    try {
      const modal = this.modalService.open(ConfirmDeleteComponent);
      modal.componentInstance.tipo = 'Pregunta';
      modal.componentInstance.question = question;
      modal.result.finally(() => this.getData());
    } catch (error) {
      console.log(error);
    }
  }  
}
