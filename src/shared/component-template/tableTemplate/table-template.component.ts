import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css'],
})
export class TableComponent {
 
  @Output() pageChangeEvent = new EventEmitter<number>();
  @Output() actionEvent = new EventEmitter<any>();
  @Output() pageSizeChangeEvent = new EventEmitter<number>();
  @Output() filterEvent = new EventEmitter<string>();
  @Output() sortEvent = new EventEmitter<{
    direction: string;
    column: string;
  }>();

  @Input() dataList!: any[];
  @Input() pageConfig: any;
  @Input() filterInputPlaceHolder = '';
  @Input() tabelName = '';
  @Input() enableEditBtn=false;

  @Input()
  viewFor = "";

  filterInput = '';

  confirmDelete = false;
  // deleteCustomerDetails = {
  //   name: '',
  //   id: 0,
  // };

  sortNull() {
    return 0;
  }

  transform(data: any) {
    let arr = data.split(/(?=[A-Z])/);
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].substring(1);
    return arr.join(' ');
  }

  // numberArray(num: number): number[] {
  //   return Array(num + 1)  // create a array of length
  //     .fill(0) // fille elements as 0
  //     .map((el, i) => i) // provide an array consisting of index
  //     .filter((el) => el >= 5 && el % 5 === 0); // return array including element > 5 and multiple of 5
  // }

  onPageChange(page: string | number) {
    let pageNo;
    if (page === 'previous') {
      pageNo = this.pageConfig.currentPage - 1;
    } else if (page === 'foward') {
      pageNo = this.pageConfig.currentPage + 1;
    } else if (page === 1 || page === 2) {
      pageNo = page - 1;
    } else {
      pageNo = this.pageConfig.currentPage;
    }
    this.pageChangeEvent.emit(pageNo);
  }

  selectPageSize(e: Event) {
    let pageSize = Number((e.target as HTMLInputElement).value);
    this.pageSizeChangeEvent.emit(pageSize);
  }

  onAction(action: { type: string; id: number; name: string }) {
    if (action.type === 'delete') {
      // this.deleteCustomerDetails = {
      //   name: action.name,
      //   id: action.id,
      // };
      // this.confirmDelete = true;
    } else if (action.type === 'edit') {
      this.actionEvent.emit(action);
    } else if (action.type === 'view') {
      this.actionEvent.emit(action);
    }
  }

  // onDelete() {
  //   this.confirmDelete = false;
  //   this.actionEvent.emit({
  //     type: 'delete',
  //     id: this.deleteCustomerDetails.id,
  //   });
  // }

  // onCancel() {
  //   this.confirmDelete = false;
  // }

  onSort(direction: string, column: any) {
    const sort = { direction: direction, column: column };
    this.sortEvent.emit(sort);
  }

  onFilterBtnClick() {
    console.log("fuq  ")
    this.filterEvent.emit(this.filterInput);
  }

  // selectFilter(e: Event) {
  //   let filter = (e.target as HTMLInputElement).value;
  //   this.filterValue = filter;
  //   console.log(this.filterValue);
  // }

}
