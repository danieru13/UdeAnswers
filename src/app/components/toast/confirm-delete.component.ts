import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faExclamationCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { QuestionService } from '../../services/question.service';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
})
export class ConfirmDeleteComponent implements OnInit {  

  deleteForm: FormGroup;
  faExclamationCircle = faExclamationCircle;
  faTrash = faTrash;
  //Variables que son enviadas de otro componente a través de la propiedad componentInstance
  question: any; //Pregunta a eliminar
  answerId: string; //Id de respuesta a eliminar
  answerPosition: number; //Posicion de la respuesta en el array
  tipo: string; //Indica si lo que llega es pregunta o respuesta
  responses: any[]; //Array de respuestas en una pregunta  
  qid: string; // Id de pregunta
  comesFromQuestionComponent: Boolean
  
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public questionService: QuestionService,
    private toastService: ToastService,
    private router: Router,
    private answerService: AnswerService
  ) {}
  ngOnInit() {
    this.deleteForm = this.formBuilder.group({});
  }
  gotoList() {
    this.router.navigate(['/questions']);
  }
  async onDelete(msg) {
    try {      
      if (this.question) {
        //Si se quiere eliminar una pregunta
        await this.questionService
          .deleteQuestion(this.question)
          .then(() => this.activeModal.dismiss());
        this.toastService.showSuccess(msg);
        if(this.comesFromQuestionComponent){
          this.gotoList();
        }        
      } else {
        if (this.answerId) {
          //Si se quiere eliminar una respuesta
          try {
            //Elimina en el array de respuestas la respuesta según su posición por medio de splice
            this.responses.splice(this.answerPosition, 1);
            //Objeto con el nuevo array
            var obj = { content: this.responses };
            //Se actualiza el documento de respuestas con el nuevo objeto
            await this.answerService
              .updateAnswer(this.answerId, obj)
              .then(() => this.activeModal.dismiss());
            //Si no queda ninguna respuesta se elimina el documento
            let cont = this.responses.length
            if (cont == 0) {
              this.answerService
                .deleteAnswerDocument(this.qid, this.answerId)
                .then(() => this.activeModal.dismiss());
            }
            this.toastService.showSuccess(msg);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
