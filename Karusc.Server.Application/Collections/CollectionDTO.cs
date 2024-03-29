﻿using Karusc.Server.Domain.Products;

namespace Karusc.Server.Application.Collections
{
    public record CollectionDTO(Guid Id, string Name, string ImageURL)
    {
        internal CollectionDTO(Collection collection) :
            this(collection.Id, collection.Name, collection.ImageURL!) { }
    }
}
