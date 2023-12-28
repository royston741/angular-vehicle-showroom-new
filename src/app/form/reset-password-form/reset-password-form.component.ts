import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent {

  errMssg: string[] = []

  responseSuccess = false;

  isLoading = false;

  password = {
    value: "",
    isValid: true,
    isPasswordFieldTouched: false
  }

  confirmPassword = {
    value: "",
    isValid: true,
    isConfirmFieldTouched: false
  }

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private navigateService: NavigateService,
    private storageService: StorageService) { }


  validatePassword() {
    this.password.isValid = this.password.value.length >= 8
  }

  validateConfirmPassword() {
    this.confirmPassword.isValid = this.confirmPassword.value == this.password.value
  }

  onResetBtnClick() {
    this.errMssg = []
    this.responseSuccess = false
    this.isLoading = true

    const email = this.storageService.getItem("emaiUsedToReset")
    const password = this.password.value;

    this.userService.resetPassword(email, password).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseSuccess && this.storageService.removeItem("emaiUsedToReset")
        this.navigateService.navigateToLogin()
      },
      error: (err) => {
        this.errMssg = err.errMssg
        this.isLoading = false
      }
    })
  }
}
