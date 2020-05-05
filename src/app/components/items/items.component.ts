import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items=[];
  it: any;

  constructor(private ItemService: ItemService) { }

  ngOnInit(){
    // this.ItemService.getItems().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     this.items.push(doc.data());        
    //   });
    // })
    // .catch(error => { console.log(error);
    // });
    
    this.ItemService.getItems().subscribe(item =>{      
      this.items= item;
    });
  }
  deleteItem(item){
    this.ItemService.deleteItem(item);
  }

}
