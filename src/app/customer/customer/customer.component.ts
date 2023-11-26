import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  name!: string;

  constructor(private customerService: UserService, private router: Router, private storageService: StorageService, public navigateService: NavigateService) { }

  ngOnInit() {
    const user = JSON.parse(this.storageService.getItem("user"))
    if (user == null || user.userType != "CUSTOMER") {
      this.router.navigate(["login"])
    }
    this.customerService.getCustomerById(user.id).subscribe(response => { this.name = response.responseData.firstName })
  }


  logOut() {
    this.storageService.removeItem("user")
    this.router.navigate(["login"])
  }

}
