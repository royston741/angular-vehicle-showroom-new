import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Customer } from '../../../shared/model/Customer';
import { UserService } from 'src/app/services/user.service';
import { OrderItemService } from 'src/app/services/orderItem.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  customer!: {
    id:number,
    firstName:string,
    lastName:String,
    email:String,
    phoneNo:String,
    address:String
  } ;

  constructor(
    private route: ActivatedRoute,
    private customerService: UserService,
    private orderItemService: OrderItemService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(id).subscribe((res) => {
      const data= {
        id:res.responseData.id,
        firstName:res.responseData.firstName,
        lastName:res.responseData.lastName,
        email:res.responseData.lastName,
        phoneNo:res.responseData.lastName,
        address:res.responseData.lastName
      }
      this.customer = data;
    });

  }

  sortNull() {
    return 0;
  }

  transform(data: any) {
    let arr = data.split(/(?=[A-Z])/);
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].substring(1);
    return arr.join(' ');
  }
}
