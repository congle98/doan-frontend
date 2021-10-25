import {City} from "./City";
import {OrderStatus} from "./OrderStatus";
import {OrderItem} from "./OrderItem";

export class Order {
  id:Number;
  totalQuantity: number;
  totalPrice: number;
  addressDetail: string;
  city: City;
  status:OrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderTrackingNumber:string;
  orderItems:OrderItem[];
  dateCreated:Date;
  lastUpdated:Date;
}
