import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShareDataService } from 'src/app/services/shareData.service';
import { StorageService } from 'src/app/services/storage.service';
import { Item } from 'src/shared/model/Item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: {
    cartItems: Item[],
    cartTotal: number
  } = {
      cartItems: [],
      cartTotal: 0
    };

  constructor(private storageService: StorageService, private cartService: CartService,private router:Router,private shareDataService:ShareDataService) { }

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    const id = JSON.parse(this.storageService.getItem("user")).id;
    this.cartService.getCartByCustomerId(id).subscribe({
      next: (response) => {
        this.cart = response.responseData;
        this.cart.cartItems.reverse()
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  removeItemFromCart(item: Item) {
    const id = JSON.parse(this.storageService.getItem("user")).id;
    this.cartService.removeItemFromCart(item, id).subscribe({
      next: (response) => {
        response.success && this.storageService.storeItem("added", "1");
        this.getCartData()
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  clearCart() {
    const id = JSON.parse(this.storageService.getItem("user")).id;
    this.cartService.clearCart(id).subscribe({
      next: (response) => {
        response.success && this.storageService.storeItem("added", "1");
        this.getCartData()
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  navigateToPlaceOrder(){
    this.shareDataService.setData({item:this.cart.cartItems,isCartItems:true})
    this.router.navigate(["placeOrder"])
  }
}
