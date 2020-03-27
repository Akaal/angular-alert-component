import { Component, OnInit } from '@angular/core';
import { Observable,timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { AlertMessageService } from './service/AlertMessageService';

@Component({
  selector: 'alert-comp',
  templateUrl: './alert-component.html',
  styleUrls: ['./alert-component.css']
})
export class AlertComponent implements OnInit {
  showAlertMessage = false;
  alertMessage = '';
  isRedAlert = true;
  isWarningAlert = false;
  private timer: Observable<any>;
  private subscription: Subscription;

  constructor(private alertMessageService: AlertMessageService) { }

  ngOnInit() {
    this.alertMessageService.alertMessageCallBack.subscribe(
      data => {
        console.log(data)

        this.decideAlertBanner(data)
      
      },
      err => this.hideAlertBanner(),
      () => this.hideAlertBanner()
    );
  }

  decideAlertBanner(data: any) {
    console.log(data)
    this.setTimer();
    const alertData = data as AlertModel;
    if (alertData.alertEnabled) {
      console.log(data)
      this.showAlertMessage = true;
      this.alertMessage = alertData.message;
      this.isRedAlert = alertData.isRedAlert != null ? alertData.isRedAlert : false;
      this.isWarningAlert = alertData.isWarningAlert != null ? alertData.isWarningAlert : false;
    } else {
      this.showAlertMessage = false;
      this.alertMessage = alertData.message;
    }
  }

  hideAlertBanner(): void {
    this.alertMessage = '';
    this.showAlertMessage = false;
  }

  closeAlert() {
    this.alertMessage = '';
    this.isRedAlert = false;
    this.isWarningAlert = false;
    this.showAlertMessage = false;
  }

  public setTimer() {
    this.timer = timer(4000);
    this.subscription = this.timer.subscribe(() => {
      this.closeAlert();
    });
  }

  public ngOnDestroy() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }
}

class AlertModel {
  alertEnabled: any;
  message: any;
  isRedAlert: any;
  isWarningAlert: any;
}
