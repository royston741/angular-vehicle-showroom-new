import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItemService } from 'src/app/services/orderItem.service';
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
  errMssg :string[]= [];

  page = {
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    first: false,
    last: false,
  };

  sort = {
    direction: 'ASC',
    column: 'id',
  };

  filterValue = '';
  

  startDate=new Date();
  endDate=new Date();
  dateErrMssg=""

  constructor(
    private customerService:UserService,
    private router: Router,
    private orderItemService:OrderItemService
  ) { }


  ngOnInit() {
    this.getData(0);
  }

  getData(pageNo: number) {
    this.customers=[]
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
            this.page.first = response.responseData.first;
            this.page.last = response.responseData.last;
            this.errMssg = [];
            
          },
          error: (err:any) => {
            this.errMssg =err.error.errMssg
          }
        });
  }



  handelActions(action: any) {
    if (action.type === 'delete') {
      // this.customerService.deleteCustomer(action.id).subscribe(() => {
      //   this.getData(0);
      // });
    } else if (action.type === 'edit') {
      // this.router.navigate(['admin/updateCustomerForm', action.id]);
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
    console.log(this.filterValue)
    this.getData(0);
  }

  onPageSizeChange(e: number) {
    this.page.itemsPerPage = e;
    this.getData(0);
  }
    
  onFetch() {
    // set err message empty
    this.dateErrMssg = "";
    // convert date to string
    let startDate = this.startDate.toString();
    let endDate = this.endDate.toString();
      // if valid date
      if (this.startDate < this.endDate) {
        this.getExcelData(startDate, endDate);
      } 
      // invalid date
      else {
        this.dateErrMssg = "please enter valid date range";
      }
    // set default date
    this.startDate = new Date();
    this.endDate = new Date()
  }
  
  getExcelData(startDate: string, endDate: string) {
    this.orderItemService.generateExcelOfOrderedVehicle(
      startDate, endDate,
      ).subscribe(response => {
        // storing the binary object in binary large object
        const blob = new Blob([response], { type: 'application/xls' });
        // setting the url of blob
        const url = window.URL.createObjectURL(blob);
        // creating a anchor element
        const anchorElement = document.createElement('a');
        // adding link to anchor
        anchorElement.href = url;
        // setting file name
        anchorElement.download = 'order-vehicles.xls';
        // add the anchor element to dom
        document.body.appendChild(anchorElement);
        // click on anchor elemnent
        anchorElement.click();
        // remove the url and element from the dom
        window.URL.revokeObjectURL(url);
        document.body.removeChild(anchorElement);
      })
  }
}
