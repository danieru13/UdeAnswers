import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionCreateComponent } from './components/question-create/question-create.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerCreateComponent } from './components/answer-create/answer-create.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuestionListByAuthorComponent } from './components/question-list-by-author/question-list-by-author.component';
import { AnswerEditComponent } from './components/answer-edit/answer-edit.component';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmDeleteComponent } from './components/toast/confirm-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionCreateComponent,
    UserLoginComponent,
    QuestionSearchComponent,
    NavbarComponent,
    QuestionComponent,
    AnswerCreateComponent,
    ProfileComponent,
    QuestionListByAuthorComponent,
    AnswerEditComponent,
    ToastComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
