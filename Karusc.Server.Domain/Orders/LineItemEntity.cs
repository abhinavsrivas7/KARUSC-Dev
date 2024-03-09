using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.Orders
{
    public abstract class LineItemEntity<T> where T : LineItemEntity<T>
    {
        public Guid Id { get; init; }
        public User? Owner { get; protected set; } = null;
        public Guid? OwnerId { get; protected set; } = null;
        public List<LineItem<T>>? LineItems { get; protected set; } = null;
        public decimal TotalAmount 
        { 
            get => LineItems is null
                ? 0
                : LineItems.Select(item => item.GetAmount()).Sum();
            
            private set => TotalAmount = value;
        }

        protected LineItemEntity() => Id = Guid.NewGuid();
    }
}
