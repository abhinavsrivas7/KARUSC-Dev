using Karusc.Server.Domain.Products;

namespace Karusc.Server.Domain.Orders
{
    public class LineItem<T> where T : LineItemEntity<T>
    {
        private static readonly (int Min, int Max) QuantityLimits = (1, 5);
        public Guid Id { get; init; }
        public Product? Product { get; private set; }
        public Guid? ProductId { get; private set; }
        public int Quantity { get; private set; }
        public T? Parent { get; private set; }
        public Guid? ParentId { get; private set; }

        private LineItem(int quantity)
        {
            Id = Guid.NewGuid();
            Quantity = quantity;
        }

        public static LineItem<T> Create(Product product, int quantity, T parent) 
        {
            if(quantity < QuantityLimits.Min || quantity > QuantityLimits.Max)
            {
                throw new InvalidDataException("Invalid quantity (1 - 5).");
            }

            var lineItem = new LineItem<T>(quantity);
            lineItem.Product = product;
            lineItem.ProductId = product.Id;
            lineItem.Parent = parent;
            lineItem.ParentId = parent.Id;
            return lineItem;
        }

        public void ChangeQuantity(int increment)
        {
            var newQuantity = Quantity + increment;
            
            if (newQuantity < QuantityLimits.Min || newQuantity > QuantityLimits.Max)
            {
                throw new InvalidDataException("Invalid increment.");
            }

            Quantity = newQuantity;
        }

        internal decimal GetAmount() => Product is null
            ? throw new InvalidDataException("Invalid line item provided.")
            : Product.Price * Quantity;
    }
}