import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VehicleService } from "src/app/services/vehicle.servce";
import { Vehicle } from "src/shared/model/Vehicle";

@Component({
    selector: 'app-added-vehicles-view',
    template: `<div class="align_center_screen">
          <app-back-button customClass="align_back_btn_admin"></app-back-button>

        <div class="view_vehicle">

            <div class="view_vehicle_img">
                <img src={{vehicle.vehicleImg}} alt={{vehicle.name}}>
            </div>
            <p>
                <b>Name :</b> {{vehicle.name}}
            </p>
            <p>
                <b>Rating :</b> {{vehicle.rating}}
            </p>
            <p>
                <b>Vehicle type :</b> {{vehicle.vehicleType}}
            </p>
            <p>
                <b>TwoWheeler type :</b> {{vehicle.twoWheelerType}}
            </p>
            <p>
                <b>Price :</b> {{vehicle.price | currency:'INR'}}
            </p>
      
            <p>
                <b>Description :</b> {{vehicle.description}}
            </p>
       
        </div>
    </div>`,
    styleUrls: ['./vehicles-table.component.css']
})
export class AddedVehicleViewComponent implements OnInit {
    vehicle: Vehicle = {
        id: 0,
        name: "",
        price: 0,
        rating: 0,
        vehicleType: "",
        twoWheelerType: "",
        description: "",
        vehicleImg: ""
    }
    constructor(private activeRoute: ActivatedRoute, private vehicleService: VehicleService) { }

    ngOnInit() {
        const id = Number(this.activeRoute.snapshot.params['id']);
        this.vehicleService.getVehicleById(id).subscribe({
            next: (response) => {
                this.vehicle = response.responseData;
            }
        })
    }
}