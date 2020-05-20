import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionListComponent} from './components/question-list/question-list.component';
import { AuthGuard } from './services/auth.guard';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  {path: '', redirectTo: '/questions', pathMatch: 'full'},
  {path: 'questions', component:QuestionListComponent, canActivate: [AuthGuard]},
  {path: 'question/:id', component: QuestionComponent},
  {path: 'search/:query', component:QuestionSearchComponent},
  {path: 'login', component: UserLoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
