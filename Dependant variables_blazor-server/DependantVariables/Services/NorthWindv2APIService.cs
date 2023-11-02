using System.Net.Http.Json;
using System.Reactive.Subjects;
using DependantVariables.Models.NorthWindv2API;

namespace DependantVariables.NorthWindv2API
{
    public class NorthWindv2APIService: INorthWindv2APIService
    {
        private readonly HttpClient _http;

        public NorthWindv2APIService(HttpClient http)
        {
            _http = http;
        }

        public BehaviorSubject<CustomerDto> SelectedCustomer { get; set; } = new(default);
        public BehaviorSubject<OrderDto> SelectedOrder { get; set; } = new(default);

        public async Task<List<CustomerDto>> GetCustomerDtoList()
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri("https://data-northwind.indigo.design/Customers", UriKind.RelativeOrAbsolute));
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<CustomerDto>>().ConfigureAwait(false);
            }

            return new List<CustomerDto>();
        }

        public async Task<List<OrderDetailDto>> GetOrderDetailDtoList(string id)
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri($"https://data-northwind.indigo.design/Orders/{id}/Details", UriKind.RelativeOrAbsolute));
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<OrderDetailDto>>().ConfigureAwait(false);
            }

            return new List<OrderDetailDto>();
        }

        public async Task<List<OrderDto>> GetOrderDtoList(string id)
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri($"https://data-northwind.indigo.design/Customers/{id}/Orders", UriKind.RelativeOrAbsolute));
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<OrderDto>>().ConfigureAwait(false);
            }

            return new List<OrderDto>();
        }
    }
}
