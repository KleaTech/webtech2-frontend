import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {routerConfig} from './navbar/navbar.conf';
import { BartenderComponent } from './bartender/bartender.component';
import { ManagerComponent } from './manager/manager.component';
import { FoodComponent } from './food/food.component';
import { OrderComponent } from './order/order.component';
import {FormsModule} from '@angular/forms';
import {UiSwitchModule} from 'angular2-ui-switch';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    NavbarComponent,
    BartenderComponent,
    ManagerComponent,
    FoodComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routerConfig),
    FormsModule,
    UiSwitchModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
