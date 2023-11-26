import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/shared/model/Customer';
import { Response } from 'src/shared/model/Response';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
})
export class CustomerTableComponent {
  customers: Customer[] = [];
  page = {
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  };

  sort = {
    direction: 'ASC',
    column: 'id',
  };

  filterValue = '';
  errMssg = [];

  constructor(
    private customerService:UserService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getData(0);
  }

  getData(pageNo: number) {
    this.customerService
      .getAllCustomers(
        pageNo,
        this.page.itemsPerPage,
        this.sort.column,
        this.sort.direction,
        this.filterValue
      )
      .subscribe(
        {
          next: (response:Response) => {
            this.customers = response.responseData.content.map((el: Customer) => {
              return {
                id: el.id,
                firstName: el.firstName,
                // lastName: el.lastName,
                phoneNo: el.phoneNo,
                address: el.address,
              };
            });
            this.page.itemsPerPage = response.responseData.pageable.pageSize;
            this.page.currentPage = response.responseData.pageable.pageNumber;
            this.page.totalItems = response.responseData.totalElements;
            this.page.totalPages = response.responseData.totalPages;
            this.errMssg = [];
          },
          error: (err:any) => {
            this.errMssg = err.error.errMessage;
          }
        });
  }

  handelActions(action: any) {
    if (action.type === 'delete') {
      // this.customerService.deleteCustomer(action.id).subscribe(() => {
      //   this.getData(0);
      // });
    } else if (action.type === 'edit') {
      this.router.navigate(['admin/updateCustomerForm', action.id]);
    } else if (action.type === 'view') {
      this.router.navigate(['admin/customerDetails', action.id]);
    }
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
}
