import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { AnswerService } from '../../services/answer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  question: any = {};
  uid: string = '';
  flag = false;
  sub: Subscription;
  responses = [];
  deleteMode = false;
  deleteQuestionMode = false;
  position: number;
  public author = '';
  public imgAuthor = '';
  public cont = 0;
  public qid = '';
  public aid = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private auth: AuthService,
    public answerService: AnswerService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.qid = id;
      if (id) {
        this.questionService.getQuestionById(id).subscribe((question: any) => {
          if (question) {
            this.question = question.data();
            this.getQuestionAuthor(question.data().author);
            this.getResponses(id);
          } else {
            console.log(
              `Question with id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
      this.getUId();
    });
  }
  getResponses(id) {
    this.answerService.getAnswersByQuestionId(id).subscribe((data) => {
      data.forEach((doc) => {
        this.responses = doc.content;
        this.aid = doc.id;
        this.cont = this.responses.length;
        this.responses.forEach((d) => {
          var id = d.uid;
          this.auth
            .getUserById(id)
            .get()
            .subscribe((user) => {
              d.photoURL = user.data().photoURL;
              d.author = user.data().displayName;
            });
        });
      });
    });
  }
  async deleteAnswer(id, i) {
    try {
      this.responses.splice(i, 1);
      var obj = { content: this.responses };
      await this.answerService.updateAnswer(id, obj);
      if (this.cont == 0) {
        this.answerService.deleteAnswerDocument(this.qid, id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getQuestionAuthor(id) {
    this.auth
      .getUserById(id)
      .get()
      .subscribe((doc) => {
        this.author = doc.data().displayName;
        this.imgAuthor = doc.data().photoURL;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/questions']);
  }

  async getUId() {
    await this.auth.user$.subscribe((data) => {
      this.uid = data.uid;
      return this.uid;
    });
  }

  isAuthor(question) {
    return this.uid === question.author;
  }
  isAnswerAuthor(id) {
    return this.uid === id;
  }
  async deleteQuestion(question, msg) {
    try {
      if (!this.isAuthor(question)) {
        alert('Denied');
      } else {
        await this.questionService.deleteQuestion(question);
        this.toastService.showSuccess(msg);
        this.gotoList();
      }
    } catch (error) {
      console.log(error);
    }
  }
  answer() {
    this.answerService.showAnswerCreate = true;
  }
  editAnswer(id) {
    const modal = this.modalService.open(AnswerEditComponent);
    modal.result;
    modal.componentInstance.answer = this.responses[id];
    modal.componentInstance.responseId = id;
    modal.componentInstance.aid = this.aid;
    modal.componentInstance.responses = this.responses;
  }
  showAlert(i) {
    this.deleteMode = true;
    this.position = i;
  }
}
