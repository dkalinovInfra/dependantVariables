using System.Reactive.Subjects;
using DependantVariables.Models.NorthWindv2API;

namespace DependantVariables.NorthWindv2API
{
    public class MockNorthWindv2APIService : INorthWindv2APIService
    {
        public BehaviorSubject<CustomerDto> SelectedCustomer { get; set; } = new(default);
        public BehaviorSubject<OrderDto> SelectedOrder { get; set; } = new(default);

        public Task<List<CustomerDto>> GetCustomerDtoList()
        {
            return Task.FromResult<List<CustomerDto>>(new());
        }

        public Task<List<OrderDetailDto>> GetOrderDetailDtoList(string id)
        {
            return Task.FromResult<List<OrderDetailDto>>(new());
        }

        public Task<List<OrderDto>> GetOrderDtoList(string id)
        {
            return Task.FromResult<List<OrderDto>>(new());
        }
    }
}
