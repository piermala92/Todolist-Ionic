import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TodolistService } from '../service/todolist.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DateUtilitiesService } from '../service/utilities/date-utilities.service';
import { IonicComponentsService } from '../service/utilities/components/ionic-components.service';

@Component({
  selector: 'app-todolist-add',
  templateUrl: './todolist-add.page.html',
  styleUrls: ['./todolist-add.page.scss'],
})
export class TodolistAddPage implements OnInit {


  todoForm : FormGroup;


  constructor(
    private formBuilder : FormBuilder, 
    private router : Router, 
    private datePipe : DatePipe,
    private dateUtilities : DateUtilitiesService,
    private componentsService : IonicComponentsService,
    private todolistService : TodolistService
  ) {}


  ngOnInit() {

    //console.log(this.datePipe.transform(Date.now()));
    console.log(this.dateUtilities.getDateNow());
    console.log(typeof(this.dateUtilities.getDateNow()));

    this.todoForm = this.formBuilder.group(
      {
        title : '',
        description : '',
        dueDate : undefined,
        created : this.dateUtilities.getDateNow()
      }
    )
  }




  formSubmit(){
    if (!this.todoForm.valid){
      alert("Enter your data to create a todo note");
      return false;
    } else {

      /// show loading
      //this.componentsService.showLoading('add');

      
      this.todolistService.createTodo(this.todoForm.value).then(

        res => {
          
          //this.componentsService.endLoading();

          console.log(res);
          alert("Todo added");

          this.router.navigate(['home'])
          this.todoForm.reset();
        }

      ).catch(error => {
        console.log(error);
        //this.componentsService.endLoading();
      }
      )
      

    }
  }

}
