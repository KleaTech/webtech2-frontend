import {Component, Input, OnInit, Output} from '@angular/core';
import {OrderService} from './order.service';
import {OrderModel} from './order.model';
import {UiSwitchModule} from 'angular2-ui-switch';

@Component({
  selector: 'app-order',
  providers: [OrderService],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  errorMessage: string;
  orders: OrderModel[];
  toggle: boolean;
  lastCustomer: string;

  @Input() view = 'customer';

  constructor(
    private orderService: OrderService
  ) {}

  getOrders(customer: string) {
    if (this.view === 'customer') {
      this.orderService.list(customer).subscribe(
        orders => {
          this.orders = orders;
          console.log('recevied orders ' + this.orders);
          this.lastCustomer = customer;
        },
        error => this.errorMessage = error
      );
    } else if (this.view === 'bartender') {
      this.orderService.listForBartender(customer).subscribe(
        orders => {
          this.orders = orders;
          console.log('recevied orders ' + this.orders);
          this.lastCustomer = customer;
        },
        error => this.errorMessage = error
      );
    }
  }

  dateBugfix(date) {
    return new Date(date);
  }

  onFulfillClicked(id) {
    this.orderService.fulfill(id).subscribe(
      response => {
        console.log('Fulfilled');
        this.getOrders(this.lastCustomer);
      },
      error => this.errorMessage = error
    );
  }

  totalCost(order: OrderModel) {
    return order.foods.map(f => f.price).reduce((a, b) => a + b);
  }

  ngOnInit() {

  }

}
