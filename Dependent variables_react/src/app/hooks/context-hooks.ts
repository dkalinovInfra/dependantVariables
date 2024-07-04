import { createContext, Dispatch, useContext, useEffect, useRef, useState } from 'react';
import { CustomerDto } from '../models/NorthWindv2API/customer-dto';
import { OrderDto } from '../models/NorthWindv2API/order-dto';

export const GlobalContext = createContext<{globalState: GlobalStateInterface, setGlobalState: Dispatch<React.SetStateAction<GlobalStateInterface>>}>(undefined as any);
export const useGlobalContext = () => useContext(GlobalContext);

export const useGlobalState = () => {
	const __loaded = useRef<boolean>(false);
	const initialState = {
		selectedCustomer: undefined,
		selectedOrder: undefined
	} as GlobalStateInterface;
	const [globalState, setGlobalState] = useState<GlobalStateInterface>(initialState);

	useEffect(() => {
		if (__loaded.current) {
			setGlobalState(prevState => ({...prevState, selectedOrder: undefined}));
		}
	}, [globalState.selectedCustomer]);

	useEffect(() => {
		__loaded.current = true;
		return () => {
			__loaded.current = false;
		}
	}, []);

	return { globalState, setGlobalState };
};

interface GlobalStateInterface {
	selectedCustomer: CustomerDto | undefined;
	selectedOrder: OrderDto | undefined;
}
