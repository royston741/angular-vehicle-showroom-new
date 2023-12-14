import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { ShareDataService } from 'src/app/services/shareData.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, DoCheck {

  name!: string;

  cartTotalItems = 0;
  toggleActive = false;

  constructor(
    private cartService: CartService,
    private customerService: UserService,
    private router: Router,
    private storageService: StorageService,
    public navigateService: NavigateService) 
    { }

  ngOnInit() {
    this.storageService.storeItem("added", "0");

    const user = JSON.parse(this.storageService.getItem("user"))
    if (user == null || user.userType != "CUSTOMER") {
      this.router.navigate(["login"])
    }

    this.setTotalCartItems()
    this.customerService.getCustomerById(user.id).subscribe(response => { this.name = response.responseData.firstName })
  }

  ngDoCheck() {
    // if itema added to cart call cart api and update cart count
    if (this.storageService.getItem("added") == 1) {
      this.storageService.storeItem("added", "0")
      this.setTotalCartItems()
    }
  }

  logOut() {
    this.storageService.removeItem("user")
    this.router.navigate(["login"])
  }

  setTotalCartItems() {
    const user = JSON.parse(this.storageService.getItem("user"))
    this.cartService.getCartByCustomerId(user.id).subscribe(response => {
      const data = response.responseData.cartItems;
      this.cartTotalItems = data.length
    });
  }


}
