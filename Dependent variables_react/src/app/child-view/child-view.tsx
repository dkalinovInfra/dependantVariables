import { useGlobalContext } from '../hooks/context-hooks';
import { useGetOrderDetailDtoList, useGetOrderDtoList } from '../hooks/north-windv2-api-hooks';
import { OrderDto } from '../models/NorthWindv2API/order-dto';
import { IgrAvatar, IgrAvatarModule, IgrButton, IgrButtonModule, IgrCard, IgrCardActions, IgrCardHeader, IgrCardModule, IgrCheckbox, IgrCheckboxModule, IgrIconButton, IgrIconButtonModule, IgrInput, IgrInputModule, IgrList, IgrListItem, IgrListModule, IgrRipple, IgrRippleModule, IgrSlider, IgrSliderModule } from 'igniteui-react';
import { IgrCellTemplateContext, IgrColumn, IgrGrid, IgrGridBaseDirective, IgrGridModule, IgrRowSelectionEventArgs } from 'igniteui-react-grids';
import { IgrDatePicker, IgrDatePickerModule } from 'igniteui-react-inputs';
import { useEffect, useRef, useState } from 'react';
import 'igniteui-react-grids/grids';
import styles from './child-view.module.css';
import createClassTransformer from '../style-utils';

IgrAvatarModule.register();
IgrButtonModule.register();
IgrCardModule.register();
IgrCheckboxModule.register();
IgrDatePickerModule.register();
IgrGridModule.register();
IgrIconButtonModule.register();
IgrInputModule.register();
IgrListModule.register();
IgrRippleModule.register();
IgrSliderModule.register();

