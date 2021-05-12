import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodolistEditPage } from './todolist-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TodolistEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistEditPageRoutingModule {}
