using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.LineItemEntities;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities
{
    internal abstract class LineItemRequesthandler<T> where T : LineItemEntity<T>
    {
        protected readonly IKaruscDbContext _context;
        protected readonly ICurrentUserService _currentUserService;
        protected abstract IQueryable<T> GetLineItemQueryable();
        protected abstract Task<T> SaveEntity(T entity, CancellationToken cancellationToken);

        protected LineItemRequesthandler(
            IKaruscDbContext context, 
            ICurrentUserService currentUserService) => 
            (_context, _currentUserService) = (context, currentUserService);

        protected async Task<T> HandleLineItemEntityOperationAsync(
            Action<T>? operation,
            CancellationToken cancellationToken,
            Func<T>? createEntity = null,
            bool saveCreatedEntity = true)
        {
            var entity = await GetOperationEntity(operation, cancellationToken, createEntity, saveCreatedEntity);

            if (operation is not null)
            {
                operation(entity);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return entity;
        }

        private async Task<T> GetOperationEntity(
            Action<T>? operation,
            CancellationToken cancellationToken,
            Func<T>? createEntity = null,
            bool saveCreatedEntity = true) => createEntity is null
                ? await GetLineItemEntity(operation is null, cancellationToken)
                : saveCreatedEntity
                ? await SaveEntity(createEntity(), cancellationToken)
                : createEntity();

        protected async Task<T> GetLineItemEntity(bool isReadOnly, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);           
            var queryable = isReadOnly ? GetLineItemQueryable().AsNoTracking() : GetLineItemQueryable();
            return await queryable.FirstAsync(entity => entity.OwnerId == currentUser.Id, cancellationToken);
        }
    }
}
