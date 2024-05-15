import { useGetCustomerDtoList } from './hooks/northwind-rest-hooks';
// import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { Outlet } from 'react-router-dom';
import styles from './app.module.css';
import createClassTransformer from './style-utils';


// IgrComboModule.register();

export default function App() {
  const classes = createClassTransformer(styles);
  const { northwindRestCustomerDto } = useGetCustomerDtoList();

  function singleSelectComboChange() {
    // TODO: set selectedCustomer global variable here
    console.log("item selected");
  }

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
        <div className={classes("column-layout group")}>
          {/* <div className={classes("row-layout group_1")}>
            <IgrCombo outlined="true" data={northwindRestCustomerDto} displayKey="customerId" singleSelect="true" change={singleSelectComboChange} className={classes("single-select-combo")}></IgrCombo>
          </div> */}
          <div className={classes("row-layout group_1")}>
            <div className={classes("view-container")}>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
