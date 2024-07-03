import { useCallback, useEffect, useState } from 'react';
import { CustomerDto } from '../models/NorthWindv2API/customer-dto';
import { OrderDto } from '../models/NorthWindv2API/order-dto';
import { OrderDetailDto } from '../models/NorthWindv2API/order-detail-dto';
import { getCustomerDtoList, getOrderDetailDtoList, getOrderDtoList } from '../services/north-windv2-api';

export const useGetCustomerDtoList = () => {
	const [customerDto, setCustomerDto] = useState<CustomerDto[]>([]);

	const requestCustomerDto = useCallback(() => {
		let ignore = false;
		getCustomerDtoList()
			.then((data) => {
				if (!ignore) {
					setCustomerDto(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, []);

	useEffect(() => {
		requestCustomerDto();
	}, [requestCustomerDto]);

	return { requestNorthWindv2APICustomerDto: requestCustomerDto, northWindv2APICustomerDto: customerDto, setNorthWindv2APICustomerDto: setCustomerDto};
}

export const useGetOrderDetailDtoList = (id: any) => {
	const [orderDetailDto, setOrderDetailDto] = useState<OrderDetailDto[]>([]);

	const requestOrderDetailDto = useCallback(() => {
		let ignore = false;
		getOrderDetailDtoList(id)
			.then((data) => {
				if (!ignore) {
					setOrderDetailDto(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, [id]);

	useEffect(() => {
		requestOrderDetailDto();
	}, [id, requestOrderDetailDto]);

	return { requestNorthWindv2APIOrderDetailDto: requestOrderDetailDto, northWindv2APIOrderDetailDto: orderDetailDto, setNorthWindv2APIOrderDetailDto: setOrderDetailDto};
}

export const useGetOrderDtoList = (id: string) => {
	const [orderDto, setOrderDto] = useState<OrderDto[]>([]);

	const requestOrderDto = useCallback(() => {
		let ignore = false;
		getOrderDtoList(id)
			.then((data) => {
				if (!ignore) {
					setOrderDto(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, [id]);

	useEffect(() => {
		requestOrderDto();
	}, [id, requestOrderDto]);

	return { requestNorthWindv2APIOrderDto: requestOrderDto, northWindv2APIOrderDto: orderDto, setNorthWindv2APIOrderDto: setOrderDto};
}
