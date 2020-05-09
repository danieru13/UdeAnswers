import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css']
})
export class QuestionSearchComponent implements OnInit {

  aux: any=[];
  constructor(private route: ActivatedRoute, 
              public _questions : QuestionService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params=>{      
      this.aux = this._questions.searchQuestion(params['busqueda']);      
    })
  }

}
