import { Injectable } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { BehaviorSubject } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  TODOS : Todo[] = [];

  constructor() { }
}
