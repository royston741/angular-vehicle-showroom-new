import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { AdminComponent } from './admin/admin/admin.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleDescriptionComponent } from './vehicle/vehicle-description/vehicle-description.component';
import { CartComponent } from './cart/cart/cart.component';
import { PlaceOrderComponent } from './order/place-order/place-order.component';
import { CustomerOrdersComponent } from './order/customer-orders/customer-orders.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { OrderItemDetailComponent } from './order/order-item-detail/order-item-detail.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';

// const routes: Routes = [
//   { path: '', redirectTo: "login", pathMatch: "full" },
//   { path: 'login', component: SignInComponent },
//   { path: 'registerCustomer', component: RegisterCustomerFormComponent },
//   {
//     path: 'admin',
//     component: AdminComponent,
//     children: [
//       { path: "", redirectTo: "allCustomers", pathMatch: "full" },
//       {
//         path: 'allCustomers',
//         component: CustomerTableComponent,
//       },
//       { path: 'createCustomerForm', component: CreateFormComponent },
//       { path: 'updateCustomerForm/:id', component: UpdateFormComponent },
//       { path: 'customerDetails/:id', component: CustomerDetailsComponent },
//       { path: 'customer/vehicleDetail/:id', component: VehicleDetailComponent },
//     ]
//   },
//   {
//     path: "customer",
//     component: CustomerComponent,
//     children: [
//       { path: "", redirectTo: "allAvailableVehicles", pathMatch: "full" },
//       { path: 'allAvailableVehicles', component: AllVehicleComponent },
//       { path: 'customerProfile', component: CustomerProfileComponent },
//       { path: 'orderDetail/name/:name/phoneNo/:phoneNo', component: OrderDetailComponent },
//       { path: 'vehicleDescription/:id', component: VehicleDescriptionComponent },
//       { path: 'placeOrder', component: PlaceOrderComponent }
//     ]
//   },

// ];
const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full" },
  { path: 'login', component: LogInComponent },
  { path: 'registerCustomer', component: RegisterUserComponent },
  {
    path: "customer",
    component: CustomerComponent,
    children: [
      { path: "", redirectTo: "vehicleList", pathMatch: "full" },
      { path: 'vehicleList', component: VehicleListComponent },
      { path: 'vehicleDescription/:id', component: VehicleDescriptionComponent },
      { path: 'cart', component: CartComponent },
      { path: 'allOrders', component: CustomerOrdersComponent },
      { path: 'prodile', component: ProfileComponent },

    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "", redirectTo: "allCustomers", pathMatch: "full" },
      {
        path: 'allCustomers',
        component: CustomerTableComponent,
      },
      { path: 'customerDetails/:id', component: CustomerDetailsComponent },
      { path: 'orderItemDetail/:id', component: OrderItemDetailComponent },
      { path: 'registerAdmin', component: RegisterAdminComponent }

    ]
  }, {
    path: "placeOrder",
    component: PlaceOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
