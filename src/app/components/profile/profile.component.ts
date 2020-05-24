import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uid: String = '';
  user: any;  
  flag = true;
  constructor(private route: ActivatedRoute,    
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  async getUser() {
    await this.auth.user$.subscribe(data => {
      this.uid = data.uid;      
      this.route.params.subscribe(params => {
        const uid = params['uid'];
        if (uid) {
          if (uid != data.uid) {
            this.auth.getUserById(uid).valueChanges().subscribe(d=>{
              this.user = d;
              this.flag =false;
            })            
          }
          else{
            this.user = data;
          }
        } 
      });      
    });    
  }

}
