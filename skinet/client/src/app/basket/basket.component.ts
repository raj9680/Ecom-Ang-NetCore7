import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  constructor(public basketService: BasketService) { }


  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  // removeItem(id: any, quantity: number)  {
    removeItem(event: {id: any, quantity: number})  {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }

}
