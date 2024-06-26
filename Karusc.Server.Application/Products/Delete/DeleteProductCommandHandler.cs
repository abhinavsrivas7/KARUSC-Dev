﻿using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Delete
{
    internal sealed class DeleteProductCommandHandler 
        : IRequestHandler<DeleteProductCommand, Guid>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Product> _fileStorageService;
        
        public DeleteProductCommandHandler(
            IKaruscDbContext context, IFileStorageService<Product> fileStorageService) => 
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<Guid> Handle(
            DeleteProductCommand request, 
            CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .Where(product => product.Id == request.Id)
                .Select(ProductExpressions.Selector)
                .FirstOrDefaultAsync(cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            _context.Products
                .Remove(await _context.Products.FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString()));
            
            await _context.SaveChangesAsync(cancellationToken);

            if(product.Images.Any())
            {
                await _fileStorageService.BulkDelete(product.Images, cancellationToken);
            }
            
            return request.Id;
        }
    }
}
