import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order/order.service';
import {OrderModel} from '../order/order.model';
import {BartenderService} from '../bartender/bartender.service';
import {ManagerService} from './manager.service';

@Component({
  selector: 'app-manager',
  providers: [OrderService, BartenderService, ManagerService],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  errorMessage: string;
  orders: OrderModel[] = [];

  // /////////////////Bar Chart/////////////////////////////////
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true   // minimum value will be 0.
        }
      }]
    }
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    {data: [], label: 'Orders'}
  ];

  // /////////////////Pie Chart/////////////////////////////////
  public pieChartLabels: string[];
  public pieChartData: any[] = [{
    data: []
  }];
public pieChartType = 'doughnut';

  initCharts() {
    this.bartenderService.list().subscribe(
      barts => this.barChartLabels = barts.map(e => e.name),
      error => this.errorMessage = error
    );
    this.managerService.orderStatistics().subscribe(
      ords => {
        this.barChartData[0].data = ords;
        this.barChartData = JSON.parse(JSON.stringify(this.barChartData));
      },
      error2 => this.errorMessage = error2
    );
    this.managerService.foodStatistics().subscribe(
      foo => {
        this.pieChartData[0].data = foo[1];
        this.pieChartData = JSON.parse(JSON.stringify(this.pieChartData));
      },
      error2 => this.errorMessage = error2
    );
    this.managerService.foodStatistics().subscribe(
      foo => this.pieChartLabels = foo[0],
      error2 => this.errorMessage = error2
    );
  }

  constructor(
    private orderService: OrderService,
    private bartenderService: BartenderService,
    private managerService: ManagerService) { }

  getOrders(status: string) {
    this.orderService.listAll(status).subscribe(
      orders => {
        this.orders = orders;
        console.log('recevied orders ' + this.orders);
      },
      error => this.errorMessage = error
    );
  }

  dateBugfix(date) {
    return new Date(date);
  }

  totalCost(order: OrderModel) {
    return order.foods.map(f => f.price).reduce((a, b) => a + b);
  }

  ngOnInit() {
    this.getOrders('all');
    this.initCharts();
  }
}
