import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { Order } from "src/shared/model/Order";
import { Response } from "src/shared/model/Response";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private baseUrl = environment.baseOrderUrl;

    constructor(private http: HttpClient) { }

    processOrder(order: Order): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}getProcessOrderDetails`,order);
    }

    plcaeOrder(order: Order,customerId: number): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}placeOrder/${customerId}`,order);
    }
}