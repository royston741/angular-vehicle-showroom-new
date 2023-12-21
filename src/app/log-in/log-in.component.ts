import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { NavigateService } from '../services/navigate.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  formUserName = { value: '', valid: false }
  formPassword = { value: '', valid: false }

  responseErrorMessage = [];

  constructor(private userService: UserService, private router: Router, private storageService: StorageService,public navigateService:NavigateService) { }
  
  ngOnInit(){
    const user = JSON.parse(this.storageService.getItem("user"));
    if (user != null) {
      if (user.userType === "CUSTOMER") {
        this.router.navigate(["customer"])
      } else if (user.userType === "ADMIN") {
        this.router.navigate(["admin"])
      }
    }
  }

  onNavigate() {
    this.router.navigate(['registerCustomer'])
  }

  onSubmitForm(e: Event) {
    e.preventDefault();
    this.responseErrorMessage = [];
    this.userService.logInUser(
      this.formUserName.value, this.formPassword.value
    ).subscribe({
      next: (response) => {
        const data = response.responseData;
        if (response.success && data != null) {
          this.storageService.storeItem("user", JSON.stringify({ id: data.id, userType: data.userType }))
          if (data.userType === "CUSTOMER") {
            this.router.navigate(["customer"])
          } else if (data.userType === "ADMIN") {
            this.router.navigate(["admin"])
          }
        }
      }, error: (err) => {
        this.responseErrorMessage = err.error.errMssg
      }
    })
  }

  validateName(value: string) {
    return value.trim().length > 3;
  }

  validatePassword(value: string) {
    return value.trim().length >=8;
  }

}
