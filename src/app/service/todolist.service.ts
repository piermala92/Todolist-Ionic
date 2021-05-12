import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Todo } from '../model/todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, filter } from 'rxjs/operators';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { TodoService } from './storage/todo.service';
import { database } from 'firebase';



interface TodoData {

  created: string;
  description: string;
  done: boolean;
  dueDate: string;
  title: string;

}



export interface Person {

  name: string;
  lastName: string;
  age: number;

}


@Injectable({
  providedIn: 'root'
})
export class TodolistService {


  /// TEST PERSON 
  personListObs  = new BehaviorSubject<Person[]>([]);


  /// TEST TODOS WITHOUT FIREBASE 
  Todos = new BehaviorSubject<Todo[]>([]);
  

  todosList : AngularFireList<Todo>;
  todoObject : AngularFireObject<Todo>;


  constructor(private db : AngularFireDatabase, private httpClient : HttpClient, private todoService : TodoService) { }


  /// GET LIST 
  getTodos(){
    this.todosList = this.db.list('/todos');
    return this.todosList;
  }


  
  /// GET TODO BY ID 
  getTodoByKey(key){
    this.todoObject = this.db.object('/todos/' + key);
    return this.todoObject;
  }



  /// CREATE TODO 
  createTodo(todo : Todo){

    this.todosList = this.db.list('/todos');


    console.log(todo);
    

    return this.todosList.push({
      title : todo.title,
      description : todo.description,
      created : todo.created, 
      dueDate : todo.dueDate,
      done : false
    }
    )
  }




  /// SET DONE 
  setDone(key : string, done : boolean){

    let todo = this.getTodoByKey(key);

    console.log(key);
    console.log(done);
    console.log(todo);

    todo.update(
    {
      done : done
    }    
    )


  }



  /// UPDATE TODO
  updateTodo(key : string, updatedTodo : Todo){

    let todo = this.getTodoByKey(key);

    console.log(key);
    console.log(updatedTodo);

    return todo.update({
      title : updatedTodo.title,
      description : updatedTodo.description,
      dueDate : updatedTodo.dueDate
    })

  }




  /// DELETE TODO ---> Asincrona
  deleteTodo(id){
		this.todoObject = this.db.object('/todos/' + id);
		return this.todoObject.remove();
  }




  /// CUSTOMIZED QUERIES 

  getTodosFiltered(value) {

    /*this.todosList = this.db.list("/todos");

    for (let todo in this.todosList){

      console.log(todo);

    }*/

    let todosList = [];

    this.db.database.ref("/todos").orderByChild("title").equalTo(value).on("child_added",(snap) => {

      let todo = snap.val();
      console.log(todo);
      console.log(snap.key);

      // aggiungo la key al todo 
      todo['$key'] = snap.key;
      console.log(todo);
      

      todosList.push(todo); 

    });

    return todosList;

  }



  getTodosFilteredWithObservable(value){

    

    /*** MY TEST  */
    /*this.todosList = this.db.list("/todos");*/

    const todos = this.todoService.TODOS;

    console.log(todos)

    const sourceOne = from(todos);
    const sourcePiped = sourceOne.pipe(
      filter(
        todo => todo['title'] == value
      )
    )

    sourcePiped.subscribe(
      res => console.log(res)
    )



    /*** TEST FROM learnrxjs.com */

    let people = [];

    let person = [
      { name: 'Joe', age: 31 },
      { name: 'Bob', age: 25 },
      { name: 'Jaclyn', age: 33 },
      { name: 'Bernie', age: 25 },
      { name: 'James', age: 25 },
      { name: 'Jack', age: 30 },
      { name: 'Jamiroquai', age: 31 },
      { name: 'Pojo', age: 35 }
    ];

    const source = from(person);
    //filter out people with age under 30
    const example = source.pipe(filter(person => person.name.includes('J') && person.age > 30));
    //output: "Over 30: Joe"
    const subscribe = example.subscribe(val => {console.log(`Over 30 with J in name: ${val.name}`), people.push(val)});

    console.log(people);

  }


