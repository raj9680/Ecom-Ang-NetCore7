import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { OrderRoutingModule } from './order-routing.module';
import { CheckoutModule } from '../checkout/checkout.module';
import { CheckoutReviewComponent } from '../checkout/checkout-review/checkout-review.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailedComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
