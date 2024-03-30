using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.LineItemEntities
{
    public abstract class LineItemEntity<T> where T : LineItemEntity<T>
    {
        public Guid Id { get; init; }
        public User Owner { get; protected set; } = null!;
        public Guid OwnerId { get; protected set; }
        public List<LineItem<T>> LineItems { get; protected set; } = new();
        public virtual decimal GetTotalAmount() => LineItems.Select(item => item.GetAmount()).Sum();

        protected LineItemEntity() => Id = Guid.NewGuid();
    }
}
