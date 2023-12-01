import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  template: `<td class="wrap_btn adjust_width">
    <!-- <button *ngIf="tableName!='vehicle'" class="table_btn delete_btn" (click)="onDeleteBtnClick()">
      delete
    </button> -->
    <!-- <button *ngIf="tableName!='vehicle'" class="table_btn edit_btn" (click)="onEditBtnClick()">Edit</button> -->
    <button class="table_btn view_btn" (click)="onViewBtnClick()">View {{viewText}}</button>
  </td>`,
  styleUrls: ['./table-template.component.css'],
})
export class ActionsComponent {

  @Input() viewText=""
  @Input() tableName=""
  @Input() id = 0;
  @Input() name = '';
  @Output() btnClickEvent = new EventEmitter<{
    type: string;
    id: number;
    name: string;
  }>();

  // ngOnInit(): void {
  //   console.log(this.tableName)
  // }

  onDeleteBtnClick() {
    this.btnClickEvent.emit({ type: 'delete', id: this.id, name: this.name });
  }
  onEditBtnClick() {
    this.btnClickEvent.emit({ type: 'edit', id: this.id, name: this.name });
  }
  onViewBtnClick() {
    this.btnClickEvent.emit({ type: 'view', id: this.id, name: this.name });
  }
}