  getFirstTwo(){

    return this.db.list("/todos", ref => ref.limitToFirst(2));

  }







  /// TEST FILTER 
  testFilter() {
    

    let value = "Test again 2"; 



    value = "Marseo";
    
    let todosList = this.db.database.ref('/todos');

    todosList.orderByChild('title')
    .equalTo(value)
    .on('child_added', function(snapshot) { 
        var todo = snapshot.val();
        console.log(todo);
        if (todo.done == true) {
            console.log(todo);
        }
    });

  }




  /// TEST HTTP FIREBASE  --- NON asincrona !!!
  testHttpFirebase() : Observable<any> {

    /*let httpHeaders = new HttpHeaders();
    httpHeaders.append("Access-Control-Allow-Origin","*")*/

    let todos = [];

    return this.httpClient.get<{[key:string]:TodoData}>("https://ionicfirebase-pier.firebaseio.com/todos.json").pipe(

      map (resData => {

          console.log(resData);

          const todos = [];

          for (let key in resData){

            console.log(key)

            let todo = new Todo();
            todo.$key = key;
            todo.title = resData[key].title;
            todo.description = resData[key].description;
            todo.done = resData[key].done;
            todo.created = resData[key].created;
            todo.dueDate = resData[key].dueDate;

            todos.push(todo)

          }

          //console.log(todos);

          return todos;

        }
      )

    )
    
    /*subscribe(
      
      res => {
      
          console.log(res)

        }

    )*/

    
      


  }




  
  searchWithObservableFilter(value) {


    console.log("***** VALUE ******" + value + "  ********")
    


    console.log(this.todoService.TODOS);
    //let todos : Todo[] = []
    
    /// chiamata http per prendere tutti i todos 
    let todos = this.todoService.TODOS;
    let todosFiltered = [];


    const source = from(todos);
    //filter out people with age under 30
    const example = source.pipe
                        (filter
                            (todo => todo.title.search(new RegExp(value, "i")) !== -1 
                                  || todo.description.search(new RegExp(value, "i")) !== -1));
    //output: "Over 30: Joe"

    return example;

    /*
    const subscribe = example.subscribe(val => {console.log(`Todos filtered: ${val.title}`), todosFiltered.push(val)});

    console.log(todosFiltered);
    */

  }









    /// GET LIST WITHOUT FIREBASE
    getTodosWithoutFirebase(){
      
      let todos = [
        { 
          $key: 'asknask',
          created: "2020-06-24 01:44",
          description: "Test without FB",
          done: false,
          dueDate: "2020-06-25",
          title: "First test"
        },
        {
          $key: 'pqwoopw',
          created: "2020-06-28 12:36",
          description: "Test without FB - 1",
          done: true,
          dueDate: "2020-07-29",
          title: "Second test"
        },
        {
          $key: 'ldskds',
          created: "2020-07-10 17:01",
          description: "Test without FB -2 ",
          done: false,
          dueDate: null,
          title: "Third test"
        }
      ]

     
     this.Todos.next(todos);

     return this.Todos;

    }




    /**
     * SET DONE WITHOUT FIREBASE 
     */
      setDoneWithoutFirebase(key) {

        console.log(key);

        let todos : Todo[] = [];
        
        const todoSetDone = this.Todos.pipe(
          filter(
            todo => todo['$key'] == key
          )
        )



        todoSetDone.subscribe(
          res => {
            console.log(res)
          }
        )

        
      }






      // fetch todos
      fetchTodos(){

        const httpHeaders : HttpHeaders = new HttpHeaders();
        httpHeaders.append("Access-Control-Allow-Origin", "*");


        return this.httpClient.get<Todo[]>("http://localhost:3000/api/todos");    

      }











  /**
   *  
   *  TEST WITH PERSON 
   * 
   */
  getPersonList(){

    let personList : Person[] = [];

    personList.push(
      {
        name : "A", lastName : "B", age : 20
      },
      
      {
        name : "C", lastName : "D", age : 30
      },
      
      {
        name : "E", lastName : "F", age : 40
      }
    )


    this.personListObs.next(personList);

    return this.personListObs;

  }
}
