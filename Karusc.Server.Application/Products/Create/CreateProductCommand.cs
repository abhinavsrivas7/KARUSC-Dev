﻿using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Products.Create
{
    public record CreateProductCommand(
        string Title,
        decimal Price,
        string Description,
        string Category,
        string Image) : IRequest<Product>;
}
