import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Todo } from '../model/todo.model';
import { TodolistService } from '../service/todolist.service';

@Component({
  selector: 'app-todolist-edit',
  templateUrl: './todolist-edit.page.html',
  styleUrls: ['./todolist-edit.page.scss'],
})
export class TodolistEditPage implements OnInit {

  todo : Todo = new Todo();
  todoEditForm : FormGroup;


  constructor(
          private activatedRoute : ActivatedRoute, 
          private todolistService : TodolistService, 
          private formBuilder : FormBuilder,
          private router : Router
  ) {

       

    //this.todo = JSON.parse(atob(this.activatedRoute.snapshot.paramMap.get('id')));

    const key = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(key);


    this.todolistService.getTodoByKey(key).snapshotChanges().subscribe(
      res => {

        let todo = res.payload.toJSON();
        todo['$key'] = key;
        todo as Todo;

        
        this.todo.$key = todo['$key'];
        this.todo.title = todo['title'];
        this.todo.description = todo['description'];
        this.todo.done = todo['done'];
        this.todo.created = todo['created'];
        this.todo.dueDate = todo['dueDate'];

        console.log(todo)

      }
    )

    

    console.log(this.todo);

    /// Riempiamo il form con i valori del Todo
    console.log(this.todo.title);
    console.log(this.todo.description);
    console.log(this.todo.dueDate);

    console.log(this.todo);

    
    this.todoEditForm = this.formBuilder.group(
      {
        title : this.todo.title,
        description : this.todo.description,
        dueDate : this.todo.dueDate
      }
    )


    console.log(this.todoEditForm.value);
    
  }



  ngOnInit() {    


    // second method 
    /*this.activatedRoute.paramMap.subscribe(

      paramMap => {

        if (!paramMap.has('id')){
          return;
        }

        let key = paramMap.get('id');

        this.todo = this.todolistService.getTodoByKey(key).snapshotChanges().subscribe(
          
        );

      }

    )*/

    

    console.log(this.todo);

    /// Riempiamo il form con i valori del Todo
    console.log(this.todo.title);
    console.log(this.todo.description);
    console.log(this.todo.dueDate);

    console.log(this.todo);

    
    this.todoEditForm = this.formBuilder.group(
      {
        title : this.todo.title,
        description : this.todo.description,
        dueDate : this.todo.dueDate
      }
    )


    console.log(this.todoEditForm.value);



  }


  updateForm() {
    this.todolistService.updateTodo(this.todo.$key,this.todoEditForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

}
