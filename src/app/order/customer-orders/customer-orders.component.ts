import { Component, OnInit } from '@angular/core';
import { OrderItemService } from 'src/app/services/orderItem.service';
import { StorageService } from 'src/app/services/storage.service';
import { Item } from 'src/shared/model/Item';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  items: Item[] = [];
  customerId: number = 0;
  page = {
    itemsPerPage: 5, 
    currentPage: 0, 
    totalItems: 0, 
    totalPages: 0, 
    first: false,
    last: false,
  };

  constructor(private orderItemService: OrderItemService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.customerId = JSON.parse(this.storageService.getItem("user")).id;
    this.getData(0)
  }

  getData(pageNo: number) {
    this.orderItemService.getAllOrderedItemOfCustomerByCustomerId(this.customerId, pageNo, 3, "id", "DESC").subscribe(response => {
      this.items = response.responseData.content
      // console.log(this.items)
      this.page.itemsPerPage = response.responseData.pageable.pageSize;
      this.page.currentPage = response.responseData.pageable.pageNumber;
      this.page.totalItems = response.responseData.totalElements;
      this.page.totalPages = response.responseData.totalPages;
      this.page.first = response.responseData.first;
      this.page.last = response.responseData.last;
    })
  }

  handelPageChange(page: number) {
    this.getData(page)
  }
}
