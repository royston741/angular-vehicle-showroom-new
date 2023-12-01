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
  order: Order={
    total: 0,
    orderItem: []
  }
  customerId!: number
  isOrderfromCartItems = false;
  processing = false;

  plcaceOrderSuccess = false;

  constructor(private shareDataServices: ShareDataService, private orderService: OrderService,
    private storageService: StorageService, private cartService: CartService,
    public navigateService: NavigateService) { }

  ngOnInit() {
    this.customerId = JSON.parse(this.storageService.getItem("user")).id;
    let data = this.shareDataServices.getData();
    console.log(data)
    if (data === undefined) {
      this.navigateService.navigateCustomerHome()
    }
    const items = (data.item) as Item[];

    this.isOrderfromCartItems = this.shareDataServices.getData().isCartItems;

    this.orderService.processOrder({
      total: 0, orderItem: items
    }).subscribe(response => {
      this.order = response.responseData;
    })
  }

  plcaeOrder() {
    this.processing = true;
    // this.order.orderItem = this.order.orderItem.map((o: { color: any; fuelType: any; initialPrice: any; itemType: any; quantity: any; vehicle: any; }) => {
      this.order.orderItem = this.order.orderItem.map((o: Item) => {
 
    // const obj = {

    //     color: o.color,
    //     fuelType: o.fuelType,
    //     initialPrice: o.initialPrice,
    //     itemType: o.itemType,
    //     quantity: o.quantity,
    //     vehicle: o.vehicle
    //   }
    o.id=null;
      return o;
    })

    this.orderService.plcaeOrder(this.order, this.customerId).subscribe(response => {
      this.processing = false;
      this.order = response.responseData;
      this.plcaceOrderSuccess = response.success;
      if (response.success = true && this.isOrderfromCartItems) {
        const id = JSON.parse(this.storageService.getItem("user")).id;
        this.cartService.clearCart(id).subscribe()
      }
    })
  }

}
