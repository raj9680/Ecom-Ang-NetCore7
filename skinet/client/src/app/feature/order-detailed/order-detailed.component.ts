import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html'
})
export class OrderDetailedComponent implements OnInit{
  order: Array<Order> = [];
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById() {
    const idd = this.activatedRoute.snapshot.paramMap.get('id');
    if(idd) {
      return this.orderService.getOrderById(+idd).subscribe((res) => {
        this.order.push(res);
      });
    }
    return null;
  }
}


