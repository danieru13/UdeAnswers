import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css']
})
export class QuestionSearchComponent implements OnInit {

  deleteMode = true;
  position: number;
  uid = '';
  public user$: Observable<any> = this.authService.afAuth.user; 
  constructor(private route: ActivatedRoute, 
              public _questions : QuestionService, 
              private authService:AuthService,
              private toastService: ToastService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params=>{      
       this._questions.searchQuestion(params['query']);      
    })
    this.getUId()
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
  async deleteQuestion(question, msg) {
    try {
      if (!this.isAuthor(question)) {
        alert('Denied');
      } else {
        await this._questions.deleteQuestion(question);
        this.deleteMode = false;
        this.toastService.showSuccess(msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  showAlert(i) {
    this.deleteMode = true;
    this.position = i;
  }


}
