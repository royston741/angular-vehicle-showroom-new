import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';


@Component({
  selector: 'app-back-button',
  template: `
<button class="back_btn {{customClass}}" (click)="onBackBtnClick()">
<span class="material-symbols-outlined" >
arrow_back
</span>
</button>
  `,
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {

  @Input()
  customClass="";

  constructor(private navigateService: NavigateService) { }

  onBackBtnClick() {
    this.navigateService.navigateToPreviousPage()
  }
}
