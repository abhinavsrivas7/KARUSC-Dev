using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    { 
        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetProduct")]
        public IActionResult Get() => Ok(new List<Product>() 
        { 
            new()
            {
               ID = 1,
               Title = "Tshirt",
               Description = "Cool tshirt",
               Category = "Clothes",
               Price = 30.24,
               Image = "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            } 
        });
    }
}
