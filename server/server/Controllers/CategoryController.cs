using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {public static List<Category> categories = new List<Category> { new Category("Math","icon.img"), new Category("English", "icon.img") };
        // GET: api/<CategoryController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            var cat = categories.Find(x => x.Id == id);
            return cat;
        }

        // POST api/<CategoryController>
        [HttpPost]
        public bool Post([FromBody] Category value)
        {
            categories.Add(value);
            return true;
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Category value)
        {
            var cat = categories.Find(x => x.Id == id);
            if (cat != null)
            {
                cat.IconRouting = value.IconRouting;
                cat.Name = value.Name;
                return true;
            }
            return false;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var cat=categories.Find(x => x.Id == id);
            if (cat != null)
            { categories.Remove(cat); 
            return true;
            }
            return false;
        }
    }
}
