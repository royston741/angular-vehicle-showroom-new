import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { Response } from "src/shared/model/Response";

@Injectable({
    providedIn: 'root',
})
export class OrderItemService {
    private baseUrl = environment.baseOrderItemUrl;

    constructor(private http: HttpClient) { }

    getAllOrderedItemOfCustomerByCustomerId(id: number, pageNo: number, pageSize: number, sortBy: string, sortDirection: string) {
        return this.http.get<Response>(`${this.baseUrl}getAllOrderedItemOfCustomerByCustomerId?id=${id}&pageNo=${pageNo}&&pageSize=${pageSize}&&sortBy=${sortBy}&&sortDirection=${sortDirection}`);
    }

    getOrderItemById(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.baseUrl}getOrderItemById/${id}`);
    }

    generateExcelOfOrderedVehicle(start:string,end:string){
        return this.http.get(
            `${this.baseUrl}getExelOfOrderedVehicle?startDate=${start}&&endDate=${end}`,  
          {responseType:'blob'}
        );
      }

}