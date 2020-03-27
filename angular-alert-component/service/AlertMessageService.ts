import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

 
  alertMessageFormat = { alertEnabled: false, isRedAlert: true, isWarningAlert: false, message: '' };
  alertMessageCallBack = new BehaviorSubject<any>("");

  constructor() { }

  errorCallBackMsg(alertMessage) {
    this.alertMessageFormat = alertMessage;
    this.alertMessageCallBack.next(this.alertMessageFormat);
  }
}
