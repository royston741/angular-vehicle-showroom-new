import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-otp-form',
  templateUrl: './get-otp-form.component.html',
  styleUrls: ['./get-otp-form.component.css']
})
export class GetOtpFormComponent {

  getOtpForm = new FormGroup({
    email: new FormControl("", { validators: [Validators.required, Validators.email] }),
  })
  isEmailTouched=false;


  errMssg:string[]=[]
  
  responseSuccess=false;

  isLoading=false;

  constructor(private userService:UserService,private navigateService:NavigateService,private storageService:StorageService){}

  get f() {
    return this.getOtpForm.controls;
  }

 
  onGetOtpClick(){
    this.errMssg=[]
    this.responseSuccess=false
    this.isLoading=true
      this.userService.getOtpToResetPassword(this.getOtpForm.value.email).subscribe({
        next:(response)=>{
          const data =response.responseData;
          this.responseSuccess=response.success
          if(response.success){
            this.storageService.storeItem("emaiUsedToReset",data)
            this.navigateService.navigateToSubmitOtp()
          }
          this.isLoading=false
        },
        error:(err)=>{
         this.errMssg=  err.error.errMssg
          this.isLoading=false
        }
      })
  }
}
