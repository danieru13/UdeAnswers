import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items = "item";
  constructor(private firestore: AngularFirestore ) { }

  getItems(){
    return this.firestore.collection(this.items).get().toPromise();
  }
}
