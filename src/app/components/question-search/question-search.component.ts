import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDeleteComponent } from '../toast/confirm-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css'],
})
export class QuestionSearchComponent implements OnInit {
  faTrash = faTrash;
  faComment = faComment;
  uid = '';
  questions= [];
  public user$: Observable<any> = this.authService.afAuth.user;
  constructor(
    private route: ActivatedRoute,
    public questionService: QuestionService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
   this.route.params.subscribe((params) => {     
      this.questionService.searchQuestion(params['query']);
      this.questions = this.questionService.result;            
      
    });    
    this.getUId();
  }
  async getUId() {
    await this.authService.user$.subscribe((data) => {
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
      modal.componentInstance.toList = true
    }
  } 
}
