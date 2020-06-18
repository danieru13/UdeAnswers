import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCreateComponent } from '../question-create/question-create.component';

import { faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Icons
  faHome = faHome;

  // Everything else

  uid: string = '';
  public user$: Observable<any> = this.authService.afAuth.user;
  constructor(private router: Router,
              public authService: AuthService,
              private modalService: NgbModal
  ) { }

  ngOnInit(): void {    
  }
  search(query: string) {
    if (query.length < 1) {
      return;
    }
    this.router.navigate(['/search', query]);
  }  
  addQuestion(){
    this.modalService.open(QuestionCreateComponent);  
  }
}
