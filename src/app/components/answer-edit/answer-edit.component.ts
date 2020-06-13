import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Answer } from '../../models/answer';
import { AnswerService } from '../../services/answer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent implements OnInit {

  content: string = '';
  answerForm: FormGroup;
  answer: Answer;
  responseId: number;
  aid: string;
  responses = [];

  constructor(
    public answerService: AnswerService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {

    this.answerForm = this.formBuilder.group({
      content: ['', Validators.required],
    });  
    this.loadAnswer(this.answer);      
  }
  loadAnswer(answer) {
    this.answerForm.patchValue(answer);
  }
  onEdit() {
    if(this.answerForm.invalid){
      return
    }
    this.content = this.answerForm.value.content;
    this.responses[this.responseId].content = this.content;
    var obj= {content: this.responses}     
    this.answerService.updateAnswer(this.aid, obj).then(()=>this.activeModal.dismiss());   
    this.content = "";
    
  }


}
