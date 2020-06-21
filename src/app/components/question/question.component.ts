import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { AnswerService } from '../../services/answer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';
import { ToastService } from '../../services/toast/toast.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  // Icons
  faTrash = faTrash;
  faEdit = faEdit;

  // Everything else
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
        //recupera las respuestas y se asignan a un array
        this.responses = doc.content;
        //Id del documento
        this.aid = doc.id;
        //contador de respuestas
        this.cont = this.responses.length;
        this.responses.forEach((d) => {
          //Id del autor de la respuesta
          var id = d.uid;
          //Fecha de creación
          d.date = d.date.toDate()
          this.auth
            //Busca el nombre y la imagen del autor para asignarlas al array
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
  async deleteAnswer(id, i, msg) {
    try {
      //Elimina en el array de respuestas la que llega como parametro
      this.responses.splice(i, 1);
      //Objeto con el nuevo array
      var obj = { content: this.responses };
      //Se actualiza el documento de respuestas con el nuevo objeto
      await this.answerService.updateAnswer(id, obj);
      //Si no queda ninguna respuesta se elimina el documento
      if (this.cont == 0) {
        this.answerService.deleteAnswerDocument(this.qid, id);
      }
      this.deleteMode = false
      this.toastService.showSuccess(msg);
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
  editAnswer(id) {
    //Abre el modal
    const modal = this.modalService.open(AnswerEditComponent);    
    modal.result;
    let date = new Date();
    //Con componentInstance se asignan los valores especificos que se requieran para utilizarlos en otro componente
    modal.componentInstance.answer = this.responses[id];
    modal.componentInstance.responseId = id;
    modal.componentInstance.aid = this.aid;
    modal.componentInstance.responses = this.responses;
    modal.componentInstance.date = date
  }
  showAlert(i) {
    this.deleteMode = true;
    this.position = i;
  }
}
