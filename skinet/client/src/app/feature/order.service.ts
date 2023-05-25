import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order>(this.baseUrl + 'orders/order');
  }

  getOrderById(id: number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id);
    // return this.http.get<Order>("https://localhost:5001/api/order");
  }
}
