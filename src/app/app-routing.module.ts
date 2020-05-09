import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionListComponent} from './components/question-list/question-list.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';


const routes: Routes = [
  {path: '',component:QuestionListComponent},
  {path: 'questions',component:QuestionListComponent},
  {path: 'search/:busqueda',component:QuestionSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
