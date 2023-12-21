import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-submit-otp-form',
  templateUrl: './submit-otp-form.component.html',
  styleUrls: ['./submit-otp-form.component.css']
})
export class SubmitOtpFormComponent implements OnInit {
  validateOtpForm = new FormGroup({
    otp: new FormControl("", { validators: [Validators.required] }),
  })

  email = "";

  isOtpFieldTouched = false;

  errMssg: string[] = []

  responseSuccess = false;

  isLoading = false;

  constructor(private navigateService: NavigateService, private storageService: StorageService, private userService: UserService) { }

  ngOnInit() {
    this.email = this.storageService.getItem("emaiUsedToReset")
  }

  get otp() {
    return this.validateOtpForm.controls;
  }

  onNext() {
    this.errMssg = []
    this.userService.validateOtpCode(this.validateOtpForm.value.otp).subscribe({
      next: (response) => {
        if (response.success) {
          this.navigateService.navigateToResetPassword()
        }
      },
      error: (err) => {
        this.errMssg = err.error.errMssg;
      }
    })

  }

}
