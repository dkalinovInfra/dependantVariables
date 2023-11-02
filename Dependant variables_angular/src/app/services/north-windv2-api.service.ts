import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerDto } from '../models/north-windv-2api/customer-dto';
import { OrderDetailDto } from '../models/north-windv-2api/order-detail-dto';
import { OrderDto } from '../models/north-windv-2api/order-dto';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthWindv2APIService {
  constructor(
    private http: HttpClient
  ) { }

  public selectedCustomer: BehaviorSubject<CustomerDto | undefined> = new BehaviorSubject<CustomerDto | undefined>(undefined);
  public selectedOrder: BehaviorSubject<OrderDto | undefined> = new BehaviorSubject<OrderDto | undefined>(undefined);

  public getCustomerDtoList(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`);
  }

  public getOrderDetailDtoList(id: string): Observable<OrderDetailDto[]> {
    return this.http.get<OrderDetailDto[]>(`${API_ENDPOINT}/Orders/${id}/Details`);
  }

  public getOrderDtoList(id: string): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders`);
  }
}
