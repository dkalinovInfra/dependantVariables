import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISimpleComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDto } from './models/north-windv-2api/customer-dto';
import { NorthWindv2APIService } from './services/north-windv2-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public northWindv2APICustomerDto: CustomerDto[] = [];

  constructor(
    protected northWindv2APIService: NorthWindv2APIService,
  ) {}

  ngOnInit() {
    this.northWindv2APIService.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northWindv2APICustomerDto = data,
      error: (_err: any) => this.northWindv2APICustomerDto = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.northWindv2APIService.selectedCustomer.next(event.newSelection as CustomerDto);
  }
}
