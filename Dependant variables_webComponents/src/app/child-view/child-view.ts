import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { defineComponents, IgcButtonComponent, IgcCardComponent, IgcIconButtonComponent, IgcIconComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import { Subject, takeUntil } from 'rxjs';
import { OrderDetailDto } from '../models/north-windv-2api/order-detail-dto';
import '@infragistics/igniteui-webcomponents-grids/grids/combined.js';
import { OrderDto } from '../models/north-windv-2api/order-dto';
import { northWindv2APIService } from '../services/NorthWindv2API-service';

defineComponents(IgcCardComponent, IgcButtonComponent, IgcRippleComponent, IgcIconButtonComponent, IgcIconComponent);

@customElement('app-child-view')
export default class ChildView extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .row-layout {
      display: flex;
    }
    .group_1 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
      min-height: 50px;
    }
    .card {
      width: 320px;
      height: max-content;
      min-width: 320px;
      flex-shrink: 0;
    }
    .grid {
      min-width: 600px;
      min-height: 300px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .actions-content {
      min-width: 50px;
      min-height: 40px;
    }
    .button {
      height: max-content;
    }
    .text {
      height: max-content;
      min-width: min-content;
    }
  `;

  constructor() {
    super();
    northWindv2APIService.selectedOrder.pipe(takeUntil(this.destroy$)).subscribe(() => northWindv2APIService.getOrderDetailDtoList(northWindv2APIService.selectedOrder.value?.orderId as any).then(
        // quantity and discount depends on orderDetails
        (data) => {this.orderDetails = data;
                  this.quantity = undefined; 
                  this.discount = undefined;}, 
        (err) => this.orderDetails = []));
    northWindv2APIService.selectedCustomer.pipe(takeUntil(this.destroy$)).subscribe(() => northWindv2APIService.getOrderDtoList(northWindv2APIService.selectedCustomer.value?.customerId as any).then(
        // orderDetails depends on selectedCustomer, quantity and discount depends on orderDetails
        (data) => {this.northWindv2APIOrderDto = data;
                    this.orderDetails = [];}, 
        (err) => this.northWindv2APIOrderDto = []));
  }

  @state()
  private _orderDetails: OrderDetailDto[] = []; 

  get orderDetails(): OrderDetailDto[]  {
      return this._orderDetails;
  }

  set orderDetails(value: OrderDetailDto[] ) {
      this._orderDetails = value;
      // quantity and discount depends on orderDetails
      this.quantity = undefined; 
      this.discount = undefined;      
  }

  @state()
  private northWindv2APIOrderDto: OrderDto[] = [];

  @state()
  private quantity?: number;

  @state()
  private discount?: number;

  @state()
  private destroy$: Subject<void> = new Subject<void>();

  public gridRowSelectionChanging(event: any) {
    northWindv2APIService.selectedOrder.next(event.detail.newSelection[0] as OrderDto);
  }

  public buttonClick(item: OrderDetailDto) {
    this.quantity = item.quantity as number;
  }

  public iconButtonClick(item: OrderDetailDto) {
    this.discount = item.discount as number;
  }

  public buttonClick1(item: any) {
    console.log(item);
    this.quantity = undefined;
    this.discount = undefined;
  }  

  // TODO this in front of ctx is a bug
  public columnBodyTemplate = (ctx: any) => html`
    <igc-button size="large" @click="${this.buttonClick1}" class="button_1">
      ${ctx.cell.value}
      <igc-ripple></igc-ripple>
    </igc-button>
  `

  disconnectedCallback() {
    this.destroy$.next();
    this.destroy$.complete();
    super.disconnectedCallback();
  }

  render() {
    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/@infragistics/igniteui-webcomponents-grids/grids/themes/dark/bootstrap.css'>
      <div class="column-layout group">
        <div class="row-layout group">
          <igc-grid .data="${this.northWindv2APIOrderDto}" primary-key="orderId" display-density="cosy" row-selection="single" allow-filtering="true" filter-mode="excelStyleFilter" auto-generate="false" 
          @rowSelectionChanging="${this.gridRowSelectionChanging}" class="ig-typography ig-scrollbar grid">
            <igc-column field="orderId" data-type="number" header="orderId" sortable="true" selectable="false" @bodyTemplate="${this.columnBodyTemplate}"></igc-column>
            <igc-column field="customerId" data-type="string" header="customerId" sortable="true" selectable="false"></igc-column>            
            <igc-column field="employeeId" data-type="number" header="employeeId" sortable="true" selectable="false"></igc-column>
            <igc-column field="shipperId" data-type="number" header="shipperId" sortable="true" selectable="false"></igc-column>            
            <igc-column field="orderDate" data-type="string" header="orderDate" sortable="true" selectable="false"></igc-column>
            <igc-column field="requiredDate" data-type="string" header="requiredDate" sortable="true" selectable="false"></igc-column>
            <igc-column field="shipVia" data-type="number" header="shipVia" sortable="true" selectable="false"></igc-column>
            <igc-column field="freight" data-type="number" header="freight" sortable="true" selectable="false"></igc-column>            
            <igc-column field="shipName" data-type="string" header="shipName" sortable="true" selectable="false"></igc-column>
            <igc-column field="shipAddress.street" data-type="string" header="shipAddress street" sortable="true" selectable="false"></igc-column>
            <igc-column field="shipAddress.city" data-type="string" header="shipAddress city" sortable="true" selectable="false"></igc-column>
            <igc-column field="shipAddress.region" data-type="string" header="shipAddress region" sortable="true" selectable="false"></igc-column>            
            <igc-column field="shipAddress.postalCode" data-type="string" header="shipAddress postalCode" sortable="true" selectable="false"></igc-column>
            <igc-column field="shipAddress.country" data-type="string" header="shipAddress country" sortable="true" selectable="false"></igc-column>            
            <igc-column field="shipAddress.phone" data-type="string" header="shipAddress phone" sortable="true" selectable="false"></igc-column>
          </igc-grid>
        </div>
        <div class="column-layout group">
          <div class="row-layout group_1">
            ${this.orderDetails?.map((item) => html`
              <igc-card class="card">
                <igc-card-header>
                  <h3 slot="title">
                    ${item.productId}
                  </h3>
                  <h5 slot="subtitle">
                    ${item.unitPrice}
                  </h5>
                </igc-card-header>
                <igc-card-actions class="actions-content">
                  <igc-button variant="flat" slot="start" size="large" @click="${() => this.buttonClick(item)}" class="button">
                    Button
                    <igc-ripple></igc-ripple>
                  </igc-button>
                  <igc-icon-button slot="end" variant="flat" @click="${() => this.iconButtonClick(item)}">
                    <span class="material-icons">
                      favorite
                    </span>
                    <igc-ripple></igc-ripple>
                  </igc-icon-button>
                  <igc-icon-button slot="end" variant="flat">
                    <span class="material-icons">
                      bookmark
                    </span>
                    <igc-ripple></igc-ripple>
                  </igc-icon-button>
                  <igc-icon-button slot="end" variant="flat">
                    <span class="material-icons">
                      share
                    </span>
                    <igc-ripple></igc-ripple>
                  </igc-icon-button>
                </igc-card-actions>
              </igc-card>
            `)}
          </div>
          <div class="row-layout group_1">
            <p class="typography__body-1 text">
              ${this.quantity}
            </p>
          </div>
          <div class="row-layout group_1">
            <p class="typography__body-1 text">
              ${this.discount}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
