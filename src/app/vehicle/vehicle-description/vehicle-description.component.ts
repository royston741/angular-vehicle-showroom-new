import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShareDataService } from 'src/app/services/shareData.service';
import { StorageService } from 'src/app/services/storage.service';
import { VehicleService } from 'src/app/services/vehicle.servce';
import { Vehicle } from 'src/shared/model/Vehicle';
import { CustomerComponent } from 'src/app/customer/customer/customer.component';

@Component({
  selector: 'app-vehicle-description',
  templateUrl: './vehicle-description.component.html',
  styleUrls: ['./vehicle-description.component.css']
})
export class VehicleDescriptionComponent implements OnInit {

  vehicle: Vehicle = {
    id: 0,
    name: '',
    price: 0,
    rating: 0,
    vehicleType: '',
    twoWheelerType: '',
    imgUrl: '',
    description: ''
  };

  quantity: number = 1;
  selectedFuelType: string = "PETROL"
  selectedColor: string = "WHITE"

  charges: { name: string, price: string }[] = [];
  discounts: { name: string, price: string }[] = [];
  rating: number = 0;

  colors: string[] = [];
  fuelType = ["PETROL", "CNG"]

  addToCartSuccess = false

  constructor(private activeRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router, private shareDataService: ShareDataService,) { }

  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params["id"];
    this.vehicleService.getVehicleById(Number(id)).subscribe(response => {
      this.vehicle = response.responseData;
      this.rating = response.responseData.rating;
      if (this.vehicle.vehicleType === "CAR") {
        this.vehicleService.getDiscountByFuelType().subscribe(response => {
          this.discounts = response.responseData
        })
      } else if (this.vehicle.vehicleType === "BIKE") {
        this.vehicleService.getDiscountByTwoWheelerType().subscribe(response => {
          this.discounts = response.responseData
        })
      }
    });

    this.vehicleService.getExtraChargeByColor().subscribe(response => {
      this.charges = response.responseData
      this.colors = response.responseData.map((color: { name: string; }) => color.name)
      this.colors.reverse()
    })

    this.vehicleService.getDiscountByFuelType().subscribe(response => {
      this.fuelType = response.responseData.map((fuel: { name: string; }) => fuel.name)
    })
  }

  addToCart() {
    const item = {
      quantity: this.quantity,
      color: this.selectedColor,
      fuelType: this.selectedFuelType,
      itemType: "CART",
      vehicle: this.vehicle
    }
    const id = JSON.parse(this.storageService.getItem("user")).id;

    this.cartService.addToCart(item, id).subscribe({
      next: (response) => {
        this.addToCartSuccess = response.success;
        this.addToCartSuccess && this.storageService.storeItem("added", "1");
        setTimeout(() => {
          this.addToCartSuccess = false
        }, 1000)
      }, error: () => { }
    })
  }

  buyNow() {
    const obj = {
      color: this.selectedColor,
      fuelType: this.selectedFuelType,
      initialPrice: this.vehicle.price,
      quantity: this.quantity,
      vehicle: this.vehicle
    }
    this.shareDataService.setData({ item: [obj], isCartItems: false })
    this.router.navigate(["placeOrder"])
  }


  increment() {
    this.quantity < 10 && (this.quantity += 1)
  }
  decrement() {
    this.quantity > 1 && (this.quantity -= 1)
  }


}
