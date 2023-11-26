import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'app-select',
    template: `
    <div>
        <Label>{{selectFor}}</Label>
    <select (change)="onSelect($event)">
        <option  *ngFor='let option of options' [value]="option">{{option}}</option>
    </select>
    </div>
  `,
    styleUrls: ['./select.component.css']
})
export class SelectComponent {

    @Input()
    selectFor: string = "";

    @Input()
    options: string[] = [];

    selectedValue: string = '';

    @Output()
    selectEventEmitter = new EventEmitter<string>()

    onSelect(e: Event) {
        const choice = (e.target as HTMLInputElement).value
        this.selectEventEmitter.emit(choice)
    }
}
