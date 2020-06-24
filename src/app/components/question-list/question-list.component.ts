import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCreateComponent } from '../question-create/question-create.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDeleteComponent } from '../toast/confirm-delete.component';

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
  public user$: Observable<any> = this.auth.afAuth.user;

  constructor(
    private QuestionService: QuestionService,
    private auth: AuthService,
    private modalService: NgbModal,    
  ) {}

  ngOnInit() {
    this.QuestionService.getQuestions().subscribe((questions) => {
      //Obtiene las preguntas
      this.questions = questions; 
      this.questions.forEach((question)=>{
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

  deleteQuestion(question) {
    
    if (!this.isAuthor(question)) {
      alert('Denied');
    } else {
      const modal = this.modalService.open(ConfirmDeleteComponent);
      modal.result;
      modal.componentInstance.tipo = 'Pregunta';
      modal.componentInstance.question = question;
    }
  }
  addQuestion() {
    this.modalService.open(QuestionCreateComponent);
  }  
}
