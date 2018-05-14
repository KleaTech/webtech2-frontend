import {Routes} from '@angular/router';
import {CustomerComponent} from '../customer/customer.component';
import {BartenderComponent} from '../bartender/bartender.component';
import {ManagerComponent} from '../manager/manager.component';
import {FoodComponent} from '../food/food.component';

export const routerConfig: Routes = [
  {
    path: 'customers',
    component: CustomerComponent
  },
  {
    path: 'bartenders',
    component: BartenderComponent
  },
  {
    path: 'managers',
    component: ManagerComponent
  },
  {
    path: 'foods',
    component: FoodComponent
  },
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/customers',
    pathMatch: 'full'
  }
];
