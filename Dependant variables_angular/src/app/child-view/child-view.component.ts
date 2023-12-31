import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRowSelectionEventArgs } from '@infragistics/igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderDto } from '../models/north-windv-2api/order-dto';
import { OrderDetailDto } from '../models/north-windv-2api/order-detail-dto';
import { NorthWindv2APIService } from '../services/north-windv2-api.service';

@Component({
  selector: 'app-child-view',
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.scss']
})
export class ChildViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();  
  public quantity?: number;
  public discount?: number;
  public orderDate?: Date = new Date('2023-11-14T15:25');
  public testVar: boolean = true;

  private _orderDetails: OrderDetailDto[] = []; 

  get orderDetails(): OrderDetailDto[]  {
      return this._orderDetails;
  }

  set orderDetails(value: OrderDetailDto[] ) {
      this._orderDetails = value;
      // quantity, discount, testVar and orderDate depends on orderDetails
      this.quantity = undefined;
      this.discount = undefined;
      this.orderDate = undefined;
      this.testVar = false;
  }

  private _orderId?: number; 

  get orderId(): number | undefined  {
      return this._orderId;
  }

  set orderId(value: number | undefined) {
      this._orderId = value;
      // quantity, discount, testVar and orderDate depends on orderDetails
      this.quantity = undefined;
      this.discount = undefined;
      this.orderDate = undefined;
      this.testVar = false;   
  }

  public northWindv2APIOrderDto: OrderDto[] = [];

  constructor(
    protected northWindv2APIService: NorthWindv2APIService,
  ) {}

  ngOnInit() {
    this.northWindv2APIService.selectedOrder.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.northWindv2APIService.getOrderDetailDtoList(this.northWindv2APIService.selectedOrder.value?.orderId as any).pipe(take(1)).subscribe({        
        next: (data) => {this.orderDetails = data;},
        error: (_err: any) => this.orderDetails = []
    }));
    this.northWindv2APIService.selectedCustomer.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.northWindv2APIService.getOrderDtoList(this.northWindv2APIService.selectedCustomer.value?.customerId as any).pipe(take(1)).subscribe({        
        next: (data) => {
          // orderDetails depends on selectedCustomer
          this.northWindv2APIOrderDto = data;
          this.orderDetails = [];
        }, 
        error: (_err: any) => this.northWindv2APIOrderDto = []
    }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public gridRowSelectionChanging(event: IRowSelectionEventArgs) {
    this.northWindv2APIService.selectedOrder.next(event.newSelection[0] as OrderDto);
  }

  public buttonClick(item: OrderDetailDto) {
    this.quantity = item.quantity as number;
  }

  public buttonClick1(item: OrderDetailDto) {
    this.discount = item.discount as number;
  }

  public buttonClick3(item: number) {
		this.orderId = item;
	}
}
