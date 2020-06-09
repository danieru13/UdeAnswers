import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css']
})
export class QuestionSearchComponent implements OnInit {

  public user$: Observable<any> = this.authService.afAuth.user; 
  constructor(private route: ActivatedRoute, 
              public _questions : QuestionService, 
              private authService:AuthService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params=>{      
       this._questions.searchQuestion(params['query']);      
    })
  }
  isAuthor(question){
    return this.user$ === question.author;
  }
  deleteQuestion(question){
    if(!this.isAuthor(question)){
      alert("Denied")
    }else{
    this._questions.deleteQuestion(question);
    }
  }


}
