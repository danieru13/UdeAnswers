import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uid: String = '';
  prof_uid: String = '';
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
      this.route.params.subscribe(params => {
        const uid = params['uid'];
        this.prof_uid = uid;
        if (uid) {
          if (data) {
            this.uid = data.uid;
            if (uid != data.uid) {
              this.auth.getUserById(uid).valueChanges().subscribe(d => {
                this.user = d;
                this.flag = false;
              })
            }
            else {
              this.user = data;
            }
          }
          else {
            this.auth.getUserById(uid).valueChanges().subscribe(d => {
              this.user = d;
              this.flag = false;
            })
          }
        }
      });
    });
  }
}
