import {Component, ViewChild, OnInit} from '@angular/core';

import { CustomerService} from './customer.service';
import {CustomerModel} from './customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  providers: [CustomerService],
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  errorMessage: string;
  customers: CustomerModel[];
  @ViewChild('orderChild') order;
  username: string;
  billingAddress: string;

  constructor(
    private customerService: CustomerService
  ) {}

  getCustomers() {
    this.customerService.list().subscribe(
      customers => this.customers = customers,
      error => this.errorMessage = error
    );
  }

  onAddClicked() {
    console.log('Adding customer: ' + this.username + ' ' + this.billingAddress);
    this.customerService.add(new CustomerModel(this.username, this.billingAddress, null)).subscribe(
      response => {
        console.log(response);
        if (response === 'Success') { this.getCustomers(); }
      }
    );
  }

  ngOnInit() {
    this.getCustomers();
  }
}
