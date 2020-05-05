import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemsComponent} from './components/items/items.component';
import {CreateComponent} from './components/create/create.component';


const routes: Routes = [
  {path: '',component:ItemsComponent},
  {path: 'items',component:ItemsComponent},
  {path: 'create',component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
