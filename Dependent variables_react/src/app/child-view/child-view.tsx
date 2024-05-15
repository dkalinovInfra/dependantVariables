import { useGetOrderDetailDtoList, useGetOrderDtoList } from '../hooks/northwind-rest-hooks';
import { IgrButton, IgrButtonModule, IgrCard, IgrCardActions, IgrCardHeader, IgrCardModule, IgrCheckbox, IgrCheckboxModule, IgrComboModule, IgrIconButton, IgrIconButtonModule, IgrInput, IgrInputModule, IgrRipple, IgrRippleModule, IgrSlider, IgrSliderModule } from 'igniteui-react';
import { IgrColumn, IgrGrid, IgrGridModule, IgrRowSelectionEventArgs } from 'igniteui-react-grids';
import { IgrDatePicker, IgrDatePickerModule } from 'igniteui-react-inputs';
import 'igniteui-react-grids/grids';
import styles from './child-view.module.css';
import createClassTransformer from '../style-utils';
import { useEffect, useState } from 'react';
import { OrderDetailDto } from '../models/NorthwindRest/order-detail-dto';
import { OrderDto } from '../models/NorthwindRest/order-dto';


IgrButtonModule.register();
IgrCardModule.register();
IgrCheckboxModule.register();
IgrComboModule.register();
IgrDatePickerModule.register();
IgrGridModule.register();
IgrIconButtonModule.register();
IgrInputModule.register();
IgrRippleModule.register();
IgrSliderModule.register();

export default function ChildView() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const [ selectedOrder, setSelectedOrder ] = useState<OrderDto>();
  const { northwindRestOrderDetailDto } = useGetOrderDetailDtoList(selectedOrder?.orderId);
  const orderDetails = northwindRestOrderDetailDto;
  const { northwindRestOrderDto } = useGetOrderDtoList('AROUT');
  const [ quantity, setQuantity ] = useState<number | undefined>();
  const [ orderDate, setOrderDate ] = useState<Date | undefined>(new Date());
  const [ testVar, setTestVar ] = useState<boolean>(true);
  const [ discount, setDiscount ] = useState<number | undefined>();

  useEffect(() => {
    setQuantity(undefined);
    setOrderDate(undefined);
    setTestVar(false);
    setDiscount(undefined);
  }, [orderDetails]);

  function gridRowSelectionChanging(_: IgrGrid, event: IgrRowSelectionEventArgs) {
    setSelectedOrder(event.detail.newSelection[0] as OrderDto);
  }

  function buttonClicked(item: OrderDetailDto) {
    setQuantity(item.quantity);
  }

  function itemButtonClicked(item: OrderDetailDto) {
    setDiscount(item.discount);
  }

  return (
    <>
      <div className={classes("row-layout child-view-container")}>
        <div className={classes("column-layout group")}>
          <div className={classes("row-layout group_1")}>
            <IgrGrid data={northwindRestOrderDto} primaryKey="orderId" displayDensity="cosy" rowSelection="single" allowFiltering="true" filterMode="excelStyleFilter" rowSelectionChanging={gridRowSelectionChanging} className={classes("ig-typography ig-scrollbar grid")}>
              <IgrColumn field="orderId" dataType="number" header="orderId" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="customerId" dataType="string" header="customerId" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="employeeId" dataType="number" header="employeeId" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipperId" dataType="number" header="shipperId" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="orderDate" dataType="string" header="orderDate" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="requiredDate" dataType="string" header="requiredDate" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipVia" dataType="number" header="shipVia" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="freight" dataType="number" header="freight" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipName" dataType="string" header="shipName" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipAddress.street" dataType="string" header="shipAddress street" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipAddress.city" dataType="string" header="shipAddress city" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipAddress.region" dataType="string" header="shipAddress region" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipAddress.postalCode" dataType="string" header="shipAddress postalCode" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipAddress.country" dataType="string" header="shipAddress country" sortable="true" selectable="false" key={uuid()}></IgrColumn>
              <IgrColumn field="shipAddress.phone" dataType="string" header="shipAddress phone" sortable="true" selectable="false" key={uuid()}></IgrColumn>
            </IgrGrid>
          </div>
          <div className={classes("row-layout group_1")}>
            {orderDetails?.map((item) => (
              <IgrCard className={classes("card")} key={uuid()}>
                <IgrCardHeader key={uuid()}>
                  <h3 slot="title" key={uuid()}>
                    <span key={uuid()}>{item.productId}</span>
                  </h3>
                  <h5 slot="subtitle" key={uuid()}>
                    <span key={uuid()}>{item.unitPrice}</span>
                  </h5>
                </IgrCardHeader>
                <IgrCardActions className={classes("actions-content")} key={uuid()}>
                  <div style={{display: 'contents'}} slot="start" key={uuid()}>
                    <IgrButton variant="flat" size="large" clicked={() => buttonClicked(item)} className={classes("button")}>
                      <span key={uuid()}>Quantity</span>
                      <IgrRipple key={uuid()}></IgrRipple>
                    </IgrButton>
                  </div>
                  <div style={{display: 'contents'}} slot="end" key={uuid()}>
                    <IgrIconButton variant="flat" clicked={() => itemButtonClicked(item)}>
                      <span className={classes("material-icons")} key={uuid()}>
                        <span key={uuid()}>favorite</span>
                      </span>
                      <IgrRipple key={uuid()}></IgrRipple>
                    </IgrIconButton>
                  </div>
                  <div style={{display: 'contents'}} slot="end" key={uuid()}>
                    <IgrIconButton variant="flat">
                      <span className={classes("material-icons")} key={uuid()}>
                        <span key={uuid()}>bookmark</span>
                      </span>
                      <IgrRipple key={uuid()}></IgrRipple>
                    </IgrIconButton>
                  </div>
                  <div style={{display: 'contents'}} slot="end" key={uuid()}>
                    <IgrIconButton variant="flat">
                      <span className={classes("material-icons")} key={uuid()}>
                        <span key={uuid()}>share</span>
                      </span>
                      <IgrRipple key={uuid()}></IgrRipple>
                    </IgrIconButton>
                  </div>
                </IgrCardActions>
              </IgrCard>
            ))}
          </div>
          <div className={classes("row-layout group_1")}>
            <p className={classes("typography__body-1 text")}>
              <span>{quantity!}</span>
            </p>
          </div>
          <div className={classes("row-layout group_1")}>
            <p className={classes("typography__body-1 text")}>
              <span>{discount!}</span>
            </p>
          </div>
          <div className={classes("row-layout group_1")}>
            <IgrSlider value={quantity!} min="0" max="100" step="1" discreteTrack="true" className={classes("slider")}></IgrSlider>
          </div>
          <div className={classes("row-layout group_1")}>
            <IgrInput label="Label/Placeholder" outlined="true" className={classes("input")}></IgrInput>
          </div>
          <div className={classes("row-layout group_1")}>
            <IgrCheckbox labelPosition="after" checked={testVar} className={classes("checkbox")}>
              <span key={uuid()}>Label</span>
            </IgrCheckbox>
          </div>
          {/* <div className={classes("row-layout group_1")}>
            <IgrDatePicker label="Date" value={orderDate!} className={classes("date-picker")}></IgrDatePicker>
          </div> */}
        </div>
      </div>
    </>
  );
}
