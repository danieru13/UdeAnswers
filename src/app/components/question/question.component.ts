import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { AnswerService } from '../../services/answer.service';
import { User } from '../../models/user.model';
import { DocumentReference } from '@angular/fire/firestore';

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
  public author = '';
  public imgAuthor = '';
  ref: DocumentReference;
  public cont = 0;
  public qid = '';
  public aid = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private auth: AuthService,
    private answerService: AnswerService
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
      await this.answerService.deleteAnswer(id, obj);
      console.log(this.cont);
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
  deleteQuestion(question) {
    if (!this.isAuthor(question)) {
      alert('Denied');
    } else {
      this.questionService.deleteQuestion(question);
      this.gotoList();
    }
  }

  answer() {
    this.flag = true;
  }
}
