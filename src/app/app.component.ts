import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    const user = JSON.parse(this.storageService.getItem("user"));
    // if (user != null) {
    //   if (user.userType === "CUSTOMER") {
    //     this.router.navigate(["customer"])
    //   } else if (user.userType === "ADMIN") {
    //     this.router.navigate(["admin"])
    //   }
    // }
  }
}
