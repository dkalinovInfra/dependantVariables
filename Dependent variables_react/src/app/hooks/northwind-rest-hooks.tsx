import { useCallback, useEffect, useState } from 'react';
import { CustomerDto } from '../models/NorthwindRest/customer-dto';
import { OrderDto } from '../models/NorthwindRest/order-dto';
import { OrderDetailDto } from '../models/NorthwindRest/order-detail-dto';
import { getCustomerDto, getCustomerDtoList, getOrderDetailDtoList, getOrderDtoList } from '../services/northwind-rest';

export const useGetCustomerDto = (id: any) => {
	const [customerDto, setCustomerDto] = useState<CustomerDto>();

	const requestCustomerDto = useCallback(() => {
		let ignore = false;
		getCustomerDto(id)
			.then((data) => {
				if (!ignore) {
					setCustomerDto(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, [id]);

	useEffect(() => {
		requestCustomerDto();
	}, [id, requestCustomerDto]);

	return { requestNorthwindRestCustomerDto: requestCustomerDto, northwindRestCustomerDto: customerDto};
}

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

	return { requestNorthwindRestCustomerDto: requestCustomerDto, northwindRestCustomerDto: customerDto};
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

	return { requestNorthwindRestOrderDetailDto: requestOrderDetailDto, northwindRestOrderDetailDto: orderDetailDto};
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

	return { requestNorthwindRestOrderDto: requestOrderDto, northwindRestOrderDto: orderDto};
}
