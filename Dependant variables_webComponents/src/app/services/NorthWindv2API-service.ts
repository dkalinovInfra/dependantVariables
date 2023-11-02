import { CustomerDto } from '../models/north-windv-2api/customer-dto';
import { OrderDetailDto } from '../models/north-windv-2api/order-detail-dto';
import { OrderDto } from '../models/north-windv-2api/order-dto';
import { BehaviorSubject } from 'rxjs';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

class NorthWindv2APIService {
	public selectedCustomer: BehaviorSubject<CustomerDto | undefined> = new BehaviorSubject<CustomerDto | undefined>(undefined);
	public selectedOrder: BehaviorSubject<OrderDto | undefined> = new BehaviorSubject<OrderDto | undefined>(undefined);

	public getCustomerDtoList = async (): Promise<CustomerDto[]> => {
		const response = await fetch(`${API_ENDPOINT}/Customers`);
		if (!response.ok) {
			return Promise.reject(response.statusText);
		}
		return response.json();
	}

	public getOrderDetailDtoList = async (id: string): Promise<OrderDetailDto[]> => {
		const response = await fetch(`${API_ENDPOINT}/Orders/${id}/Details`);
		if (!response.ok) {
			return Promise.reject(response.statusText);
		}
		return response.json();
	}

	public getOrderDtoList = async (id: string): Promise<OrderDto[]> => {
		const response = await fetch(`${API_ENDPOINT}/Customers/${id}/Orders`);
		if (!response.ok) {
			return Promise.reject(response.statusText);
		}
		return response.json();
	}
}
export const northWindv2APIService: NorthWindv2APIService = new NorthWindv2APIService();
