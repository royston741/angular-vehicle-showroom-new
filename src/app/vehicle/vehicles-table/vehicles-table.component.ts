import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.servce';
import { Vehicle } from 'src/shared/model/Vehicle';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css']
})
export class VehiclesTableComponent implements OnInit {

  sort = {
    direction: 'DESC',
    column: 'id',
  };

  filter = {
    vehicleType: "",
    twoWheelerType: "",
    startingPrice: 0,
    endingPrice: 0
  }

  page = {
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    first: false,
    last: false
  };

  startPrice: number = 0;
  endPrice: number = 0;

  vehicles: {
    id: number
    name: string,
    price: number,
    rating: number
  }[] = [];

  errMssg: string[] = [];

  vehicleTypeList: string[] = [];

  twoWheelerTypeList: string[] = [];

  isLoading = false;

  constructor(private router: Router, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getData(0)
  }

  getData(pageNo: number) {
    this.vehicleService.getTheMaxAndMinPrice().subscribe(response => {
      this.startPrice = response.responseData[1]
      this.endPrice = response.responseData[0]
      this.filter.startingPrice = this.startPrice;
      this.filter.endingPrice = this.endPrice
      this.getAllVehiclesData(pageNo);
    })


    this.vehicleService.getVehicleType().subscribe(response => {
      this.vehicleTypeList = ["ALL", ...response.responseData];
    })

    this.vehicleService.getDiscountByTwoWheelerType().subscribe(response => {
      const listOfTwoWheelerType = response.responseData.map((type: { name: string }) => type.name)
      this.twoWheelerTypeList = ["ALL", ...listOfTwoWheelerType];
    })
  }

  getAllVehiclesData(pageNo: number) {
    this.vehicles = []
    this.errMssg = []
    this.isLoading = true
    
    this.vehicleService.getAllVehicles(
      this.sort.column,
      this.sort.direction,
      pageNo,
      this.page.itemsPerPage,
      this.filter.startingPrice,
      this.filter.endingPrice,
      this.filter.vehicleType,
      this.filter.twoWheelerType).subscribe({
        next: (response) => {
          const vehicles: Vehicle[] = response.responseData.content;
          this.vehicles = vehicles.map(vehicle => {
            return {
              id: vehicle.id,
              name: vehicle.name,
              price: vehicle.price,
              rating: vehicle.rating
            }
          }

          )
          this.page.itemsPerPage = response.responseData.pageable.pageSize;
          this.page.currentPage = response.responseData.pageable.pageNumber;
          this.page.totalItems = response.responseData.totalElements;
          this.page.totalPages = response.responseData.totalPages;
          this.page.first = response.responseData.first;
          this.page.last = response.responseData.last;
          this.isLoading = false;
        },
        error: (err) => {
          this.errMssg = err.error.errMssg
          this.isLoading = false;
        }
      });
  }

  handelActions(action: any) {
    console.log(action);
    if (action.type === 'edit') {
      this.router.navigate(['admin/updateVehicle', action.id]);
    } else if (action.type === 'view') {
      this.router.navigate(['admin/vehicle', action.id]);
    }
  }

  onPageSizeChange(e: number) {
    this.page.itemsPerPage = e;
    this.getData(0);
  }


  handelSorting($event: { direction: string; column: string; }) {
    this.sort.direction = $event.direction
    this.sort.column = $event.column
    this.getAllVehiclesData(this.page.currentPage)
  }

  onSelectVehicleType(value: string) {
    this.filter.twoWheelerType = "";
    if (value === "ALL") {
      this.filter.vehicleType = '';
    } else {
      this.filter.vehicleType = value;
    }
    this.getAllVehiclesData(0)
  }

  onSelectTwoWheelerType(value: string) {
    if (value === "ALL") {
      this.filter.twoWheelerType = '';
    } else {
      this.filter.twoWheelerType = value;
    }
    this.getAllVehiclesData(0)
  }

}
