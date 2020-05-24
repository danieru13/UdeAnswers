import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uid: string = '';
  constructor(private router: Router,
              private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getUId();
  }
  search(query: string) {

    if (query.length < 1) {
      return;
    }
    this.router.navigate(['/search', query]);
  }
  async getUId() {
    await this.auth.user$.subscribe( data => {
      this.uid = data.uid;
      return this.uid;
     });
  }


}
