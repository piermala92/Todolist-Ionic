import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicComponentsService {

  loading : any;
  

  constructor(    
    /*private alertController : AlertController,
    private toastController : ToastController,*/
    private loadingController : LoadingController,
  ) 
  { 
    
  }


  
  /*showLoading(context){

    // context may be homepage, add or edit

    let message = '';

    if (context == 'homepage') {
      message = 'Loading your ToDos...'
    }

    if (context == 'add') {
      message =  'Adding your ToDo...'    
    }

    if (context == 'edit') {
      message = 'Editing your ToDo...'     
    }


    this.loading = this.loadingController.create({
      message: message
    }).then(loading => {
      loading.present()
    })

  }*/


  /*endLoading(){
    this.loading = this.loadingController.dismiss(null, 'cancel');
  }*/


}
