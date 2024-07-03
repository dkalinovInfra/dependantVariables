import { CustomerDto } from '../models/NorthWindv2API/customer-dto';
import { OrderDetailDto } from '../models/NorthWindv2API/order-detail-dto';
import { OrderDto } from '../models/NorthWindv2API/order-dto';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

export async function getCustomerDtoList(): Promise<CustomerDto[]> {
	const response = await fetch(`${API_ENDPOINT}/Customers`);
	if (!response.ok) {
		return Promise.resolve([]);
	}
	return response.json();
}

export async function getOrderDetailDtoList(id: number): Promise<OrderDetailDto[]> {
	if (!id) {
		return Promise.resolve([]);
	}
	const response = await fetch(`${API_ENDPOINT}/Orders/${id}/Details`);
	if (!response.ok) {
		return Promise.resolve([]);
	}
	return response.json();
}

export async function getOrderDtoList(id: string): Promise<OrderDto[]> {
	if (!id) {
		return Promise.resolve([]);
	}
	const response = await fetch(`${API_ENDPOINT}/Customers/${id}/Orders`);
	if (!response.ok) {
		return Promise.resolve([]);
	}
	return response.json();
}
