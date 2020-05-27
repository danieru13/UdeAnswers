import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'
import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/services/auth.service';
import { AnswerService } from '../../services/answer.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  question: any = {};
  uid: string = '';
  flag = false;
  sub: Subscription;
  responses=[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private questionService: QuestionService,
              private auth: AuthService,
              private answerService: AnswerService) { }

  ngOnInit(): void {
    
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.questionService.getQuestionById(id).subscribe((question: any) => {
          if (question) {
            this.question = question.data();
            this.getResponses(id)
          } else {
            console.log(`Question with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
      this.getUId();
    });

  }
  getResponses(id){
    this.answerService.getResponses(id).subscribe(answers=>{
      this.responses = answers;
    })
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/questions']);
  }

  async getUId() {
    await this.auth.user$.subscribe( data => {
      this.uid = data.uid;
      return this.uid;
     });
  }

  isAuthor(question){
    return this.uid === question.author;
  }

  deleteQuestion(question){
    if(!this.isAuthor(question)){
      alert("Denied")
    }else{
    this.questionService.deleteQuestion(question);
    this.gotoList();
    }
  }
  answer(){
    this.flag= true;
  }

}
