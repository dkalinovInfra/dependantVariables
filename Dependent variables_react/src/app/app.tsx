import { GlobalContext, useGlobalState } from './hooks/context-hooks';
import { useGetCustomerDtoList } from './hooks/north-windv2-api-hooks';
import { CustomerDto } from './models/NorthWindv2API/customer-dto';
import { IgrButton, IgrButtonModule, IgrCombo, IgrComboModule, IgrRipple, IgrRippleModule } from 'igniteui-react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import createClassTransformer from './style-utils';

IgrButtonModule.register();
IgrComboModule.register();
IgrRippleModule.register();

export default function App() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useGlobalState();
  const { northWindv2APICustomerDto } = useGetCustomerDtoList();

  function singleSelectComboChange(_: IgrCombo, event: any) {
    setGlobalState(prevState => ({...prevState, selectedCustomer: event.detail.newValue[0] as CustomerDto}));
  }

  return (
    <GlobalContext.Provider value ={{ globalState, setGlobalState}}>
      <div className={classes("row-layout master-view-container")}>
        <div className={classes("column-layout group")}>
          <div className={classes("column-layout group_1")}>
            <IgrCombo data={northWindv2APICustomerDto} label={globalState.selectedCustomer?.contactName} displayKey="customerId" outlined="false" singleSelect="true" change={(s, event) => singleSelectComboChange(s, event)} className={classes("single-select-combo")}></IgrCombo>
            <IgrButton size="large" clicked={() => navigate(`/child-view`)} className={classes("button")}>
              <span key={uuid()}>Button</span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrButton>
          </div>
          <div className={classes("row-layout group")}>
            <div className={classes("view-container")}>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}
