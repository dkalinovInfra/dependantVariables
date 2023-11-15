using System.Reactive.Subjects;
using DependantVariables.Models.NorthWindv2API;

namespace DependantVariables.NorthWindv2API
{
    public interface INorthWindv2APIService
    {
        public BehaviorSubject<CustomerDto> SelectedCustomer { get;}
        public BehaviorSubject<OrderDto> SelectedOrder { get;}

        Task<List<CustomerDto>> GetCustomerDtoList();
        Task<List<OrderDetailDto>> GetOrderDetailDtoList(string id);
        Task<List<OrderDto>> GetOrderDtoList(string id);
    }
}
