import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from 'src/app/shared/models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit{

  order:any;

  constructor(private orderService: OrderService) {   }
  
  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrders().subscribe((response)=>{
      this.order=response;
    })
  }
  
}
