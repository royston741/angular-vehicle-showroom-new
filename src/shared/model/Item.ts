import { Vehicle } from "./Vehicle";

export interface Item  {
    id: number,
    additionalCharges: number,
    color: string,
    discount: number,
    finalPrice: number,
    fuelType: string,
    initialPrice: number,
    itemType: string,
    quantity: number,
    vehicle: Vehicle
  }