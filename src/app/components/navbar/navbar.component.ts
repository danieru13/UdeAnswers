import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uid: string = '';
  public user$: Observable<any> = this.authService.afAuth.user;
  constructor(private router: Router,
              public authService: AuthService
  ) { }

  ngOnInit(): void {
    
  }
  search(query: string) {
    if (query.length < 1) {
      return;
    }
    this.router.navigate(['/search', query]);
  }  
}
