import { Component, Input,  Output, EventEmitter, OnInit } from '@angular/core';
import { KeyValue } from 'src/shared/model/KeyValue';


@Component({
    selector: 'app-input',
    template: `
  <div>
    <label class="input_label"><b>{{labelText}}</b></label>
    <input [ngClass]="isError===true?'err':''" inputAttributeDirective [attributeArray]="inputAttribute" [disabled]="isDisabled" [(ngModel)]="inputValue" (keyup)="onValidateInput()" (blur)="onValidateInput()">
    <span *ngIf="isError" >{{errMssg}}</span>
  </div>
  `,
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit{
 

    @Output()
    inputEventEmmiter = new EventEmitter<{ value: string, valid: boolean }>();

    @Input()
    inputAttribute: KeyValue[] = []

    @Input()
    labelText=""

    @Input()
    isDisabled=false;

    @Input()
    errMssg: string = '';

    @Input()
    validateInput!: ((value: any) => boolean);

    @Input()
    inputValue :string="";
    isError: boolean = false;

    ngOnInit(){
      // this.inputAttribute.forEach(attribute=>{
      //   if(attribute.key==="placeholder"){
      //     this.labelText=attribute.value+" :"
      //   }
      // })
    }

    onValidateInput() {
        this.isError = !this.validateInput(this.inputValue)
        this.inputEventEmmiter.emit({ value: this.inputValue, valid: !this.isError })
    }

}
