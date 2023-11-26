import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderItemService } from 'src/app/services/orderItem.service';
import { Item } from 'src/shared/model/Item';

@Component({
  selector: 'app-order-item-detail',
  templateUrl: './order-item-detail.component.html',
  styleUrls: ['./order-item-detail.component.css']
})
export class OrderItemDetailComponent implements OnInit{
  orderItem!: Item;
  constructor(
    private orderItemService: OrderItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    this.getData(id);
  }

  getData(id: number) {
    this.orderItemService.getOrderItemById(id).subscribe((res) => {
      this.orderItem = res.responseData;
      console.log(this.orderItem)
      // console.log(res);
    });
  }
}
