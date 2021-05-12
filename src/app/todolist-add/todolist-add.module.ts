import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodolistAddPageRoutingModule } from './todolist-add-routing.module';

import { TodolistAddPage } from './todolist-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodolistAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    TodolistAddPage
  ],
  providers: [
    DatePipe
  ]
})
export class TodolistAddPageModule {}
