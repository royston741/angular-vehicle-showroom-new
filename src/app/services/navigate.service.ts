import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root',
})
export class NavigateService {
    constructor( private router:Router, private location: Location) { }

    navigateCustomerHome(){
        this.router.navigate(["customer","vehicleList"])
    }

    navigateToCustomerCart(){
        this.router.navigate(["customer","cart"])
    }

    navigateToCustomerOrder(){
        this.router.navigate(["customer","allOrders"])
    }

    navigateToCustomerProfile(){
        this.router.navigate(["customer","prodile"])
    }

    navigateToLogin(){
        this.router.navigate(["login"])
    }

    navigateToAdminHome(){
        this.router.navigate(["admin","allCustomers"])
    }

    navigateToAdminRegisterForm(){
        this.router.navigate(["admin","registerAdmin"])
    }

    navigateToAdminVehicleTable(){
        this.router.navigate(["admin","addedVehicleTable"])
    }

    navigateToPreviousPage() {
        this.location.back()
      }
}