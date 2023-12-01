import { Vehicle } from "./Vehicle";

export interface Item  {
    id:  |null,
    additionalCharges: number,
    color: string,
    discount: number,
    finalPrice: number,
    fuelType: string,
    initialPrice: number,
    itemType: string,
    quantity: number,
    vehicle: Vehicle,
    orderItemBuyDate:Date
  }