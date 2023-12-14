import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/shared/model/Response';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = environment.baseVehicleUrl;

  constructor(public http: HttpClient) { }

  getVehicleById(id: number) {
    return this.http.get<Response>(
      `${this.baseUrl}getVehicleById?id=${id}`
    );
  }

  addVehicle(vehicle:any) {
    return this.http.post<Response>(
      `${this.baseUrl}createVehicle`
    ,vehicle);
  }

  updateVehicle(vehicle:any) {
    return this.http.put<Response>(
      `${this.baseUrl}updateVehicle`
    ,vehicle);
  }

  getAllVehicles(
    column: string,
    direction: string,
    pageNo:number,
    pageSize:number,
    startPrice: number,
    endPrice: number,
    vehicleType: string,
    twoWheelerType: string,
  ): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}getAllVehicles?column=${column}&direction=${direction}&startPrice=${startPrice}&endPrice=${endPrice}&vehicleType=${vehicleType}&twoWheelerType=${twoWheelerType}&pageSize=${pageSize}&pageNumber=${pageNo}`);
  }


  getTheMaxAndMinPrice() {
    return this.http.get<Response>(
      `${this.baseUrl}getMaxAndMinPrice`
    );
  }

  getDiscountByFuelType(): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}getDiscountByFuelType`
    );
  }

  getDiscountByTwoWheelerType(): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}getDiscountByTwoWheelerType`
    );
  }

  getExtraChargeByColor(): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}getExtraChargeByColor`
    );
  }

  getVehicleType(): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}getVehicleType`
    );
  }
}
