import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodolistEditPageRoutingModule } from './todolist-edit-routing.module';

import { TodolistEditPage } from './todolist-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodolistEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TodolistEditPage]
})
export class TodolistEditPageModule {}
