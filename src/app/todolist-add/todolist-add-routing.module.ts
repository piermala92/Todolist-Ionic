import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodolistAddPage } from './todolist-add.page';

const routes: Routes = [
  {
    path: '',
    component: TodolistAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistAddPageRoutingModule {}
