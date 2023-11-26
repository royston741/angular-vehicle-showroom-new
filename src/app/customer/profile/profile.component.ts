import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  customerId: number = 0;
  formFirstName = { value: '', valid: true }
  formLastName = { value: '', valid: true }
  formEmail = { value: '', valid: true }
  formPhoneNo = { value: '', valid: true }
  formPassword = { value: '', valid: true }
  formAddress = { value: '', valid: true }

  disabled=true;

  responseSuccess = false;
  responseErrorMessage = [];

  constructor(private userService: UserService, private router: Router,
    private storageService: StorageService,private navigateService:NavigateService) { }

  ngOnInit() {
    this.customerId = JSON.parse(this.storageService.getItem("user")).id;
    this.userService.getCustomerById(this.customerId).subscribe(response=>{
        const data =response.responseData;
        this.formFirstName.value=data.firstName;
        this.formLastName.value=data.lastName;
        this.formEmail.value=data.email
        this.formPhoneNo.value=data.phoneNo
        this.formPassword.value=data.password
        this.formAddress.value=data.address
    })
  }

  onNavigate() {
    this.router.navigate(['login'])
  }

  onSubmitForm(e: Event) {
    this.responseSuccess = false;
    this.responseErrorMessage = [];
    e.preventDefault();
    this.userService.updateCustomer({
      id:this.customerId,
      firstName: this.formFirstName.value.trim(),
      lastName: this.formLastName.value.trim(),
      email: this.formEmail.value.trim(),
      phoneNo: this.formPhoneNo.value.trim(),
      password: this.formPassword.value.trim(),
      address: this.formAddress.value.trim(),
      userType:"CUSTOMER"
    }).subscribe({
      next: (response) => {
        this.responseSuccess = response.success
        if (this.responseSuccess) {
          setTimeout(()=>{
            this.responseSuccess=false;
            this.disabled=true;
          },1000)
        }
      }, error: (err) => {
        this.responseErrorMessage = err.error.errMssg
      }
    })
  }

  validateName(value: string) {
    return value.trim().length > 3;
  }

  validatePhoneNo(value: number) {
    let num = value + "";
    return (num.trim().length >= 10 && num.trim().length <= 10);
  }

  validateEmail(value: string) {
    return value.trim().includes("@");
  }

  validatePassword(value: string) {
    return value.trim().length > 8;
  }

  validateAddress(value: string) {
    this.formAddress.valid = value.length > 8;
  }
}
