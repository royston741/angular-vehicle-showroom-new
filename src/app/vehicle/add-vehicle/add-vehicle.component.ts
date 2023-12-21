import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigateService } from 'src/app/services/navigate.service';
import { VehicleService } from 'src/app/services/vehicle.servce';
import { Vehicle } from 'src/shared/model/Vehicle';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  addVehicleForm = new FormGroup({
    name: new FormControl("", { validators: [Validators.required, Validators.minLength(3)] }),
    price: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
    rating: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
    vehicleType: new FormControl("CAR"),
    twoWheelerType: new FormControl("SPORTS"),
    vehicleImg: new FormControl("", { validators: [] }),
    description: new FormControl("", { validators: [Validators.required, Validators.minLength(3)] }),
  })

  get f() {
    return this.addVehicleForm.controls;
  }

  vehicleTypeList: string[] = [];

  twoWheelerTypeList: string[] = [];

  errMssgList: string[] = []
  isSuccess = false;

  selectedFile!: any;
  imgUrl = ""
  isImgUploaded = true;

  vehicleId = 0

  constructor(private vehicleService: VehicleService, private activeRoute: ActivatedRoute,public navigateService:NavigateService) { }

  ngOnInit() {
    this.vehicleService.getVehicleType().subscribe(response => {
      this.vehicleTypeList = [...response.responseData];
    })

    this.vehicleService.getDiscountByTwoWheelerType().subscribe(response => {
      const listOfTwoWheelerType = response.responseData.map((type: { name: string }) => type.name)
      this.twoWheelerTypeList = [...listOfTwoWheelerType];
    })
    this.vehicleId = this.activeRoute.snapshot.params["id"];
    
    if (this.vehicleId > 0) {
      this.vehicleService.getVehicleById(this.vehicleId).subscribe({
        next: (response) => {
          const data: Vehicle = response.responseData;
          const blob = new Blob([data.vehicleImg], { type: 'application/jpg' });
          this.addVehicleForm.patchValue({
            name: data.name,
            price: data.price,
            rating: data.rating,
            vehicleType: data.vehicleType,
            twoWheelerType: data.twoWheelerType,
            description: data.description,
          })
          this.imgUrl = data.vehicleImg
        }
      })
    }
  }

  onSubmit() {
    this.errMssgList=[]
    if (!this.imgUrl) {
      this.errMssgList.push("Please upload image")
    }
    else {
      const vehicleData = {
        name: this.addVehicleForm.value.name,
        price: this.addVehicleForm.value.price,
        vehicleType: this.addVehicleForm.value.vehicleType,
        twoWheelerType: this.addVehicleForm.value.vehicleType == "CAR" ? null : this.addVehicleForm.value.twoWheelerType,
        description: this.addVehicleForm.value.description,
        rating: this.addVehicleForm.value.rating,
        vehicleImg: this.imgUrl
      }

      // const formData=new FormData();
      // formData.append("vehicle",new Blob([JSON.stringify(vehicleData)],{type:"application/json"}))
      // formData.append("vehicleImageFile",this.selectedFile)

      if (this.vehicleId > 0) {
        this.updateVehicle(vehicleData)
      }
      else {
        this.addNewVehicle(vehicleData)
      }
    }
  }

  addNewVehicle(vehicleData: any) {
    this.vehicleService.addVehicle(vehicleData).subscribe({
      next: (response) => {
        if (response.success) {
          this.isSuccess = true
          setTimeout(()=>{
            this.navigateService.navigateToAdminVehicleTable();
          },1000)
        }
      },
      error: (error) => {
        this.errMssgList = error.error.errMssg
      }
    })
  }

  updateVehicle(vehicleData: any) {
    this.vehicleService.updateVehicle({...vehicleData,id:this.vehicleId}).subscribe({
      next: (response) => {
        if (response.success) {
          this.isSuccess = true
          setTimeout(()=>{
            this.navigateService.navigateToAdminVehicleTable();
          },1000)   
        }
      },
      error: (error) => {
        this.errMssgList = error.error.errMssg
      }
    })
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      // 'result' contains the contents of the file as a data URL
      const fileContent = e.target.result;
      this.imgUrl = fileContent
    };

    // Read the file as a data URL
    reader.readAsDataURL(this.selectedFile);
  }
}