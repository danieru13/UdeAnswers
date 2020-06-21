import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Answer } from './answer';
import { Observable } from 'rxjs';
export class Question{    
    constructor(
    public _id?: string,
    public author?: string,
    public content?: string,
    public responses?: boolean,
    public date? : Date
    ){}
}