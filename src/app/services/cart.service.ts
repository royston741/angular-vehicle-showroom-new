import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/shared/model/Response';
import { environment } from 'src/environment/environment';
import { Item } from 'src/shared/model/Item';
import { Vehicle } from 'src/shared/model/Vehicle';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.baseCartUrl;

  constructor(public http: HttpClient) { }

  addToCart(carrtItem: {
    quantity: number,
    color: string,
    fuelType: string,
    itemType: string,
    vehicle: Vehicle
}, customerId: number): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}addToCart/${customerId}`, carrtItem)
  }

  removeItemFromCart(carrtItem: Item, customerId: number): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}removeItemFromCart/${customerId}`, carrtItem)
  }

  clearCart(customerId: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}clearCart/${customerId}`);
  }

  getCartByCustomerId(id: number) {
    return this.http.get<Response>(
      `${this.baseUrl}getCartByCustomerId/${id}`
    );
  }
}