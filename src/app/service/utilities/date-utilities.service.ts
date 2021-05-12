import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilitiesService {

  constructor() { }


  getDateNow() : string {

    let date = new Date();

    let year,month,day,hour,minutes;

    year = date.getFullYear();
    if (date.getMonth() < 10) { month = '0' + (date.getMonth() + 1) } else { month = (date.getMonth() + 1) }
    if (date.getDate() < 10) { day = '0' + date.getDate() } else { day = date.getDate() }

    if (date.getHours() < 10) { hour = '0' + date.getHours() } else { hour = date.getHours() }
    if (date.getMinutes() < 10) { minutes = '0' + date.getMinutes() } else { minutes = date.getMinutes() }

    return year + "-" + month + "-" + day + " " + hour + ":" + minutes


  }


  //formatDate(millis) : string {}


}
