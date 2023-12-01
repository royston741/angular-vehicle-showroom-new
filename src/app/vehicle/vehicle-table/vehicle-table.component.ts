import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemService } from 'src/app/services/orderItem.service';
import { StorageService } from 'src/app/services/storage.service';
import { Item } from 'src/shared/model/Item';
import { Vehicle } from 'src/shared/model/Vehicle';

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.css'],
})
export class VehicleTableComponent implements OnChanges {

  @Input()
  customerId: number = 0;
  vehicles: Item[] = [];

  sort = {
    direction: 'ASC',
    column: 'id',
  };

  filterValue = '';
  errMssg: string[] = [];

  page = { itemsPerPage: 5, currentPage: 0, totalItems: 0, totalPages: 0 };

  constructor(private storageService: StorageService, private orderItemService: OrderItemService, private router: Router, private orderService: OrderService) { }

  ngOnChanges() {
    this.getData(0);
  }

  // ngOnInit(): void {
  //   this.getData(0);
  // }

  getData(pageNo: number) {
    this.orderItemService
      .getAllOrderedItemOfCustomerByCustomerId(
        this.customerId,
        pageNo,
        this.page.itemsPerPage,
        this.sort.column,
        this.sort.direction,
      )
      .subscribe(
        {
          next: (response) => {
            this.vehicles = response.responseData.content.map((el: Item) => {
              return {
                id: el.id,
                name: el.vehicle.name,
                finalPrice: el.finalPrice,
                quantity: el.quantity,
              };
            });
            this.page.itemsPerPage = response.responseData.pageable.pageSize;
            this.page.currentPage = response.responseData.pageable.pageNumber;
            this.page.totalItems = response.responseData.totalElements;
            this.page.totalPages = response.responseData.totalPages;
            this.errMssg = [];
          },
          error: (err) => {
            this.errMssg = err.error.errMessage;
          }
        }
      );
  }

  handelSorting(sort: { direction: string; column: string }) {
    this.sort.column = sort.column;
    this.sort.direction = sort.direction;
    this.getData(0);
  }

  handelFilter(filter: string) {
    this.filterValue = filter;
    this.getData(0);
  }

  onPageSizeChange(e: number) {
    this.page.itemsPerPage = e;
    this.getData(0);
  }

  handelActions(action: any) {
    console.log(action);
    if (action.type === 'delete') {

      // this.vehicleService.getOrderIdOfVehicle(action.id).subscribe(response => {
      //   const orderId = response.responseData;
      //   console.log("orderId"+orderId)
      //   this.vehicleService.getVehicleById(action.id).subscribe(response => {
      //     const vehicle = response.responseData;
      //     this.orderService.updateCustomerOrder(orderId,vehicle).subscribe()
      //   });
      // })
    } else if (action.type === 'edit') {
      // this.router.navigate(['updateCustomerForm', action.id]);
    } else if (action.type === 'view') {
      this.router.navigate(['admin/orderItemDetail', action.id]);
    }
  }
}