export default function ChildView() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const __loaded = useRef<boolean>(false);
  const { globalState, setGlobalState } = useGlobalContext();
  const [_orderId, setOrderId] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number | undefined>();
  const [_orderDate, setOrderDate] = useState<Date | undefined>(new Date('2024-07-03T00:00'));
  const [testVar, setTestVar] = useState<boolean | undefined>(true);
  const [discount, setDiscount] = useState<number | undefined>();
  const { northWindv2APIOrderDetailDto: orderDetails, setNorthWindv2APIOrderDetailDto: setOrderDetails } = useGetOrderDetailDtoList(globalState.selectedOrder?.orderId as any);
  const { northWindv2APIOrderDto } = useGetOrderDtoList(globalState.selectedCustomer?.customerId as any);
  const { northWindv2APIOrderDto: northWindv2APIOrderDto1 } = useGetOrderDtoList(globalState.selectedCustomer?.customerId as any);

  useEffect(() => {
    if (__loaded.current) {
      setQuantity(undefined);
      setOrderDate(undefined);
      setTestVar(false);
      setDiscount(undefined);
    }
  }, [_orderId]);

  useEffect(() => {
    if (__loaded.current) {
      setQuantity(undefined);
      setOrderDate(undefined);
      setTestVar(false);
      setDiscount(undefined);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (__loaded.current) {
      setOrderDetails([]);
    }
  }, [globalState.selectedOrder]);

  useEffect(() => {
    __loaded.current = true;
    return () => {
      __loaded.current = false;
    }
  }, []);

  function gridRowSelectionChanging(_: IgrGridBaseDirective, event: IgrRowSelectionEventArgs) {
    setGlobalState(prevState => ({...prevState, selectedOrder: event.detail.newSelection[0] as OrderDto}));
  }

  const columnBodyTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrButton size="large" clicked={() => setOrderId(ctx.dataContext.cell.value)} className={classes("button")}>
          <span key={uuid()}>{ctx.dataContext.cell.value}</span>
          <IgrRipple key={uuid()}></IgrRipple>
        </IgrButton>
      </>
    )
  }

  return (
    <>
      <div className={classes("row-layout child-view-container")}>
        <div className={classes("column-layout group")}>
          <div className={classes("row-layout group")}>
            <IgrList className={classes("list")}>
              {northWindv2APIOrderDto?.map((item) => (
                <div style={{display: 'contents'}} onClick={() => setGlobalState(prevState => ({...prevState, selectedOrder: item}))} key={uuid()}>
                  <IgrListItem>
                    <div style={{display: 'contents'}} slot="start" key={uuid()}>
                      <IgrAvatar shape="circle">
                        <span className={classes("material-icons")} key={uuid()}>
                          <span key={uuid()}>person</span>
                        </span>
                      </IgrAvatar>
                    </div>
                    <div slot="title" key={uuid()}>{item.orderId}</div>
                    <div slot="subtitle" key={uuid()}>{item.customerId}</div>
                    <span slot="end" className={classes("material-icons icon")} key={uuid()}>
                      <span key={uuid()}>star</span>
                    </span>
                  </IgrListItem>
                </div>
              ))}
            </IgrList>
            <IgrGrid data={northWindv2APIOrderDto1} primaryKey="orderId" displayDensity="cosy" rowSelection="single" allowFiltering="true" filterMode="excelStyleFilter" rowSelectionChanging={(s, event) => gridRowSelectionChanging(s, event)} className={classes("ig-typography ig-scrollbar grid")} key={uuid()}>
              <IgrColumn field="orderId" dataType="number" header="orderId" sortable="true" bodyTemplate={columnBodyTemplate} selectable="false"></IgrColumn>
              <IgrColumn field="customerId" dataType="string" header="customerId" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="employeeId" dataType="number" header="employeeId" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipperId" dataType="number" header="shipperId" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="orderDate" dataType="string" header="orderDate" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="requiredDate" dataType="string" header="requiredDate" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipVia" dataType="number" header="shipVia" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="freight" dataType="number" header="freight" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipName" dataType="string" header="shipName" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipAddress.street" dataType="string" header="shipAddress street" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipAddress.city" dataType="string" header="shipAddress city" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipAddress.region" dataType="string" header="shipAddress region" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipAddress.postalCode" dataType="string" header="shipAddress postalCode" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipAddress.country" dataType="string" header="shipAddress country" sortable="true" selectable="false"></IgrColumn>
              <IgrColumn field="shipAddress.phone" dataType="string" header="shipAddress phone" sortable="true" selectable="false"></IgrColumn>
            </IgrGrid>
          </div>
          <div className={classes("row-layout group")}>
            <div className={classes("column-layout group_1")}>
              <p className={classes("typography__body-1 text")}>
                <span>*Select an item from the list (instead of the grid) to update the selectedOrder variable.
The grid flickers when data is updated which is breaking the row selection behavior in this sample. Additional details at:</span>
              </p>
              <a href="https://infragistics.visualstudio.com/Indigo_Platform/_workitems/edit/30691" className={classes("typography__body-1 hyperlink")}>
                <span>https://infragistics.visualstudio.com/Indigo_Platform/_workitems/edit/30691</span>
              </a>
            </div>
          </div>
          <div className={classes("column-layout group")}>
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
                      <IgrButton variant="flat" size="large" clicked={() => setQuantity(item.quantity)} className={classes("button")}>
                        <span key={uuid()}>Button</span>
                        <IgrRipple key={uuid()}></IgrRipple>
                      </IgrButton>
                    </div>
                    <div style={{display: 'contents'}} slot="end" key={uuid()}>
                      <IgrIconButton variant="flat" clicked={() => setDiscount(item.discount)}>
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
              <IgrInput value={globalState.selectedOrder?.shipName} label="ShipName" outlined="true" className={classes("input")}></IgrInput>
            </div>
            <div className={classes("row-layout group_1")}>
              <IgrCheckbox labelPosition="after" checked={testVar} className={classes("checkbox")}>
                <span key={uuid()}>Label</span>
              </IgrCheckbox>
            </div>
            <div className={classes("row-layout group_1")}>
              <div className={classes("group_2")}>
                <IgrDatePicker label="Date"></IgrDatePicker>
              </div>
            </div>
            <div className={classes("row-layout group_1")}>
              <p className={classes("typography__body-1 text")}>
                <span>*Date Picker is not assigned to orderDate variable as the variable could be undefined: </span>
              </p>
              <a href="https://github.com/IgniteUI/igniteui-webcomponents/issues/1205" className={classes("typography__body-1 hyperlink_1")}>
                <span>https://github.com/IgniteUI/igniteui-webcomponents/issues/1205</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
