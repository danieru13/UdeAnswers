import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Answer } from './answer';
export class Question{    
    constructor(
    public _id?: string,
    public author?: string,
    public content?: string,
    public responses?: AngularFirestoreCollection<Answer>
    ){}
}