import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { timeout, Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {

 @Input() delay = 5000;

 public text: string;

 public type = 'success';

 alSub: Subscription;

  constructor(
    private alertService: AlertService) {}

 

  ngOnInit() {
    this.alSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    })
  }
 ngOnDestroy() {
    if (this.alSub) {
      this.alSub.unsubscribe()
    }
  }
}
