import { AddressDto } from './address-dto';

export interface OrderDto {
  orderId: number;
  customerId: string;
  employeeId: number;
  shipperId: number;
  orderDate: string;
  requiredDate: string;
  shipVia: number;
  freight: number;
  shipName: string;
  shipAddress: AddressDto;
}
