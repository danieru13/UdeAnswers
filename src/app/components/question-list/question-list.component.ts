import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCreateComponent } from '../question-create/question-create.component';
import { ToastService } from '../../services/toast/toast.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {

  // Icons
  faTrash = faTrash;
  faComment = faComment;

  // Everything else
  questions = [];
  uid = '';
  it: any;
  deleteMode = false;
  position: number;
  public user$: Observable<any> = this.auth.afAuth.user;

  constructor(
    private QuestionService: QuestionService,
    private auth: AuthService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.QuestionService.getQuestions().subscribe((questions) => {
      //Obtiene las preguntas
      this.questions = questions; 
      this.questions.forEach((question,i)=>{
        //Recorre las preguntas para agregar la imagen y el nombre del autor
      this.auth.getUserById(question.author).get().subscribe((user)=>{
        question.authorName = user.data().displayName;
        question.authorImg = user.data().photoURL
      })        
      })        
    });

    this.getUId();
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

  async deleteQuestion(question, msg) {
    try {
      if (!this.isAuthor(question)) {
        alert('Denied');
      } else {
        await this.QuestionService.deleteQuestion(question);
        this.deleteMode = false;
        this.toastService.showSuccess(msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  addQuestion() {
    this.modalService.open(QuestionCreateComponent);
  }
  showAlert(i) {
    this.deleteMode = true;
    this.position = i;
  }
}
