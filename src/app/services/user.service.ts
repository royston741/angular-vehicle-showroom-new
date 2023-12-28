import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/shared/model/Response';
import { environment } from 'src/environment/environment';
import { Customer } from 'src/shared/model/Customer';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUserUrl;

  constructor(public http: HttpClient) {}

  addCustomer(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    password: string;
    address:string;
    userType:string
  }): Observable<Response> {
    return this.http.post<Response>(
      `${this.baseUrl}createCustomer`,
      userData
    );
  }

  getCustomerById(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}getCustomerById?id=${id}`);
  }

  getAllCustomers(
    pageNumber: number,
    pageSize: number,
    column: string,
    direction: string,
    value: string
  ): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}getAllCustomers?pageNo=${pageNumber}&&pageSize=${pageSize}&&sortBy=${column}&&sortDirection=${direction}&&filterValue=${value}`
    );
  }

  updateCustomer(customerData: Customer): Observable<Response> {
    return this.http.put<Response>(
      `${this.baseUrl}updateCustomer`,
      customerData
    );
  }

  logInUser(name: string, password: string): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}logIn?name=${name}&&password=${password}`
    );
  }

  getOtpToResetPassword(email:string | null|undefined): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}getOtpToResetPassword?email=${email}`
    );
  }

  validateOtpCode(otp:string| null | undefined,email:String): Observable<Response> {
    return this.http.get<Response>(
      `${this.baseUrl}validateOtpCode?otp=${otp}&&email=${email}`
    );
  }


  resetPassword(email:string,password:string): Observable<Response> {
    return this.http.post<Response>(
      `${this.baseUrl}resetPassword?email=${email}&password=${password}`,{}
    );
  }

}


