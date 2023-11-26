import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.servce';
import { Vehicle } from 'src/shared/model/Vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[] = []

  errMssg: string[] = [];

  sort = {
    direction: 'ASC',
    column: 'id',
  };

  filter = {
    vehicleType: "",
    twoWheelerType: "",
    startingPrice: 0,
    endingPrice: 0
  }

  startPrice: number = 0;
  endPrice: number = 0;

  constructor(private vehicleService: VehicleService,private router:Router) { }

  ngOnInit(): void {
    this.vehicleService.getTheMaxAndMinPrice().subscribe(response => {
      this.startPrice = response.responseData[1]
      this.endPrice = response.responseData[0]
      this.filter.startingPrice = this.startPrice;
      this.filter.endingPrice = this.endPrice
      this.getAllVehiclesData();
    })
  }

  getAllVehiclesData() {
    this.vehicles = []
    this.errMssg = []

    this.vehicleService.getAllVehicles(
      this.sort.column,
      this.sort.direction,
      this.filter.startingPrice,
      this.filter.endingPrice,
      this.filter.vehicleType,
      this.filter.twoWheelerType).subscribe({
        next: (response) => {
          this.vehicles = response.responseData;
          console.log(this.vehicles)
        },
        error: (err) => {
          this.errMssg = err.error.errMssg
        }
      });
  }

  onSelectSortBy(sortBy: string) {
    switch (sortBy) {
      case "All":
        this.sort.direction = 'ASC'
        this.sort.column = 'id'
        break;
      case "rating":
        this.sort.column = sortBy
        this.sort.direction = "DESC"
        break;
      case "price --- low to high":
        this.sort.column = "price"
        this.sort.direction = "ASC"
        break;
      case "price -- high to low":
        this.sort.column = "price"
        this.sort.direction = "DESC"
        break;
    }
    this.getAllVehiclesData()
  }

  onSelectVehicleType(value: string) {
    this.filter.twoWheelerType = "";
     if(value ==="All"){
      this.filter.vehicleType = '';
    }else{
      this.filter.vehicleType = value;
    }
    this.getAllVehiclesData()
  }

  onSelectTwoWheelerType(value: string) {
    if(value ==="All"){
      this.filter.twoWheelerType = '';
    }else{
      this.filter.twoWheelerType = value;
    }
    this.getAllVehiclesData()
  }
 
  onPriceChange(price: { type: string, value: string }) {
    if (price.type === "start") {
      this.filter.startingPrice = parseInt(price.value)
    }
    else if (price.type === "end") {
      this.filter.endingPrice = parseInt(price.value)
    }
  }

  onNavigateToVehicleDescription(id:number){
    this.router.navigate(["customer","vehicleDescription",id])
  }
}
