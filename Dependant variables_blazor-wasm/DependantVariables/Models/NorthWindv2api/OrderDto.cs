namespace DependantVariables.Models.NorthWindv2API;

public class OrderDto
{
    public int OrderId { get; set; }
    public string CustomerId { get; set; }
    public int EmployeeId { get; set; }
    public int ShipperId { get; set; }
    public string OrderDate { get; set; }
    public string RequiredDate { get; set; }
    public int ShipVia { get; set; }
    public double Freight { get; set; }
    public string ShipName { get; set; }
    public AddressDto ShipAddress { get; set; }
}
