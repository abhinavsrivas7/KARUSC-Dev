using Karusc.Server.Domain.Products;
using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.LineItemEntities
{
    public sealed class Cart : LineItemEntity<Cart>
    {
        private Cart() : base() {}

        public static Cart Create(User owner) 
        {
            var cart = new Cart();
            cart.Owner = owner;
            cart.OwnerId = owner.Id;
            return cart;
        }

        public LineItem<Cart> AddLineItem(Product product, int quantity)
        {
            var lineItem = LineItem<Cart>.Create(product, quantity, this);

            if (LineItems.Any(LineItemFilter(product.Id, true)))
            {
                throw new InvalidOperationException("Line item with the specified product already exists in cart");
            }

            LineItems.Add(lineItem);
            return lineItem;
        }

        public void RemoveLineItem(Guid lineItemId)
        {
            if (!LineItems!.Any(LineItemFilter(lineItemId)))
            {
                throw new InvalidOperationException("Cart does not contain the specified line item.");
            }
            
            LineItems.Remove(LineItems.First(LineItemFilter(lineItemId)));
        }

        public void EmptyCart() => LineItems.Clear();

        public void ChangeLineItemQuantity(Guid lineItemId, int incerementQuantity)
        {
            if (!LineItems!.Any(LineItemFilter(lineItemId)))
            {
                throw new InvalidOperationException("Cart does not contain the specified line item.");
            }

            LineItems.First(LineItemFilter(lineItemId)).ChangeQuantity(incerementQuantity);
        }

        private static Func<LineItem<Cart>, bool> LineItemFilter(Guid id, bool isProductId = false) => 
            isProductId ? lineItem => lineItem.ProductId == id : lineItem => lineItem.Id == id;
    }
}
