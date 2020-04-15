import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Array<any> = [];

  constructor(private ItemService: ItemService) { }

  ngOnInit(): void {
    this.ItemService.getItems().then(snapshot => {
      snapshot.forEach(doc => {
        this.items.push(doc.data());
      });
    })
    .catch(error => { console.log(error);
    });
  }

}
