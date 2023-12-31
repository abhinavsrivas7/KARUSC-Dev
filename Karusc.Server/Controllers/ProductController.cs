using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    { 
        [HttpGet]
        public IActionResult Get() => Ok(
        new List<Product> 
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
