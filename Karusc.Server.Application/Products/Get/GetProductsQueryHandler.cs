﻿using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Get
{
    internal sealed class GetProductsQueryHandler : 
        IRequestHandler<GetProductsQuery, ProductWithCountDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetProductsQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService) => 
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);

        public async Task<ProductWithCountDto> Handle(
            GetProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _context.Products
                .Where(ProductExpressions.Filter(request.Categories, request.Collections))
                .Select(ProductExpressions.Selector)
                .Skip(request.PageSize * request.PageNumber)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            var count = await _context.Products.CountAsync(cancellationToken);

            return new ProductWithCountDto(
                !string.IsNullOrEmpty(_enrichmentPrefix)
                    ? products
                        .Select(product => product.EnrichImageNames(_enrichmentPrefix))
                        .ToList()
                    : products, count);
        } 
    }
}
