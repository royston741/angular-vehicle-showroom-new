import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-controls',
  templateUrl: './pagination-controls.component.html',
  styleUrls: ['./pagination-controls.component.css']
})
export class PaginationControlsComponent {
  @Input()
  page = {
    itemsPerPage: 2,
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    first: false,
    last: false,
  };

  @Input()
  includePageSize=false;

  @Output() pageChangeEvent = new EventEmitter<number>();
  @Output() pageSizeChangeEvent = new EventEmitter<number>();

  onPageChange(page: string | number) {
    let pageNo;
    if (page === 'previous') {
      pageNo = this.page.currentPage - 1;
    } else if (page === 'foward') {
      pageNo = this.page.currentPage + 1;
    } else if (page === 1 || page === 2) {
      pageNo = page - 1;
    } else if (page == this.page.totalPages) {
      pageNo = this.page.totalPages - 1;
    }
    else {
      pageNo = this.page.currentPage;
    }
    this.pageChangeEvent.emit(pageNo);
  }

  selectPageSize(e: Event) {
    let pageSize = Number((e.target as HTMLInputElement).value);
    this.pageSizeChangeEvent.emit(pageSize);
  }

  numberArray(num: number): number[] {
    return Array(num + 1)  // create a array of length
      .fill(0) // fille elements as 0
      .map((el, i) => i) // provide an array consisting of index
      .filter((el) => el >= 5 && el % 5 === 0); // return array including element > 5 and multiple of 5
  }

}
