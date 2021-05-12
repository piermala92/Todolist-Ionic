import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../model/todo.model';
import { TodolistService } from '../service/todolist.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { IonicComponentsService } from '../service/utilities/components/ionic-components.service';
import { TodoService } from '../service/storage/todo.service';
import { Observable, BehaviorSubject } from 'rxjs';





export interface Person {

  name: string;
  lastName: string;
  age: number;

}



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos : Todo[] = [];
  loading : boolean = false;

  /// data used for searching 
  inputSearchData : string;

  /// data used for hiding data 
  hidden : boolean;

  // index for sorting (asc if even, desc if odd, or viceversa)
  i : number = 0;


  /// Behaviour Subject 
  Todos = new BehaviorSubject<Todo[]>([]);



  /// TEST PERSON 
  personList = new BehaviorSubject<Person[]>([])

  


  /// TEST TODOS FETCHED WITH NODE
  todosFetched = new BehaviorSubject<Todo[]>([]);

  


  constructor(
            public router : Router, 
            private alertController : AlertController,
            private toastController : ToastController,
            private componentsService : IonicComponentsService,
            private todoService : TodoService,
            private todolistService : TodolistService) 
  {
    //this.componentsService.showLoading('homepage'); 
    /// TEST NODEJS 
    this.fetchTodos();
  }


  ngOnInit(): void {



    /// TEST PERSON 
    this.todolistService.getPersonList().subscribe(
      res => {
        console.log(res),
        this.personList.next(res)
      }
    )



    this.loading = true;


    /*this.getTodos();*/
    this.httpTestGetFirebase();




    /// TEST GET TODOS WITHOUT FIREBASE 
    //this.getTodosWithoutFirebase();



    /// TEST CLOUD FUNCTIONS
    //this.testCloudFunctions() 


    /// TEST FILTER 
    this.testFilter();



    /// TEST filter with Observable
    //this.todolistService.getTodosFilteredWithObservable('Marseo');






  } 


  httpTestGetFirebase() {
    /// TEST http firebase 
    this.todolistService.testHttpFirebase().subscribe(
      res => {
          
        this.todos = res,   
        this.Todos.next(res);
        this.todolistService.Todos.next(res);
        this.todoService.TODOS = res, 

        

        console.log(this.todos),    

        this.loading = false

      }
    );


    console.log(this.todos);
    //this.getTodos();
  }





  getTodos(){
    
    this.todolistService.getTodos().snapshotChanges().subscribe(res => {
      
      this.todos = [];


      /// empty todos from storage TODOS
      this.todoService.TODOS = [];


      res.forEach(item => {

        let todo = item.payload.toJSON();
        todo['$key'] = item.key;
        this.todos.push(todo as Todo);
        this.Todos.next(this.todos);

        /// save todos to storage TODOS
        this.todoService.TODOS.push(todo as Todo);

      }); 

      this.loading = false;

      /// end loading
      //this.componentsService.endLoading();


    }
    )
    
  }





  /// GET TODOS WITHOUT FIREBASE 
  getTodosWithoutFirebase(){

    this.todolistService.getTodosWithoutFirebase().subscribe(
      res => {
        console.log(res)
        this.todos = res
        this.loading = false;
      },
      err => {
        console.error(err)
      }
    )

  }



  getTodosFiltered(value){

    this.todos = [];

    this.todos = this.todolistService.getTodosFiltered(value)/*.snapshotChanges().subscribe(








    




    
      

      res => {        
      
          this.todos = [];

          res.forEach(item => {

            let todo = item.payload.toJSON();
            todo['$key'] = item.key;
            this.todos.push(todo as Todo);
          }); 

      }

    );

    

    /*res.forEach(item => {

      let todo = item.payload.toJSON();
      todo['$key'] = item.key;
      this.todos.push(todo as Todo);
    }); */

  }


  addTodo(){
    this.router.navigate(["todolist-add"]);
  }



  setDone(key,done){

    console.log(key);
    console.log(done);


  
    
    // set done without firebase
    /*this.todolistService.setDoneWithoutFirebase(key).subscribe(
      res => console.log(res)
    )*/


       this.todolistService.setDone(key,done);


    /// metodo chiamato per lasciare la lista così come l'avevamo cercata (NON FUNZIONA)
    //this.searchWithHidden();


    /// Aggiorna nuovamente la lista, dal momento che la lista non è asincrona 
    //this.httpTestGetFirebase();


    /// unsubscribe sull'observable di riferimento 
    //this.searchWithObservableFilter().unsubscribe();


  }



  goToEditTodoPage(key){

    let todo = {};

    this.todolistService.getTodoByKey(key).valueChanges().subscribe(
      res => {
        todo = res;
        todo['$key'] = key;

        this.router.navigate(['todolist-edit',btoa(JSON.stringify(todo))])
      }
    )
    

  }



  deleteTodo(id){
    console.log(id);

    this.promptOnDelete(id);

  }


  promptOnDelete(id){

    this.alertController.create({
      //header : 'Are you sure you want to delete this todo?',
      message : 'Are you sure you want to delete this todo?',
      buttons : [{
        text : 'Yes',
        handler : () => {
          this.todolistService.deleteTodo(id);
          this.showSuccessfulDeletionToast();
        }
      }, {
        text : 'Cancel',
        role : 'cancel'
      }]

    }).then(promptAlert => {
      promptAlert.present()
    }).finally(

    )

  }


  setDoneStyle(todo,done){
    //console.log(todo.title + " : " + todo.done)
    //console.log(done)
    if (done) return 'opacityToDone';
  }


  hideButton(done){
    if (done) return 'hideEditButton'
  }



  testCustomQuery(){

  }


  showSuccessfulDeletionToast(){

    this.toastController.create({
      message : 'Todo successfully deleted!',
      position: 'bottom',
      duration: 3000
    }).then(toastConfirmation => {
      toastConfirmation.present();
    })

  }



  /*showLoading(){

    this.loadingController.create({
      message: 'Loading your ToDos...',
      duration: 2000
    }).then(loading => {
      loading.present()
    })

  }*/




  /// TEST CLOUD FUNCTIONS 
  /*testCloudFunctions(){

    this.todolistService.testCloudFunctions().subscribe(
      res => {
        console.log(res)
      }
    )

  }*/



  /// TEST FILTER  
  testFilter() {
    this.todolistService.testFilter();
  }



  /// TEST search
  search(){


    /// The filter here is done on client side on todos list
    console.log(this.todos);

    /// CALL searchWithHidden method 
    this.searchWithHidden();


    /*let todos = this.todoService.TODOS;

    console.log(this.todoService.TODOS);


    this.todos = [];


    for (let todo of todos){

      if (todo.title.search(new RegExp(this.inputSearchData, "i")) !== -1 || 
          todo.description.search(new RegExp(this.inputSearchData, "i")) !== -1 ) {

        console.log(todo);
        this.todos.push(todo);

      }

    }


    console.log(this.todos);*/


  }



  /// TEST SEARCH WITH HIDDEN FIELD 
  searchWithHidden(){


    console.log("***START***")
    console.log("Search with hidden")
    console.log("***END***")


    let todos = this.todoService.TODOS;


    console.log(this.inputSearchData);



    for (let todo of todos){

      if (  todo.title.search(new RegExp(this.inputSearchData, "i")) !== -1 || 
            todo.description.search(new RegExp(this.inputSearchData, "i")) !== -1 ) {

          todo['hidden'] = false;

      } else {
        
           todo['hidden'] = true;

      }


    }
  }






  searchWithObservableFilter(){

    console.log("********** VALUE : " + this.inputSearchData);


    /// START
    this.todos = [];

    return this.todolistService.searchWithObservableFilter(this.inputSearchData).subscribe(
      val => {console.log(`Todos filtered: ${val.title}`), this.todos.push(val), this.Todos.next(this.todos),console.log(this.todos) }
    )


    
    /// END


    //const subscribe = example.subscribe(val => {console.log(`Todos filtered: ${val.title}`), todosFiltered.push(val)});

    
  }



  




  sortByDate(){

     this.i++;

     if (this.i % 2 == 0){

/*           this.todos = this.todos.sort(function(a, b) {
            console.log(a.created>b.created ? -1 : a.created<b.created ? 1 : 0);
            //return a.created>b.created ? -1 : a.created<b.created ? 1 : 0;
            return a.created<b.created ? -1 : a.created>b.created ? 1 : 0;
          }); */

          this.todos = this.todos.sort(function(a, b) {
            console.log(a.created>b.created ? -1 : a.created<b.created ? 1 : 0);
            //return a.created>b.created ? -1 : a.created<b.created ? 1 : 0;
            return a.created<b.created ? -1 : a.created>b.created ? 1 : 0;
          });

     } else {

          this.todos = this.todos.sort(function(a, b) {
            console.log(a.created>b.created ? -1 : a.created<b.created ? 1 : 0);
            //return a.created>b.created ? -1 : a.created<b.created ? 1 : 0;
            return a.created>b.created ? -1 : a.created<b.created ? 1 : 0;
          });

     }

      
      this.todolistService.Todos.next(this.todos)
      console.log(this.todos);

  }








  sortByCompleted(){

    this.i++;

    if (this.i % 2 == 0){

         this.todos = this.todos.sort(function(a, b) {
           console.log(a.done>b.done ? -1 : a.done<b.done ? 1 : 0);
           //return a.created>b.created ? -1 : a.created<b.created ? 1 : 0;
           return a.done<b.done ? -1 : a.done>b.done ? 1 : 0;
         });

    } else {

         this.todos = this.todos.sort(function(a, b) {
           console.log(a.done>b.done ? -1 : a.done<b.done ? 1 : 0);
           //return a.created>b.created ? -1 : a.created<b.created ? 1 : 0;
           return a.done>b.done ? -1 : a.done<b.done ? 1 : 0;
         });

    }

    
     this.todolistService.Todos.next(this.todos)

     this.Todos.next(this.todos)

     console.log(this.todos);

 }




 filterByCompleted(){

  let todos = this.todos;

  this.todos = [];


  todos.filter(todo => { 
    
    if(todo.done) {
      this.todos.push(todo)
    }

  })

 }






 filterByDueDate(time){

  let todos = this.todos;

  this.todos = [];


  if (time == 'PAST'){

    todos.filter(todo => { 
    
      if(todo.dueDate < new Date().toString()) {
        this.todos.push(todo)
      }
  
    })

  }



  if (time == 'FUTURE'){
    
    todos.filter(todo => { 
      
      if(todo.dueDate > new Date().toString() ) {
        this.todos.push(todo)
      }

    })

  }




  if (time == 'TODAY'){

    todos.filter(todo => { 
    
      if(todo.dueDate == new Date().toString()) {
        this.todos.push(todo)
      }
  
    })

  }



  console.log(this.todos);


 }



 resetTodos(){

  this.todos = this.todoService.TODOS;

 }






 /// TEST WITH NODEJS
 fetchTodos(){
   this.todolistService.fetchTodos().subscribe(
     res => {
       console.log(res),
       this.todosFetched.next(res);
     }
   ) 
   
  /* 
   this.todosFetched.subscribe(
     res => console.log(res)
   ) */

 }



}
