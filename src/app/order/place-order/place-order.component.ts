import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { OrderService } from 'src/app/services/order.service';
import { ShareDataService } from 'src/app/services/shareData.service';
import { StorageService } from 'src/app/services/storage.service';
import { Item } from 'src/shared/model/Item';
import { Order } from 'src/shared/model/Order';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  order: any
  customerId!: number
  isCartItems = false;

  plcaceOrderSuccess = false;

  constructor(private shareDataServices: ShareDataService, private orderService: OrderService,
    private storageService: StorageService, private cartService: CartService,
     public navigateService:NavigateService) { }

  ngOnInit() {
    this.customerId = JSON.parse(this.storageService.getItem("user")).id;
    const data = (this.shareDataServices.getData().item) as Item[];
    this.isCartItems = this.shareDataServices.getData().isCartItems;

    this.orderService.processOrder({ total: 0, orderItem: data }).subscribe(response => {
      this.order = response.responseData;
    })
  }

  plcaeOrder() {
    this.order.orderItem = this.order.orderItem.map((o: { color: any; fuelType: any; initialPrice: any; itemType: any; quantity: any; vehicle: any; }) => {
      const obj = {
        color: o.color,
        fuelType: o.fuelType,
        initialPrice: o.initialPrice,
        itemType: o.itemType,
        quantity: o.quantity,
        vehicle: o.vehicle
      }
      return obj;
    })

    this.orderService.plcaeOrder(this.order, this.customerId).subscribe(response => {
      this.order = response.responseData;
      this.plcaceOrderSuccess = response.success;
      if (response.success = true && this.isCartItems) {
        const id = JSON.parse(this.storageService.getItem("user")).id;
        this.cartService.clearCart(id).subscribe()
      }
    })
  }

}
