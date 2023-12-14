import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from '../shared/component-template/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InputAttributeDirective } from 'src/shared/custom-directive/input-attribute-directive.directive';
import { LogInComponent } from './log-in/log-in.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { AdminComponent } from './admin/admin/admin.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { SelectComponent } from 'src/shared/component-template/select/select.component.';
import { VehicleDescriptionComponent } from './vehicle/vehicle-description/vehicle-description.component';
import { CartComponent } from './cart/cart/cart.component';
import { PlaceOrderComponent } from './order/place-order/place-order.component';
import { CustomerOrdersComponent } from './order/customer-orders/customer-orders.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { TableComponent } from 'src/shared/component-template/tableTemplate/table-template.component';
import { ActionsComponent } from 'src/shared/component-template/tableTemplate/actions-template.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { VehicleTableComponent } from './vehicle/ordered-vehicle-table/vehicle-table.component';
import { OrderItemDetailComponent } from './order/order-item-detail/order-item-detail.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { BackButtonComponent } from 'src/shared/component-template/back-button/back-button.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { VehiclesTableComponent } from './vehicle/vehicles-table/vehicles-table.component';
import { AddedVehicleViewComponent } from './vehicle/vehicles-table/added-vehicle-view';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { PaginationControlsComponent } from '../shared/component-template/pagination-controls/pagination-controls.component';
// import DataTables from 'datatables.net';

@NgModule({
  declarations: [
    CustomerTableComponent,
    AppComponent, 
    InputComponent,
    SelectComponent,
    InputAttributeDirective,
     RegisterUserComponent,
     LogInComponent,
     CustomerComponent,
     AdminComponent,
     VehicleListComponent,
     VehicleDescriptionComponent,
     CartComponent,
     PlaceOrderComponent,
     CustomerOrdersComponent,
     ProfileComponent,
     TableComponent,
     ActionsComponent,
     CustomerDetailsComponent,
     VehicleTableComponent,
     OrderItemDetailComponent,
     RegisterAdminComponent,
     BackButtonComponent,
     AddVehicleComponent,
     VehiclesTableComponent,
     AddedVehicleViewComponent,
     UpdateVehicleComponent,
     PaginationControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
