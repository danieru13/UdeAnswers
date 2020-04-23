import { Component, OnInit } from '@angular/core';
import {Question} from '../../models/question'
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public question: Question = {}
  private item = "item"
  constructor(private firestore: AngularFirestore, private itemService: ItemService) { 
  }  
  ngOnInit(): void {
  }
  onSubmit(form){       

    this.itemService.addItem(this.question)
    form.reset();
    this.question = {}
   }

}
